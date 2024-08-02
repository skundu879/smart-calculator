import React from 'react';
import InvoiceBuilder from '@/components/InvoiceBuilder';

export const Invoice = () => {
  return (
    <div className='flex md:flex-row flex-col gap-4'>
      <InvoiceBuilder />
    </div>
  );
};

export default Invoice;
