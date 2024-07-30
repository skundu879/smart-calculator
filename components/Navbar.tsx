'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className='fixed top-0  w-full z-50 bg-white shadow-sm container mx-auto   
 px-6 py-2 flex justify-between items-center text-center'
    >
      <div className='flex justify-between items-center text-center w-full'>
        <Link
          href='/'
          className='text-2xl font-bold text-slate-950 flex flex-row items-center'
          aria-label='QuickCalc Home'
        >
          <h2 className='text-3xl font-semibold tracking-tight p-2 w-full'>
            QuickCalc
          </h2>
        </Link>
        <nav className=' hidden md:flex flex-row gap-6 '>
          <Link
            href='/about'
            className='text-slate-950'
          >
            About
          </Link>
          <Link
            href='/contact'
            className='text-slate-950'
          >
            Contact
          </Link>
        </nav>
      </div>
      <div className='md:hidden'>
        <button
          onClick={toggleMenu}
          className='text-white hover:text-gray-400 items-baseline'
        >
          <Image
            src='/svg/menu.svg'
            alt='Menu'
            width={24}
            height={24}
          />
        </button>
      </div>
      {isMenuOpen && (
        <div className='fixed top-0 left-0 w-full h-screen bg-gray-600 flex flex-col items-center justify-center'>
          <button
            onClick={closeMenu}
            className='absolute top-4 right-4 '
          >
            <Image
              src='/svg/cancel.svg'
              alt='Close'
              width={24}
              height={24}
              className='cursor-pointer bg-white rounded-full p-0'
              color='white'
            />
          </button>
          <Link
            href='/about'
            className='text-white hover:text-gray-400 text-2xl mb-4'
            onClick={closeMenu}
          >
            About
          </Link>
          <Link
            href='/contact'
            className='text-white hover:text-gray-400 text-2xl mb-4'
            onClick={closeMenu}
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
