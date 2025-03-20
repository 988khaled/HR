'use client';

import { useState, useEffect } from 'react';
import { Building2, Check } from 'lucide-react';
import SettingsNavigation from '@/components/features/Settings/SettingsNavigation';
import ThemeOptionCard from '@/components/features/Settings/ThemeOptionCard';
import { applyTheme } from '@/lib/theme';
import { toast } from 'sonner';

type Theme = 'light' | 'dark' | 'system';

interface CompanyInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  logo?: string;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'company' | 'appearance'>('appearance');
  const [theme, setTheme] = useState<Theme>('system');
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  // Load theme and company info from localStorage on mount
  useEffect(() => {
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'system';
    setTheme(savedTheme);
    applyTheme(savedTheme);

    const savedCompanyInfo = localStorage.getItem('companyInfo');
    if (savedCompanyInfo) {
      setCompanyInfo(JSON.parse(savedCompanyInfo));
    }

    // Watch for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  const handleCompanyInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('companyInfo', JSON.stringify(companyInfo));
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">الإعدادات</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">إدارة إعدادات التطبيق والمظهر</p>
      </div>

      <SettingsNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'appearance' && (
        <div className="dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">المظهر</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <ThemeOptionCard
              type="light"
              isSelected={theme === 'light'}
              onClick={() => handleThemeChange('light')}
            />
            <ThemeOptionCard
              type="dark"
              isSelected={theme === 'dark'}
              onClick={() => handleThemeChange('dark')}
            />
            <ThemeOptionCard
              type="system"
              isSelected={theme === 'system'}
              onClick={() => handleThemeChange('system')}
            />
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              اختر المظهر المفضل لديك. يمكنك اختيار المظهر الفاتح أو الداكن أو اتباع إعدادات النظام.
            </p>
            <button
              onClick={() => {
                applyTheme(theme);
                localStorage.setItem('theme', theme);
                toast.success('تم تطبيق المظهر بنجاح');
              }}
              className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
            >
              <Check className="h-4 w-4" />
              تطبيق المظهر
            </button>
          </div>
        </div>
      )}

      {activeTab === 'company' && (
        <div className="dark:bg-gray-900">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">معلومات الشركة</h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                تعديل المعلومات
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleCompanyInfoSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  اسم الشركة
                </label>
                <input
                  type="text"
                  id="name"
                  value={companyInfo.name}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-right dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  id="email"
                  value={companyInfo.email}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  dir="ltr"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={companyInfo.phone}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  dir="ltr"
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  العنوان
                </label>
                <textarea
                  id="address"
                  value={companyInfo.address}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-right dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                >
                  حفظ المعلومات
                </button>
              </div>
            </form>
          ) : (
            <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">اسم الشركة</span>
                    <p className="mt-1 text-gray-900 dark:text-white">{companyInfo.name || 'غير محدد'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">البريد الإلكتروني</span>
                    <p className="mt-1 text-gray-900 dark:text-white" dir="ltr">
                      {companyInfo.email || 'غير محدد'}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">رقم الهاتف</span>
                    <p className="mt-1 text-gray-900 dark:text-white" dir="ltr">
                      {companyInfo.phone || 'غير محدد'}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">العنوان</span>
                    <p className="mt-1 text-gray-900 dark:text-white">{companyInfo.address || 'غير محدد'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'general' && (
        <div className="dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">الإعدادات العامة</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">سيتم إضافة الإعدادات العامة هنا.</p>
        </div>
      )}
    </div>
  );
} 