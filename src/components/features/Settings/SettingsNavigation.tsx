'use client';

import { Settings, Building2, Palette } from 'lucide-react';

interface SettingsNavigationProps {
  activeTab: 'general' | 'company' | 'appearance';
  onTabChange: (tab: 'general' | 'company' | 'appearance') => void;
}

export default function SettingsNavigation({ activeTab, onTabChange }: SettingsNavigationProps) {
  const tabs = [
    {
      id: 'general',
      label: 'عام',
      icon: Settings,
    },
    {
      id: 'company',
      label: 'الشركة',
      icon: Building2,
    },
    {
      id: 'appearance',
      label: 'المظهر',
      icon: Palette,
    },
  ] as const;

  return (
    <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300'
              }`}
            >
              <Icon
                className={`-mr-0.5 h-5 w-5 ${
                  activeTab === tab.id 
                    ? 'text-blue-500 dark:text-blue-400' 
                    : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400'
                }`}
              />
              <span className="mr-2">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
} 