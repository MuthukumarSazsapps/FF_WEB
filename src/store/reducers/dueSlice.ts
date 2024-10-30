import { createSlice } from '@reduxjs/toolkit';
import {
  APILoaderInformation,
  DueEntry,
  DueEntryFormDefaultValues,
  DueEntryFormFieldTypes,
  PrecloseLoan,
  PrecloseLoanFormDefaultValues,
} from 'utils/types';
interface DueControl {
  due: DueEntryFormFieldTypes;
  precloseData: any;
  dayReportData: any;
  pendingDueList: DueEntry[];
  dayReportAPI: APILoaderInformation;
  precloseAPI: APILoaderInformation;
  getApi: APILoaderInformation;
  listAPI: APILoaderInformation;
  updateAPI: APILoaderInformation;
  deleteAPI: APILoaderInformation;
  precloseLoanAPI: APILoaderInformation;
}

const initialState: DueControl = {
  due: DueEntryFormDefaultValues,
  precloseData: PrecloseLoanFormDefaultValues,
  pendingDueList: [],
  dayReportData: [],
  dayReportAPI: { loading: false, error: '' },
  precloseAPI: { loading: false, error: '' },
  listAPI: { loading: false, error: '' },
  getApi: { loading: false, error: '' },
  updateAPI: { loading: false, success: '', error: '' },
  deleteAPI: { loading: false, success: '', error: '' },
  precloseLoanAPI: { loading: false, success: '', error: '' },
};

const DueSlice = createSlice({
  name: 'Due',
  initialState,
  reducers: {
    listPendingDuesRequest: (state, action) => {
      state.listAPI.loading = true;
    },
    listPendingDuesSuccess: (state, action) => {
      state.listAPI.loading = false;
      state.pendingDueList = action.payload;
    },
    listPendingDuesFailed: (state, action) => {
      state.listAPI.loading = false;
      state.listAPI.error = action.payload;
    },
    getDayReportRequest: (state, action) => {
      state.dayReportAPI.loading = true;
    },
    getDayReportSuccess: (state, action) => {
      state.dayReportAPI.loading = false;
      state.dayReportData = action.payload;
    },
    getDayReportFailed: (state, action) => {
      state.dayReportAPI.loading = false;
      state.dayReportAPI.error = action.payload;
    },
    resetDayReportData: state => {
      state.dayReportData = [];
    },
    getDueRequest: (state, action) => {
      state.due = DueEntryFormDefaultValues;
      state.getApi.loading = true;
    },
    getDueSuccess: (state, action) => {
      state.getApi.loading = false;
      state.due = action.payload;
    },
    getDueFailed: (state, action) => {
      state.getApi.loading = false;
      state.getApi.error = action.payload;
    },
    getPrecloseRequest: (state, action) => {
      state.precloseData = PrecloseLoanFormDefaultValues;
      state.precloseAPI.loading = true;
    },
    getPrecloseSuccess: (state, action) => {
      state.precloseAPI.loading = false;
      state.precloseData = action.payload;
    },
    getPrecloseFailed: (state, action) => {
      state.precloseAPI.loading = false;
      state.precloseAPI.error = action.payload;
    },
    resetPrecloseControl: state => {
      state.precloseAPI.success = '';
      state.precloseData = PrecloseLoanFormDefaultValues;
    },
    updateDueRequest: (state, action) => {
      state.updateAPI.loading = true;
    },
    updateDueSuccess: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.success = action.payload;
    },
    updateDueFailed: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.error = action.payload;
    },
    resetUpdateDueControl: state => {
      state.updateAPI.success = '';
    },
    deleteDueRequest: (state, action) => {
      state.deleteAPI.loading = true;
    },
    deleteDueSuccess: (state, action) => {
      state.deleteAPI.loading = false;
      state.deleteAPI.success = action.payload;
    },
    deleteDueFailed: (state, action) => {
      state.deleteAPI.loading = false;
      state.deleteAPI.error = action.payload;
    },
    resetDeleteDueControl: state => {
      state.deleteAPI.success = '';
    },
    precloseLoanRequest: (state, action) => {
      state.precloseLoanAPI.loading = true;
    },
    precloseLoanSuccess: (state, action) => {
      state.precloseLoanAPI.loading = false;
      state.precloseLoanAPI.success = action.payload;
    },
    precloseLoanFailed: (state, action) => {
      state.precloseLoanAPI.loading = false;
      state.precloseLoanAPI.error = action.payload;
    },
    resetprecloseLoanControl: state => {
      state.precloseLoanAPI.success = '';
    },
  },
});
export default DueSlice;
