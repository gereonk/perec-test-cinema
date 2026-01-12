import { categories, getFeaturedMovies } from '@/data/movies';
import Carousel from '@/components/Carousel';
import FilterableMovies from '@/components/FilterableMovies';

export default function Home() {
  const featuredMovies = getFeaturedMovies();

  return (
    <main>
      <Carousel movies={featuredMovies} />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <FilterableMovies initialCategories={categories} />
      </div>
    </main>
  );
}
