'use client';

import { LucideIcon } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
}

export default function Select({
  label,
  error,
  icon: Icon,
  className = '',
  id,
  ...props
}: SelectProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        )}
        <select
          id={id}
          className={`w-full appearance-none rounded-lg border ${
            error
              ? 'border-red-500 dark:border-red-500'
              : 'border-gray-300 dark:border-gray-600'
          } bg-white py-2 ${
            Icon ? 'pr-10' : 'px-4'
          } text-right text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:text-white ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
} 