import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full w-full py-12 container'>
      <Image
        src='/svg/undraw_taken.svg'
        alt='404 note found'
        width={200}
        height={200}
        className='mb-8'
      />
      <h1 className='text-2xl font-bold text-gray-800'>404 - Not Found</h1>
      <p className='text-gray-500 mt-4'>
        We&apos;re building something awesome. Stay tuned!
      </p>
      <Button className='bg-slate-500 hover:bg-slate-600 text-white  py-2 px-4 rounded mt-8'>
        {' '}
        <Link href='/'> Go Back Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
