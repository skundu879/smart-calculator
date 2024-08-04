import { createSelector, createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';

type Invoice = {
  Items: [
    { id: number; item: string; quantity: number; price: number; total: number }
  ];
  CompanyDetails: { CName: string; CPhone: string; CAddress: string };
  CustomerDetails: { name: string; phone: string; address: string };
  GST?: number;
  invoiceDate: string;
  invoiceNumber: number;
  isCompanyDetailsSaved: boolean;
};

const initialState: Invoice = {
  Items: [{ id: 1, item: '', quantity: 0, price: 0, total: 0 }],
  CompanyDetails: { CName: '', CPhone: '', CAddress: '' },
  CustomerDetails: { name: '', phone: '', address: '' },
  isCompanyDetailsSaved: true,
  GST: 0,
  invoiceDate: format(new Date(), 'yyyy-MM-dd'),
  invoiceNumber: 1000,
};

const InvoiceSlice = createSlice({
  name: 'invoiceSlice',
  initialState,
  reducers: {
    addItem(state) {
      state.Items.push({
        id: state.Items.length + 1,
        item: '',
        quantity: 0,
        price: 0,
        total: 0,
      });
    },
    updateItem(state, action) {
      const { index, key, value } = action.payload;
      (state.Items[index] as any)[key] = value;
      (state.Items[index] as any).total =
        (state.Items[index] as any).quantity *
        (state.Items[index] as any).price;
    },
    removeItem(state, action) {
      const { index } = action.payload;
      state.Items.splice(index, 1);
    },
    updateCompanyDetails(state, action) {
      const { key, value } = action.payload;
      state.isCompanyDetailsSaved = false;
      (state.CompanyDetails as any)[key] = value;
    },
    updateCustomerDetails(state, action) {
      const { key, value } = action.payload;

      (state.CustomerDetails as any)[key] = value;
    },
    updateGST(state, action) {
      state.GST = action.payload;
    },
    saveCompanyDetails(state) {
      localStorage.setItem(
        'companyDetails',
        JSON.stringify(state.CompanyDetails)
      );
      state.isCompanyDetailsSaved = true;
    },
  },
});

export const {
  addItem,
  removeItem,
  updateCompanyDetails,
  updateCustomerDetails,
  updateGST,
  updateItem,
  saveCompanyDetails,
} = InvoiceSlice.actions;
export default InvoiceSlice.reducer;

export const itemsSelector = createSelector(
  (state: Invoice) => state.Items,
  (items) => items
);

export const companyDetailsSelector = createSelector(
  (state: Invoice) => state.CompanyDetails,
  (companyDetails) => companyDetails
);

export const customerDetailsSelector = createSelector(
  (state: Invoice) => state.CustomerDetails,
  (customerDetails) => customerDetails
);

export const gstSelector = createSelector(
  (state: Invoice) => state.GST,
  (gst) => gst
);

export const invoiceDateSelector = createSelector(
  (state: Invoice) => state.invoiceDate,
  (invoiceDate) => invoiceDate
);

export const invoiceNumberSelector = createSelector(
  (state: Invoice) => state.invoiceNumber,
  (invoiceNumber) => invoiceNumber
);

export const totalSelector = createSelector(
  (state: Invoice) => state.Items,
  (state) => state.GST,
  (
    items: {
      id: number;
      item: string;
      quantity: number;
      price: number;
      total: number;
    }[],
    gst: number
  ) =>
    items.reduce(
      (acc, item) => {
        acc.subTotal += item.total;
        acc.gst += (item.total * gst) / 100;
        acc.total = acc.subTotal + acc.gst;
        return acc;
      },
      { subTotal: 0, gst: 0, total: 0 }
    )
);
