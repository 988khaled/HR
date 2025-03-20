'use client';

import { Clock } from 'lucide-react';

interface TimeInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function TimeInput({ id, label, value, onChange, error }: TimeInputProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <Clock className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="time"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none rounded-lg border ${
            error ? 'border-red-500' : 'border-gray-300'
          } bg-white py-2 pr-10 text-right text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
} 