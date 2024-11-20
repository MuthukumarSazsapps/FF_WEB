import { createSlice } from '@reduxjs/toolkit';
import { APILoaderInformation, EnumMaster,EnumMasterFormDefaultValues } from 'utils/types';

interface EnumMasterControl {
  
    EnumMaster: EnumMaster;
  createAPI: APILoaderInformation;
}

const initialState: EnumMasterControl = {
    EnumMaster: EnumMasterFormDefaultValues,
  createAPI: { loading: false, success: '', error: '' },
};

const EnumMasterSlice = createSlice({
  name: 'EnumMaster',
  initialState,
  reducers: {
    createEnumMasterRequest: (state, action) => {
      state.createAPI.loading = true;
    },
    createEnumMasterSuccess: (state, action) => {
      state.createAPI.loading = false;
      state.createAPI.success = action.payload;
    },
    createEnumMasterFailed: (state, action) => {
      state.createAPI.loading = false;
      state.createAPI.success = action.payload;
      state.createAPI.error = action.payload;
    },
    resetCreateEnumMasterControl: state => {
      state.createAPI.success = '';
    },
  },
});

export default EnumMasterSlice;
