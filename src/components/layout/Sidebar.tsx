'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Receipt,
  Building2,
  Settings,
  CreditCard,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
}

export default function Sidebar({ isOpen, isCollapsed }: SidebarProps) {
  const pathname = usePathname();

  const links = [
    {
      href: '/',
      label: 'لوحة التحكم',
      icon: LayoutDashboard,
    },
    {
      href: '/employees',
      label: 'الموظفين',
      icon: Users,
    },
    {
      href: '/payroll',
      label: 'الرواتب',
      icon: Receipt,
    },
    {
      href: '/departments',
      label: 'الأقسام',
      icon: Building2,
    },
    {
      href: '/deductions',
      label: 'الاستقطاعات',
      icon: CreditCard,
    },
    {
      href: '/settings',
      label: 'الإعدادات',
      icon: Settings,
    },
  ];

  return (
    <aside
      className={cn(
        'fixed right-0 top-0 z-40 h-screen w-64 transform bg-white transition-all duration-300 dark:bg-gray-800',
        isCollapsed ? 'w-20' : 'w-64',
        isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
      )}
    >
      <div className="flex h-full flex-col overflow-y-auto border-l border-gray-200 px-3 py-4 dark:border-gray-700">
        <Link
          href="/"
          className={cn(
            'mb-5 flex items-center justify-center rounded-lg bg-gray-100 p-2.5 dark:bg-gray-700',
            isCollapsed ? 'mx-auto w-12' : 'w-full'
          )}
        >
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            {isCollapsed ? 'P' : 'Payroll'}
          </span>
        </Link>

        <ul className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700',
                    isActive && 'bg-gray-100 dark:bg-gray-700',
                    isCollapsed ? 'justify-center' : 'gap-3'
                  )}
                >
                  <Icon className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                  {!isCollapsed && <span>{link.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
} 