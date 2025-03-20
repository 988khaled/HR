'use client';

import { useEffect } from 'react';
import { initializeTheme, setupThemeListener } from '@/lib/theme';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize theme immediately
    initializeTheme();

    // Setup system theme change listener
    const cleanup = setupThemeListener();
    
    // Cleanup listener on unmount
    return cleanup;
  }, []);

  return <>{children}</>;
} 