// src/components/TooltipButton.js

import React, { useState, useRef, useEffect } from 'react';

const TooltipButton = ({
  buttonLabel,
  tooltipText,
}: {
  buttonLabel: any;
  tooltipText: string;
}) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const tooltipRef: any = useRef(null);

  const handleClickOutside = (event: any) => {
    if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
      setTooltipVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='absolute inline-block text-center sm:ml-2 ml-1'>
      <button
        className='focus:outline-none rounded-full hover:bg-slate-300'
        onClick={() => setTooltipVisible(!isTooltipVisible)}
      >
        {buttonLabel}
      </button>
      {isTooltipVisible && (
        <div
          ref={tooltipRef}
          className='absolute z-20 sm:w-48 w-36 mb-2 -left-1/2 transform -translate-x-1/2 bottom-full text-slate-800 bg-slate-200 rounded-md border bg-popover px-1 py-1.5 sm:text-sm text-xs text-popover-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'
        >
          {tooltipText}
        </div>
      )}
    </div>
  );
};

export default TooltipButton;
