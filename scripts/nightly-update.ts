import * as fs from 'fs';
import * as path from 'path';

const MOVIES_FILE = path.join(__dirname, '../src/data/movies.ts');
const MAX_RUNTIME_MINUTES = 105;
const MIN_RATING = 6.0; // Lowered from 6.5 for more discovery
const TMDB_API_KEY = process.env.TMDB_API_KEY || '';
const TMDB_BASE = 'https://api.themoviedb.org/3';
const TMDB_IMG_BASE = 'https://image.tmdb.org/t/p';

// Swedish streaming service URL patterns for verification
const STREAMING_SERVICES = {
  MUBI: {
    searchUrl: (title: string) => `https://mubi.com/sv/films/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    verifyUrl: (url: string) => url.includes('mubi.com'),
  },
  Netflix: {
    searchUrl: (title: string) => `https://www.netflix.com/se/title/`,
    verifyUrl: (url: string) => url.includes('netflix.com'),
  },
  'Prime Video': {
    searchUrl: (title: string) => `https://www.primevideo.com/-/sv/detail/`,
    verifyUrl: (url: string) => url.includes('primevideo.com'),
  },
};

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

interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  genre_ids?: number[];
}

interface TMDBSearchResult {
  results: TMDBMovie[];
  total_results: number;
}

interface TMDBWatchProviders {
  results?: {
    SE?: {
      flatrate?: Array<{ provider_name: string; provider_id: number }>;
    };
  };
}

// Curated list of critically acclaimed short films to check for availability
const FILMS_TO_CHECK = [
  // Original list
  { title: 'Stranger by the Lake', year: 2013 },
  { title: 'Victoria', year: 2015 },
  { title: 'Fish Tank', year: 2009 },
  { title: 'Certified Copy', year: 2010 },
  { title: 'In Bruges', year: 2008 },
  { title: 'The Favourite', year: 2018 },
  { title: 'Amour', year: 2012 },
  { title: 'Son of Saul', year: 2015 },
  { title: 'The White Ribbon', year: 2009 },
  { title: 'Holy Motors', year: 2012 },
  { title: 'Under the Skin', year: 2013 },
  { title: 'The Worst Person in the World', year: 2021 },
  { title: 'Drive My Car', year: 2021 },
  { title: 'Spencer', year: 2021 },
  { title: 'The Lighthouse', year: 2019 },
  { title: 'Midsommar', year: 2019 },
  { title: 'Hereditary', year: 2018 },
  { title: 'The Handmaiden', year: 2016 },
  { title: 'Carol', year: 2015 },
  { title: 'Inside Llewyn Davis', year: 2013 },
  { title: 'Before Midnight', year: 2013 },
  { title: 'Blue Is the Warmest Color', year: 2013 },
  { title: 'Spring Breakers', year: 2012 },
  { title: 'Beasts of the Southern Wild', year: 2012 },
  { title: 'The Artist', year: 2011 },
  { title: 'Melancholia', year: 2011 },
  { title: 'Black Swan', year: 2010 },
  { title: 'Blue Valentine', year: 2010 },
  { title: 'A Prophet', year: 2009 },
  { title: 'Hunger', year: 2008 },
  // Recent acclaimed films
  { title: 'Past Lives', year: 2023 },
  { title: 'The Zone of Interest', year: 2023 },
  { title: 'Anatomy of a Fall', year: 2023 },
  { title: 'Poor Things', year: 2023 },
  { title: 'Monster', year: 2023 },
  { title: 'The Holdovers', year: 2023 },
  { title: 'May December', year: 2023 },
  { title: 'All of Us Strangers', year: 2023 },
  { title: 'Aftersun', year: 2022 },
  { title: 'Tár', year: 2022 },
  { title: 'Decision to Leave', year: 2022 },
  { title: 'Triangle of Sadness', year: 2022 },
  { title: 'EO', year: 2022 },
  { title: 'Saint Omer', year: 2022 },
  { title: 'The Banshees of Inisherin', year: 2022 },
  // Classic short films
  { title: 'Rope', year: 1948 },
  { title: 'High Noon', year: 1952 },
  { title: 'Rashomon', year: 1950 },
  { title: 'Ikiru', year: 1952 },
  { title: 'Tokyo Story', year: 1953 },
  { title: 'The 400 Blows', year: 1959 },
  { title: 'Breathless', year: 1960 },
  { title: 'La Jetée', year: 1962 },
  { title: 'Au Hasard Balthazar', year: 1966 },
  { title: 'Persona', year: 1966 },
  { title: 'The Battle of Algiers', year: 1966 },
  { title: 'Le Samouraï', year: 1967 },
  { title: 'Night of the Living Dead', year: 1968 },
  { title: 'My Night at Mauds', year: 1969 },
  // 70s-80s gems
  { title: 'The Conversation', year: 1974 },
  { title: 'Jeanne Dielman', year: 1975 },
  { title: 'Eraserhead', year: 1977 },
  { title: 'Days of Heaven', year: 1978 },
  { title: 'The Elephant Man', year: 1980 },
  { title: 'My Dinner with Andre', year: 1981 },
  { title: 'Koyaanisqatsi', year: 1982 },
  { title: 'Sans Soleil', year: 1983 },
  { title: 'Paris, Texas', year: 1984 },
  { title: 'Stranger Than Paradise', year: 1984 },
  { title: 'Blue Velvet', year: 1986 },
  { title: 'Wings of Desire', year: 1987 },
  // 90s indie & international
  { title: 'My Own Private Idaho', year: 1991 },
  { title: 'The Double Life of Veronique', year: 1991 },
  { title: 'Reservoir Dogs', year: 1992 },
  { title: 'Three Colors: Blue', year: 1993 },
  { title: 'Three Colors: White', year: 1994 },
  { title: 'Three Colors: Red', year: 1994 },
  { title: 'Clerks', year: 1994 },
  { title: 'Chungking Express', year: 1994 },
  { title: 'Before Sunrise', year: 1995 },
  { title: 'Safe', year: 1995 },
  { title: 'Trainspotting', year: 1996 },
  { title: 'Happy Together', year: 1997 },
  { title: 'Taste of Cherry', year: 1997 },
  { title: 'The Ice Storm', year: 1997 },
  { title: 'Run Lola Run', year: 1998 },
  { title: 'Rushmore', year: 1998 },
  { title: 'The Celebration', year: 1998 },
  // 2000s
  { title: 'Requiem for a Dream', year: 2000 },
  { title: 'Amélie', year: 2001 },
  { title: 'Donnie Darko', year: 2001 },
  { title: 'Y Tu Mamá También', year: 2001 },
  { title: 'City of God', year: 2002 },
  { title: 'Talk to Her', year: 2002 },
  { title: 'Elephant', year: 2003 },
  { title: 'Lost in Translation', year: 2003 },
  { title: 'Spring, Summer, Fall, Winter... and Spring', year: 2003 },
  { title: 'Oldboy', year: 2003 },
  { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
  { title: '2046', year: 2004 },
  { title: 'A History of Violence', year: 2005 },
  { title: 'Cache', year: 2005 },
  { title: 'The Squid and the Whale', year: 2005 },
  { title: 'Half Nelson', year: 2006 },
  { title: 'Pan\'s Labyrinth', year: 2006 },
  { title: 'The Lives of Others', year: 2006 },
  { title: '4 Months, 3 Weeks and 2 Days', year: 2007 },
  { title: 'Persepolis', year: 2007 },
  { title: 'Let the Right One In', year: 2008 },
  { title: 'Waltz with Bashir', year: 2008 },
  { title: 'A Serious Man', year: 2009 },
  { title: 'The Secret in Their Eyes', year: 2009 },
  // 2010s acclaimed
  { title: 'A Separation', year: 2011 },
  { title: 'Drive', year: 2011 },
  { title: 'The Turin Horse', year: 2011 },
  { title: 'Shame', year: 2011 },
  { title: 'Moonrise Kingdom', year: 2012 },
  { title: 'The Master', year: 2012 },
  { title: 'Leviathan', year: 2012 },
  { title: 'Her', year: 2013 },
  { title: 'The Great Beauty', year: 2013 },
  { title: 'Ida', year: 2013 },
  { title: 'Whiplash', year: 2014 },
  { title: 'Mommy', year: 2014 },
  { title: 'Force Majeure', year: 2014 },
  { title: 'Ex Machina', year: 2014 },
  { title: 'The Duke of Burgundy', year: 2014 },
  { title: 'The Assassin', year: 2015 },
  { title: 'Room', year: 2015 },
  { title: 'Mustang', year: 2015 },
  { title: 'Tangerine', year: 2015 },
  { title: 'Embrace of the Serpent', year: 2015 },
  { title: 'Manchester by the Sea', year: 2016 },
  { title: 'Moonlight', year: 2016 },
  { title: 'Toni Erdmann', year: 2016 },
  { title: 'Elle', year: 2016 },
  { title: 'The Lobster', year: 2015 },
  { title: 'A Ghost Story', year: 2017 },
  { title: 'Call Me by Your Name', year: 2017 },
  { title: 'The Florida Project', year: 2017 },
  { title: 'Lady Bird', year: 2017 },
  { title: 'Phantom Thread', year: 2017 },
  { title: 'The Killing of a Sacred Deer', year: 2017 },
  { title: 'First Reformed', year: 2017 },
  { title: 'Burning', year: 2018 },
  { title: 'Cold War', year: 2018 },
  { title: 'Roma', year: 2018 },
  { title: 'Shoplifters', year: 2018 },
  { title: 'Portrait of a Lady on Fire', year: 2019 },
  { title: 'Parasite', year: 2019 },
  { title: 'Pain and Glory', year: 2019 },
  { title: 'Marriage Story', year: 2019 },
  { title: 'Bait', year: 2019 },
  // Recent gems
  { title: 'Minari', year: 2020 },
  { title: 'Never Rarely Sometimes Always', year: 2020 },
  { title: 'First Cow', year: 2019 },
  { title: 'Nomadland', year: 2020 },
  { title: 'Another Round', year: 2020 },
  { title: 'The Father', year: 2020 },
  { title: 'Promising Young Woman', year: 2020 },
  { title: 'Sound of Metal', year: 2019 },
  { title: 'Judas and the Black Messiah', year: 2021 },
  { title: 'The Power of the Dog', year: 2021 },
  { title: 'Licorice Pizza', year: 2021 },
  { title: 'C\'mon C\'mon', year: 2021 },
  { title: 'Memoria', year: 2021 },
  { title: 'Parallel Mothers', year: 2021 },
  { title: 'The Hand of God', year: 2021 },
];

// TMDB genre IDs for discovery
const DISCOVERY_GENRES = [
  { id: 18, name: 'Drama' },
  { id: 53, name: 'Thriller' },
  { id: 10749, name: 'Romance' },
  { id: 27, name: 'Horror' },
  { id: 16, name: 'Animation' },
  { id: 80, name: 'Crime' },
  { id: 9648, name: 'Mystery' },
  { id: 99, name: 'Documentary' },
  { id: 35, name: 'Comedy' },
  { id: 878, name: 'Science Fiction' },
  { id: 10752, name: 'War' },
  { id: 36, name: 'History' },
];

// Creative category names for clustering (expanded for daily variety)
const CATEGORY_THEMES = [
  { id: 'intimate-portraits', names: ['Intimate Portraits', 'Souls Unveiled', 'Inner Worlds', 'Personal Landscapes', 'Character Studies', 'Human Conditions', 'Lives Examined', 'Portraits in Motion'], icon: '🎨' },
  { id: 'tension', names: ['Tension in Tight Spaces', 'Edge of Your Seat', 'Pressure Cooker', 'Contained Chaos', 'Nerve-Wracking', 'Pulse Pounders', 'Gripping Tales', 'White Knuckle Cinema'], icon: '💥' },
  { id: 'poetry', names: ['The Poetry of Brevity', 'Moments Crystallized', 'Time Suspended', 'Fleeting Beauty', 'Visual Poetry', 'Cinematic Haiku', 'Ephemeral Art', 'Delicate Frames'], icon: '✨' },
  { id: 'quiet', names: ['Quiet Revelations', 'Whispered Truths', 'Still Waters', 'The Sound of Silence', 'Contemplative Cinema', 'Meditative Moments', 'Slow Burn', 'Gentle Observations'], icon: '🌙' },
  { id: 'coming-of-age', names: ['Coming of Age, Contained', 'Growing Pains', 'Youth in Focus', 'Becoming', 'Adolescent Dreams', 'First Steps', 'Young Hearts', 'Rites of Passage'], icon: '🌱' },
  { id: 'classics', names: ['Timeless Classics', 'Eternal Cinema', 'Masters of Brevity', 'Enduring Visions', 'Golden Age Gems', 'Vintage Treasures', 'Cinema Heritage', 'Ageless Stories'], icon: '🎬' },
  { id: 'nordic', names: ['Nordic Perspectives', 'Scandinavian Visions', 'Northern Lights', 'Baltic Shores', 'Frozen Tales', 'Midnight Sun Cinema', 'Nordic Noir', 'Tales from the North'], icon: '❄️' },
  { id: 'love', names: ['Love in Brief', 'Hearts Entwined', 'Romantic Encounters', 'Affairs of the Heart', 'Tender Moments', 'Love Stories', 'Passion Plays', 'Amorous Tales'], icon: '💕' },
];

// TMDB API functions
async function searchTMDB(title: string, year: number): Promise<TMDBMovie | null> {
  if (!TMDB_API_KEY) return null;

  try {
    const url = `${TMDB_BASE}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&year=${year}`;
    const response = await fetch(url);
    if (!response.ok) return null;

    const data: TMDBSearchResult = await response.json();
    return data.results[0] || null;
  } catch {
    return null;
  }
}

async function getTMDBMovieDetails(movieId: number): Promise<TMDBMovie | null> {
  if (!TMDB_API_KEY) return null;

  try {
    const url = `${TMDB_BASE}/movie/${movieId}?api_key=${TMDB_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) return null;

    return await response.json();
  } catch {
    return null;
  }
}

async function getSwedishStreamingProviders(movieId: number): Promise<string[]> {
  if (!TMDB_API_KEY) return [];

  try {
    const url = `${TMDB_BASE}/movie/${movieId}/watch/providers?api_key=${TMDB_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) return [];

    const data: TMDBWatchProviders = await response.json();
    const seProviders = data.results?.SE?.flatrate || [];
    return seProviders.map(p => p.provider_name);
  } catch {
    return [];
  }
}

// Dynamic film discovery from TMDB trending and genres
interface FilmCandidate {
  title: string;
  year: number;
  tmdbId: number;
}

async function discoverTrendingFilms(): Promise<FilmCandidate[]> {
  if (!TMDB_API_KEY) return [];

  const candidates: FilmCandidate[] = [];

  try {
    // Get trending movies this week
    const trendingUrl = `${TMDB_BASE}/trending/movie/week?api_key=${TMDB_API_KEY}`;
    const trendingResponse = await fetch(trendingUrl);
    if (trendingResponse.ok) {
      const data: TMDBSearchResult = await trendingResponse.json();
      for (const movie of data.results.slice(0, 20)) {
        const details = await getTMDBMovieDetails(movie.id);
        if (details && details.runtime && details.runtime <= MAX_RUNTIME_MINUTES && details.vote_average >= MIN_RATING) {
          candidates.push({
            title: details.title,
            year: parseInt(details.release_date?.slice(0, 4) || '0'),
            tmdbId: movie.id,
          });
        }
        await new Promise(r => setTimeout(r, 100)); // Rate limiting
      }
    }

    // Get popular movies
    const popularUrl = `${TMDB_BASE}/movie/popular?api_key=${TMDB_API_KEY}`;
    const popularResponse = await fetch(popularUrl);
    if (popularResponse.ok) {
      const data: TMDBSearchResult = await popularResponse.json();
      for (const movie of data.results.slice(0, 20)) {
        const details = await getTMDBMovieDetails(movie.id);
        if (details && details.runtime && details.runtime <= MAX_RUNTIME_MINUTES && details.vote_average >= MIN_RATING) {
          if (!candidates.some(c => c.tmdbId === movie.id)) {
            candidates.push({
              title: details.title,
              year: parseInt(details.release_date?.slice(0, 4) || '0'),
              tmdbId: movie.id,
            });
          }
        }
        await new Promise(r => setTimeout(r, 100)); // Rate limiting
      }
    }
  } catch (error) {
    console.log('Error fetching trending/popular films:', error);
  }

  return candidates;
}

async function discoverByGenre(): Promise<FilmCandidate[]> {
  if (!TMDB_API_KEY) return [];

  const candidates: FilmCandidate[] = [];

  for (const genre of DISCOVERY_GENRES) {
    try {
      const url = `${TMDB_BASE}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genre.id}&with_runtime.lte=${MAX_RUNTIME_MINUTES}&vote_average.gte=${MIN_RATING}&vote_count.gte=50&sort_by=vote_average.desc`;
      const response = await fetch(url);
      if (!response.ok) continue;

      const data: TMDBSearchResult = await response.json();
      for (const movie of data.results.slice(0, 10)) {
        if (!candidates.some(c => c.tmdbId === movie.id)) {
          candidates.push({
            title: movie.title,
            year: parseInt(movie.release_date?.slice(0, 4) || '0'),
            tmdbId: movie.id,
          });
        }
      }

      await new Promise(r => setTimeout(r, 200)); // Rate limiting between genres
    } catch (error) {
      console.log(`Error fetching ${genre.name} films:`, error);
    }
  }

  return candidates;
}

async function discoverFilmCandidates(): Promise<FilmCandidate[]> {
  console.log('Discovering films from TMDB...');

  const [trending, byGenre] = await Promise.all([
    discoverTrendingFilms(),
    discoverByGenre(),
  ]);

  // Merge and deduplicate
  const allCandidates = [...trending];
  for (const candidate of byGenre) {
    if (!allCandidates.some(c => c.tmdbId === candidate.tmdbId)) {
      allCandidates.push(candidate);
    }
  }

  // Also add curated films
  for (const film of FILMS_TO_CHECK) {
    if (!allCandidates.some(c => c.title.toLowerCase() === film.title.toLowerCase())) {
      allCandidates.push({ title: film.title, year: film.year, tmdbId: 0 });
    }
  }

  console.log(`  Found ${trending.length} trending/popular candidates`);
  console.log(`  Found ${byGenre.length} genre-based candidates`);
  console.log(`  Total unique candidates: ${allCandidates.length}`);

  return allCandidates;
}

function mapProviderToService(provider: string): string | null {
  const mapping: { [key: string]: string } = {
    'MUBI': 'MUBI',
    'Netflix': 'Netflix',
    'Amazon Prime Video': 'Prime Video',
    'Disney Plus': 'Disney+',
    'SVT Play': 'SVT Play',
    'HBO Max': 'HBO Max',
    'Viaplay': 'Viaplay',
  };

  for (const [key, value] of Object.entries(mapping)) {
    if (provider.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }
  return null;
}

function generateStreamingLink(service: string, title: string, tmdbId: number): string {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

  switch (service) {
    case 'MUBI':
      return `https://mubi.com/sv/films/${slug}`;
    case 'Netflix':
      return `https://www.netflix.com/se/title/${tmdbId}`;
    case 'Prime Video':
      return `https://www.primevideo.com/-/sv/detail/${slug}`;
    case 'Disney+':
      return `https://www.disneyplus.com/sv-se/movies/${slug}`;
    default:
      return '';
  }
}

async function discoverNewMovies(existingMovies: Movie[], candidates: FilmCandidate[]): Promise<Movie[]> {
  if (!TMDB_API_KEY) {
    console.log('TMDB_API_KEY not set - skipping content discovery');
    return [];
  }

  const existingTitles = new Set(existingMovies.map(m => m.title.toLowerCase()));
  const newMovies: Movie[] = [];

  console.log(`Checking ${candidates.length} potential films for Swedish streaming...`);

  for (const film of candidates) {
    // Skip if already in catalog
    if (existingTitles.has(film.title.toLowerCase())) {
      continue;
    }

    // Get TMDB ID if we don't have it (for curated films)
    let tmdbId = film.tmdbId;
    if (!tmdbId) {
      const searchResult = await searchTMDB(film.title, film.year);
      if (!searchResult) continue;
      tmdbId = searchResult.id;
    }

    // Get full details including runtime
    const details = await getTMDBMovieDetails(tmdbId);
    if (!details || !details.runtime) continue;

    // Check runtime constraint
    if (details.runtime > MAX_RUNTIME_MINUTES) {
      continue;
    }

    // Check Swedish streaming availability
    const providers = await getSwedishStreamingProviders(tmdbId);
    if (providers.length === 0) continue;

    // Find a supported streaming service
    let service: string | null = null;
    for (const provider of providers) {
      service = mapProviderToService(provider);
      if (service) break;
    }
    if (!service) continue;

    // Generate link and create movie entry
    // Trust TMDB streaming data - don't verify links for new discoveries
    // (MUBI and others may use different URL slugs than we generate)
    const link = generateStreamingLink(service, details.title, tmdbId);
    if (!link) continue;

    const newMovie: Movie = {
      id: details.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: details.title,
      year: parseInt(details.release_date?.slice(0, 4) || String(film.year)),
      runtime: `${details.runtime} min`,
      rating: Math.round(details.vote_average * 10) / 10,
      poster: details.poster_path ? `${TMDB_IMG_BASE}/w500${details.poster_path}` : '',
      backdrop: details.backdrop_path ? `${TMDB_IMG_BASE}/w1280${details.backdrop_path}` : '',
      description: details.overview?.slice(0, 200) + (details.overview?.length > 200 ? '...' : '') || '',
      service,
      link,
    };

    if (newMovie.poster && newMovie.description) {
      newMovies.push(newMovie);
      console.log(`  + Found: ${newMovie.title} (${newMovie.runtime}) on ${service}`);
    }

    // Rate limiting
    await new Promise(r => setTimeout(r, 300));
  }

  return newMovies;
}

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

  // Use date-based seed for deterministic but daily-changing names
  const today = new Date();
  const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const themeIndex = CATEGORY_THEMES.findIndex(t => t.id === themeId);
  const nameIndex = (dateSeed + themeIndex) % theme.names.length;

  return theme.names[nameIndex];
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
  let allMovies: Movie[] = categories.flatMap(c => c.movies);
  console.log(`Current catalog: ${allMovies.length} movies`);

  // Step 0: Discover film candidates from TMDB (trending + genres)
  console.log('\n--- Step 0: Discovering Film Candidates ---');
  const candidates = await discoverFilmCandidates();

  // Step 1: Check candidates for Swedish streaming availability
  console.log('\n--- Step 1: Checking Swedish Streaming Availability ---');
  const newMovies = await discoverNewMovies(allMovies, candidates);
  if (newMovies.length > 0) {
    console.log(`\nFound ${newMovies.length} new qualifying film(s)!`);
    allMovies = [...allMovies, ...newMovies];
  } else {
    console.log('No new films found matching criteria');
  }

  // Step 2: Check links and remove broken ones
  console.log('\n--- Step 2: Validating Links ---');
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
  console.log(`New movies added: ${newMovies.length}`);
  console.log(`Movies removed (broken links): ${brokenLinks.length}`);
  console.log(`Total movies: ${workingMovies.length}`);
  console.log(`Categories: ${newCategories.length}`);

  // Return exit code based on changes
  process.exit(0);
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
