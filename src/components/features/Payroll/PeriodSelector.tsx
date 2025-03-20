'use client';

import { Calendar } from 'lucide-react';

interface PeriodSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const periods = [
  { value: '2024-03', label: 'مارس 2024' },
  { value: '2024-02', label: 'فبراير 2024' },
  { value: '2024-01', label: 'يناير 2024' },
];

export default function PeriodSelector({ value, onChange }: PeriodSelectorProps) {
  return (
    <div className="relative">
      <Calendar className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 pr-10 text-right text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      >
        {periods.map((period) => (
          <option key={period.value} value={period.value}>
            {period.label}
          </option>
        ))}
      </select>
    </div>
  );
} 