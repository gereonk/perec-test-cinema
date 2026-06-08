export interface Movie {
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
  {
    id: "intimate-portraits",
    name: "Intimate Portraits",
    icon: "🎨",
    movies: [
      {
        id: "summer-1993",
        title: "Summer 1993",
        year: 2017,
        runtime: "96 min",
        rating: 7.4,
        poster: `${TMDB_IMG}/w500/krdSl7IpDb9c31CXrzA5yfP1oYM.jpg`,
        backdrop: `${TMDB_IMG}/w1280/krdSl7IpDb9c31CXrzA5yfP1oYM.jpg`,
        description: "After her mother",
        service: "MUBI",
        link: "https://mubi.com/sv/films/summer-1993"
      },
      {
        id: "petite-maman",
        title: "Petite Maman",
        year: 2021,
        runtime: "72 min",
        rating: 7.4,
        poster: `${TMDB_IMG}/w500/fxl2ARZO2vRfUGDfqSz2bostauE.jpg`,
        backdrop: `${TMDB_IMG}/w1280/fxl2ARZO2vRfUGDfqSz2bostauE.jpg`,
        description: "Eight-year-old Nelly has just lost her grandmother and meets a mysterious girl her own age in the woods. Céline Sciamma",
        service: "MUBI",
        link: "https://mubi.com/sv/films/petite-maman"
      },
      {
        id: "shiva-baby",
        title: "Shiva Baby",
        year: 2020,
        runtime: "77 min",
        rating: 7.1,
        poster: `${TMDB_IMG}/w500/4sdqVsT6SHqtbCYZS7bhVoEftlL.jpg`,
        backdrop: `${TMDB_IMG}/w1280/4sdqVsT6SHqtbCYZS7bhVoEftlL.jpg`,
        description: "A college student",
        service: "MUBI",
        link: "https://mubi.com/sv/films/shiva-baby"
      },
      {
        id: "in-the-mood-for-love",
        title: "In the Mood for Love",
        year: 2000,
        runtime: "98 min",
        rating: 8.1,
        poster: `${TMDB_IMG}/w500/m8jNwTP13ubYZyh5siVuyT9pZDp.jpg`,
        backdrop: `${TMDB_IMG}/w1280/m8jNwTP13ubYZyh5siVuyT9pZDp.jpg`,
        description: "Two neighbors form a strong bond after both suspect extramarital activities of their spouses. However, they agree to keep their bond platonic so as not to commit the same sins.",
        service: "MUBI",
        link: "https://mubi.com/sv/films/in-the-mood-for-love",
        featured: true
      },
      {
        id: "weekend",
        title: "Weekend",
        year: 2011,
        runtime: "97 min",
        rating: 7.6,
        poster: `${TMDB_IMG}/w500/ksg3QX2iMLzEkvS6AwIGh5A9CXT.jpg`,
        backdrop: `${TMDB_IMG}/w1280/ksg3QX2iMLzEkvS6AwIGh5A9CXT.jpg`,
        description: "After a drunken house party, Russell heads out to a gay club and picks up Glen. The next morning, Glen starts recording his one-night stands on tape.",
        service: "MUBI",
        link: "https://mubi.com/sv/films/weekend"
      },
      {
        id: "fantastic-mr-fox",
        title: "Fantastic Mr. Fox",
        year: 2009,
        runtime: "87 min",
        rating: 7.9,
        poster: `${TMDB_IMG}/w500/euZyZb6iGreujYKrGyZHRddhUYh.jpg`,
        backdrop: `${TMDB_IMG}/w1280/euZyZb6iGreujYKrGyZHRddhUYh.jpg`,
        description: "An urbane fox cannot resist returning to his farm raiding ways and must help his community survive the farmers",
        service: "Disney+",
        link: "https://www.disneyplus.com/sv-se/movies/fantastic-mr-fox/4cna09XI2gqn"
      },
      {
        id: "grand-budapest-hotel",
        title: "The Grand Budapest Hotel",
        year: 2014,
        runtime: "99 min",
        rating: 8.1,
        poster: `${TMDB_IMG}/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg`,
        backdrop: `${TMDB_IMG}/w1280/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg`,
        description: "The adventures of Gustave H, a legendary concierge at a famous European hotel, and Zero Moustafa, the lobby boy who becomes his most trusted friend.",
        service: "Disney+",
        link: "https://www.disneyplus.com/sv-se/movies/the-grand-budapest-hotel/1RW10E8yCYDB",
        featured: true
      },
      {
        id: "the-punisher-one-last-kill",
        title: "The Punisher: One Last Kill",
        year: 2026,
        runtime: "51 min",
        rating: 8.4,
        poster: `${TMDB_IMG}/w500/qQclTgLMDvGBuUBFGHRipxkEwWR.jpg`,
        backdrop: `${TMDB_IMG}/w1280/qO55CD8tgVL1T4WKn6zYFFiD6lL.jpg`,
        description: "As Frank Castle searches for meaning beyond revenge, an unexpected force pulls him back into the fight.",
        service: "Disney+",
        link: "https://www.disneyplus.com/sv-se/movies/the-punisher-one-last-kill"
      },
      {
        id: "swapped",
        title: "Swapped",
        year: 2026,
        runtime: "102 min",
        rating: 9,
        poster: `${TMDB_IMG}/w500/tHhxWxge06goXU6ZQH1hj7vK8Hd.jpg`,
        backdrop: `${TMDB_IMG}/w1280/zMwhWailP1WY7sb6AoE6b8ugoy.jpg`,
        description: "A small woodland creature and a majestic bird, two natural sworn enemies of the Valley, magically trade places and set off on an adventure of a lifetime to switch back. Their journey soon uncovers a g...",
        service: "Netflix",
        link: "https://www.netflix.com/se/title/1007757"
      },
      {
        id: "all-of-us-strangers",
        title: "All of Us Strangers",
        year: 2023,
        runtime: "105 min",
        rating: 7.4,
        poster: `${TMDB_IMG}/w500/aviJMFZSnnCAsCVyJGaPNx4Ef3i.jpg`,
        backdrop: `${TMDB_IMG}/w1280/8yjHiSuSEhzR916LcIecuQ8tETG.jpg`,
        description: "One night in his near-empty tower block in contemporary London, Adam has a chance encounter with a mysterious neighbor Harry, which punctures the rhythm of his everyday life.",
        service: "Disney+",
        link: "https://www.disneyplus.com/sv-se/movies/all-of-us-strangers"
      }
    ]
  },
  {
    id: "coming-of-age",
    name: "Adolescent Dreams",
    icon: "🌱",
    movies: [
      {
        id: "the-witch",
        title: "The Witch",
        year: 2015,
        runtime: "92 min",
        rating: 6.9,
        poster: `${TMDB_IMG}/w500/zap5hpFCWSvdWSuPGAQyjUv2wAC.jpg`,
        backdrop: `${TMDB_IMG}/w1280/zap5hpFCWSvdWSuPGAQyjUv2wAC.jpg`,
        description: "A family in 1630s New England is torn apart by the forces of witchcraft, black magic, and possession.",
        service: "Netflix",
        link: "https://www.netflix.com/se/title/80037280",
        featured: true
      },
      {
        id: "the-breakfast-club",
        title: "The Breakfast Club",
        year: 1985,
        runtime: "97 min",
        rating: 7.8,
        poster: `${TMDB_IMG}/w500/wM9ErA8UVdcce5P4oefQinN8VVV.jpg`,
        backdrop: `${TMDB_IMG}/w1280/wM9ErA8UVdcce5P4oefQinN8VVV.jpg`,
        description: "Five high school students meet in Saturday detention and discover how they have a lot more in common than they thought.",
        service: "Netflix",
        link: "https://www.netflix.com/se/title/60029171"
      },
      {
        id: "the-400-blows",
        title: "The 400 Blows",
        year: 1959,
        runtime: "99 min",
        rating: 8,
        poster: `${TMDB_IMG}/w500/12PuU23kkDLvTd0nb8hMlE3oShB.jpg`,
        backdrop: `${TMDB_IMG}/w1280/cy7ymUaMEWRoig7LWXpfzaaw2vv.jpg`,
        description: "For young Parisian boy Antoine Doinel, life is one difficult situation after another. Surrounded by inconsiderate adults, including his neglectful parents, Antoine spends his days with his best friend...",
        service: "MUBI",
        link: "https://mubi.com/sv/films/the-400-blows"
      },
      {
        id: "eraserhead",
        title: "Eraserhead",
        year: 1977,
        runtime: "89 min",
        rating: 7.3,
        poster: `${TMDB_IMG}/w500/mxveW3mGVc0DzLdOmtkZsgd7c3B.jpg`,
        backdrop: `${TMDB_IMG}/w1280/ApB0mF2d5Oqioi3yxjuogiotSLI.jpg`,
        description: "First-time father Henry Spencer tries to survive his industrial environment, his angry girlfriend, and the unbearable screams of his newly born mutant child.",
        service: "MUBI",
        link: "https://mubi.com/sv/films/eraserhead"
      },
      {
        id: "12-angry-men",
        title: "12 Angry Men",
        year: 1957,
        runtime: "97 min",
        rating: 8.6,
        poster: `${TMDB_IMG}/w500/zhG3vKWyDRaZYoaww1UVAi29T9h.jpg`,
        backdrop: `${TMDB_IMG}/w1280/w4bTBXcqXc2TUyS5Fc4h67uWbPn.jpg`,
        description: "The defense and the prosecution have rested and the jury is filing into the jury room to decide if a young Spanish-American is guilty or innocent of murdering his father. What begins as an open and sh...",
        service: "Prime Video",
        link: "https://www.primevideo.com/-/sv/detail/12-angry-men"
      },
      {
        id: "grave-of-the-fireflies",
        title: "Grave of the Fireflies",
        year: 1988,
        runtime: "89 min",
        rating: 8.4,
        poster: `${TMDB_IMG}/w500/k9tv1rXZbOhH7eiCk378x61kNQ1.jpg`,
        backdrop: `${TMDB_IMG}/w1280/aHaqZpOL7UyVu0nKqp3SMz0o2E1.jpg`,
        description: "In the final months of World War II, 14-year-old Seita and his sister Setsuko are orphaned when their mother is killed during an air raid in Kobe, Japan. After a falling out with their aunt, they move...",
        service: "Netflix",
        link: "https://www.netflix.com/se/title/12477"
      },
      {
        id: "paths-of-glory",
        title: "Paths of Glory",
        year: 1957,
        runtime: "88 min",
        rating: 8.3,
        poster: `${TMDB_IMG}/w500/p7OHwomA8UOhe3EhckF2IetBTh9.jpg`,
        backdrop: `${TMDB_IMG}/w1280/eTZkq5tI58Ec76AwPf1HOUoKtky.jpg`,
        description: "A commanding officer defends three scapegoats on trial for a failed offensive that occurred within the French Army in 1916.",
        service: "Prime Video",
        link: "https://www.primevideo.com/-/sv/detail/paths-of-glory"
      },
      {
        id: "the-double-life-of-v-ronique",
        title: "The Double Life of Véronique",
        year: 1991,
        runtime: "98 min",
        rating: 7.5,
        poster: `${TMDB_IMG}/w500/oqRyO9xrNBRaxqF9pCHHgLuaATx.jpg`,
        backdrop: `${TMDB_IMG}/w1280/vjsFyeCf5W5rxCFpS9MIAEZJkIG.jpg`,
        description: "Véronique is a beautiful young French woman who aspires to be a renowned singer; Weronika lives in Poland, has a similar career goal and looks identical to Véronique, though the two are not related. T...",
        service: "MUBI",
        link: "https://mubi.com/sv/films/the-double-life-of-v-ronique"
      }
    ]
  },
  {
    id: "classics",
    name: "Vintage Treasures",
    icon: "🎬",
    movies: [
      {
        id: "my-neighbor-totoro",
        title: "My Neighbor Totoro",
        year: 1988,
        runtime: "86 min",
        rating: 8.1,
        poster: `${TMDB_IMG}/w500/rtGDOeG9LzoerkDGZF9dnVeLppL.jpg`,
        backdrop: `${TMDB_IMG}/w1280/rtGDOeG9LzoerkDGZF9dnVeLppL.jpg`,
        description: "When two girls move to the country to be near their ailing mother, they have adventures with the wondrous forest spirits who live nearby.",
        service: "Netflix",
        link: "https://www.netflix.com/se/title/60032294",
        featured: true
      },
      {
        id: "the-celebration",
        title: "The Celebration",
        year: 1998,
        runtime: "101 min",
        rating: 7.7,
        poster: `${TMDB_IMG}/w500/2LRzNq41yrY8EjCnD1S8sCCPvKk.jpg`,
        backdrop: `${TMDB_IMG}/w1280/yCtgdv7TfgZLHj6R9IQKD5TjljP.jpg`,
        description: "The family of a wealthy businessman gather to celebrate his 60th birthday. During the course of the party, his eldest son presents a speech that reveals a devastating secret that turns the night into ...",
        service: "MUBI",
        link: "https://mubi.com/sv/films/the-celebration"
      },
      {
        id: "reservoir-dogs",
        title: "Reservoir Dogs",
        year: 1992,
        runtime: "99 min",
        rating: 8.1,
        poster: `${TMDB_IMG}/w500/xi8Iu6qyTfyZVDVy60raIOYJJmk.jpg`,
        backdrop: `${TMDB_IMG}/w1280/jwt159hXWA9Q5xpBo8hWb3zwLi7.jpg`,
        description: "A botched robbery indicates a police informant, and the pressure mounts in the aftermath at a warehouse. Crime begets violence as the survivors -- veteran Mr. White, newcomer Mr. Orange, psychopathic ...",
        service: "Prime Video",
        link: "https://www.primevideo.com/-/sv/detail/reservoir-dogs"
      }
    ]
  },
  {
    id: "nordic",
    name: "Nordic Noir",
    icon: "❄️",
    movies: [
      {
        id: "atertraffen",
        title: "Återträffen",
        year: 2013,
        runtime: "88 min",
        rating: 7,
        poster: `${TMDB_IMG}/w500/2m4ncyUtpBQbYZoSxwrR80Nkq6H.jpg`,
        backdrop: `${TMDB_IMG}/w1280/2m4ncyUtpBQbYZoSxwrR80Nkq6H.jpg`,
        description: "Artist Anna Odell recreates her high school reunion to confront the classmates who bullied her, blurring the lines between documentary and fiction in this Guldbagge-winning Swedish drama.",
        service: "SVT Play",
        link: "https://www.svtplay.se/video/egapGQv/atertraffen"
      },
      {
        id: "ata-sova-do",
        title: "Äta sova dö",
        year: 2012,
        runtime: "104 min",
        rating: 7.2,
        poster: `${TMDB_IMG}/w500/yrZkn6Y9ixan29jCGzorlJFR12Z.jpg`,
        backdrop: `${TMDB_IMG}/w1280/yrZkn6Y9ixan29jCGzorlJFR12Z.jpg`,
        description: "Raša, a young woman in small-town Sweden, loses her factory job and struggles to find new work while caring for her ailing father. A raw portrait of working-class resilience.",
        service: "SVT Play",
        link: "https://www.svtplay.se/video/eyB2y5j/ata-sova-do",
        featured: true
      }
    ]
  },
  {
    id: "poetry",
    name: "Time Suspended",
    icon: "✨",
    movies: [
      {
        id: "lady-bird",
        title: "Lady Bird",
        year: 2017,
        runtime: "94 min",
        rating: 7.4,
        poster: `${TMDB_IMG}/w500/gl66K7zRdtNYGrxyS2YDUP5ASZd.jpg`,
        backdrop: `${TMDB_IMG}/w1280/gl66K7zRdtNYGrxyS2YDUP5ASZd.jpg`,
        description: "In 2002, an artistically inclined seventeen-year-old girl comes of age in Sacramento, California.",
        service: "Netflix",
        link: "https://www.netflix.com/se/title/80205227",
        featured: true
      }
    ]
  },
  {
    id: "quiet",
    name: "The Sound of Silence",
    icon: "🌙",
    movies: [
      {
        id: "sans-soleil",
        title: "Sans Soleil",
        year: 1983,
        runtime: "100 min",
        rating: 7.5,
        poster: `${TMDB_IMG}/w500/sspJu9K03FZQP8A1cheurkiePD0.jpg`,
        backdrop: `${TMDB_IMG}/w1280/lns7roobSPQQTF54oSPzkT3qH1q.jpg`,
        description: "A woman narrates the thoughts of a world traveler, meditations on time and memory expressed in words and images from places as far-flung as Japan, Guinea-Bissau, Iceland, and San Francisco.",
        service: "MUBI",
        link: "https://mubi.com/sv/films/sans-soleil"
      }
    ]
  }
];

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
