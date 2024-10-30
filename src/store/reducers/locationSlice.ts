import { createSlice } from '@reduxjs/toolkit';
import { APILoaderInformation, LocationFormDefaultValues } from 'utils/types';
import { Location } from 'utils/types';

interface LocationControl {
  list: Location[];
  location: any;
  listAPI: APILoaderInformation;
  getApi: APILoaderInformation;
  createAPI: APILoaderInformation;
  updateAPI: APILoaderInformation;
  deleteAPI: APILoaderInformation;
}

const initialState: LocationControl = {
  list: [],
  location: LocationFormDefaultValues,
  listAPI: { loading: false, error: '' },
  getApi: { loading: false, error: '' },
  createAPI: { loading: false, success: '', error: '' },
  updateAPI: { loading: false, success: '', error: '' },
  deleteAPI: { loading: false, success: '', error: '' },
};

const LocationSlice = createSlice({
  name: 'Location',
  initialState,
  reducers: {
    listLocationsRequest: state => {
      state.listAPI.loading = true;
    },
    listLocationsSuccess: (state, action) => {
      state.listAPI.loading = false;
      state.list = action.payload;
    },
    listLocationsFailed: (state, action) => {
      state.listAPI.loading = false;
      state.listAPI.error = action.payload;
    },
    getLocationRequest: (state, action) => {
      state.getApi.loading = true;
    },
    getLocationsuccess: (state, action) => {
      state.getApi.loading = false;
      state.location = action.payload;
    },
    getLocationsFailed: (state, action) => {
      state.getApi.loading = false;
      state.getApi.error = action.payload;
    },
    resetGetLocationControl: state => {
      state.location = LocationFormDefaultValues;
    },
    createLocationRequest: (state, action) => {
      state.createAPI.loading = true;
    },
    createLocationsuccess: (state, action) => {
      state.createAPI.loading = false;
      state.createAPI.success = action.payload;
    },
    createLocationFailed: (state, action) => {
      state.createAPI.loading = false;
      state.createAPI.success = action.payload;
      state.createAPI.error = action.payload;
    },
    resetCreateLocationControl: state => {
      state.createAPI.success = '';
    },
    deleteLocationRequest: (state, action) => {
      state.deleteAPI.loading = true;
    },
    deleteLocationsuccess: (state, action) => {
      state.deleteAPI.loading = false;
      state.deleteAPI.success = action.payload;
    },
    deleteLocationFailed: (state, action) => {
      state.deleteAPI.loading = false;
      state.deleteAPI.error = action.payload;
    },
    resetDeleteLocationControl: state => {
      state.deleteAPI.success = '';
    },
    updateLocationRequest: (state, action) => {
      state.updateAPI.loading = true;
    },
    updateLocationsuccess: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.success = action.payload;
    },
    updateLocationFailed: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.error = action.payload;
    },
    resetUpdateLocationControl: state => {
      state.updateAPI.success = '';
    },
  },
});

export default LocationSlice;
