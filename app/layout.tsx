import './globals.css';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import SessionProvider from '@/components/SessionProvider';
import { Inter } from 'next/font/google';
import NavMenu from '@/components/Navbar';
import { authOptions } from './api/auth/[...nextauth]/route';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://localhost:3000'),
  title: 'Instr',
  description: 'Twitter like application where you share posts.',
  keywords: 'Instr, Twitter, Instagram, Reddit',
  icons: '/logo.png',
  openGraph: {
    title: 'Instr',
    description: 'Twitter like application where you share posts.',
    images: '/logo.png',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang='en' className='bg-slate-700 text-white'>
      <body className={inter.className + ' relative min-h-screen'}>
        <SessionProvider session={session}>
          <NavMenu />
          <main className='mx-auto mt-5 w-11/12 scroll-auto md:w-3/4'>
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
