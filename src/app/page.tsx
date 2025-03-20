'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">جاري التحميل...</h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">يرجى الانتظار قليلاً</p>
      </div>
    </div>
  );
}
