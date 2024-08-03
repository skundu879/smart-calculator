import { configureStore } from '@reduxjs/toolkit';
import MutualFundSlice from '@/lib/featureSlice/MF/mutualFundSlice';
import providentFundSlice from '@/lib/featureSlice/PF/providentFundSlice';
import SalaryCalculatorSlice from '@/lib/featureSlice/SC/salaryCalculatorSlice';
import EMICalculatorSlice from '@/lib/featureSlice/EMI/emiCalculator';
import IncomeTaxCalculatorSlice from '@/lib/featureSlice/ITC/incomeTaxCalculatorSlice';
import InvoiceSlice from '@/lib/featureSlice/Invoice/invoiceSlice';
export const makeStore = () => {
  return configureStore({
    reducer: {
      mutualFund: MutualFundSlice,
      providentFund: providentFundSlice,
      salaryCalculator: SalaryCalculatorSlice,
      emiCalculator: EMICalculatorSlice,
      incomeTaxCalculator: IncomeTaxCalculatorSlice,
      invoice: InvoiceSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
