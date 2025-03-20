'use client';

import { Users, Building2, UserCheck, Plane } from 'lucide-react';
import StatCard from './StatCard';

export default function StatisticsGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="إجمالي الموظفين"
        value={0}
        icon={Users}
        color="bg-[#1677FF]"
      />
      <StatCard
        title="إجمالي الأقسام"
        value={0}
        icon={Building2}
        color="bg-[#28A745]"
      />
      <StatCard
        title="الموظفين النشطين"
        value={0}
        icon={UserCheck}
        color="bg-[#9747FF]"
      />
      <StatCard
        title="في إجازة"
        value={0}
        icon={Plane}
        color="bg-[#FF7F50]"
      />
    </div>
  );
} 