'use client';

import { useRef } from 'react';
import { Bell } from 'lucide-react';
import useClickOutside from '@/hooks/useClickOutside';

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
}

interface NotificationsDropdownProps {
  notifications: Notification[];
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationsDropdown({
  notifications,
  isOpen,
  onClose,
}: NotificationsDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, onClose);

  if (!isOpen) return null;

  return (
    <div ref={dropdownRef} className="absolute left-0 top-12 z-50 w-80 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">الإشعارات</h3>
        <button
          onClick={onClose}
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          تحديد الكل كمقروء
        </button>
      </div>
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            لا توجد إشعارات جديدة
          </p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`rounded-lg border ${
                notification.isRead
                  ? 'border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800'
                  : 'border-blue-50 bg-blue-50 dark:border-blue-900 dark:bg-blue-900'
              } p-3`}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {notification.title}
                </h4>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {notification.time}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {notification.description}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 