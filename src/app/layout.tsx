import './globals.css';
import { IBM_Plex_Sans_Arabic } from 'next/font/google';
import { Toaster } from 'sonner';
import ThemeProvider from '@/components/providers/ThemeProvider';
import { AuthProvider } from '@/components/providers/AuthProvider';
import DashboardLayout from '@/components/layout/DashboardLayout';

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ['arabic'],
});

export const metadata = {
  title: 'نظام إدارة الموظفين',
  description: 'نظام متكامل لإدارة شؤون الموظفين والرواتب',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthPage = typeof children === 'object' && 
    children !== null && 
    'props' in children && 
    'segment' in (children.props as any) && 
    (children.props as any).segment === 'auth';

  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={ibmPlexSansArabic.className}>
        <ThemeProvider>
          <AuthProvider>
            <Toaster position="top-center" />
            {isAuthPage ? children : <DashboardLayout>{children}</DashboardLayout>}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
