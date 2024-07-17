import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { dynamicMathCalculation } from '@/utils/dynamicMathCalculation';
import { result } from 'lodash';

type MutualFund = {
  data: {
    [key: string]: any;
  };
  result: number;
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
  result: 0,
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
    calculateMutualFund: (state, action) => {
      const activeTab = state.activeTab;
      const calculatedData = state.calculatedData;
      const data = state.data[activeTab];
      const { formula, resultFormuala } = action.payload;

      const dynamicFunctionCall = dynamicMathCalculation(
        formula[activeTab].params,
        formula[activeTab].formula
      );
      let result = dynamicFunctionCall(...Object.values(data));
      resultFormuala[activeTab].forEach((element: any) => {
        const dynamicFunction = dynamicMathCalculation(
          element.params,
          element.formula
        );
        const dataSet = element.params.map((param: string) => {
          if (param === 'result') {
            return result;
          } else {
            return data[param];
          }
        });
        if (
          (element.lebel === 'estTax' || element.lebel === 'totalAmount') &&
          calculatedData[activeTab].interestEarned < 100000
        ) {
          calculatedData[activeTab]['estTax'] = 0;
          calculatedData[activeTab]['totalAmount'] = result;
        } else {
          calculatedData[activeTab][element.lebel] = dynamicFunction(
            ...dataSet
          );
        }
        // calculatedData[activeTab][element.lebel] = dynamicFunction(...dataSet);
      });
    },
  },
});

export const {
  setActivetab,
  setIstaxable,
  setIsLoading,
  setFormDatas,
  calculateMutualFund,
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
export const calculatedDataByTabSelector = createSelector(
  (state: RootState) => state.mutualFund.calculatedData,
  (state: RootState) => state.mutualFund.activeTab,
  (calculatedData, activeTab) => calculatedData[activeTab]
);
