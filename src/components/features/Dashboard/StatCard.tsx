'use client';

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color?: string;
}

export default function StatCard({ title, value, icon: Icon, color = 'bg-blue-500' }: StatCardProps) {
  const formatter = new Intl.NumberFormat('ar-SA');

  return (
    <div className="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white" dir="ltr">
              {formatter.format(value)}
            </h2>
            <span className="text-base font-medium text-gray-500 dark:text-gray-400">ر.س</span>
          </div>
        </div>
        <div className={cn('rounded-lg p-2.5', color)}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      <div
        className={cn(
          'absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-10',
          color.replace('bg-', 'bg-opacity-50 ')
        )}
      />
    </div>
  );
} 