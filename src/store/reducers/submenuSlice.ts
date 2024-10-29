import { createSlice } from '@reduxjs/toolkit';
import { APILoaderInformation, subMenuFormDefaultValues } from 'utils/types';
import { SubMenu } from 'utils/types';

interface SubMenuState {
  list: SubMenu[];
  subMenu: any;
  listAPI: APILoaderInformation;
  getApi: APILoaderInformation;
  createAPI: APILoaderInformation;
  updateAPI: APILoaderInformation;
  deleteAPI: APILoaderInformation;
}
const subMenu = {
  id: '',
  subMenuName: '',
  menuId: '',
  path: '',
  icon: '',
  isActive: '',
};
const initialState: SubMenuState = {
  list: [],
  subMenu: subMenuFormDefaultValues,
  listAPI: { loading: false, error: '' },
  getApi: { loading: false, error: '' },
  createAPI: { loading: false, success: '', error: '' },
  updateAPI: { loading: false, success: '', error: '' },
  deleteAPI: { loading: false, success: '', error: '' },
};

const SubMenuSlice = createSlice({
  name: 'submenu',
  initialState,
  reducers: {
    listSubMenusRequest: state => {
      state.listAPI.loading = true;
    },
    listSubMenusSuccess: (state, action) => {
      state.listAPI.loading = false;
      state.list = action.payload;
    },
    listSubMenusFailed: (state, action) => {
      state.listAPI.loading = false;
      state.listAPI.error = action.payload;
    },
    getSubMenuRequest: (state, action) => {
      state.getApi.loading = true;
    },
    getSubMenusuccess: (state, action) => {
      state.getApi.loading = false;
      state.subMenu = action.payload;
    },
    getSubMenusFailed: (state, action) => {
      state.getApi.loading = false;
      state.getApi.error = action.payload;
    },
    resetGetSubMenuState: state => {
      state.subMenu = subMenuFormDefaultValues;
    },
    createSubMenuRequest: (state, action) => {
      state.createAPI.loading = true;
    },
    createSubMenusuccess: (state, action) => {
      state.createAPI.loading = false;
      state.createAPI.success = action.payload;
    },
    createSubMenuFailed: (state, action) => {
      state.createAPI.loading = false;
      state.createAPI.success = action.payload;
      state.createAPI.error = action.payload;
    },
    resetCreateSubMenuState: state => {
      state.createAPI.success = '';
    },
    deleteSubMenuRequest: (state, action) => {
      state.deleteAPI.loading = true;
    },
    deleteSubMenusuccess: (state, action) => {
      state.deleteAPI.loading = false;
      state.deleteAPI.success = action.payload;
    },
    deleteSubMenuFailed: (state, action) => {
      state.deleteAPI.loading = false;
      state.deleteAPI.error = action.payload;
    },
    resetDeleteSubMenuState: state => {
      state.deleteAPI.success = '';
    },
    updateSubMenuRequest: (state, action) => {
      state.updateAPI.loading = true;
    },
    updateSubMenusuccess: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.success = action.payload;
    },
    updateSubMenuFailed: (state, action) => {
      state.updateAPI.loading = false;
      state.updateAPI.error = action.payload;
    },
    resetUpdateSubMenuState: state => {
      state.updateAPI.success = '';
    },
  },
});

export default SubMenuSlice;
