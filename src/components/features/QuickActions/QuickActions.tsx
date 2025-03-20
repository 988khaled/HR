'use client';

import Link from 'next/link';
import { UserPlus, FolderPlus, Clock, FileSpreadsheet } from 'lucide-react';

const actions = [
  {
    href: '/record-attendance',
    label: 'تسجيل الحضور',
    icon: Clock,
    color: 'bg-blue-500 hover:bg-blue-600',
  },
  {
    href: '/add-department',
    label: 'إضافة قسم',
    icon: FolderPlus,
    color: 'bg-green-500 hover:bg-green-600',
  },
  {
    href: '/salaries',
    label: 'تحميل الرواتب',
    icon: FileSpreadsheet,
    color: 'bg-[#FF7F50] hover:bg-orange-600',
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">إجراءات سريعة</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.href}
              href={action.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-white transition-colors ${action.color}`}
            >
              <Icon className="h-5 w-5" />
              <span>{action.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
} 