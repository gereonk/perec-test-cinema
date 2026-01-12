'use client';

import { useState } from 'react';
import { Category, getAllServices, filterByServices } from '@/data/movies';
import ServiceFilter from './ServiceFilter';
import MovieGrid from './MovieGrid';

interface FilterableMoviesProps {
  initialCategories: Category[];
}

export default function FilterableMovies({ initialCategories }: FilterableMoviesProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const services = getAllServices();
  const filteredCategories = filterByServices(selectedServices);

  const toggleService = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const clearFilters = () => {
    setSelectedServices([]);
  };

  return (
    <div>
      <ServiceFilter
        services={services}
        selected={selectedServices}
        onToggle={toggleService}
        onClear={clearFilters}
      />

      {filteredCategories.length === 0 ? (
        <div className="text-center py-16 text-[#a0a0a0]">
          <p className="text-xl font-medium mb-2">No films found</p>
          <p>No films available on the selected services</p>
        </div>
      ) : (
        filteredCategories.map((category) => (
          <MovieGrid key={category.id} category={category} />
        ))
      )}
    </div>
  );
}
