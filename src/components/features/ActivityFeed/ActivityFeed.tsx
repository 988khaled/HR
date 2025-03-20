'use client';

import { Activity } from 'lucide-react';

const activities = [
  {
    id: 1,
    user: 'أحمد محمد',
    action: 'تسجيل حضور',
    time: '09:00 ص',
  },
  {
    id: 2,
    user: 'سارة أحمد',
    action: 'تسجيل انصراف',
    time: '05:00 م',
  },
  {
    id: 3,
    user: 'محمد علي',
    action: 'إضافة موظف جديد',
    time: '02:30 م',
  },
];

export default function ActivityFeed() {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Activity className="h-5 w-5 text-gray-500" />
        <h2 className="text-lg font-semibold">النشاطات الأخيرة</h2>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0"
          >
            <div>
              <p className="font-medium">{activity.user}</p>
              <p className="text-sm text-gray-500">{activity.action}</p>
            </div>
            <span className="text-sm text-gray-500">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 