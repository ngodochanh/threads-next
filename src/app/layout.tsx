import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import CustomProvider from './CustomProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Threads App',
  description: 'The Threads app to share your thoughts and much more.',
  icons: '/favicon.ico',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomProvider>{children}</CustomProvider>
      </body>
    </html>
  );
}
