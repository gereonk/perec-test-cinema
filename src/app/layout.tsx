import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Perec Test | Films That Know When to Stop",
  description: "Discover carefully selected films that pass the Perec Test — stories told with constraint, completed with intention, and finished in 105 minutes or less.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Header />
        {children}
        <Analytics />
        <footer className="bg-[#141414] py-12 px-4 sm:px-8 mt-16">
          <div className="max-w-7xl mx-auto text-center text-[#666666]">
            <p className="text-sm">
              Perec Test — Celebrating films that know when to stop.
            </p>
            <p className="text-xs mt-4">
              Film data sourced from IMDb and various streaming platforms. This is a curated collection, not a comprehensive database.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="text-xs">Film posters provided by</span>
              <a
                href="https://www.themoviedb.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center hover:opacity-80 transition-opacity"
              >
                <img
                  src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                  alt="TMDB"
                  className="h-4"
                />
              </a>
            </div>
            <p className="text-[10px] mt-2 text-[#555]">
              This product uses the TMDB API but is not endorsed or certified by TMDB.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
