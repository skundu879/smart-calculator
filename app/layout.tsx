import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import './globals.css';
import StoreProvider from './StoreProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Calculators',
  description: 'Calculate All type of calculation ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main className='flex justify-center'>
          <StoreProvider>
            <Navbar />
            <div className='sm:w-3/4 mt-24'>{children}</div>
          </StoreProvider>
        </main>
      </body>
    </html>
  );
}
