import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { set } from 'lodash';

type MutualFund = {
  data: {
    [key: string]: any;
  };
  calculatedData: {
    [key: string]: any;
  };
  isTaxable: boolean;
  isLoading: boolean;
  activeTab: string;
  error: string | null;
};
const initialState: MutualFund = {
  data: {
    SIP: {},
    LUMPSUM: {},
    GOALS: {},
  },
  calculatedData: {
    SIP: {},
    LUMPSUM: {},
    GOALS: {},
  },
  isTaxable: false,
  isLoading: false,
  activeTab: 'SIP',
  error: null,
};

const MutualFundSlice = createSlice({
  name: 'mutualFund',
  initialState,
  reducers: {
    setActivetab: (state, action) => {
      state.activeTab = action.payload;
    },
    setIstaxable: (state, action) => {
      state.isTaxable = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setFormDatas: (state, action) => {
      const activeTab = state.activeTab;
      const { title, value } = action.payload;
      state.data[activeTab][title] = value;
    },
    setCalculatedData: (state, action) => {
      const activeTab = state.activeTab;
      const { formula } = action.payload;

      state.calculatedData[activeTab][title] = value;
    },
  },
});

export const {
  setActivetab,
  setIstaxable,
  setIsLoading,
  setFormDatas,
  setCalculatedData,
} = MutualFundSlice.actions;
export default MutualFundSlice.reducer;

export const activeTabSelector = createSelector(
  (state: RootState) => state.mutualFund.activeTab,
  (activeTab) => activeTab
);
export const isTaxableSelector = createSelector(
  (state: RootState) => state.mutualFund.isTaxable,
  (isTaxable) => isTaxable
);
export const isLoadingSelector = createSelector(
  (state: RootState) => state.mutualFund.isLoading,
  (isLoading) => isLoading
);
export const formDataSelector = createSelector(
  (state: RootState) => state.mutualFund.data,
  (state: RootState) => state.mutualFund.activeTab,
  (data, activeTab) => data[activeTab]
);
export const calculatedDataSelector = createSelector(
  (state: RootState) => state.mutualFund.calculatedData,
  (calculatedData) => calculatedData
);
