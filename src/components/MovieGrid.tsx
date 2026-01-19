'use client';

import { useState, useRef } from 'react';
import { Category, Movie } from '@/data/movies';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';

interface MovieGridProps {
  category: Category;
}

export default function MovieGrid({ category }: MovieGridProps) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-3">
            <span className="text-2xl">{category.icon}</span>
            {category.name}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full bg-[#252525] hover:bg-[#333] transition-colors"
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full bg-[#252525] hover:bg-[#333] transition-colors"
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {category.movies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] snap-start">
              <MovieCard
                movie={movie}
                onClick={() => setSelectedMovie(movie)}
              />
            </div>
          ))}
        </div>
      </section>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </>
  );
}
