import React from 'react';
import Image from 'next/image';

const About = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full '>
      <div className=' rounded-lg p-8 max-w-4xl w-full mx-4'>
        <div className=' flex flex-col text-center gap-8'>
          <div className='flex flex-col items-center'>
            <Image
              src='/E5953.jpg'
              alt='Team Member'
              className='w-32 h-32 rounded-full mb-4'
              width={150}
              height={150}
            />
            <h2 className='text-2xl font-bold text-gray-800'>Sujan Kundu</h2>
            <p className='text-gray-600'>Fullstack Developer</p>
          </div>
          <div>
            <p className='text-lg text-gray-600 mb-6'>
              Managing your finances shouldn&apos;t be a complex task.
              That&apos;s why I created QuickCalc, your go-to tool for
              effortlessly handling financial calculations. I believe everyone
              deserves easy access to financial tools that simplify complex
              calculations. Whether you&apos;re making investment decisions,
              planning for a loan, or understanding tax implications under
              different regimes, QuickCalc is your reliable guide.
            </p>
          </div>
        </div>

        <div className='mt-12 text-center'>
          <h2 className='text-3xl font-bold text-gray-800 mb-4'>Contact Me</h2>
          <div className='flex flex-col items-center gap-2'>
            <p>
              {' '}
              For any inquiries or suggestion, please don&apos;t hesitate to
              contact me.
            </p>
            <div className='flex items-center mb-2 gap-4'>
              <Image
                src='/svg/mail.svg'
                alt='Email'
                width={24}
                height={24}
              />
              <a
                href='mailto:skundu879@gmail.com'
                className='text-blue-500 underline'
              >
                skundu879@gmail.com
              </a>
            </div>
            <div className='flex items-center gap-4'>
              <Image
                src='/svg/phone.svg'
                alt='Email'
                width={24}
                height={24}
              />
              <span className='text-gray-600'>+91 9800602941</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
