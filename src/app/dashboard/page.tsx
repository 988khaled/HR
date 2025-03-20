'use client';

import Link from 'next/link';
import { Users, Building2, UserCheck, Plane, Clock, UserPlus, Receipt } from 'lucide-react';
import StatCard from '@/components/features/Dashboard/StatCard';

const stats = [
  {
    title: 'إجمالي الموظفين',
    value: 150,
    icon: Users,
    color: 'bg-[#1677FF]',
  },
  {
    title: 'الموظفين النشطين',
    value: 120,
    icon: UserCheck,
    color: 'bg-[#28A745]',
  },
  {
    title: 'إجمالي الأقسام',
    value: 8,
    icon: Building2,
    color: 'bg-[#9747FF]',
  },
  {
    title: 'في إجازة',
    value: 5,
    icon: Plane,
    color: 'bg-[#FF7F50]',
  },
];

const activities = [
  {
    time: '09:00',
    label: 'تسجيل حضور',
    icon: Clock,
  },
  {
    time: '05:00',
    label: 'تسجيل انصراف',
    icon: Clock,
  },
  {
    time: '02:30',
    label: 'إضافة موظف جديد',
    icon: UserPlus,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">النشاطات الأخيرة</h2>
          </div>
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div
                  key={activity.time}
                  className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-gray-800">
                      <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.label}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400" dir="ltr">
                    {activity.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">الإجراءات السريعة</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <Link
              href="/employees"
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <UserPlus className="h-5 w-5" />
              إضافة موظف جديد
            </Link>
            <Link
              href="/departments"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#28A745] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
            >
              <Building2 className="h-5 w-5" />
              إضافة قسم
            </Link>
            <Link
              href="/payroll"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#FF7F50] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#FF6B3D] dark:bg-[#FF7F50] dark:hover:bg-[#FF6B3D]"
            >
              <Receipt className="h-5 w-5" />
              إنشاء مسير رواتب
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 