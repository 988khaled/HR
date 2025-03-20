'use client';

import { useState } from 'react';
import { Bell, Menu } from 'lucide-react';
import ThemeToggle from '../shared/ThemeToggle';
import NotificationsDropdown from '../features/Notifications/NotificationsDropdown';

interface TopBarProps {
  children?: React.ReactNode;
  onMenuClick: () => void;
}

// Sample notifications data - in a real app, this would come from an API or state management
const sampleNotifications = [
  {
    id: 1,
    title: 'تسجيل حضور جديد',
    description: 'قام أحمد محمد بتسجيل الحضور الساعة 9:00 صباحاً',
    time: 'منذ 5 دقائق',
    isRead: false,
  },
  {
    id: 2,
    title: 'موظف جديد',
    description: 'تم إضافة موظف جديد إلى قسم تقنية المعلومات',
    time: 'منذ 30 دقيقة',
    isRead: false,
  },
  {
    id: 3,
    title: 'تحديث البيانات',
    description: 'تم تحديث بيانات الموظفين بنجاح',
    time: 'منذ ساعة',
    isRead: true,
  },
];

export default function TopBar({ children, onMenuClick }: TopBarProps) {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(sampleNotifications);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleNotificationsClose = () => {
    setIsNotificationsOpen(false);
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-gray-200"
            >
              <span className="sr-only">عرض الإشعارات</span>
              <Bell className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                  {unreadCount}
                </span>
              )}
            </button>
            <NotificationsDropdown
              notifications={notifications}
              isOpen={isNotificationsOpen}
              onClose={handleNotificationsClose}
            />
          </div>
          {children}
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:hover:bg-gray-700 dark:hover:text-gray-300 lg:hidden"
          onClick={onMenuClick}
        >
          <span className="sr-only">فتح القائمة</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
} 