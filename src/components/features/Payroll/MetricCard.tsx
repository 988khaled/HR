'use client';

import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  prefix?: string;
}

export default function MetricCard({ title, value, icon: Icon, color, prefix = '﷼' }: MetricCardProps) {
  const formattedValue = new Intl.NumberFormat('ar-SA').format(value);

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-lg ${color}`}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="text-left">
          <p className="text-sm text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold" dir="ltr">
            {prefix} {formattedValue}
          </p>
        </div>
      </div>
    </div>
  );
} 