'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Movie } from '@/data/movies';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      onClick={onClick}
      className="movie-card group cursor-pointer rounded-lg overflow-hidden bg-[#1a1a1a]"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-[#252525]">
        {/* Loading skeleton */}
        {isLoading && (
          <div className="absolute inset-0 bg-[#252525] animate-pulse" />
        )}

        {!hasError ? (
          <Image
            src={movie.poster}
            alt={movie.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
            className={`movie-poster-image object-cover transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#252525]">
            <span className="text-4xl">🎬</span>
          </div>
        )}

        <span className="absolute top-3 right-3 bg-black/80 px-2 py-1 rounded text-xs font-semibold z-10">
          {movie.runtime}
        </span>
        {/* TMDB Attribution */}
        <a
          href={`https://www.themoviedb.org/search?query=${encodeURIComponent(movie.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-3 left-3 bg-black/70 px-1.5 py-0.5 rounded text-[9px] text-[#888] hover:text-white transition-colors z-20 opacity-0 group-hover:opacity-100"
          title="Poster from TMDB"
        >
          TMDB
        </a>
        <div className="play-button absolute top-1/2 left-1/2 w-14 h-14 bg-[#e50914] rounded-full flex items-center justify-center z-10">
          <svg className="w-6 h-6 ml-1" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <div className="movie-overlay absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end p-4 z-10">
          <span className="inline-flex self-start bg-[#252525] px-2 py-1 rounded text-xs font-medium text-[#a0a0a0]">
            {movie.service}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold truncate mb-2">{movie.title}</h3>
        <div className="flex items-center gap-3 text-sm text-[#a0a0a0]">
          <span className="flex items-center gap-1 text-[#f5c518] font-semibold">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            {movie.rating}
          </span>
          <span className="text-[#666666]">{movie.year}</span>
        </div>
      </div>
    </div>
  );
}
