import { createSlice } from '@reduxjs/toolkit';
import { APILoaderInformation, SubCity, SubCityFormDefaultValues } from 'utils/types';

interface SubCityControl {
  list: SubCity[];
  city: SubCity;
  listAPI: APILoaderInformation;
  getApi: APILoaderInformation;
  createAPI: APILoaderInformation;
  updateAPI: APILoaderInformation;
  deleteAPI: APILoaderInformation;
}

const initialState: SubCityControl = {
  list: [],
  city: SubCityFormDefaultValues,
  listAPI: { loading: false, error: '' },
  getApi: { loading: false, error: '' },
  createAPI: { loading: false, success: '', error: '' },
  updateAPI: { loading: false, success: '', error: '' },
  deleteAPI: { loading: false, success: '', error: '' },
};

const SubCitySlice = createSlice({
  name: 'SubCity',
  initialState,
  reducers: {
    listSubCitiesRequest: (state, action) => {
      state.listAPI.loading = true;
    },
    listSubCitiesSuccess: (state, action) => {
      state.listAPI.loading = false;
      state.list = action.payload;
    },
    listSubCitiesFailed: (state, action) => {
      state.listAPI.loading = false;
      state.listAPI.error = action.payload;
    },
    createSubCityRequest: (state, action) => {
      state.createAPI.loading = true;
    },
    createSubCitySuccess: (state, action) => {
      state.createAPI.loading = false;
      state.createAPI.success = action.payload;
    },
    createSubCityFailed: (state, action) => {
      state.createAPI.loading = false;
      state.createAPI.success = action.payload;
      state.createAPI.error = action.payload;
    },
    resetCreateSubCityControl: state => {
      state.createAPI.success = '';
    },
    deleteSubCityRequest: (state, action) => {
      state.deleteAPI.loading = true;
    },
    deleteSubCitySuccess: (state, action) => {
      state.deleteAPI.loading = false;
      state.deleteAPI.success = action.payload;
    },
    deleteSubCityFailed: (state, action) => {
      state.deleteAPI.loading = false;
      state.deleteAPI.error = action.payload;
    },
    resetDeleteSubCityControl: state => {
      state.deleteAPI.success = '';
    },
    updateSubCityRequest: (state, action) => {
      state.updateAPI.loading = true;
    },
    updateSubCitySuccess: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.success = action.payload;
    },
    updateSubCityFailed: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.error = action.payload;
    },
    resetUpdateSubCityControl: state => {
      state.updateAPI.success = '';
    },
  },
});

export default SubCitySlice;
