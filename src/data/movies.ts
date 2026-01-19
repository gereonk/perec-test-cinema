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
        id: "aftersun",
        title: "Aftersun",
        year: 2022,
        runtime: "101 min",
        rating: 7.7,
        poster: `${TMDB_IMG}/w500/evKz85EKouVbIr51zy5fOtpNRPg.jpg`,
        backdrop: `${TMDB_IMG}/w1280/evKz85EKouVbIr51zy5fOtpNRPg.jpg`,
        description: "Sophie reflects on the shared joy and private melancholy of a holiday she took with her father twenty years earlier. Memories real and imagined fill the gaps between as she tries to reconcile the father she knew with the man she didn't.",
        service: "MUBI",
        link: "https://mubi.com/sv/films/aftersun",
        featured: true
      },
      {
        id: "columbus",
        title: "Columbus",
        year: 2017,
        runtime: "104 min",
        rating: 7.2,
        poster: `${TMDB_IMG}/w500/6tk0xmn9k5HjUeXsnhxIa94sFXP.jpg`,
        backdrop: `${TMDB_IMG}/w1280/6tk0xmn9k5HjUeXsnhxIa94sFXP.jpg`,
        description: "A Korean-born man finds himself stuck in Columbus, Indiana, where his architect father is in a coma. The man meets a young woman who wants to stay in the city because of her mother and her love of architecture.",
        service: "MUBI",
        link: "https://mubi.com/sv/films/columbus"
      },
      {
        id: "cleo-from-5-to-7",
        title: "Cléo from 5 to 7",
        year: 1962,
        runtime: "90 min",
        rating: 7.9,
        poster: `${TMDB_IMG}/w500/lRTGLZG8RbIQjNKjYGeNAy35DI1.jpg`,
        backdrop: `${TMDB_IMG}/w1280/lRTGLZG8RbIQjNKjYGeNAy35DI1.jpg`,
        description: "A singer awaiting the results of a medical test wanders around Paris from 5 to 7 p.m. in this real-time portrait of a woman in crisis.",
        service: "MUBI",
        link: "https://mubi.com/sv/films/cleo-from-5-to-7"
      },
      {
        id: "persona",
        title: "Persona",
        year: 1966,
        runtime: "83 min",
        rating: 8.1,
        poster: `${TMDB_IMG}/w500/oFEexiDVN9bKfvrcYJQD7kf2dsn.jpg`,
        backdrop: `${TMDB_IMG}/w1280/oFEexiDVN9bKfvrcYJQD7kf2dsn.jpg`,
        description: "A nurse is put in charge of a mute actress and finds that their personae are melding together in Ingmar Bergman's psychological masterpiece.",
        service: "MUBI",
        link: "https://mubi.com/sv/films/persona"
      },
      {
        id: "summer-1993",
        title: "Summer 1993",
        year: 2017,
        runtime: "96 min",
        rating: 7.4,
        poster: `${TMDB_IMG}/w500/5NwMq13f1tiOWj8ONWCUu7gu9sP.jpg`,
        backdrop: `${TMDB_IMG}/w1280/5NwMq13f1tiOWj8ONWCUu7gu9sP.jpg`,
        description: "After her mother's death, six-year-old Frida is sent to live with her aunt and uncle in the Catalan countryside. A tender portrait of childhood grief and adaptation.",
        service: "MUBI",
        link: "https://mubi.com/sv/films/summer-1993"
      },
      {
        id: "atertraffen",
        title: "Återträffen",
        year: 2013,
        runtime: "88 min",
        rating: 7.0,
        poster: `${TMDB_IMG}/w500/v8AaCPTtDzL2k8V7zSqTnV1Xxqb.jpg`,
        backdrop: `${TMDB_IMG}/w1280/v8AaCPTtDzL2k8V7zSqTnV1Xxqb.jpg`,
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
        poster: `${TMDB_IMG}/w500/tGNmM3E6I3V8uKqB8LNOqc1qFWl.jpg`,
        backdrop: `${TMDB_IMG}/w1280/tGNmM3E6I3V8uKqB8LNOqc1qFWl.jpg`,
        description: "Raša, a young woman in small-town Sweden, loses her factory job and struggles to find new work while caring for her ailing father. A raw portrait of working-class resilience.",
        service: "SVT Play",
        link: "https://www.svtplay.se/video/eyB2y5j/ata-sova-do",
        featured: true
      }
    ]
  },
  {
    id: "tension",
    name: "Tension in Tight Spaces",
    icon: "💥",
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
        id: "cold-war",
        title: "Cold War",
        year: 2018,
        runtime: "89 min",
        rating: 7.5,
        poster: `${TMDB_IMG}/w500/3pyVSy8w1TrXiQs3iRPdqfRqMiZ.jpg`,
        backdrop: `${TMDB_IMG}/w1280/3pyVSy8w1TrXiQs3iRPdqfRqMiZ.jpg`,
        description: "A passionate love story between two people of different backgrounds and temperaments, who are fatefully mismatched and yet condemned to each other. Set against the backdrop of the Cold War in 1950s Poland, Berlin, Yugoslavia and Paris.",
        service: "MUBI",
        link: "https://mubi.com/sv/films/zimna-wojna"
      },
      {
        id: "beau-travail",
        title: "Beau Travail",
        year: 1999,
        runtime: "92 min",
        rating: 7.3,
        poster: `${TMDB_IMG}/w500/w0bJu13gq5YmQwW7P19bHp0tQr6.jpg`,
        backdrop: `${TMDB_IMG}/w1280/w0bJu13gq5YmQwW7P19bHp0tQr6.jpg`,
        description: "In the barren desert of Djibouti, a French Foreign Legion sergeant's obsession with a striking young recruit drives him toward self-destruction. Claire Denis's hypnotic masterpiece.",
        service: "MUBI",
        link: "https://mubi.com/sv/films/beau-travail"
      }
    ]
  },
  {
    id: "poetry",
    name: "The Poetry of Brevity",
    icon: "✨",
    movies: [
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
        id: "chungking-express",
        title: "Chungking Express",
        year: 1994,
        runtime: "102 min",
        rating: 8.0,
        poster: `${TMDB_IMG}/w500/43I9DcNoCzpyzK8JCkJYpHqHqGG.jpg`,
        backdrop: `${TMDB_IMG}/w1280/43I9DcNoCzpyzK8JCkJYpHqHqGG.jpg`,
        description: "Two lovelorn Hong Kong cops fall for two very different women in this romantic comedy drama.",
        service: "MUBI",
        link: "https://mubi.com/sv/films/chungking-express"
      },
      {
        id: "coffee-and-cigarettes",
        title: "Coffee and Cigarettes",
        year: 2003,
        runtime: "95 min",
        rating: 7.0,
        poster: `${TMDB_IMG}/w500/dATSPLmBQKxD0guxYkFPYeUhLov.jpg`,
        backdrop: `${TMDB_IMG}/w1280/dATSPLmBQKxD0guxYkFPYeUhLov.jpg`,
        description: "A collection of eleven films from Jim Jarmusch, each featuring coffee and cigarettes as recurring motifs in conversations between strangers and friends.",
        service: "MUBI",
        link: "https://mubi.com/sv/films/coffee-and-cigarettes"
      },
      {
        id: "moonrise-kingdom",
        title: "Moonrise Kingdom",
        year: 2012,
        runtime: "94 min",
        rating: 7.8,
        poster: `${TMDB_IMG}/w500/xKtbPflGVrBlyXuUI8W5ROmXYRb.jpg`,
        backdrop: `${TMDB_IMG}/w1280/xKtbPflGVrBlyXuUI8W5ROmXYRb.jpg`,
        description: "A pair of young lovers flee their New England town, which causes a local search party to fan out to find them. Wes Anderson's whimsical coming-of-age tale.",
        service: "Netflix",
        link: "https://www.netflix.com/se/title/70242565"
      }
    ]
  },
  {
    id: "quiet",
    name: "Quiet Revelations",
    icon: "🌙",
    movies: [
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
        id: "happy-together",
        title: "Happy Together",
        year: 1997,
        runtime: "96 min",
        rating: 7.7,
        poster: `${TMDB_IMG}/w500/kO4KjUkQOfWSBw06Bdl7m6AlEP7.jpg`,
        backdrop: `${TMDB_IMG}/w1280/kO4KjUkQOfWSBw06Bdl7m6AlEP7.jpg`,
        description: "A couple from Hong Kong takes a trip to Argentina but breaks up on their journey. On the way to the Iguazu Falls, they try to deal with their confusing relationship.",
        service: "MUBI",
        link: "https://mubi.com/sv/films/happy-together"
      }
    ]
  },
  {
    id: "coming-of-age",
    name: "Coming of Age, Contained",
    icon: "🌱",
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
        id: "fantastic-mr-fox",
        title: "Fantastic Mr. Fox",
        year: 2009,
        runtime: "87 min",
        rating: 7.9,
        poster: `${TMDB_IMG}/w500/xve4cgfYItnOhtzLYoTwTVy5FGr.jpg`,
        backdrop: `${TMDB_IMG}/w1280/xve4cgfYItnOhtzLYoTwTVy5FGr.jpg`,
        description: "An urbane fox cannot resist returning to his farm raiding ways and must help his community survive the farmers' retaliation. Wes Anderson's stop-motion adaptation of Roald Dahl.",
        service: "Disney+",
        link: "https://www.disneyplus.com/sv-se/movies/fantastic-mr-fox/4cna09XI2gqn"
      },
      {
        id: "grand-budapest-hotel",
        title: "The Grand Budapest Hotel",
        year: 2014,
        runtime: "99 min",
        rating: 8.1,
        poster: `${TMDB_IMG}/w500/nX5XotM9yprCKarRH4fzOq1VM1J.jpg`,
        backdrop: `${TMDB_IMG}/w1280/nX5XotM9yprCKarRH4fzOq1VM1J.jpg`,
        description: "The adventures of Gustave H, a legendary concierge at a famous European hotel, and Zero Moustafa, the lobby boy who becomes his most trusted friend.",
        service: "Disney+",
        link: "https://www.disneyplus.com/sv-se/movies/the-grand-budapest-hotel/1RW10E8yCYDB",
        featured: true
      }
    ]
  },
  {
    id: "classics",
    name: "Timeless Classics",
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
