'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean | null;
}

export default function MetricCard({ title, value, icon, trend, trendUp }: MetricCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-gray-500">{title}</span>
        <div className="rounded-lg bg-blue-50 p-2 text-blue-600">{icon}</div>
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-semibold text-gray-900">{value}</h3>
        {trend && (
          <div className="mt-2 flex items-center gap-1">
            {trendUp !== null && (
              <>
                {trendUp ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
              </>
            )}
            <span
              className={`text-sm ${
                trendUp === null
                  ? 'text-gray-500'
                  : trendUp
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {trend}
            </span>
          </div>
        )}
      </div>
    </div>
  );
} 