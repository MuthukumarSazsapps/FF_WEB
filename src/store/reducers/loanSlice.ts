import { createSlice } from '@reduxjs/toolkit';
import { APILoaderInformation, Loan, LoanFormDefaultValues } from 'utils/types';

interface LoanControl {
  list: Loan[];
  loan: any;
  listAPI: APILoaderInformation;
  getApi: APILoaderInformation;
  createAPI: APILoaderInformation;
  updateAPI: APILoaderInformation;
  deleteAPI: APILoaderInformation;
}

const initialState: LoanControl = {
  list: [],
  loan: LoanFormDefaultValues,
  listAPI: { loading: false, error: '' },
  getApi: { loading: false, error: '' },
  createAPI: { loading: false, success: '', error: '' },
  updateAPI: { loading: false, success: '', error: '' },
  deleteAPI: { loading: false, success: '', error: '' },
};

const LoanSlice = createSlice({
  name: 'Loan',
  initialState,
  reducers: {
    listLoansRequest: (state, action) => {
      state.listAPI.loading = true;
    },
    listLoansSuccess: (state, action) => {
      state.listAPI.loading = false;
      state.list = action.payload;
    },
    listLoansFailed: (state, action) => {
      state.listAPI.loading = false;
      state.listAPI.error = action.payload;
    },
    createLoanRequest: (state, action) => {
      state.createAPI.loading = true;
    },
    createLoanSuccess: (state, action) => {
      state.createAPI.loading = false;
      state.createAPI.success = action.payload;
    },
    createLoanFailed: (state, action) => {
      state.createAPI.loading = false;
      state.createAPI.success = action.payload;
      state.createAPI.error = action.payload;
    },
    resetCreateLoanControl: state => {
      state.createAPI.success = '';
    },
    deleteLoanRequest: (state, action) => {
      state.deleteAPI.loading = true;
    },
    deleteLoanSuccess: (state, action) => {
      state.deleteAPI.loading = false;
      state.deleteAPI.success = action.payload;
    },
    deleteLoanFailed: (state, action) => {
      state.deleteAPI.loading = false;
      state.deleteAPI.error = action.payload;
    },
    resetDeleteLoanControl: state => {
      state.deleteAPI.success = '';
    },
    updateLoanRequest: (state, action) => {
      state.updateAPI.loading = true;
    },
    updateLoanSuccess: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.success = action.payload;
    },
    updateLoanFailed: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.error = action.payload;
    },
    resetUpdateLoanControl: state => {
      state.updateAPI.success = '';
    },
  },
});

export default LoanSlice;
