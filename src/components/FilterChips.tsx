import clsx from 'clsx';
import { SlidersHorizontal } from 'lucide-react';

interface FilterChipsProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  showFilterButton?: boolean;
}

export default function FilterChips({
  filters,
  activeFilter,
  onFilterChange,
  showFilterButton = false
}: FilterChipsProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-3 overflow-x-auto hide-scrollbar">
      {showFilterButton && (
        <button className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700">
          <SlidersHorizontal size={14} />
          <span>Filters</span>
        </button>
      )}
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={clsx(
            'flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors',
            activeFilter === filter
              ? 'bg-black text-white'
              : 'bg-white text-gray-600 border border-gray-200'
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
