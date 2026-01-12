'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { searchMovies, Movie } from '@/data/movies';
import MovieModal from './MovieModal';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = searchMovies(query);
      setResults(filtered);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setShowResults(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setShowResults(false);
    setQuery('');
  };

  return (
    <>
      <div ref={containerRef} className="relative flex-1 max-w-md">
        <div className="relative flex items-center">
          <svg
            className="absolute left-3 w-4 h-4 text-[#666666] pointer-events-none"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length > 0 && setShowResults(true)}
            placeholder="Search films..."
            className="search-input w-full bg-white/10 border border-transparent rounded-full py-2 pl-10 pr-10 text-sm text-white placeholder-[#666666] focus:outline-none focus:border-[#e50914] focus:bg-white/15"
          />
          {query.length > 0 && (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="absolute right-3 p-1 text-[#666666] hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          )}
        </div>

        {showResults && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] rounded-xl shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto">
            {results.length === 0 ? (
              <div className="p-6 text-center text-[#a0a0a0]">
                <p className="font-medium">No films found</p>
                <p className="text-sm mt-1">Try a different search term</p>
              </div>
            ) : (
              <div className="py-2">
                <p className="px-4 py-2 text-xs text-[#666666] uppercase tracking-wide">
                  {results.length} result{results.length !== 1 ? 's' : ''}
                </p>
                {results.slice(0, 8).map((movie) => (
                  <button
                    key={movie.id}
                    onClick={() => handleMovieClick(movie)}
                    className="w-full px-4 py-3 flex items-center gap-4 hover:bg-[#252525] transition-colors text-left"
                  >
                    <div className="relative w-10 h-14 shrink-0 rounded overflow-hidden bg-[#252525]">
                      <Image
                        src={movie.poster}
                        alt={movie.title}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">{movie.title}</p>
                      <p className="text-sm text-[#a0a0a0]">
                        {movie.year} • {movie.runtime}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[#f5c518]">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                      <span className="text-sm font-medium">{movie.rating}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </>
  );
}
