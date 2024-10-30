import { createSlice } from '@reduxjs/toolkit';
import { APILoaderInformation, CityFormDefaultValues } from 'utils/types';
import { City } from 'utils/types';

interface CityControl {
  list: City[];
  city: City;
  listAPI: APILoaderInformation;
  getApi: APILoaderInformation;
  createAPI: APILoaderInformation;
  updateAPI: APILoaderInformation;
  deleteAPI: APILoaderInformation;
}

const initialState: CityControl = {
  list: [],
  city: CityFormDefaultValues,
  listAPI: { loading: false, error: '' },
  getApi: { loading: false, error: '' },
  createAPI: { loading: false, success: '', error: '' },
  updateAPI: { loading: false, success: '', error: '' },
  deleteAPI: { loading: false, success: '', error: '' },
};

const CitySlice = createSlice({
  name: 'City',
  initialState,
  reducers: {
    listCitiesRequest: state => {
      state.listAPI.loading = true;
    },
    listCitiesSuccess: (state, action) => {
      state.listAPI.loading = false;
      state.list = action.payload;
    },
    listCitiesFailed: (state, action) => {
      state.listAPI.loading = false;
      state.listAPI.error = action.payload;
    },
    getCityRequest: (state, action) => {
      state.getApi.loading = true;
    },
    getCitiesuccess: (state, action) => {
      state.getApi.loading = false;
      state.city = action.payload;
    },
    getCitiesFailed: (state, action) => {
      state.getApi.loading = false;
      state.getApi.error = action.payload;
    },
    resetGetCityControl: state => {
      state.city = CityFormDefaultValues;
    },
    createCityRequest: (state, action) => {
      state.createAPI.loading = true;
    },
    createCitySuccess: (state, action) => {
      state.createAPI.loading = false;
      state.createAPI.success = action.payload;
    },
    createCityFailed: (state, action) => {
      state.createAPI.loading = false;
      state.createAPI.success = action.payload;
      state.createAPI.error = action.payload;
    },
    resetCreateCityControl: state => {
      state.createAPI.success = '';
    },
    deleteCityRequest: (state, action) => {
      state.deleteAPI.loading = true;
    },
    deleteCitySuccess: (state, action) => {
      state.deleteAPI.loading = false;
      state.deleteAPI.success = action.payload;
    },
    deleteCityFailed: (state, action) => {
      state.deleteAPI.loading = false;
      state.deleteAPI.error = action.payload;
    },
    resetDeleteCityControl: state => {
      state.deleteAPI.success = '';
    },
    updateCityRequest: (state, action) => {
      state.updateAPI.loading = true;
    },
    updateCitySuccess: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.success = action.payload;
    },
    updateCityFailed: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.error = action.payload;
    },
    resetUpdateCityControl: state => {
      state.updateAPI.success = '';
    },
  },
});

export default CitySlice;
