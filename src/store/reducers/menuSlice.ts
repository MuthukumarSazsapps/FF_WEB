import { createSlice } from '@reduxjs/toolkit';
import { APILoaderInformation } from 'utils/types';
import { Menu, menuFormDefaultValues } from 'utils/types/menu.schema';

interface MenuState {
  list: Menu[];
  menu: any;
  listAPI: APILoaderInformation;
  getApi: APILoaderInformation;
  createAPI: APILoaderInformation;
  updateAPI: APILoaderInformation;
  deleteAPI: APILoaderInformation;
}
const initialState: MenuState = {
  list: [],
  menu: menuFormDefaultValues,
  listAPI: { loading: false, error: '' },
  getApi: { loading: false, error: '' },
  createAPI: { loading: false, success: '', error: '' },
  updateAPI: { loading: false, success: '', error: '' },
  deleteAPI: { loading: false, success: '', error: '' },
};

const MenuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    listMenusRequest: (state, action) => {
      state.listAPI.loading = true;
    },
    listMenusSuccess: (state, action) => {
      state.listAPI.loading = false;
      state.list = action.payload;
    },
    listMenusFailed: (state, action) => {
      state.listAPI.loading = false;
      state.listAPI.error = action.payload;
    },
    getMenuRequest: (state, action) => {
      state.getApi.loading = true;
    },
    getMenusuccess: (state, action) => {
      state.getApi.loading = false;
      state.menu = action.payload;
    },
    getMenusFailed: (state, action) => {
      state.getApi.loading = false;
      state.getApi.error = action.payload;
    },
    resetGetMenuState: state => {
      state.menu = menuFormDefaultValues;
    },
    createMenuRequest: (state, action) => {
      state.createAPI.loading = true;
    },
    createMenusuccess: (state, action) => {
      state.createAPI.loading = false;
      state.createAPI.success = action.payload;
    },
    createMenuFailed: (state, action) => {
      state.createAPI.loading = false;
      state.createAPI.success = action.payload;
      state.createAPI.error = action.payload;
    },
    resetCreateMenuState: state => {
      state.createAPI.success = '';
    },
    deleteMenuRequest: (state, action) => {
      state.deleteAPI.loading = true;
    },
    deleteMenusuccess: (state, action) => {
      state.deleteAPI.loading = false;
      state.deleteAPI.success = action.payload;
    },
    deleteMenuFailed: (state, action) => {
      state.deleteAPI.loading = false;
      state.deleteAPI.error = action.payload;
    },
    resetDeleteMenuState: state => {
      state.deleteAPI.success = '';
    },
    updateMenuRequest: (state, action) => {
      state.updateAPI.loading = true;
    },
    updateMenusuccess: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.success = action.payload;
    },
    updateMenuFailed: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.error = action.payload;
    },
    resetUpdateMenuState: state => {
      state.updateAPI.success = '';
    },
  },
});

export default MenuSlice;
