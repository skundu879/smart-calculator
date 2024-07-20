import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
        <main className='flex flex-col justify-center items-center'>
          <StoreProvider>
            <Navbar />
            <div className='sm:container mt-24'>{children}</div>
            <Footer />
          </StoreProvider>
        </main>
      </body>
    </html>
  );
}
