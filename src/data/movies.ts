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
    name: "Souls Unveiled",
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
        id: "coffee-and-cigarettes",
        title: "Coffee and Cigarettes",
        year: 2003,
        runtime: "95 min",
        rating: 7,
        poster: `${TMDB_IMG}/w500/pfG02QCsutx3PIxFS8UY4iM9AsS.jpg`,
        backdrop: `${TMDB_IMG}/w1280/pfG02QCsutx3PIxFS8UY4iM9AsS.jpg`,
        description: "A collection of eleven films from Jim Jarmusch, each featuring coffee and cigarettes as recurring motifs in conversations between strangers and friends.",
        service: "MUBI",
        link: "https://mubi.com/sv/films/coffee-and-cigarettes"
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
        id: "fallen-leaves",
        title: "Fallen Leaves",
        year: 2023,
        runtime: "82 min",
        rating: 7.3,
        poster: `${TMDB_IMG}/w500/9ayYOpeqHhxfHHUoyt3kXzznECO.jpg`,
        backdrop: `${TMDB_IMG}/w1280/9ayYOpeqHhxfHHUoyt3kXzznECO.jpg`,
        description: "Two lonely souls find each other in Helsinki",
        service: "MUBI",
        link: "https://mubi.com/sv/films/fallen-leaves-2023",
        featured: true
      },
      {
        id: "passages",
        title: "Passages",
        year: 2023,
        runtime: "91 min",
        rating: 6.6,
        poster: `${TMDB_IMG}/w500/8GR7s4YiyFswOmTibfKCYAPxT9k.jpg`,
        backdrop: `${TMDB_IMG}/w1280/8GR7s4YiyFswOmTibfKCYAPxT9k.jpg`,
        description: "A gay filmmaker",
        service: "MUBI",
        link: "https://mubi.com/sv/films/passages-2022"
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
        id: "beasts-of-the-southern-wild",
        title: "Beasts of the Southern Wild",
        year: 2012,
        runtime: "93 min",
        rating: 6.8,
        poster: `${TMDB_IMG}/w500/nQJmWekGYlXhezGUb21xFfEfwhH.jpg`,
        backdrop: `${TMDB_IMG}/w1280/7LWLPvyfLSb2oOlgWwAwUqA8uKo.jpg`,
        description: "Hushpuppy, an intrepid six-year-old girl, lives with her father, Wink, in ",
        service: "MUBI",
        link: "https://mubi.com/sv/films/beasts-of-the-southern-wild"
      }
    ]
  },
  {
    id: "coming-of-age",
    name: "First Steps",
    icon: "🌱",
    movies: [
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
        id: "moonrise-kingdom",
        title: "Moonrise Kingdom",
        year: 2012,
        runtime: "94 min",
        rating: 7.8,
        poster: `${TMDB_IMG}/w500/y4SXcbNl6CEF2t36icuzuBioj7K.jpg`,
        backdrop: `${TMDB_IMG}/w1280/y4SXcbNl6CEF2t36icuzuBioj7K.jpg`,
        description: "A pair of young lovers flee their New England town, which causes a local search party to fan out to find them. Wes Anderson",
        service: "Netflix",
        link: "https://www.netflix.com/se/title/70242565"
      },
      {
        id: "all-of-us-strangers",
        title: "All of Us Strangers",
        year: 2023,
        runtime: "105 min",
        rating: 7.6,
        poster: `${TMDB_IMG}/w500/aviJMFZSnnCAsCVyJGaPNx4Ef3i.jpg`,
        backdrop: `${TMDB_IMG}/w1280/aviJMFZSnnCAsCVyJGaPNx4Ef3i.jpg`,
        description: "A screenwriter revisits his childhood home and finds his long-dead parents waiting. Andrew Haigh",
        service: "MUBI",
        link: "https://mubi.com/sv/films/strangers-2022-andrew-haigh"
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
        id: "frances-ha",
        title: "Frances Ha",
        year: 2012,
        runtime: "86 min",
        rating: 7.4,
        poster: `${TMDB_IMG}/w500/jrq1NoKvsxWCcffVOjegiYwloFN.jpg`,
        backdrop: `${TMDB_IMG}/w1280/jrq1NoKvsxWCcffVOjegiYwloFN.jpg`,
        description: "A young dancer navigates friendship, ambition, and the gap between who she is and who she wants to be in New York. Noah Baumbach and Greta Gerwig",
        service: "MUBI",
        link: "https://mubi.com/sv/films/frances-ha"
      },
      {
        id: "close",
        title: "Close",
        year: 2022,
        runtime: "104 min",
        rating: 7.8,
        poster: `${TMDB_IMG}/w500/dlMNnWs7Mz8Nk5AC447Ew1tD5pn.jpg`,
        backdrop: `${TMDB_IMG}/w1280/dlMNnWs7Mz8Nk5AC447Ew1tD5pn.jpg`,
        description: "Two 13-year-old boys share an intense friendship until their classmates",
        service: "MUBI",
        link: "https://mubi.com/sv/films/close-2022"
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
        id: "shame",
        title: "Shame",
        year: 2011,
        runtime: "102 min",
        rating: 6.9,
        poster: `${TMDB_IMG}/w500/cAWLz9kFv4xc6IsEXTj2DrcqD55.jpg`,
        backdrop: `${TMDB_IMG}/w1280/AOSzhQfsXIqHPl9JgQvGkBPhYm.jpg`,
        description: "Brandon, a thirty-something man living in New York, eludes intimacy with women but feeds his deepest desires with a compulsive addiction to sex. When his younger sister temporarily moves into his apar...",
        service: "MUBI",
        link: "https://mubi.com/sv/films/shame"
      }
    ]
  },
  {
    id: "classics",
    name: "Cinema Heritage",
    icon: "🎬",
    movies: [
      {
        id: "cleo-from-5-to-7",
        title: "Cléo from 5 to 7",
        year: 1962,
        runtime: "90 min",
        rating: 7.9,
        poster: `${TMDB_IMG}/w500/oelBStY4xpguaplRv15P3Za7Xsr.jpg`,
        backdrop: `${TMDB_IMG}/w1280/oelBStY4xpguaplRv15P3Za7Xsr.jpg`,
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
        poster: `${TMDB_IMG}/w500/v2KsLNChpT6vLf0YFhkJmAtGkNq.jpg`,
        backdrop: `${TMDB_IMG}/w1280/v2KsLNChpT6vLf0YFhkJmAtGkNq.jpg`,
        description: "A nurse is put in charge of a mute actress and finds that their personae are melding together in Ingmar Bergman",
        service: "MUBI",
        link: "https://mubi.com/sv/films/persona"
      },
      {
        id: "beau-travail",
        title: "Beau Travail",
        year: 1999,
        runtime: "92 min",
        rating: 7.3,
        poster: `${TMDB_IMG}/w500/5ySa1aQaT7kMcAbKwlS1HXxp2hM.jpg`,
        backdrop: `${TMDB_IMG}/w1280/5ySa1aQaT7kMcAbKwlS1HXxp2hM.jpg`,
        description: "In the barren desert of Djibouti, a French Foreign Legion sergeant",
        service: "MUBI",
        link: "https://mubi.com/sv/films/beau-travail"
      },
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
        id: "perfect-blue",
        title: "Perfect Blue",
        year: 1998,
        runtime: "82 min",
        rating: 8.3,
        poster: `${TMDB_IMG}/w500/925SaqJIfRCeIt11BzvqPVVg263.jpg`,
        backdrop: `${TMDB_IMG}/w1280/mHG7dpLb0ZScSY3LpP443IHRmjy.jpg`,
        description: "Rising pop star Mima quits singing to pursue a career as an actress. After she takes up a role on a popular detective show, her handlers and collaborators begin turning up murdered. Harboring feelings...",
        service: "MUBI",
        link: "https://mubi.com/sv/films/perfect-blue"
      },
      {
        id: "three-colors-blue",
        title: "Three Colors: Blue",
        year: 1993,
        runtime: "98 min",
        rating: 7.6,
        poster: `${TMDB_IMG}/w500/33wsWxzsNstI8N7dvuwzFmj1qBd.jpg`,
        backdrop: `${TMDB_IMG}/w1280/nAyUVvcdOKHmukdgGHZ7xR5er1q.jpg`,
        description: "The wife of a famous composer survives a car accident that kills her husband and daughter. Now alone, she shakes off her old identity and explores her newfound freedom but finds that she is unbreakabl...",
        service: "MUBI",
        link: "https://mubi.com/sv/films/three-colors-blue"
      },
      {
        id: "three-colors-white",
        title: "Three Colors: White",
        year: 1994,
        runtime: "92 min",
        rating: 7.4,
        poster: `${TMDB_IMG}/w500/fdIet3NSa27gobMbaUml66oCQNT.jpg`,
        backdrop: `${TMDB_IMG}/w1280/yOpNvGSsT0YECuhhrlGBLIshh0u.jpg`,
        description: "Polish immigrant Karol Karol finds himself out of a marriage, a job and a country when his French wife, Dominique, divorces him after six months due to his impotence. Forced to leave France after losi...",
        service: "MUBI",
        link: "https://mubi.com/sv/films/three-colors-white"
      },
      {
        id: "three-colors-red",
        title: "Three Colors: Red",
        year: 1994,
        runtime: "100 min",
        rating: 7.9,
        poster: `${TMDB_IMG}/w500/JHmsBiX1tjCKqAul1lzC20WcAW.jpg`,
        backdrop: `${TMDB_IMG}/w1280/pZcoSJUb3Lgr9Rzg2shg1PtTBP9.jpg`,
        description: "Part-time model Valentine unexpectedly befriends a retired judge after she runs over his dog. At first, the grumpy man shows no concern about the dog, and Valentine decides to keep it. But the two for...",
        service: "MUBI",
        link: "https://mubi.com/sv/films/three-colors-red"
      },
      {
        id: "the-celebration",
        title: "The Celebration",
        year: 1998,
        runtime: "105 min",
        rating: 7.7,
        poster: `${TMDB_IMG}/w500/2LRzNq41yrY8EjCnD1S8sCCPvKk.jpg`,
        backdrop: `${TMDB_IMG}/w1280/7rkgM8yZ49LwYTcka5ETGRJAQ9M.jpg`,
        description: "The family of a wealthy businessman gather to celebrate his 60th birthday. During the course of the party, his eldest son presents a speech that reveals a devastating secret that turns the night into ...",
        service: "MUBI",
        link: "https://mubi.com/sv/films/the-celebration"
      }
    ]
  },
  {
    id: "nordic",
    name: "Tales from the North",
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
    name: "Fleeting Beauty",
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
    name: "Contemplative Cinema",
    icon: "🌙",
    movies: [
      {
        id: "sans-soleil",
        title: "Sans Soleil",
        year: 1983,
        runtime: "100 min",
        rating: 7.4,
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
