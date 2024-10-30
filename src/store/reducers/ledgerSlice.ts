import { createSlice } from '@reduxjs/toolkit';
import { APILoaderInformation, LedgerFormDefaultValues } from 'utils/types';
import { Ledger } from 'utils/types';

interface ledgerControl {
  list: Ledger[];
  ledger: Ledger; ///hghjkhklhkjghjkhkj
  listAPI: APILoaderInformation;
  getApi: APILoaderInformation;
  createAPI: APILoaderInformation;
  updateAPI: APILoaderInformation;
  deleteAPI: APILoaderInformation;
}

const initialState: ledgerControl = {
  list: [],
  ledger: LedgerFormDefaultValues,
  listAPI: { loading: false, error: '' },
  getApi: { loading: false, error: '' },
  createAPI: { loading: false, success: '', error: '' },
  updateAPI: { loading: false, success: '', error: '' },
  deleteAPI: { loading: false, success: '', error: '' },
};

const LedgerSlice = createSlice({
  name: 'Ledger',
  initialState,
  reducers: {
    listLedgerRequest: (state, action) => {
      state.listAPI.loading = true;
    },
    listLedgerSuccess: (state, action) => {
      state.listAPI.loading = false;
      state.list = action.payload;
    },
    listLedgerFailed: (state, action) => {
      state.listAPI.loading = false;
      state.listAPI.error = action.payload;
    },
    getLedgerRequest: (state, action) => {
      state.getApi.loading = true;
    },
    getLedgersuccess: (state, action) => {
      state.getApi.loading = false;
      state.ledger = action.payload;
    },
    getLedgerFailed: (state, action) => {
      state.getApi.loading = false;
      state.getApi.error = action.payload;
    },
    resetGetLedgerControl: state => {
      state.ledger = LedgerFormDefaultValues;
    },
    createLedgerRequest: (state, action) => {
      state.createAPI.loading = true;
    },
    createLedgerSuccess: (state, action) => {
      state.createAPI.loading = false;
      state.createAPI.success = action.payload;
    },
    createLedgerFailed: (state, action) => {
      state.createAPI.loading = false;
      state.createAPI.success = action.payload;
      state.createAPI.error = action.payload;
    },
    resetCreateLedgerControl: state => {
      state.createAPI.success = '';
    },
    deleteLedgerRequest: (state, action) => {
      state.deleteAPI.loading = true;
    },
    deleteLedgerSuccess: (state, action) => {
      state.deleteAPI.loading = false;
      state.deleteAPI.success = action.payload;
    },
    deleteLedgerFailed: (state, action) => {
      state.deleteAPI.loading = false;
      state.deleteAPI.error = action.payload;
    },
    resetDeleteLedgerControl: state => {
      state.deleteAPI.success = '';
    },
    updateLedgerRequest: (state, action) => {
      state.updateAPI.loading = true;
    },
    updateLedgerSuccess: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.success = action.payload;
    },
    updateLedgerFailed: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.error = action.payload;
    },
    resetUpdateLedgerControl: state => {
      state.updateAPI.success = '';
    },
  },
});

export default LedgerSlice;
