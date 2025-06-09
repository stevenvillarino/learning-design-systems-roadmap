import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { AppLayout } from '@/components/layout/AppLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Interactive Design System Roadmap',
  description: 'Learn how to create a design system with this interactive roadmap',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
