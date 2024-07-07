import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <header className='fixed top-0  w-full z-50 bg-white shadow-sm flex justify-between items-center px-36 py-4 '>
      <Link
        href='/'
        className='text-2xl font-bold text-slate-950 flex flex-row items-center'
      >
        <h2 className='text-3xl font-semibold tracking-tight mt-2 w-full'>
          QuickCalc
        </h2>
      </Link>
    </header>
  );
};

export default Navbar;
