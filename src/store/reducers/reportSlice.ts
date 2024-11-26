import { createSlice } from '@reduxjs/toolkit';

import { APILoaderInformation } from 'utils/types';

interface ReportControl {
  list: any;
  pendingDocsList: any;
  allPendingCapitalList: any;
  defaultlist: any;
  listAPI: APILoaderInformation;
  pendingCaptialListAPI: APILoaderInformation;
  docsList: APILoaderInformation;
  defaultlistAPI: APILoaderInformation;
  updateAPI: APILoaderInformation;
  docUpdateAPI: APILoaderInformation;
}

const initialState: ReportControl = {
  list: [],
  allPendingCapitalList: [],
  pendingDocsList: [],
  defaultlist: [],
  pendingCaptialListAPI: { loading: false, error: '' },
  listAPI: { loading: false, error: '' },
  docsList: { loading: false, error: '' },
  defaultlistAPI: { loading: false, error: '' },
  updateAPI: { loading: false, success: '', error: '' },
  docUpdateAPI: { loading: false, success: '', error: '' },
};

const ReportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    //pendinglist-------------
    pendingListRequest: (state, action) => {
      state.listAPI.loading = true;
    },
    pendingListSuccess: (state, action) => {
      state.listAPI.loading = false;
      state.list = action.payload;
    },
    pendingListFailure: (state, action) => {
      state.listAPI.loading = false;
      state.listAPI.error = action.payload;
    },
    updatePendingRequest: (state, action) => {
      state.updateAPI.loading = true;
    },
    updatePendingSuccess: (state, action) => {
      state.updateAPI.loading = false;
      // state.list = action.payload;
      state.updateAPI.success = action.payload;
    },
    updatePendingFailure: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.error = action.payload;
    },
    resetUpdatePendingControl: state => {
      state.updateAPI.success = '';
    },
    //pending Capital list-----------------
    pendingCaptialListRequest: (state, action) => {
      state.pendingCaptialListAPI.loading = true;
    },
    pendingCapitalListSuccess: (state, action) => {
      state.pendingCaptialListAPI.loading = false;
      state.allPendingCapitalList = action.payload;
    },
    pendingCapitalListFailure: (state, action) => {
      state.pendingCaptialListAPI.loading = false;
      state.pendingCaptialListAPI.error = action.payload;
    },
    //DocumentList ----------------
    pendingDocumentsListRequest: (state, action) => {
      state.docsList.loading = true;
    },
    pendingDocumentsListSuccess: (state, action) => {
      state.pendingDocsList.loading = false;
      state.pendingDocsList = action.payload;
    },
    pendingDocumentsListFailure: (state, action) => {
      state.docsList.loading = false;
      state.docsList.error = action.payload;
    },
    updatePendingDocsRequest: (state, action) => {
      state.docUpdateAPI.loading = true;
    },
    updatePendingDocsSuccess: (state, action) => {
      state.docUpdateAPI.loading = false;
      state.docUpdateAPI.success = action.payload;
    },
    updatePendingDocsFailure: (state, action) => {
      state.docUpdateAPI.loading = false;
      state.docUpdateAPI.error = action.payload;
    },
    resetUpdatePendingDocsControl: state => {
      state.docUpdateAPI.success = '';
    },

    //DefaultList----------------------
    defaultListRequest: (state, action) => {
      state.defaultlistAPI.loading = true;
    },
    defaultListSuccess: (state, action) => {
      state.defaultlistAPI.loading = false;
      state.defaultlist = action.payload;
    },
    defaultListFailure: (state, action) => {
      state.defaultlistAPI.loading = false;
      state.defaultlistAPI.error = action.payload;
    },
  },
});

export default ReportSlice;
