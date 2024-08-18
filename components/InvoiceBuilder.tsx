'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import CustomButton from './CustomButton';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
  saveDigitalSignature,
  resetSignature,
  updateInvoiceNumber,
  itemsSelector,
  companyDetailsSelector,
  customerDetailsSelector,
  gstSelector,
  totalSelector,
  invoiceDateSelector,
  invoiceNumberSelector,
  signatureSelector,
} from '@/lib/featureSlice/Invoice/invoiceSlice';
import { useToast } from '@/components/ui/use-toast';
import DigitalSign from './DigitalSign';
import SignDialog from './SignDialog';
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
  const sigCanvasRef = useRef({} as any);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const items: Items = useAppSelector((state) => itemsSelector(state.invoice));
  const companyDetails = useAppSelector((state) =>
    companyDetailsSelector(state.invoice)
  );
  const companyButtonlabel = companyDetails.CName
    ? 'Change Company'
    : 'Add Company';
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
  const signature = useAppSelector((state) => signatureSelector(state.invoice));
  const signLable = signature ? 'Change Signature' : 'Add Signature';
  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: 'Invoice',
    pageStyle() {
      return `
        @page {
          size: A4;
          margin: 0;
        }
        body {
          margin: 0;
          padding: 0;
          font-family: 'Arial', sans-serif;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
          `;
    },
  });

  const handleAddItem = () => {
    dispatch(addItem());
  };
  const handleRemoveItem = (index: number) => {
    dispatch(removeItem({ index }));
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

  const handleSaveSignature = () => {
    const sig = sigCanvasRef.current
      ?.getTrimmedCanvas()
      ?.toDataURL('image/png');
    dispatch(saveDigitalSignature(sig));
    localStorage.setItem('signature', sig);
    toast({
      variant: 'default',
      description: 'Your signature has been saved locally.',
      duration: 2000,
    });
    setOpen(false);
  };
  const handleClearSignature = () => {
    sigCanvasRef.current?.clear();
    localStorage.setItem('signature', '');
    dispatch(resetSignature());
  };

  const onModelChange = () => {
    setOpen(!open);
  };
  const handleInvoiceNumber = (invNumber: number) => {
    localStorage.setItem('invoiceNumber', (invNumber + 1).toString());
    dispatch(updateInvoiceNumber(invNumber + 1));
  };
  useEffect(() => {
    const localStorageValue = localStorage.getItem('companyDetails');
    const signature = localStorage.getItem('signature');
    const invoiceNumber = localStorage.getItem('invoiceNumber');
    const parsedValue = localStorageValue
      ? JSON.parse(localStorageValue)
      : null;
    if (parsedValue !== null) {
      parsedValue.CName && handleComapnyDetails('CName', parsedValue.CName);
      parsedValue.CAddress &&
        handleComapnyDetails('CAddress', parsedValue.CAddress);
      parsedValue.CPhone && handleComapnyDetails('CPhone', parsedValue.CPhone);
    }
    if (signature) {
      dispatch(saveDigitalSignature(signature));
    }
    if (invoiceNumber) {
      dispatch(updateInvoiceNumber(Number(invoiceNumber)));
    }
  }, []);

  return (
    <Card>
      <CardHeader className='text-center'>
        <CardTitle className='text-xl sm:text-2xl font-bold '>
          Invoice Builder
        </CardTitle>
        <CardDescription className='text-xs sm:text-sm'>
          {' '}
          Enter the details below to create your invoice.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-row justify-between space-x-2 sm:mb-4 mb-3 items-center'>
          <div className='mb-2 sm:text-xl text-sm flex flex-col gap-1'>
            <div className='flex gap-1'>
              <h4 className='font-medium'>Invoice Date:</h4>
              <p className='text-gray-600'>{invoiceDate}</p>
            </div>
            <div className='flex gap-1'>
              <h4 className='font-medium'>Invoice No:</h4>
              <p className='text-gray-600'>{invoiceNumber}</p>
            </div>
          </div>

          <CustomButton
            onClick={() => {
              handleInvoiceNumber(invoiceNumber);
              handlePrint();
            }}
          >
            <Image
              src='/svg/print.svg'
              alt='Print'
              width={16}
              height={16}
            />
            <span>Print</span>
          </CustomButton>
        </div>
        <div className='pb-6'>
          <div className='flex flex-row justify-between gap-2 mb-2'>
            <div>
              <p className='sm:text-2xl text-base font-semibold mb-2'>
                Company Details:
              </p>
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
                <CustomButton onClick={handleSaveCompany}>
                  {companyButtonlabel}
                </CustomButton>
              </div>
            </div>
            <div>
              <p className='sm:text-2xl text-base font-semibold mb-2'>
                Customer Details:
              </p>
              <div className='flex flex-col gap-2'>
                <Input
                  id='name'
                  type='text'
                  placeholder='Customer Name'
                  value={customerDetails.name}
                  className='h-8'
                  onChange={(e) =>
                    handleCustomerDetails('name', e.target.value)
                  }
                />
                <Input
                  id='phone'
                  type='tel'
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
            <Table>
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
                    <CustomButton onClick={handleAddItem}>
                      Add Item
                    </CustomButton>
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
                signature={signature}
                ref={invoiceRef}
              />
            </div>
          </div>
          <div className='flex justify-between items-center mt-4'>
            <Card>
              <CardHeader className='py-2 '>
                <CardTitle className='sm:text-sm text-xs'>
                  {' '}
                  Current Signature
                </CardTitle>
              </CardHeader>
              <CardContent className=' flex p-2  justify-center'>
                {' '}
                {signature ? (
                  <Image
                    className='w-18 h-16 sm:w-24 sm:h-20 object-contain'
                    src={signature}
                    alt='signature'
                    width={80}
                    height={40}
                  />
                ) : (
                  <p className='text-gray-400'>No Signature</p>
                )}
              </CardContent>
            </Card>
            <SignDialog
              onModelChange={onModelChange}
              open={open}
              label={signLable}
              title='Sign Here'
              description='Sign here to confirm the invoice'
              handleSave={handleSaveSignature}
              handleClear={handleClearSignature}
            >
              {<DigitalSign ref={sigCanvasRef} />}
            </SignDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default React.forwardRef(InvoiceBuilder);
