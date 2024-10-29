import { createSlice } from '@reduxjs/toolkit';
import { APILoaderInformation, Branch, BranchFormDefaultValues } from 'utils/types';

interface BranchControl {
  list: Branch[];
  branch: Branch;
  listAPI: APILoaderInformation;
  getApi: APILoaderInformation;
  createAPI: APILoaderInformation;
  updateAPI: APILoaderInformation;
  deleteAPI: APILoaderInformation;
}

const initialState: BranchControl = {
  list: [],
  branch: BranchFormDefaultValues,
  listAPI: { loading: false, error: '' },
  getApi: { loading: false, error: '' },
  createAPI: { loading: false, success: '', error: '' },
  updateAPI: { loading: false, success: '', error: '' },
  deleteAPI: { loading: false, success: '', error: '' },
};

const BranchSlice = createSlice({
  name: 'Branch',
  initialState,
  reducers: {
    listBranchesRequest: (state, action) => {
      state.listAPI.loading = true;
    },
    listBranchesSuccess: (state, action) => {
      state.listAPI.loading = false;
      state.list = action.payload;
    },
    listBranchesFailed: (state, action) => {
      state.listAPI.loading = false;
      state.listAPI.error = action.payload;
    },
    createBranchRequest: (state, action) => {
      state.createAPI.loading = true;
    },
    createBranchSuccess: (state, action) => {
      state.createAPI.loading = false;
      state.createAPI.success = action.payload;
    },
    createBranchFailed: (state, action) => {
      state.createAPI.loading = false;
      state.createAPI.success = action.payload;
      state.createAPI.error = action.payload;
    },
    resetCreateBranchControl: state => {
      state.createAPI.success = '';
    },
    deleteBranchRequest: (state, action) => {
      state.deleteAPI.loading = true;
    },
    deleteBranchSuccess: (state, action) => {
      state.deleteAPI.loading = false;
      state.deleteAPI.success = action.payload;
    },
    deleteBranchFailed: (state, action) => {
      state.deleteAPI.loading = false;
      state.deleteAPI.error = action.payload;
    },
    resetDeleteBranchControl: state => {
      state.deleteAPI.success = '';
    },
    updateBranchRequest: (state, action) => {
      state.updateAPI.loading = true;
    },
    updateBranchSuccess: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.success = action.payload;
    },
    updateBranchFailed: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.error = action.payload;
    },
    resetUpdateBranchControl: state => {
      state.updateAPI.success = '';
    },
  },
});

export default BranchSlice;
