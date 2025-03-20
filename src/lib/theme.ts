type Theme = 'light' | 'dark' | 'system';

export function initializeTheme() {
  if (typeof window === 'undefined') return;
  
  const savedTheme = (localStorage.getItem('theme') as Theme) || 'system';
  applyTheme(savedTheme);
}

export function applyTheme(theme: Theme) {
  if (typeof window === 'undefined') return;

  // Save theme preference
  localStorage.setItem('theme', theme);

  // Get system preference
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Determine if we should apply dark mode
  const shouldApplyDark = 
    theme === 'dark' || 
    (theme === 'system' && systemPrefersDark);

  // Apply or remove dark class based on the result
  if (shouldApplyDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Update meta theme-color
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute(
      'content',
      shouldApplyDark ? '#111827' : '#ffffff'
    );
  }
}

export function setupThemeListener() {
  if (typeof window === 'undefined') return () => {};

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleChange = () => {
    const currentTheme = localStorage.getItem('theme') as Theme;
    if (currentTheme === 'system') {
      applyTheme('system');
    }
  };

  mediaQuery.addEventListener('change', handleChange);
  return () => mediaQuery.removeEventListener('change', handleChange);
} 