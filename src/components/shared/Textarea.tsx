'use client';

import { LucideIcon } from 'lucide-react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
}

export default function Textarea({
  label,
  error,
  icon: Icon,
  className = '',
  id,
  ...props
}: TextareaProps) {
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
          <Icon className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-500" />
        )}
        <textarea
          id={id}
          className={`w-full rounded-lg border ${
            error
              ? 'border-red-500 dark:border-red-500'
              : 'border-gray-300 dark:border-gray-600'
          } bg-white py-2 ${
            Icon ? 'pr-10' : 'px-4'
          } text-right text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
} 