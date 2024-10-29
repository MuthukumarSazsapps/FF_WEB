import { createSlice } from '@reduxjs/toolkit';
import { APILoaderInformation, LedgerGroupFormDefaultValues } from 'utils/types';
import { LedgerGroup } from 'utils/types';

interface ledgerGroupControl {
  list: LedgerGroup[];
  ledgerGroup: LedgerGroup; ///hghjkhklhkjghjkhkj
  listAPI: APILoaderInformation;
  getApi: APILoaderInformation;
  createAPI: APILoaderInformation;
  updateAPI: APILoaderInformation;
  deleteAPI: APILoaderInformation;
}

const initialState: ledgerGroupControl = {
  list: [],
  ledgerGroup: LedgerGroupFormDefaultValues,
  listAPI: { loading: false, error: '' },
  getApi: { loading: false, error: '' },
  createAPI: { loading: false, success: '', error: '' },
  updateAPI: { loading: false, success: '', error: '' },
  deleteAPI: { loading: false, success: '', error: '' },
};

const LedgerGroupSlice = createSlice({
  name: 'LedgerGroup',
  initialState,
  reducers: {
    listLedgerGroupRequest: state => {
      state.listAPI.loading = true;
    },
    listLedgerGroupSuccess: (state, action) => {
      state.listAPI.loading = false;
      state.list = action.payload;
    },
    listLedgerGroupFailed: (state, action) => {
      state.listAPI.loading = false;
      state.listAPI.error = action.payload;
    },
    getLedgerGroupRequest: (state, action) => {
      state.getApi.loading = true;
    },
    getLedgerGroupsuccess: (state, action) => {
      state.getApi.loading = false;
      state.ledgerGroup = action.payload;
    },
    getLedgerGroupFailed: (state, action) => {
      state.getApi.loading = false;
      state.getApi.error = action.payload;
    },
    resetGetLedgerGroupControl: state => {
      state.ledgerGroup = LedgerGroupFormDefaultValues;
    },
    createLedgerGroupRequest: (state, action) => {
      state.createAPI.loading = true;
    },
    createLedgerGroupSuccess: (state, action) => {
      state.createAPI.loading = false;
      state.createAPI.success = action.payload;
    },
    createLedgerGroupFailed: (state, action) => {
      state.createAPI.loading = false;
      state.createAPI.success = action.payload;
      state.createAPI.error = action.payload;
    },
    resetCreateLedgerGroupControl: state => {
      state.createAPI.success = '';
    },
    deleteLedgerGroupRequest: (state, action) => {
      state.deleteAPI.loading = true;
    },
    deleteLedgerGroupSuccess: (state, action) => {
      state.deleteAPI.loading = false;
      state.deleteAPI.success = action.payload;
    },
    deleteLedgerGroupFailed: (state, action) => {
      state.deleteAPI.loading = false;
      state.deleteAPI.error = action.payload;
    },
    resetDeleteLedgerGroupControl: state => {
      state.deleteAPI.success = '';
    },
    updateLedgerGroupRequest: (state, action) => {
      state.updateAPI.loading = true;
    },
    updateLedgerGroupSuccess: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.success = action.payload;
    },
    updateLedgerGroupFailed: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.error = action.payload;
    },
    resetUpdateLedgerGroupControl: state => {
      state.updateAPI.success = '';
    },
  },
});

export default LedgerGroupSlice;
