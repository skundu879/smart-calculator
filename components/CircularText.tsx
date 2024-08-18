import React from 'react';

const CurvedText = ({ text }: { text: string }) => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <svg
        width='250'
        height='250'
        viewBox='0 0 250 250'
      >
        <defs>
          <path
            id='circlePath'
            d='M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0'
          />
        </defs>
        <text fill='rgb(244, 244, 245, 0.5)'>
          <textPath
            href='#circlePath'
            startOffset='5%'
          >
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default CurvedText;
