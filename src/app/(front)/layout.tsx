import '../globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import BaseComponent from '@/components/base/BaseComponent';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Threads app to share your thoughts',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <BaseComponent>{children}</BaseComponent>
      <Toaster />
    </ThemeProvider>
  );
}
