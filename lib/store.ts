import { configureStore } from '@reduxjs/toolkit';
import MutualFundSlice from '@/lib/featureSlice/MF/mutualFundSlice';
import providentFundSlice from '@/lib/featureSlice/PF/providentFundSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      mutualFund: MutualFundSlice,
      providentFund: providentFundSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
