'use client';

interface ServiceFilterProps {
  services: string[];
  selected: string[];
  onToggle: (service: string) => void;
  onClear: () => void;
}

export default function ServiceFilter({ services, selected, onToggle, onClear }: ServiceFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-8">
      <span className="text-sm text-[#666666] font-medium">Filter by:</span>
      <button
        onClick={onClear}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          selected.length === 0
            ? 'bg-[#e50914] text-white'
            : 'bg-[#252525] text-[#a0a0a0] hover:bg-[#333] hover:text-white'
        }`}
      >
        All Services
      </button>
      {services.map((service) => (
        <button
          key={service}
          onClick={() => onToggle(service)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selected.includes(service)
              ? 'bg-[#e50914] text-white'
              : 'bg-[#252525] text-[#a0a0a0] hover:bg-[#333] hover:text-white'
          }`}
        >
          {service}
        </button>
      ))}
      {selected.length > 1 && (
        <span className="text-sm text-[#666666] ml-2">
          ({selected.length} selected)
        </span>
      )}
    </div>
  );
}
