import { createSlice } from '@reduxjs/toolkit';
import { APILoaderInformation, Customer, CustomerFormDefaultValues } from 'utils/types';

interface CustomerControl {
  list: Customer[];
  customer: any;
  listAPI: APILoaderInformation;
  getApi: APILoaderInformation;
  createAPI: APILoaderInformation;
  updateAPI: APILoaderInformation;
  deleteAPI: APILoaderInformation;
}

const initialState: CustomerControl = {
  list: [],
  customer: CustomerFormDefaultValues,
  listAPI: { loading: false, error: '' },
  getApi: { loading: false, error: '' },
  createAPI: { loading: false, success: '', error: '' },
  updateAPI: { loading: false, success: '', error: '' },
  deleteAPI: { loading: false, success: '', error: '' },
};

const CustomerSlice = createSlice({
  name: 'Customer',
  initialState,
  reducers: {
    listCustomersRequest: (state, action) => {
      state.listAPI.loading = true;
    },
    listCustomersSuccess: (state, action) => {
      state.listAPI.loading = false;
      state.list = action.payload;
    },
    listCustomersFailed: (state, action) => {
      state.listAPI.loading = false;
      state.listAPI.error = action.payload;
    },
    getCustomersRequest: (state, action) => {
      state.customer = CustomerFormDefaultValues;
      state.getApi.loading = true;
    },
    getCustomersSuccess: (state, action) => {
      state.getApi.loading = false;
      state.customer = action.payload;
    },
    getCustomersFailed: (state, action) => {
      state.getApi.loading = false;
      state.getApi.error = action.payload;
    },
    resetgetCustomers: state => {
      state.customer = CustomerFormDefaultValues;
    },
    createCustomerRequest: (state, action) => {
      state.createAPI.loading = true;
    },
    createCustomerSuccess: (state, action) => {
      state.createAPI.loading = false;
      state.createAPI.success = action.payload;
    },
    createCustomerFailed: (state, action) => {
      state.createAPI.loading = false;
      state.createAPI.success = action.payload;
      state.createAPI.error = action.payload;
    },
    resetCreateCustomerControl: state => {
      state.createAPI.success = '';
    },
    deleteCustomerRequest: (state, action) => {
      state.deleteAPI.loading = true;
    },
    deleteCustomerSuccess: (state, action) => {
      state.deleteAPI.loading = false;
      state.deleteAPI.success = action.payload;
    },
    deleteCustomerFailed: (state, action) => {
      state.deleteAPI.loading = false;
      state.deleteAPI.error = action.payload;
    },
    resetDeleteCustomerControl: state => {
      state.deleteAPI.success = '';
    },
    updateCustomerRequest: (state, action) => {
      state.updateAPI.loading = true;
    },
    updateCustomerSuccess: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.success = action.payload;
    },
    updateCustomerFailed: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.error = action.payload;
    },
    resetUpdateCustomerControl: state => {
      state.updateAPI.success = '';
    },
  },
});

export default CustomerSlice;
