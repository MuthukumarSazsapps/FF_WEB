import { createSlice } from '@reduxjs/toolkit';
import { APILoaderInformation } from 'utils/types';

interface LoanControl {
  loanDisburseAPI: APILoaderInformation;
}

const initialState: LoanControl = {
  loanDisburseAPI: { loading: false, success: '', error: '' },
};

const PaymentSlice = createSlice({
  name: 'Payments',
  initialState,
  reducers: {
    loanDisburseRequest: (state, action) => {
      state.loanDisburseAPI.loading = true;
    },
    loanDisburseSuccess: (state, action) => {
      state.loanDisburseAPI.loading = false;
      state.loanDisburseAPI.success = action.payload;
    },
    loanDisburseFailed: (state, action) => {
      state.loanDisburseAPI.loading = false;
      state.loanDisburseAPI.success = action.payload;
      state.loanDisburseAPI.error = action.payload;
    },
    resetloanDisburseControl: state => {
      state.loanDisburseAPI.success = '';
    },
  },
});

export default PaymentSlice;
