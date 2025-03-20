'use client';

interface FilterTabsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { id: 'all', label: 'الكل' },
  { id: 'present', label: 'حاضر' },
  { id: 'absent', label: 'غائب' },
  { id: 'late', label: 'متأخر' },
  { id: 'leave', label: 'إجازة' },
];

export default function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-reverse space-x-8">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium ${
              activeFilter === filter.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </nav>
    </div>
  );
} 