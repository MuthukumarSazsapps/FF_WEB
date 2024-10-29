import { createSlice } from '@reduxjs/toolkit';
import { APILoaderInformation, Vehicle, VehicleFormDefaultValues } from 'utils/types';

interface VehicleControl {
  list: Vehicle[];
  vehicle: Vehicle;
  listAPI: APILoaderInformation;
  getApi: APILoaderInformation;
  createAPI: APILoaderInformation;
  updateAPI: APILoaderInformation;
  deleteAPI: APILoaderInformation;
}

const initialState: VehicleControl = {
  list: [],
  vehicle: VehicleFormDefaultValues,
  listAPI: { loading: false, error: '' },
  getApi: { loading: false, error: '' },
  createAPI: { loading: false, success: '', error: '' },
  updateAPI: { loading: false, success: '', error: '' },
  deleteAPI: { loading: false, success: '', error: '' },
};

const VehicleSlice = createSlice({
  name: 'Vehicle',
  initialState,
  reducers: {
    listVehiclesRequest: (state, action) => {
      state.listAPI.loading = true;
    },
    listVehiclesSuccess: (state, action) => {
      state.listAPI.loading = false;
      state.list = action.payload;
    },
    listVehiclesFailed: (state, action) => {
      state.listAPI.loading = false;
      state.listAPI.error = action.payload;
    },
    createVehicleRequest: (state, action) => {
      state.createAPI.loading = true;
    },
    createVehicleSuccess: (state, action) => {
      state.createAPI.loading = false;
      state.createAPI.success = action.payload;
    },
    createVehicleFailed: (state, action) => {
      state.createAPI.loading = false;
      state.createAPI.success = action.payload;
      state.createAPI.error = action.payload;
    },
    resetCreateVehicleControl: state => {
      state.createAPI.success = '';
    },
    deleteVehicleRequest: (state, action) => {
      state.deleteAPI.loading = true;
    },
    deleteVehicleSuccess: (state, action) => {
      state.deleteAPI.loading = false;
      state.deleteAPI.success = action.payload;
    },
    deleteVehicleFailed: (state, action) => {
      state.deleteAPI.loading = false;
      state.deleteAPI.error = action.payload;
    },
    resetDeleteVehicleControl: state => {
      state.deleteAPI.success = '';
    },
    updateVehicleRequest: (state, action) => {
      state.updateAPI.loading = true;
    },
    updateVehicleSuccess: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.success = action.payload;
    },
    updateVehicleFailed: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.error = action.payload;
    },
    resetUpdateVehicleControl: state => {
      state.updateAPI.success = '';
    },
  },
});

export default VehicleSlice;
