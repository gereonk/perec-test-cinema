import { NextResponse } from 'next/server';
import { getAllMovies } from '@/data/movies';

export const runtime = 'edge';
export const maxDuration = 60;

const MAX_RUNTIME_MINUTES = 105;

interface LinkCheckResult {
  title: string;
  service: string;
  link: string;
  status: 'ok' | 'broken' | 'error';
  statusCode?: number;
  error?: string;
}

interface RuntimeCheckResult {
  title: string;
  runtime: string;
  minutes: number;
  exceedsLimit: boolean;
}

function parseRuntime(runtime: string): number {
  const match = runtime.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

async function checkLink(url: string): Promise<{ ok: boolean; status?: number; error?: string }> {
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
    });
    return { ok: response.ok, status: response.status };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function GET(request: Request) {
  // Verify the request is from Vercel Cron
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET?.trim();
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const timestamp = new Date().toISOString();
  console.log('Nightly rebuild triggered at:', timestamp);

  const movies = getAllMovies();
  const brokenLinks: LinkCheckResult[] = [];
  const runtimeViolations: RuntimeCheckResult[] = [];

  // Check runtimes first (no network calls needed)
  for (const movie of movies) {
    const minutes = parseRuntime(movie.runtime);
    if (minutes > MAX_RUNTIME_MINUTES) {
      runtimeViolations.push({
        title: movie.title,
        runtime: movie.runtime,
        minutes,
        exceedsLimit: true,
      });
    }
  }

  if (runtimeViolations.length > 0) {
    console.error('RUNTIME VIOLATIONS (exceeds 105 min):', JSON.stringify(runtimeViolations, null, 2));
  }

  // Check links in parallel (batch of 5 to avoid rate limiting)
  const batchSize = 5;
  for (let i = 0; i < movies.length; i += batchSize) {
    const batch = movies.slice(i, i + batchSize);
    await Promise.all(
      batch.map(async (movie) => {
        const check = await checkLink(movie.link);
        if (!check.ok) {
          brokenLinks.push({
            title: movie.title,
            service: movie.service,
            link: movie.link,
            status: check.error ? 'error' : 'broken',
            statusCode: check.status,
            error: check.error,
          });
        }
      })
    );
  }

  if (brokenLinks.length > 0) {
    console.error('BROKEN LINKS DETECTED:', JSON.stringify(brokenLinks, null, 2));
  }

  const hasIssues = brokenLinks.length > 0 || runtimeViolations.length > 0;

  return NextResponse.json({
    success: !hasIssues,
    timestamp,
    validation: {
      totalMovies: movies.length,
      maxRuntimeMinutes: MAX_RUNTIME_MINUTES,
      runtimeViolations: runtimeViolations.length,
      brokenLinks: brokenLinks.length,
    },
    issues: {
      runtimeViolations,
      brokenLinks,
    },
    message: hasIssues
      ? `Issues found: ${runtimeViolations.length} runtime violation(s), ${brokenLinks.length} broken link(s)`
      : 'All validations passed'
  });
}
