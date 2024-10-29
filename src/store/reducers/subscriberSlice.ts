import { createSlice } from '@reduxjs/toolkit';
import {
  APILoaderInformation,
  Subscriber,
  SubscriberFormFieldTypes,
  subscriberFormDefaultValues,
} from 'utils/types';

interface SubscriberState {
  list: Subscriber[];
  logs: any;
  subscriber: any;
  listAPI: APILoaderInformation;
  logsAPI: APILoaderInformation;
  getApi: APILoaderInformation;
  createAPI: APILoaderInformation;
  updateAPI: APILoaderInformation;
  deleteAPI: APILoaderInformation;
}

const initialState: SubscriberState = {
  list: [],
  subscriber: subscriberFormDefaultValues,
  logs: [],
  logsAPI: { loading: false, error: '' },
  listAPI: { loading: false, error: '' },
  getApi: { loading: false, error: '' },
  createAPI: { loading: false, success: '', error: '' },
  updateAPI: { loading: false, success: '', error: '' },
  deleteAPI: { loading: false, success: '', error: '' },
};

const subscriberSlice = createSlice({
  name: 'subscriber',
  initialState,
  reducers: {
    listSubscribersRequest: state => {
      state.listAPI.loading = true;
    },
    listSubscribersSuccess: (state, action) => {
      state.listAPI.loading = false;
      state.list = action.payload;
    },
    listSubscribersFailed: (state, action) => {
      state.listAPI.loading = false;
      state.listAPI.error = action.payload;
    },
    listLogsRequest: (state, action) => {
      state.logsAPI.loading = true;
    },
    listLogsSuccess: (state, action) => {
      state.logsAPI.loading = false;
      state.logs = action.payload;
    },
    listLogsFailed: (state, action) => {
      state.logsAPI.loading = false;
      state.logsAPI.error = action.payload;
    },
    resetLogsList: state => {
      state.logs = [];
    },
    getSubscriberRequest: (state, action) => {
      state.getApi.loading = true;
    },
    getSubscriberSuccess: (state, action) => {
      state.getApi.loading = false;
      state.subscriber = action.payload;
    },
    getSubscribersFailed: (state, action) => {
      state.getApi.loading = false;
      state.getApi.error = action.payload;
    },
    resetGetSubscriberState: state => {
      state.subscriber = subscriberFormDefaultValues;
    },
    createSubscriberRequest: (state, action) => {
      state.createAPI.loading = true;
    },
    createSubscriberSuccess: (state, action) => {
      state.createAPI.loading = false;
      state.createAPI.success = action.payload;
    },
    createSubscriberFailed: (state, action) => {
      state.createAPI.loading = false;
      state.createAPI.success = action.payload;
      state.createAPI.error = action.payload;
    },
    resetCreateSubscriberState: state => {
      state.createAPI.success = '';
    },
    deleteSubscriberRequest: (state, action) => {
      state.deleteAPI.loading = true;
    },
    deleteSubscriberSuccess: (state, action) => {
      state.deleteAPI.loading = false;
      state.deleteAPI.success = action.payload;
    },
    deleteSubscriberFailed: (state, action) => {
      state.deleteAPI.loading = false;
      state.deleteAPI.error = action.payload;
    },
    resetDeleteSubscriberState: state => {
      state.deleteAPI.success = '';
    },
    updateSubscriberRequest: (state, action) => {
      state.updateAPI.loading = true;
    },
    updateSubscriberSuccess: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.success = action.payload;
    },
    updateSubscriberFailed: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.error = action.payload;
    },
    resetUpdateSubscriberState: state => {
      state.updateAPI.success = '';
    },
  },
});

export default subscriberSlice;
