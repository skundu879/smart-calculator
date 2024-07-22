import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { dynamicMathCalculation } from '@/utils/dynamicMathCalculation';

type SalaryCalcultor = {
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
const initialState: SalaryCalcultor = {
  data: {
    SC: {},
  },
  result: 0,
  calculatedData: {
    SC: {},
  },
  isTaxable: false,
  isLoading: false,
  activeTab: 'SC',
  error: null,
};

const SalaryCalcultorSlice = createSlice({
  name: 'salaryCalcultor',
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
    calculateTakeHomeSalary: (state, action) => {
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
      resultFormuala[activeTab].forEach((element: any) => {
        calculatedData[activeTab][element.lebel] = result[element.lebel];
      });
    },
  },
});

export const {
  setActivetab,
  setIsLoading,
  setFormDatas,
  calculateTakeHomeSalary,
} = SalaryCalcultorSlice.actions;
export default SalaryCalcultorSlice.reducer;

export const activeTabSelector = createSelector(
  (state: RootState) => state.salaryCalculator.activeTab,
  (activeTab) => activeTab
);
export const isTaxableSelector = createSelector(
  (state: RootState) => state.salaryCalculator.isTaxable,
  (isTaxable) => isTaxable
);
export const isLoadingSelector = createSelector(
  (state: RootState) => state.salaryCalculator.isLoading,
  (isLoading) => isLoading
);
export const formDataSelector = createSelector(
  (state: RootState) => state.salaryCalculator.data,
  (state: RootState) => state.salaryCalculator.activeTab,
  (data, activeTab) => data[activeTab]
);
export const calculatedDataByTabSelector = createSelector(
  (state: RootState) => state.salaryCalculator.calculatedData,
  (state: RootState) => state.salaryCalculator.activeTab,
  (calculatedData, activeTab) => calculatedData[activeTab]
);
