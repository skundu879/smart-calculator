import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';
import { dynamicMathCalculation } from '@/utils/dynamicMathCalculation';

type ProvidentFund = {
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
const initialState: ProvidentFund = {
  data: {
    EPF: {},
    PPF: {},
    GPF: {},
  },
  result: 0,
  calculatedData: {
    EPF: {},
    PPF: {},
    GPF: {},
  },
  isTaxable: false,
  isLoading: false,
  activeTab: 'EPF',
  error: null,
};

const ProvidentFundSlice = createSlice({
  name: 'providentFund',
  initialState,
  reducers: {
    setActivetab: (state, action) => {
      state.activeTab = action.payload;
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
      let result = dynamicFunctionCall(...Object.values(data))(
        ...Object.values(data)
      );
      console.log('result', result);
      resultFormuala[activeTab].forEach((element: any) => {
        calculatedData[activeTab][element.lebel] = result[element.lebel];
      });
    },
  },
});

export const { setActivetab, setIsLoading, setFormDatas, calculateMutualFund } =
  ProvidentFundSlice.actions;
export default ProvidentFundSlice.reducer;

export const activeTabSelector = createSelector(
  (state: RootState) => state.providentFund.activeTab,
  (activeTab) => activeTab
);
export const isTaxableSelector = createSelector(
  (state: RootState) => state.providentFund.isTaxable,
  (isTaxable) => isTaxable
);
export const isLoadingSelector = createSelector(
  (state: RootState) => state.providentFund.isLoading,
  (isLoading) => isLoading
);
export const formDataSelector = createSelector(
  (state: RootState) => state.providentFund.data,
  (state: RootState) => state.providentFund.activeTab,
  (data, activeTab) => data[activeTab]
);
export const calculatedDataByTabSelector = createSelector(
  (state: RootState) => state.providentFund.calculatedData,
  (state: RootState) => state.providentFund.activeTab,
  (calculatedData, activeTab) => calculatedData[activeTab]
);
