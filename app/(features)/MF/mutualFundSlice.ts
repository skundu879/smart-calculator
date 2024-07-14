import { createSlice } from '@reduxjs/toolkit';

type MutualFund = {};

const MutualFundSlice = createSlice({
  name: 'mutualFund',
  initialState: {
    mutualFunds: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    fetchMutualFundsRequest(state) {
      state.isLoading = true;
    },
    fetchMutualFundsSuccess(state, action) {
      state.isLoading = false;
      state.mutualFunds = action.payload;
    },
    fetchMutualFundsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
