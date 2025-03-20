'use client';

import { Activity } from 'lucide-react';

interface StatusSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const statuses = [
  { value: 'present', label: 'حاضر' },
  { value: 'late', label: 'متأخر' },
  { value: 'absent', label: 'غائب' },
  { value: 'leave', label: 'إجازة' },
];

export default function StatusSelect({ value, onChange, error }: StatusSelectProps) {
  return (
    <div>
      <label htmlFor="status" className="mb-1 block text-sm font-medium text-gray-700">
        الحالة
      </label>
      <div className="relative">
        <Activity className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <select
          id="status"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none rounded-lg border ${
            error ? 'border-red-500' : 'border-gray-300'
          } bg-white py-2 pr-10 text-right text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
        >
          <option value="">اختر الحالة</option>
          {statuses.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
} 