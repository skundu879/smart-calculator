'use client';
import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Image from 'next/image';

type Item = {
  description: string;
  quantity: number;
  price: number;
  total: number;
};
type updateItem = (
  index: number,
  field: string,
  value: string | number
) => void;

const InvoiceBuilder = () => {
  const invoiceRef = useRef(null);
  const [items, setItems] = useState([
    { description: 'Item 1', quantity: 1, price: 100, total: 100 },
  ]);

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, price: 0, total: 0 }]);
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    const newItems = items.map((item, i) =>
      i === index
        ? { ...item, [field]: value, total: item.quantity * item.price }
        : item
    );
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + item.total, 0);
  };

  return (
    <div className='container max-w-full'>
      <h1 className='text-3xl font-bold text-center mb-4'>Invoice Builder</h1>
      <div className='flex justify-end space-x-2 mb-4'>
        <button
          onClick={handlePrint}
          className='bg-blue-500 text-white px-4 py-2 rounded flex items-center'
        >
          <Image
            src='/svg/print.svg'
            alt='Print'
            width={24}
            height={24}
          />
          <span>Print</span>
        </button>
      </div>
      <div
        ref={invoiceRef}
        className='bg-white shadow-lg rounded-lg'
      >
        <div className='mb-4'>
          <h2 className='text-2xl font-bold'>Invoice</h2>
          <p className='text-gray-600'>Date: 2023-07-31</p>
        </div>
        <div className='mb-4'>
          <h3 className='text-xl font-semibold'>Bill To:</h3>
          <p>Customer Name</p>
          <p>Customer Address</p>
        </div>
        <table className='w-full mb-4'>
          <thead>
            <tr>
              <th className='border px-4 py-2'>Item</th>
              <th className='border px-4 py-2'>Quantity</th>
              <th className='border px-4 py-2'>Price</th>
              <th className='border px-4 py-2'>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className='border px-4 py-2'>
                  <input
                    type='text'
                    value={item.description}
                    onChange={(e) =>
                      updateItem(index, 'description', e.target.value)
                    }
                    className='w-full px-2 py-1 border rounded'
                  />
                </td>
                <td className='border px-4 py-2'>
                  <input
                    type='number'
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(
                        index,
                        'quantity',
                        parseInt(e.target.value) || 1
                      )
                    }
                    className='w-full px-2 py-1 border rounded'
                  />
                </td>
                <td className='border px-4 py-2'>
                  <input
                    type='number'
                    value={item.price}
                    onChange={(e) =>
                      updateItem(
                        index,
                        'price',
                        parseFloat(e.target.value) || 0
                      )
                    }
                    className='w-full px-2 py-1 border rounded'
                  />
                </td>
                <td className='border px-4 py-2'>{item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={addItem}
          className='bg-green-500 text-white px-4 py-2 rounded mb-4'
        >
          Add Item
        </button>
        <div className='flex justify-end'>
          <div className='w-1/3'>
            <div className='flex justify-between mb-2'>
              <span className='font-semibold'>Subtotal:</span>
              <span>{calculateTotal().toFixed(2)}</span>
            </div>
            <div className='flex justify-between mb-2'>
              <span className='font-semibold'>Tax:</span>
              <span>{(calculateTotal() * 0.1).toFixed(2)}</span>
            </div>
            <div className='flex justify-between font-bold text-lg'>
              <span>Total:</span>
              <span>{(calculateTotal() * 1.1).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceBuilder;
