import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { dynamicMathCalculation } from '@/utils/dynamicMathCalculation';

type EMICalcultor = {
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
const initialState: EMICalcultor = {
  data: {
    EMI: {},
  },
  result: 0,
  calculatedData: {
    EMI: {},
  },
  isTaxable: false,
  isLoading: false,
  activeTab: 'EMI',
  error: null,
};

const EMICalculatorSlice = createSlice({
  name: 'emiCalculatorSlice',
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
    calculateMonthlyEMI: (state, action) => {
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
      resultFormuala[activeTab].displayList.forEach((element: any) => {
        calculatedData[activeTab][element.lebel] = result[element.lebel];
      });
    },
  },
});

export const { setActivetab, setIsLoading, setFormDatas, calculateMonthlyEMI } =
  EMICalculatorSlice.actions;
export default EMICalculatorSlice.reducer;

export const activeTabSelector = createSelector(
  (state: RootState) => state.emiCalculator.activeTab,
  (activeTab) => activeTab
);
export const isTaxableSelector = createSelector(
  (state: RootState) => state.emiCalculator.isTaxable,
  (isTaxable) => isTaxable
);
export const isLoadingSelector = createSelector(
  (state: RootState) => state.emiCalculator.isLoading,
  (isLoading) => isLoading
);
export const formDataSelector = createSelector(
  (state: RootState) => state.emiCalculator.data,
  (state: RootState) => state.emiCalculator.activeTab,
  (data, activeTab) => data[activeTab]
);
export const calculatedDataByTabSelector = createSelector(
  (state: RootState) => state.emiCalculator.calculatedData,
  (state: RootState) => state.emiCalculator.activeTab,
  (calculatedData, activeTab) => calculatedData[activeTab]
);
