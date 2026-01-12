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
        id: "past-lives",
        title: "Past Lives",
        year: 2023,
        runtime: "105 min",
        rating: 7.8,
        poster: `${TMDB_IMG}/w500/k3waqVXSnvCZWfJYNtdamTgTtTA.jpg`,
        backdrop: `${TMDB_IMG}/w1280/k3waqVXSnvCZWfJYNtdamTgTtTA.jpg`,
        description: "Nora and Hae Sung, two deeply connected childhood friends, are wrest apart after Nora's family emigrates from South Korea. Twenty years later, they are reunited for one fateful week as they confront notions of love and destiny.",
        service: "Max",
        link: "https://www.max.com/se/sv/movies/past-lives",
        featured: true
      },
      {
        id: "the-farewell",
        title: "The Farewell",
        year: 2019,
        runtime: "100 min",
        rating: 7.5,
        poster: `${TMDB_IMG}/w500/7ht2IMGynDSVQGvAXhAb83DLET8.jpg`,
        backdrop: `${TMDB_IMG}/w1280/7ht2IMGynDSVQGvAXhAb83DLET8.jpg`,
        description: "A Chinese family discovers their grandmother has only a short while left to live and decide to keep her in the dark, scheduling a wedding to gather before she dies.",
        service: "Viaplay",
        link: "https://viaplay.se/filmer/the-farewell"
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
        id: "all-about-my-mother",
        title: "All About My Mother",
        year: 1999,
        runtime: "101 min",
        rating: 7.8,
        poster: `${TMDB_IMG}/w500/hjQhzhkGYXPNM96k0mOgob6HMmn.jpg`,
        backdrop: `${TMDB_IMG}/w1280/hjQhzhkGYXPNM96k0mOgob6HMmn.jpg`,
        description: "After her son's tragic death, Manuela travels from Madrid to Barcelona in search of the boy's father - a transgender woman named Lola.",
        service: "Max",
        link: "https://www.max.com/se/sv/movies/all-about-my-mother"
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
      }
    ]
  },
  {
    id: "tension",
    name: "Tension in Tight Spaces",
    icon: "💥",
    movies: [
      {
        id: "12-angry-men",
        title: "12 Angry Men",
        year: 1957,
        runtime: "96 min",
        rating: 9.0,
        poster: `${TMDB_IMG}/w500/ow3wq89wM8qd5X7hWKxiRfsFf9C.jpg`,
        backdrop: `${TMDB_IMG}/w1280/ow3wq89wM8qd5X7hWKxiRfsFf9C.jpg`,
        description: "The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence before jumping to a hasty verdict.",
        service: "Amazon Prime",
        link: "https://www.primevideo.com/detail/12-Angry-Men/",
        featured: true
      },
      {
        id: "green-room",
        title: "Green Room",
        year: 2015,
        runtime: "95 min",
        rating: 7.0,
        poster: `${TMDB_IMG}/w500/evZicaR7nXe4LiD9G6QYTorcJGO.jpg`,
        backdrop: `${TMDB_IMG}/w1280/evZicaR7nXe4LiD9G6QYTorcJGO.jpg`,
        description: "A punk rock band is forced to fight for survival after witnessing a murder at a neo-Nazi skinhead bar.",
        service: "Netflix",
        link: "https://www.netflix.com/se/title/80048540"
      },
      {
        id: "blue-ruin",
        title: "Blue Ruin",
        year: 2013,
        runtime: "90 min",
        rating: 7.1,
        poster: `${TMDB_IMG}/w500/q0itEsso2drJXqH9kfdidxIT5dF.jpg`,
        backdrop: `${TMDB_IMG}/w1280/q0itEsso2drJXqH9kfdidxIT5dF.jpg`,
        description: "A mysterious outsider's quiet life is turned upside down when he returns to his childhood home to carry out an act of vengeance.",
        service: "Netflix",
        link: "https://www.netflix.com/se/title/70267492"
      },
      {
        id: "reservoir-dogs",
        title: "Reservoir Dogs",
        year: 1992,
        runtime: "99 min",
        rating: 8.3,
        poster: `${TMDB_IMG}/w500/xi8Iu6qyTfyZVDVy60raIOYJJmk.jpg`,
        backdrop: `${TMDB_IMG}/w1280/xi8Iu6qyTfyZVDVy60raIOYJJmk.jpg`,
        description: "When a simple jewelry heist goes horribly wrong, the surviving criminals begin to suspect that one of them is a police informant.",
        service: "Viaplay",
        link: "https://viaplay.se/filmer/reservoir-dogs"
      },
      {
        id: "you-were-never-really-here",
        title: "You Were Never Really Here",
        year: 2017,
        runtime: "89 min",
        rating: 6.8,
        poster: `${TMDB_IMG}/w500/nx4lUyQNEzJowcF55VAP0TQEaX0.jpg`,
        backdrop: `${TMDB_IMG}/w1280/nx4lUyQNEzJowcF55VAP0TQEaX0.jpg`,
        description: "A traumatized veteran, unafraid of violence, tracks down missing girls for a living. When a job spins out of control, his nightmares overtake him.",
        service: "Amazon Prime",
        link: "https://www.primevideo.com/detail/You-Were-Never-Really-Here/"
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
        link: "https://www.netflix.com/se/title/80037280"
      }
    ]
  },
  {
    id: "poetry",
    name: "The Poetry of Brevity",
    icon: "✨",
    movies: [
      {
        id: "lost-in-translation",
        title: "Lost in Translation",
        year: 2003,
        runtime: "102 min",
        rating: 7.7,
        poster: `${TMDB_IMG}/w500/3jCLmYDIIiSMPujbwygNpqdpM8N.jpg`,
        backdrop: `${TMDB_IMG}/w1280/3jCLmYDIIiSMPujbwygNpqdpM8N.jpg`,
        description: "A faded movie star and a neglected young woman form an unlikely bond after crossing paths in Tokyo.",
        service: "Amazon Prime",
        link: "https://www.primevideo.com/detail/Lost-in-Translation/",
        featured: true
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
        link: "https://mubi.com/sv/films/in-the-mood-for-love"
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
        id: "a-ghost-story",
        title: "A Ghost Story",
        year: 2017,
        runtime: "92 min",
        rating: 6.8,
        poster: `${TMDB_IMG}/w500/rp5JPIyZi9sMob15l46zNQLe5cO.jpg`,
        backdrop: `${TMDB_IMG}/w1280/rp5JPIyZi9sMob15l46zNQLe5cO.jpg`,
        description: "In this singular exploration of legacy, love, loss, and the enormity of existence, a recently deceased, white-sheeted ghost returns to his suburban home to console his bereft wife.",
        service: "Amazon Prime",
        link: "https://www.primevideo.com/detail/A-Ghost-Story/"
      },
      {
        id: "frances-ha",
        title: "Frances Ha",
        year: 2012,
        runtime: "86 min",
        rating: 7.4,
        poster: `${TMDB_IMG}/w500/jrq1NoKvsxWCcffVOjegiYwloFN.jpg`,
        backdrop: `${TMDB_IMG}/w1280/jrq1NoKvsxWCcffVOjegiYwloFN.jpg`,
        description: "A New York woman apprentices for a dance company though she's not really a dancer and throws herself headlong into her dreams, even as their possible reality dwindles.",
        service: "Netflix",
        link: "https://www.netflix.com/se/title/70259326"
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
      }
    ]
  },
  {
    id: "quiet",
    name: "Quiet Revelations",
    icon: "🌙",
    movies: [
      {
        id: "never-rarely-sometimes-always",
        title: "Never Rarely Sometimes Always",
        year: 2020,
        runtime: "101 min",
        rating: 7.3,
        poster: `${TMDB_IMG}/w500/7yiSyQhhjTFphhfCUcn05tCQxyG.jpg`,
        backdrop: `${TMDB_IMG}/w1280/7yiSyQhhjTFphhfCUcn05tCQxyG.jpg`,
        description: "A pair of teenage girls in rural Pennsylvania travel to New York City to seek out medical help after an unintended pregnancy puts them in a difficult situation.",
        service: "Amazon Prime",
        link: "https://www.primevideo.com/detail/Never-Rarely-Sometimes-Always/"
      },
      {
        id: "the-rider",
        title: "The Rider",
        year: 2017,
        runtime: "104 min",
        rating: 7.4,
        poster: `${TMDB_IMG}/w500/cFsrA0Is5xode2INrPj1VJcQ18n.jpg`,
        backdrop: `${TMDB_IMG}/w1280/cFsrA0Is5xode2INrPj1VJcQ18n.jpg`,
        description: "After suffering a near fatal head injury, a young cowboy undertakes a search for new identity and what it means to be a man in the heartland of America.",
        service: "Disney+",
        link: "https://www.disneyplus.com/sv-se/movies/the-rider/"
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
      },
      {
        id: "ida",
        title: "Ida",
        year: 2013,
        runtime: "82 min",
        rating: 7.4,
        poster: `${TMDB_IMG}/w500/bJdLdz8VnOqsKPIKukGzKs2z1GC.jpg`,
        backdrop: `${TMDB_IMG}/w1280/bJdLdz8VnOqsKPIKukGzKs2z1GC.jpg`,
        description: "A young novitiate nun in 1960s Poland, about to take her vows, discovers a dark family secret dating back to the Nazi occupation.",
        service: "Amazon Prime",
        link: "https://www.primevideo.com/detail/Ida/"
      },
      {
        id: "tangerine",
        title: "Tangerine",
        year: 2015,
        runtime: "88 min",
        rating: 7.1,
        poster: `${TMDB_IMG}/w500/djWbMT3lLZgrl2dR8btSLSwg1qN.jpg`,
        backdrop: `${TMDB_IMG}/w1280/djWbMT3lLZgrl2dR8btSLSwg1qN.jpg`,
        description: "A working girl tears through Tinseltown on Christmas Eve searching for the pimp who broke her heart. Shot entirely on iPhone 5s.",
        service: "Netflix",
        link: "https://www.netflix.com/se/title/80046953"
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
        id: "eighth-grade",
        title: "Eighth Grade",
        year: 2018,
        runtime: "93 min",
        rating: 7.4,
        poster: `${TMDB_IMG}/w500/xTa9cLhGHfQ7084UvoPQ2bBXKqd.jpg`,
        backdrop: `${TMDB_IMG}/w1280/xTa9cLhGHfQ7084UvoPQ2bBXKqd.jpg`,
        description: "An introverted teenage girl tries to survive the last week of her disastrous eighth grade year before leaving to start high school.",
        service: "Amazon Prime",
        link: "https://www.primevideo.com/detail/Eighth-Grade/"
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
        id: "stand-by-me",
        title: "Stand By Me",
        year: 1986,
        runtime: "89 min",
        rating: 8.1,
        poster: `${TMDB_IMG}/w500/vz0w9BSehcqjDcJOjRaCk7fgJe7.jpg`,
        backdrop: `${TMDB_IMG}/w1280/vz0w9BSehcqjDcJOjRaCk7fgJe7.jpg`,
        description: "After the death of one of his friends, a writer recounts a boyhood journey with his friends to find the body of a missing boy.",
        service: "Netflix",
        link: "https://www.netflix.com/se/title/498034"
      },
      {
        id: "short-term-12",
        title: "Short Term 12",
        year: 2013,
        runtime: "96 min",
        rating: 8.0,
        poster: `${TMDB_IMG}/w500/qKnsyaJZLXfiL2JhIJEkpA8C3LU.jpg`,
        backdrop: `${TMDB_IMG}/w1280/qKnsyaJZLXfiL2JhIJEkpA8C3LU.jpg`,
        description: "A 20-something supervising staff member of a residential treatment facility navigates the troubled waters of that world alongside her co-worker and longtime boyfriend.",
        service: "Amazon Prime",
        link: "https://www.primevideo.com/detail/Short-Term-12/"
      },
      {
        id: "juno",
        title: "Juno",
        year: 2007,
        runtime: "96 min",
        rating: 7.4,
        poster: `${TMDB_IMG}/w500/jNIn2tVhpvFD6P9IojldI3mNYcn.jpg`,
        backdrop: `${TMDB_IMG}/w1280/jNIn2tVhpvFD6P9IojldI3mNYcn.jpg`,
        description: "Faced with an unplanned pregnancy, an offbeat young woman makes an unusual decision regarding the unborn child.",
        service: "Disney+",
        link: "https://www.disneyplus.com/sv-se/movies/juno/"
      }
    ]
  },
  {
    id: "classics",
    name: "Timeless Classics",
    icon: "🎬",
    movies: [
      {
        id: "bicycle-thieves",
        title: "Bicycle Thieves",
        year: 1948,
        runtime: "89 min",
        rating: 8.3,
        poster: `${TMDB_IMG}/w500/abmxGiCV04NQj4jngbSQTGLgiC1.jpg`,
        backdrop: `${TMDB_IMG}/w1280/abmxGiCV04NQj4jngbSQTGLgiC1.jpg`,
        description: "In post-war Italy, a working-class man's bicycle is stolen, endangering his job. He and his son set out to find it.",
        service: "MUBI",
        link: "https://mubi.com/sv/films/bicycle-thieves"
      },
      {
        id: "rashomon",
        title: "Rashomon",
        year: 1950,
        runtime: "88 min",
        rating: 8.2,
        poster: `${TMDB_IMG}/w500/vL7Xw04nFMHwnvXRFCmYYAzMUvY.jpg`,
        backdrop: `${TMDB_IMG}/w1280/vL7Xw04nFMHwnvXRFCmYYAzMUvY.jpg`,
        description: "The rape of a bride and the murder of her samurai husband are recalled from the perspectives of a bandit, the bride, the samurai's ghost and a woodcutter.",
        service: "Max",
        link: "https://www.max.com/se/sv/movies/rashomon"
      },
      {
        id: "high-noon",
        title: "High Noon",
        year: 1952,
        runtime: "85 min",
        rating: 7.9,
        poster: `${TMDB_IMG}/w500/qETSMQ4IXBSAS409Z9OL0ppXWTW.jpg`,
        backdrop: `${TMDB_IMG}/w1280/qETSMQ4IXBSAS409Z9OL0ppXWTW.jpg`,
        description: "A town marshal, despite the disagreements of his newlywed bride and the townspeople around him, must face a gang of deadly killers alone at high noon.",
        service: "Amazon Prime",
        link: "https://www.primevideo.com/detail/High-Noon/"
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
        id: "grave-of-the-fireflies",
        title: "Grave of the Fireflies",
        year: 1988,
        runtime: "89 min",
        rating: 8.5,
        poster: `${TMDB_IMG}/w500/k9tv1rXZbOhH7eiCk378x61kNQ1.jpg`,
        backdrop: `${TMDB_IMG}/w1280/k9tv1rXZbOhH7eiCk378x61kNQ1.jpg`,
        description: "A young boy and his little sister struggle to survive in Japan during World War II.",
        service: "Apple TV+",
        link: "https://tv.apple.com/se/movie/grave-of-the-fireflies/"
      },
      {
        id: "the-400-blows",
        title: "The 400 Blows",
        year: 1959,
        runtime: "99 min",
        rating: 8.1,
        poster: `${TMDB_IMG}/w500/12PuU23kkDLvTd0nb8hMlE3oShB.jpg`,
        backdrop: `${TMDB_IMG}/w1280/12PuU23kkDLvTd0nb8hMlE3oShB.jpg`,
        description: "A young boy, left without attention, delves into a life of petty crime.",
        service: "MUBI",
        link: "https://mubi.com/sv/films/the-400-blows"
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
