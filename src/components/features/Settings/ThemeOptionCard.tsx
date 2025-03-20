'use client';

import { Moon, Sun, Monitor } from 'lucide-react';

interface ThemeOptionCardProps {
  type: 'light' | 'dark' | 'system';
  isSelected: boolean;
  onClick: () => void;
}

export default function ThemeOptionCard({ type, isSelected, onClick }: ThemeOptionCardProps) {
  const getIcon = () => {
    switch (type) {
      case 'light':
        return <Sun className="h-6 w-6" />;
      case 'dark':
        return <Moon className="h-6 w-6" />;
      case 'system':
        return <Monitor className="h-6 w-6" />;
    }
  };

  const getLabel = () => {
    switch (type) {
      case 'light':
        return 'فاتح';
      case 'dark':
        return 'داكن';
      case 'system':
        return 'النظام';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`flex h-24 w-full flex-col items-center justify-center rounded-lg border-2 transition-all ${
        isSelected
          ? 'border-blue-500 bg-blue-50 text-blue-600 dark:border-blue-400 dark:bg-blue-950 dark:text-blue-400'
          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600'
      }`}
    >
      {getIcon()}
      <span className="mt-2 text-sm font-medium">{getLabel()}</span>
    </button>
  );
} 