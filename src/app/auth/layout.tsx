import { IBM_Plex_Sans_Arabic } from 'next/font/google';
import { Toaster } from 'sonner';
import ThemeProvider from '@/components/providers/ThemeProvider';
import { AuthProvider } from '@/components/providers/AuthProvider';

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans-arabic',
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={ibmPlexSansArabic.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AuthProvider>
            {children}
            <Toaster position="top-center" richColors />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 