import * as fs from 'fs';
import * as path from 'path';

const MOVIES_FILE = path.join(__dirname, '../src/data/movies.ts');
const MAX_RUNTIME_MINUTES = 105;

interface Movie {
  id: string;
  title: string;
  year: number;
  runtime: string;
  rating: number;
  poster: string;
  backdrop: string;
  description: string;
  service: string;
  link: string;
  featured?: boolean;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  movies: Movie[];
}

interface LinkCheckResult {
  movie: Movie;
  status: 'ok' | 'broken' | 'error';
  statusCode?: number;
}

// Creative category names for clustering
const CATEGORY_THEMES = [
  { id: 'intimate-portraits', names: ['Intimate Portraits', 'Souls Unveiled', 'Inner Worlds', 'Personal Landscapes'], icon: '🎨' },
  { id: 'tension', names: ['Tension in Tight Spaces', 'Edge of Your Seat', 'Pressure Cooker', 'Contained Chaos'], icon: '💥' },
  { id: 'poetry', names: ['The Poetry of Brevity', 'Moments Crystallized', 'Time Suspended', 'Fleeting Beauty'], icon: '✨' },
  { id: 'quiet', names: ['Quiet Revelations', 'Whispered Truths', 'Still Waters', 'The Sound of Silence'], icon: '🌙' },
  { id: 'coming-of-age', names: ['Coming of Age, Contained', 'Growing Pains', 'Youth in Focus', 'Becoming'], icon: '🌱' },
  { id: 'classics', names: ['Timeless Classics', 'Eternal Cinema', 'Masters of Brevity', 'Enduring Visions'], icon: '🎬' },
  { id: 'nordic', names: ['Nordic Perspectives', 'Scandinavian Visions', 'Northern Lights', 'Baltic Shores'], icon: '❄️' },
  { id: 'love', names: ['Love in Brief', 'Hearts Entwined', 'Romantic Encounters', 'Affairs of the Heart'], icon: '💕' },
];

async function checkLink(url: string, service: string): Promise<{ ok: boolean; status?: number }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    // Some services block HEAD requests, use GET with proper headers
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'sv-SE,sv;q=0.9,en;q=0.8',
      },
    });

    clearTimeout(timeout);

    // Netflix, Disney+, etc. may redirect to login but still return 200
    // Check if it's a valid movie page (not a generic error/redirect)
    if (response.ok) {
      return { ok: true, status: response.status };
    }

    // 403/405 from streaming services often means geo-restriction or bot detection, not broken
    if ([403, 405].includes(response.status) && ['Netflix', 'Disney+', 'Prime Video', 'MUBI', 'SVT Play'].includes(service)) {
      // Consider it valid - these services block automated requests
      return { ok: true, status: response.status };
    }

    return { ok: response.ok, status: response.status };
  } catch (error) {
    return { ok: false, status: 0 };
  }
}

async function checkAllLinks(movies: Movie[]): Promise<LinkCheckResult[]> {
  console.log(`Checking ${movies.length} movie links...`);
  const results: LinkCheckResult[] = [];

  // Check in batches of 3 to avoid rate limiting
  const batchSize = 3;
  for (let i = 0; i < movies.length; i += batchSize) {
    const batch = movies.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(async (movie) => {
        const check = await checkLink(movie.link, movie.service);
        return {
          movie,
          status: check.ok ? 'ok' : 'broken',
          statusCode: check.status,
        } as LinkCheckResult;
      })
    );
    results.push(...batchResults);

    // Progress indicator
    process.stdout.write(`\rChecked ${Math.min(i + batchSize, movies.length)}/${movies.length} links`);

    // Small delay between batches
    if (i + batchSize < movies.length) {
      await new Promise(r => setTimeout(r, 500));
    }
  }
  console.log('');

  return results;
}

function parseMoviesFromFile(content: string): { categories: Category[]; preamble: string; postamble: string } {
  // Extract the categories array from the file
  const categoriesMatch = content.match(/export const categories: Category\[\] = (\[[\s\S]*?\]);/);
  if (!categoriesMatch) {
    throw new Error('Could not parse categories from movies.ts');
  }

  const preambleEnd = content.indexOf('export const categories');
  const preamble = content.slice(0, preambleEnd);

  const postambleStart = content.indexOf('];', content.indexOf('export const categories')) + 2;
  const postamble = content.slice(postambleStart);

  // Use eval to parse the categories (safe since we control the file)
  const TMDB_IMG = 'https://image.tmdb.org/t/p';
  const categoriesStr = categoriesMatch[1].replace(/`\$\{TMDB_IMG\}/g, `'${TMDB_IMG}`).replace(/\.jpg`/g, ".jpg'");

  // Parse manually by extracting movie objects
  const categories: Category[] = [];
  const categoryRegex = /\{\s*id:\s*["']([^"']+)["'],\s*name:\s*["']([^"']+)["'],\s*icon:\s*["']([^"']+)["'],\s*movies:\s*\[([\s\S]*?)\]\s*\}/g;

  let match;
  while ((match = categoryRegex.exec(content)) !== null) {
    const [, id, name, icon, moviesBlock] = match;
    const movies = parseMoviesBlock(moviesBlock);
    categories.push({ id, name, icon, movies });
  }

  return { categories, preamble, postamble };
}

function parseMoviesBlock(block: string): Movie[] {
  const movies: Movie[] = [];

  // Split by movie object boundaries
  const movieBlocks = block.split(/\}\s*,?\s*\{/).map((b, i, arr) => {
    if (i === 0) return b + '}';
    if (i === arr.length - 1) return '{' + b;
    return '{' + b + '}';
  });

  for (const movieBlock of movieBlocks) {
    const id = movieBlock.match(/id:\s*["']([^"']+)["']/)?.[1];
    const title = movieBlock.match(/title:\s*["']([^"']+)["']/)?.[1];
    const year = movieBlock.match(/year:\s*(\d+)/)?.[1];
    const runtime = movieBlock.match(/runtime:\s*["']([^"']+)["']/)?.[1];
    const rating = movieBlock.match(/rating:\s*([\d.]+)/)?.[1];
    const poster = movieBlock.match(/poster:\s*[`"']([^`"']+)[`"']/)?.[1];
    const backdrop = movieBlock.match(/backdrop:\s*[`"']([^`"']+)[`"']/)?.[1];
    const description = movieBlock.match(/description:\s*["']([^"']+)["']/)?.[1];
    const service = movieBlock.match(/service:\s*["']([^"']+)["']/)?.[1];
    const link = movieBlock.match(/link:\s*["']([^"']+)["']/)?.[1];
    const featured = movieBlock.includes('featured: true');

    if (id && title && year && runtime && rating && poster && backdrop && service && link) {
      movies.push({
        id,
        title,
        year: parseInt(year),
        runtime,
        rating: parseFloat(rating),
        poster: poster.replace(/\$\{TMDB_IMG\}/g, 'https://image.tmdb.org/t/p'),
        backdrop: backdrop.replace(/\$\{TMDB_IMG\}/g, 'https://image.tmdb.org/t/p'),
        description: description || '',
        service,
        link,
        featured,
      });
    }
  }

  return movies;
}

function generateCategoryName(themeId: string): string {
  const theme = CATEGORY_THEMES.find(t => t.id === themeId);
  if (!theme) return themeId;

  // Pick a random name from the options
  const randomIndex = Math.floor(Math.random() * theme.names.length);
  return theme.names[randomIndex];
}

function clusterMovies(movies: Movie[]): Category[] {
  // Simple clustering based on movie characteristics
  const clusters: { [key: string]: Movie[] } = {
    'intimate-portraits': [],
    'tension': [],
    'poetry': [],
    'quiet': [],
    'coming-of-age': [],
    'classics': [],
    'nordic': [],
    'love': [],
  };

  for (const movie of movies) {
    const desc = movie.description.toLowerCase();
    const title = movie.title.toLowerCase();
    const year = movie.year;

    // Nordic films
    if (['SVT Play'].includes(movie.service) ||
        /swedish|norwegian|danish|finnish|nordic|scandinavian|sweden|norway|denmark|finland/.test(desc)) {
      clusters['nordic'].push(movie);
    }
    // Coming of age
    else if (/coming.of.age|teenager|adolescent|youth|growing.up|childhood|young|13|14|15|16|17|18.year/.test(desc) ||
             /childhood|child|kid|school|high.school/.test(desc)) {
      clusters['coming-of-age'].push(movie);
    }
    // Tension/thriller
    else if (/thriller|suspense|tension|survival|escape|chase|danger|terror|horror|claustrophobic|anxiety/.test(desc) ||
             movie.rating < 7.0 && /dark|intense|gripping/.test(desc)) {
      clusters['tension'].push(movie);
    }
    // Romance/love
    else if (/love|romance|romantic|relationship|affair|couple|heart|passion/.test(desc)) {
      clusters['love'].push(movie);
    }
    // Quiet/contemplative
    else if (/quiet|contemplative|meditation|melanchol|loneliness|solitude|grief|loss|memory/.test(desc)) {
      clusters['quiet'].push(movie);
    }
    // Poetry/artistic
    else if (/poetry|poetic|lyrical|beautiful|artistic|visual|stunning|masterpiece|cinema/.test(desc)) {
      clusters['poetry'].push(movie);
    }
    // Classics (pre-2000)
    else if (year < 2000) {
      clusters['classics'].push(movie);
    }
    // Intimate portraits (default for character studies)
    else {
      clusters['intimate-portraits'].push(movie);
    }
  }

  // Build categories with new creative names
  const categories: Category[] = [];

  for (const [themeId, clusterMovies] of Object.entries(clusters)) {
    if (clusterMovies.length === 0) continue;

    const theme = CATEGORY_THEMES.find(t => t.id === themeId)!;
    const newName = generateCategoryName(themeId);

    categories.push({
      id: themeId,
      name: newName,
      icon: theme.icon,
      movies: clusterMovies,
    });
  }

  // Sort categories by number of movies (descending)
  categories.sort((a, b) => b.movies.length - a.movies.length);

  return categories;
}

function generateMoviesFile(categories: Category[]): string {
  const TMDB_IMG = '${TMDB_IMG}';

  let content = `export interface Movie {
  id: string;
  title: string;
  year: number;
  runtime: string;
  rating: number;
  poster: string;
  backdrop: string;
  description: string;
  service: string;
  link: string;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  movies: Movie[];
}

// Using TMDB image URLs
const TMDB_IMG = "https://image.tmdb.org/t/p";

export const categories: Category[] = [
`;

  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i];
    content += `  {
    id: "${cat.id}",
    name: "${cat.name}",
    icon: "${cat.icon}",
    movies: [
`;

    for (let j = 0; j < cat.movies.length; j++) {
      const movie = cat.movies[j];
      const posterPath = movie.poster.replace('https://image.tmdb.org/t/p', TMDB_IMG);
      const backdropPath = movie.backdrop.replace('https://image.tmdb.org/t/p', TMDB_IMG);

      content += `      {
        id: "${movie.id}",
        title: "${movie.title.replace(/"/g, '\\"')}",
        year: ${movie.year},
        runtime: "${movie.runtime}",
        rating: ${movie.rating},
        poster: \`${posterPath}\`,
        backdrop: \`${backdropPath}\`,
        description: "${movie.description.replace(/"/g, '\\"')}",
        service: "${movie.service}",
        link: "${movie.link}"${movie.featured ? ',\n        featured: true' : ''}
      }${j < cat.movies.length - 1 ? ',' : ''}
`;
    }

    content += `    ]
  }${i < categories.length - 1 ? ',' : ''}
`;
  }

  content += `];

export const getFeaturedMovies = (): Movie[] => {
  const featured: Movie[] = [];
  categories.forEach(category => {
    category.movies.forEach(movie => {
      if (movie.featured) {
        featured.push(movie);
      }
    });
  });
  return featured;
};

export const getAllMovies = (): Movie[] => {
  const allMovies: Movie[] = [];
  categories.forEach(category => {
    category.movies.forEach(movie => {
      allMovies.push(movie);
    });
  });
  return allMovies;
};

export const searchMovies = (query: string): Movie[] => {
  const lowerQuery = query.toLowerCase();
  return getAllMovies().filter(movie =>
    movie.title.toLowerCase().includes(lowerQuery) ||
    movie.description.toLowerCase().includes(lowerQuery) ||
    movie.year.toString().includes(lowerQuery) ||
    movie.service.toLowerCase().includes(lowerQuery)
  );
};

export const getAllServices = (): string[] => {
  const services = new Set<string>();
  getAllMovies().forEach(movie => {
    services.add(movie.service);
  });
  return Array.from(services).sort();
};

export const filterByServices = (services: string[]): Category[] => {
  if (services.length === 0) return categories;

  return categories.map(category => ({
    ...category,
    movies: category.movies.filter(movie => services.includes(movie.service))
  })).filter(category => category.movies.length > 0);
};
`;

  return content;
}

async function main() {
  console.log('=== Perec Test Cinema Nightly Update ===\n');

  // Read current movies file
  const fileContent = fs.readFileSync(MOVIES_FILE, 'utf-8');
  const { categories } = parseMoviesFromFile(fileContent);

  // Get all movies
  const allMovies: Movie[] = categories.flatMap(c => c.movies);
  console.log(`Total movies: ${allMovies.length}`);

  // Step 1: Check links and remove broken ones
  console.log('\n--- Step 1: Checking Links ---');
  const linkResults = await checkAllLinks(allMovies);
  const brokenLinks = linkResults.filter(r => r.status === 'broken');

  if (brokenLinks.length > 0) {
    console.log(`\nFound ${brokenLinks.length} broken link(s):`);
    brokenLinks.forEach(r => {
      console.log(`  - ${r.movie.title} (${r.movie.service}): ${r.statusCode || 'timeout'}`);
    });
  } else {
    console.log('All links are working!');
  }

  // Filter out broken movies
  const workingMovies = allMovies.filter(
    movie => !brokenLinks.some(b => b.movie.id === movie.id)
  );

  // Step 2: Check for new content (placeholder - would need API integration)
  console.log('\n--- Step 2: Checking for New Content ---');
  console.log('(New content discovery requires TMDB/JustWatch API integration)');
  // TODO: Integrate with TMDB API and JustWatch to find new films
  // that match the Perec Test criteria (< 105 min, standalone, closed ending)

  // Step 3: Re-cluster movies with creative titles
  console.log('\n--- Step 3: Re-clustering Movies ---');
  const newCategories = clusterMovies(workingMovies);
  console.log('New category distribution:');
  newCategories.forEach(cat => {
    console.log(`  - ${cat.name}: ${cat.movies.length} films`);
  });

  // Generate new movies file
  const newContent = generateMoviesFile(newCategories);
  fs.writeFileSync(MOVIES_FILE, newContent);
  console.log('\nUpdated movies.ts');

  // Summary
  console.log('\n=== Summary ===');
  console.log(`Movies removed (broken links): ${brokenLinks.length}`);
  console.log(`Movies remaining: ${workingMovies.length}`);
  console.log(`Categories: ${newCategories.length}`);

  // Return exit code based on changes
  const hasChanges = brokenLinks.length > 0;
  process.exit(hasChanges ? 0 : 0); // Always exit 0, changes tracked via git
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
