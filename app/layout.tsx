import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';
import StoreProvider from './StoreProvider';
import { Toaster } from '@/components/ui/toaster';

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
        <main>
          <StoreProvider>
            <div className='flex flex-col items-center min-h-svh justify-between'>
              <Navbar />
              <div className='sm:container mt-16 justify-start'>{children}</div>
              <div className='w-full justify-end'>
                <Footer />
              </div>
            </div>
          </StoreProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
