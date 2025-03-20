'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, User, ChevronRight, ChevronLeft } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import { createClient_browser } from '@/lib/supabase';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();
  const { user, loading } = useAuth();
  const supabase = createClient_browser();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">جاري التحميل...</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">يرجى الانتظار قليلاً</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth/signin');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar isOpen={isSidebarOpen} isCollapsed={isSidebarCollapsed} />

      {/* Collapse button */}
      <button
        onClick={toggleSidebarCollapse}
        className="fixed right-64 top-1/2 z-50 -translate-y-1/2 rounded-l-lg bg-white p-1.5 text-gray-500 shadow-md transition-all duration-300 hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 lg:right-64"
        style={{
          right: isSidebarCollapsed ? '80px' : '256px',
        }}
      >
        {isSidebarCollapsed ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>

      {/* Main content area - adjusted with right margin to account for sidebar */}
      <div 
        className={`flex flex-1 flex-col transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:mr-20' : 'lg:mr-64'
        }`}
      >
        <TopBar onMenuClick={toggleSidebar}>
          <div className="relative ml-3">
            <button
              onClick={toggleUserMenu}
              className="flex items-center gap-2 rounded-full bg-white p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-800"
            >
              <span className="sr-only">فتح قائمة المستخدم</span>
              <User className="h-8 w-8 rounded-full bg-gray-100 p-1 text-gray-600 dark:bg-gray-700 dark:text-gray-200" />
              {user?.email && (
                <span className="hidden text-gray-700 dark:text-gray-200 md:inline-block">
                  {user.email.length > 20 ? `${user.email.substring(0, 20)}...` : user.email}
                </span>
              )}
            </button>

            {isUserMenuOpen && (
              <div className="absolute left-0 mt-2 w-48 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  <LogOut className="h-4 w-4" />
                  تسجيل الخروج
                </button>
              </div>
            )}
          </div>
        </TopBar>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 