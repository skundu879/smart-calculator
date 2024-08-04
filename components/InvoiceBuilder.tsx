'use client';
import React, { useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import CustomButton from './CustomButton';
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
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import {
  addItem,
  removeItem,
  updateItem,
  updateCompanyDetails,
  saveCompanyDetails,
  updateCustomerDetails,
  updateGST,
  itemsSelector,
  companyDetailsSelector,
  customerDetailsSelector,
  gstSelector,
  totalSelector,
  invoiceDateSelector,
  invoiceNumberSelector,
} from '@/lib/featureSlice/Invoice/invoiceSlice';
import { useToast } from '@/components/ui/use-toast';
import InvoiceTemplate from './InvoiceTemplate';

type Items = [
  {
    id: number;
    item: string;
    quantity: number;
    price: number;
    total: number;
  }
];
type updateItem = (index: number, key: string, value: string | number) => void;

const InvoiceBuilder = () => {
  const invoiceRef = useRef(null);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const items: Items = useAppSelector((state) => itemsSelector(state.invoice));
  const companyDetails = useAppSelector((state) =>
    companyDetailsSelector(state.invoice)
  );
  const customerDetails = useAppSelector((state) =>
    customerDetailsSelector(state.invoice)
  );
  const invoiceDate = useAppSelector((state) =>
    invoiceDateSelector(state.invoice)
  );
  const invoiceNumber = useAppSelector((state) =>
    invoiceNumberSelector(state.invoice)
  );
  const gst = useAppSelector((state) => gstSelector(state.invoice));
  const allTotal = useAppSelector((state) => totalSelector(state.invoice));

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });

  const handleAddItem = () => {
    dispatch(addItem());
  };
  const handleRemoveItem = (index: number) => {
    dispatch(removeItem(index));
  };
  const handleUpdateItem = (
    index: number,
    field: string,
    value: string | number
  ) => {
    dispatch(updateItem({ index, key: field, value }));
  };
  const handleComapnyDetails = (key: string, value: string) => {
    dispatch(updateCompanyDetails({ key, value }));
  };
  const handleCustomerDetails = (key: string, value: string) => {
    dispatch(updateCustomerDetails({ key, value }));
  };
  const handleGST = (value: number) => {
    dispatch(updateGST(value));
  };

  const handleSaveCompany = () => {
    dispatch(saveCompanyDetails());
    toast({
      variant: 'default',
      description: 'Company details saved successfully into local storage',
      duration: 4000,
    });
  };

  useEffect(() => {
    const localStorageValue = localStorage.getItem('companyDetails');
    const parsedValue = localStorageValue
      ? JSON.parse(localStorageValue)
      : null;
    if (parsedValue !== null) {
      parsedValue.CName && handleComapnyDetails('CName', parsedValue.CName);
      parsedValue.CAddress &&
        handleComapnyDetails('CAddress', parsedValue.CAddress);
      parsedValue.CPhone && handleComapnyDetails('CPhone', parsedValue.CPhone);
    }
  }, []);

  return (
    <div>
      <h1 className='sm:text-3xl text-xl font-bold text-center mb-6'>
        Invoice Builder
      </h1>
      <div className='flex flex-row justify-between space-x-2 sm:mb-4 mb-3 items-center'>
        <div className='mb-2 sm:text-2xl text-sm font-semibold flex flex-col gap-1'>
          <div className='flex gap-1'>
            <h2 className='font-bold'>Invoice Date:</h2>
            <p className='text-gray-600'>{invoiceDate}</p>
          </div>
          <div className='flex gap-1'>
            <h2 className='font-bold'>Invoice No:</h2>
            <p className='text-gray-600'>{invoiceNumber}</p>
          </div>
        </div>

        <CustomButton onClick={handlePrint}>
          <Image
            src='/svg/print.svg'
            alt='Print'
            width={16}
            height={16}
          />
          <span>Print</span>
        </CustomButton>
      </div>
      <div className='bg-white shadow-lg rounded-lg pb-6'>
        <div className='flex flex-row justify-between gap-2 mb-2'>
          <div>
            <h3 className='sm:text-2xl text-base font-semibold mb-2'>
              Company Details:
            </h3>

            <div className='flex flex-col gap-2'>
              <div className='flex flex-col gap-2'>
                <Input
                  type='text'
                  placeholder='Company Name'
                  value={companyDetails.CName}
                  className='h-8'
                  onChange={(e) =>
                    handleComapnyDetails('CName', e.target.value)
                  }
                />
                <Input
                  type='tel'
                  placeholder='Phone Number'
                  value={companyDetails.CPhone}
                  className='h-8'
                  onChange={(e) =>
                    handleComapnyDetails('CPhone', e.target.value)
                  }
                />
                <Textarea
                  placeholder='Company Address'
                  value={companyDetails.CAddress}
                  className='min-h-14 py-1'
                  onChange={(e) =>
                    handleComapnyDetails('CAddress', e.target.value)
                  }
                />
              </div>
              <div className='flex justify-start'>
                <CustomButton onClick={handleSaveCompany}>
                  Save Company
                </CustomButton>
              </div>
            </div>
          </div>
          <div>
            <h3 className='sm:text-2xl text-base font-semibold mb-2'>
              Customer Details:
            </h3>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col gap-2'>
                <Input
                  id='name'
                  type='tel'
                  placeholder='Customer Name'
                  value={customerDetails.name}
                  className='h-8'
                  onChange={(e) =>
                    handleCustomerDetails('name', e.target.value)
                  }
                />
                <Input
                  id='phone'
                  type='text'
                  placeholder='Customer Phone'
                  value={customerDetails.phone}
                  className='h-8'
                  onChange={(e) =>
                    handleCustomerDetails('phone', e.target.value)
                  }
                />
                <Textarea
                  id='address'
                  placeholder='Customer Address'
                  value={customerDetails.address}
                  className='min-h-14 py-1'
                  onChange={(e) =>
                    handleCustomerDetails('address', e.target.value)
                  }
                />
              </div>
              <div className='flex justify-end items-center gap-1'>
                <span className='font-medium text-sm'>GST %:</span>
                <Input
                  type='number'
                  value={gst}
                  placeholder='GST %'
                  className='h-8 sm:w-24 w-20'
                  onChange={(e) => handleGST(parseFloat(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <Table className='max-w-full'>
            <TableCaption className='text-slate-400'>
              --- Invoice Items ---
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>QTY</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className='text-right'>Total</TableHead>
                <TableHead className='p-0 text-right'>
                  <Image
                    src='/svg/trash.svg'
                    alt='Delete'
                    width={16}
                    height={16}
                  />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className='font-medium p-2'>
                    <Input
                      placeholder='Item name'
                      type='text'
                      value={item.item}
                      onChange={(e) =>
                        handleUpdateItem(index, 'item', e.target.value)
                      }
                      className='w-full p-1 h-8 border rounded min-w-24'
                    />
                  </TableCell>
                  <TableCell className='font-medium p-2 max-w-28'>
                    <Input
                      type='number'
                      placeholder='Quantity'
                      value={item.quantity}
                      onChange={(e) =>
                        handleUpdateItem(
                          index,
                          'quantity',
                          parseInt(e.target.value) || 0
                        )
                      }
                      className='sm:w-full max-w-14 p-1 h-8 border rounded'
                    />
                  </TableCell>
                  <TableCell className='font-medium p-2 max-w-28'>
                    <Input
                      type='number'
                      placeholder='Price'
                      value={item.price}
                      onChange={(e) =>
                        handleUpdateItem(
                          index,
                          'price',
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className='sm:w-full max-w-24 p-1 h-8 border rounded'
                    />
                  </TableCell>
                  <TableCell className='font-medium p-2'>
                    <Input
                      type='number'
                      placeholder='total'
                      value={item.total}
                      onChange={(e) =>
                        handleUpdateItem(
                          index,
                          'total',
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className='sm:w-full max-w-36 p-1 h-8 border rounded'
                    />
                  </TableCell>
                  <TableCell className='p-0'>
                    <Button
                      onClick={() => handleRemoveItem(index)}
                      className='bg-white hover:bg-red-500 hover:text-white p-1 w-8 h-8'
                    >
                      <Image
                        src='/svg/delete.svg'
                        alt='Delete'
                        width={12}
                        height={12}
                      />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={1}>
                  {' '}
                  <CustomButton onClick={handleAddItem}>Add Item</CustomButton>
                </TableCell>
                <TableCell colSpan={4}>
                  {' '}
                  <div className='text-right'>
                    <div className='flex justify-end mb-1 gap-1 font-semibold text-yellow-600'>
                      <span>Subtotal:</span>
                      <span>{allTotal.subTotal.toFixed(2)}</span>
                    </div>
                    <div className='flex justify-end mb-1 gap-1 font-semibold text-red-600'>
                      <span>GST:</span>
                      <span>{allTotal.gst.toFixed(2)}</span>
                    </div>
                    <div className='flex justify-end font-bold text-lg gap-1 text-green-600'>
                      <span>Total:</span>
                      <span>{allTotal.total.toFixed(2)}</span>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <div className='hidden'>
            <InvoiceTemplate
              CompanyDetails={companyDetails}
              CustomerDetails={customerDetails}
              Items={items}
              invoiceDate={invoiceDate}
              invoiceNumber={invoiceNumber}
              GST={gst}
              itemsTotal={allTotal}
              invoiceRef={invoiceRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceBuilder;
