import CustomBreadcrumb from '@/components/CustomBreadcrumb';

import { ReactNode } from 'react';

const InvoicePageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className='w-full bg-slate-50'>
      <div>{children}</div>
    </main>
  );
};

export default InvoicePageLayout;
