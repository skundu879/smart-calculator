import React, { forwardRef } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import CurvedText from '@/components/CircularText';

type InvoiceProps = {
  Items: [
    { id: number; item: string; quantity: number; price: number; total: number }
  ];
  CompanyDetails: { CName: string; CPhone: string; CAddress: string };
  CustomerDetails: { name: string; phone: string; address: string };
  GST?: number;
  invoiceDate: string;
  invoiceNumber: number;
  itemsTotal: {
    subTotal: number;
    gst: number;
    total: number;
  };
  signature?: string;
};

const InvoiceTemplate = forwardRef<HTMLDivElement, InvoiceProps>(
  (props, ref) => {
    const {
      Items,
      CompanyDetails,
      CustomerDetails,
      GST,
      invoiceDate,
      invoiceNumber,
      itemsTotal,
      signature,
    } = props;
    const getFontSizeClass = (text: string) => {
      const length = text.length;
      if (length <= 10) return 'text-6xl';
      if (length <= 20) return 'text-5xl';
      if (length <= 30) return 'text-4xl';
      if (length <= 40) return 'text-3xl';
      return 'text-2xl';
    };
    const fontSizeClass = getFontSizeClass(CompanyDetails.CName);
    return (
      <div
        className='relative max-w-screen-md mx-auto p-8 bg-transparent'
        ref={ref}
      >
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold pointer-events-none -z-[1] ${fontSizeClass}`}
        >
          <CurvedText text={CompanyDetails.CName} />
          {/* {CompanyDetails.CName} */}
        </div>
        <h1 className='text-4xl font-medium text-center mb-4'>Invoice</h1>
        <header className='flex justify-between items-center'>
          <div>
            <h1 className='text-2xl font-bold'>{CompanyDetails.CName}</h1>
            <p className='text-gray-500'>{CompanyDetails.CAddress}</p>
            <p className='text-gray-500'>{CompanyDetails.CPhone}</p>
          </div>
          {/* Invoice number and date */}
          <div>
            <p>Invoice No: #{invoiceNumber}</p>
            <p>Date: {invoiceDate}</p>
          </div>
        </header>

        {/* Customer details */}
        <div className='mt-4'>
          <h2 className='text-xl font-bold'>Bill To</h2>
          <p>{CustomerDetails.name}</p>
          <p>{CustomerDetails.phone}</p>
          <p>{CustomerDetails.address}</p>
        </div>

        {/* Items table */}
        <Table className='mt-4'>
          <TableCaption>A list of your recent purchase.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='min-w-6 font-bold'>S.No</TableHead>
              <TableHead className='min-w-60 font-bold'>DESCRIPTION</TableHead>
              <TableHead className='font-bold'>QTY</TableHead>
              <TableHead className='font-bold'>UNIT PRICE</TableHead>
              <TableHead className='text-right font-bold'>TOTAL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Items.map((item: any, key: number) => (
              <TableRow key={item.id}>
                <TableCell>{key + 1}</TableCell>
                <TableCell className='font-medium'>{item.item}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell className='text-right'>
                  {item.total.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className='bg-transparent'>
            <TableRow>
              <TableCell
                colSpan={4}
                className='text-right font-bold'
              >
                <p className='font-semibold text-left'>
                  Thanks for your purchase!
                </p>
              </TableCell>
              <TableCell className='text-right font-semibold'>
                <p>Subtotal: {itemsTotal.subTotal.toFixed(2)}</p>
                {GST && GST > 0 ? (
                  <p>
                    GST({GST}%): {itemsTotal.gst.toFixed(2)}
                  </p>
                ) : null}
                <p className='font-bold text-lg'>
                  Total: {itemsTotal.total.toFixed(2)}
                </p>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        {/* Totals */}

        {/* Payment information */}
        <div className='flex justify-between mt-6 items-center'>
          <div className='text-slate-600'>
            <p className='text-sm'>Payment due within 30 days.</p>
            <p className='font-thin text-xs '>No returns after 7 days.</p>
          </div>
          {/* signature sections */}
          <div>
            <div className='border-2 rounded border-gray-200 border-dashed align-middle p-6 relative text-center w-36 mb-2'>
              {signature && (
                <Image
                  src={signature}
                  alt='signature'
                  width={80}
                  height={40}
                />
              )}
              <p className='text-slate-300 absolute text-center'>signature</p>
            </div>
            {signature && (
              <p className='text-center text-xs text-slate-400'>
                *Digitally signed*
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
);

InvoiceTemplate.displayName = 'InvoiceTemplate';

export default InvoiceTemplate;
