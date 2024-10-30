import { createSlice } from '@reduxjs/toolkit';
import { APILoaderInformation, ShowRoom, ShowRoomFormDefaultValues } from 'utils/types';

interface ShowRoomControl {
  list: ShowRoom[];
  showroom: ShowRoom;
  listAPI: APILoaderInformation;
  getApi: APILoaderInformation;
  createAPI: APILoaderInformation;
  updateAPI: APILoaderInformation;
  deleteAPI: APILoaderInformation;
}

const initialState: ShowRoomControl = {
  list: [],
  showroom: ShowRoomFormDefaultValues,
  listAPI: { loading: false, error: '' },
  getApi: { loading: false, error: '' },
  createAPI: { loading: false, success: '', error: '' },
  updateAPI: { loading: false, success: '', error: '' },
  deleteAPI: { loading: false, success: '', error: '' },
};

const ShowRoomSlice = createSlice({
  name: 'ShowRoom',
  initialState,
  reducers: {
    listShowRoomsRequest: (state, action) => {
      state.listAPI.loading = true;
    },
    listShowRoomsSuccess: (state, action) => {
      state.listAPI.loading = false;
      state.list = action.payload;
    },
    listShowRoomsFailed: (state, action) => {
      state.listAPI.loading = false;
      state.listAPI.error = action.payload;
    },
    createShowRoomRequest: (state, action) => {
      state.createAPI.loading = true;
    },
    createShowRoomSuccess: (state, action) => {
      state.createAPI.loading = false;
      state.createAPI.success = action.payload;
    },
    createShowRoomFailed: (state, action) => {
      state.createAPI.loading = false;
      state.createAPI.success = action.payload;
      state.createAPI.error = action.payload;
    },
    resetCreateShowRoomControl: state => {
      state.createAPI.success = '';
    },
    deleteShowRoomRequest: (state, action) => {
      state.deleteAPI.loading = true;
    },
    deleteShowRoomSuccess: (state, action) => {
      state.deleteAPI.loading = false;
      state.deleteAPI.success = action.payload;
    },
    deleteShowRoomFailed: (state, action) => {
      state.deleteAPI.loading = false;
      state.deleteAPI.error = action.payload;
    },
    resetDeleteShowRoomControl: state => {
      state.deleteAPI.success = '';
    },
    updateShowRoomRequest: (state, action) => {
      state.updateAPI.loading = true;
    },
    updateShowRoomSuccess: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.success = action.payload;
    },
    updateShowRoomFailed: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.error = action.payload;
    },
    resetUpdateShowRoomControl: state => {
      state.updateAPI.success = '';
    },
  },
});

export default ShowRoomSlice;
