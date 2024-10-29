import { createSlice } from '@reduxjs/toolkit';
import { APILoaderInformation } from 'utils/types';
import { User, userFormDefaultValues } from 'utils/types/users.schema';
interface UserState {
  list: User[];
  user: User;
  listAPI: APILoaderInformation;
  getApi: APILoaderInformation;
  createAPI: APILoaderInformation;
  updateAPI: APILoaderInformation;
  deleteAPI: APILoaderInformation;
}
const initialState: UserState = {
  list: [],
  user: userFormDefaultValues,
  listAPI: { loading: false, error: '' },
  getApi: { loading: false, error: '' },
  createAPI: { loading: false, success: '', error: '' },
  updateAPI: { loading: false, success: '', error: '' },
  deleteAPI: { loading: false, success: '', error: '' },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    listUsersRequest: (state, action) => {
      state.listAPI.loading = true;
    },
    listUsersSuccess: (state, action) => {
      state.listAPI.loading = false;
      state.list = action.payload;
    },
    listUsersFailed: (state, action) => {
      state.listAPI.loading = false;
      state.listAPI.error = action.payload;
    },
    getUserRequest: (state, action) => {
      state.getApi.loading = true;
    },
    getUserSuccess: (state, action) => {
      state.getApi.loading = false;
      state.user = action.payload.data[0];
    },
    getUsersFailed: (state, action) => {
      state.getApi.loading = false;
      state.getApi.error = action.payload;
    },
    resetGetUserState: state => {
      state.user = userFormDefaultValues;
    },
    createUserRequest: (state, action) => {
      state.createAPI.loading = true;
    },
    createUserSuccess: (state, action) => {
      state.createAPI.loading = false;
      state.createAPI.success = action.payload;
    },
    createUserFailed: (state, action) => {
      state.createAPI.loading = false;
      state.createAPI.success = action.payload;
      state.createAPI.error = action.payload;
    },
    resetCreateUserState: state => {
      state.createAPI.success = '';
    },
    deleteUserRequest: (state, action) => {
      state.deleteAPI.loading = true;
    },
    deleteUserSuccess: (state, action) => {
      state.deleteAPI.loading = false;
      state.deleteAPI.success = action.payload;
    },
    deleteUserFailed: (state, action) => {
      state.deleteAPI.loading = false;
      state.deleteAPI.error = action.payload;
    },
    resetDeleteUserState: state => {
      state.deleteAPI.success = '';
    },
    updateUserRequest: (state, action) => {
      state.updateAPI.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.success = action.payload;
    },
    updateUserFailed: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.error = action.payload;
    },
    resetUpdateUserState: state => {
      state.updateAPI.success = '';
    },
    logoutUser: state => {
      state.user = userFormDefaultValues;
    },
  },
});

export default userSlice;
