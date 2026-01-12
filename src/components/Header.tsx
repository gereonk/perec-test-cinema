'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0a]/98 backdrop-blur-xl'
          : 'bg-gradient-to-b from-black/90 via-black/70 to-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-[#1a1a1a]">
            <Image
              src="/perec.svg"
              alt="Perec Test"
              width={40}
              height={40}
              priority
            />
          </div>
          <span className="text-xl font-bold hidden sm:block">
            Perec <span className="text-[#e50914]">Test</span>
          </span>
        </Link>

        <SearchBar />

        <ul className="hidden md:flex items-center gap-8">
          <li>
            <Link
              href="/"
              className="text-[#a0a0a0] hover:text-white transition-colors text-sm font-medium"
            >
              Browse
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-[#a0a0a0] hover:text-white transition-colors text-sm font-medium"
            >
              What is the Perec Test?
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
