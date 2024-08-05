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
    return (
      <div
        className='max-w-screen-md mx-auto p-8'
        ref={ref}
      >
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
          <TableFooter>
            <TableRow>
              <TableCell
                colSpan={4}
                className='text-right font-bold'
              >
                <p className='font-semibold text-left'>
                  Thanks for your purchase!
                </p>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        {/* Totals */}
        <div className='mt-4 text-right'>
          <p>Subtotal: {itemsTotal.subTotal}</p>
          <p>
            GST({GST}%) : {itemsTotal.gst.toFixed(2)}
          </p>
          <p className='font-bold'>Total: {itemsTotal.total.toFixed(2)}</p>
        </div>

        {/* Payment information */}
        <div className='flex justify-between mt-20'>
          <div className='mt-4'>
            <p>Payment due within 30 days.</p>
            <p className='font-thin text-xs'>
              **Items sold are non-returnable after 7 days.
            </p>
          </div>
          <div className='border-2 rounded border-gray-200 border-dashed align-middle p-6 relative text-center w-36 '>
            {signature && (
              <Image
                src={signature}
                alt='signature'
                width={80}
                height={40}
              />
            )}
            <p className='text-slate-400 absolute'>signature</p>
          </div>
        </div>
        {/* signature disclaimer */}
        {signature && (
          <div className='mt-6'>
            <p className='text-center mt-4'>
              <span className='text-xs text-slate-500'>
                **This invoice has been electronically signed**
              </span>
            </p>
          </div>
        )}
      </div>
    );
  }
);

InvoiceTemplate.displayName = 'InvoiceTemplate';

export default InvoiceTemplate;
