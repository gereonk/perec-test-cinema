'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Movie } from '@/data/movies';
import MovieModal from './MovieModal';

interface CarouselProps {
  movies: Movie[];
}

export default function Carousel({ movies }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  }, [movies.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  }, [movies.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  if (movies.length === 0) return null;

  const currentMovie = movies[currentIndex];

  return (
    <>
      <div className="carousel-container relative h-[70vh] min-h-[500px] max-h-[800px] bg-[#0a0a0a]">
        {/* Preload all carousel images */}
        {movies.map((movie, index) => (
          <div key={movie.id} className="hidden">
            <Image
              src={movie.backdrop}
              alt=""
              width={1}
              height={1}
              priority={index === 0}
            />
          </div>
        ))}

        {/* Background Image */}
        <div className="absolute inset-0">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={movie.backdrop}
                alt={movie.title}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
                onLoad={() => index === 0 && setIsLoading(false)}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-[#e50914] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-8 flex items-center">
          <div className="max-w-2xl pt-20">
            <div className="inline-flex items-center gap-2 bg-[#e50914]/20 border border-[#e50914] px-4 py-2 rounded-full text-sm font-medium text-[#e50914] mb-6">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              Featured Film
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              {currentMovie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-6 text-[#a0a0a0]">
              <span>{currentMovie.year}</span>
              <span className="w-1 h-1 bg-[#666666] rounded-full" />
              <span>{currentMovie.runtime}</span>
              <span className="w-1 h-1 bg-[#666666] rounded-full" />
              <span className="flex items-center gap-1 text-[#f5c518]">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                {currentMovie.rating}
              </span>
            </div>

            <p className="text-lg text-[#a0a0a0] mb-8 line-clamp-3">
              {currentMovie.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setSelectedMovie(currentMovie)}
                className="inline-flex items-center gap-3 bg-[#e50914] hover:bg-[#f40612] px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                More Info
              </button>
              <a
                href={currentMovie.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur px-8 py-4 rounded-full font-semibold text-lg transition-colors"
              >
                Watch on {currentMovie.service}
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-[#e50914] w-8'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </>
  );
}
