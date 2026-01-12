'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Movie } from '@/data/movies';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div
      className="modal-backdrop fixed inset-0 z-[2000] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-content bg-[#141414] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-[#e50914] rounded-full flex items-center justify-center transition-colors"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>

        <div className="relative h-80 sm:h-96 bg-[#252525]">
          {isLoading && (
            <div className="absolute inset-0 bg-[#252525] animate-pulse" />
          )}
          <Image
            src={movie.backdrop}
            alt={movie.title}
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className={`object-cover transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setIsLoading(false)}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
        </div>

        <div className="p-6 sm:p-8 -mt-24 relative">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
            Passes the Perec Test
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{movie.title}</h2>

          <div className="flex flex-wrap items-center gap-4 mb-6 text-[#a0a0a0]">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
              </svg>
              <span>{movie.runtime}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
              </svg>
              <span>{movie.year}</span>
            </div>
            <div className="flex items-center gap-2 text-[#f5c518]">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              <span className="font-semibold">{movie.rating}</span>
              <span className="text-[#a0a0a0]">IMDb</span>
            </div>
          </div>

          <p className="text-lg text-[#a0a0a0] leading-relaxed mb-8">
            {movie.description}
          </p>

          <a
            href={movie.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#e50914] hover:bg-[#f40612] px-6 py-3 rounded-full font-semibold transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch on {movie.service}
          </a>
        </div>
      </div>
    </div>
  );
}
