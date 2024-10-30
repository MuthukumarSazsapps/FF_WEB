import { takeEvery, call, put, Effect } from 'redux-saga/effects';
import api from '../api';
import SubMenuSlice from 'store/reducers/submenuSlice';
import { messages } from 'config/messages';
import { PayloadAction } from '@reduxjs/toolkit';
import { SubMenuFormFieldTypes } from 'utils/types';

function* listSubMenusSaga(): Generator<Effect, void, unknown> {
  try {
    const response = yield call(api.submenu.listAllSubMenus);
    if (response) {
      yield put(SubMenuSlice.actions.listSubMenusSuccess(response));
    } else {
      yield put(SubMenuSlice.actions.listSubMenusFailed(messages.listMenuAPIFailed));
    }
  } catch (error) {
    yield put(SubMenuSlice.actions.listSubMenusFailed(messages.listMenuSagaFailed));
  }
}
function* getSubMenusaga(action: PayloadAction<string>): Generator<Effect, void, unknown> {
  try {
    const response = yield call(api.submenu.getSubMenu, action.payload);
    if (response) {
      yield put(SubMenuSlice.actions.getSubMenusuccess(response));
    } else {
      yield put(SubMenuSlice.actions.getSubMenusFailed(messages.getMenuAPIFailed));
    }
  } catch (error) {
    yield put(SubMenuSlice.actions.getSubMenusFailed(messages.getMenuSagaFailed));
  }
}

function* createSubMenusaga(
  action: PayloadAction<{ subMenuData: SubMenuFormFieldTypes; CreatedBy: string }>,
): Generator<Effect, void, unknown> {
  try {
    const { subMenuData, CreatedBy } = action.payload;
    const response = yield call(api.submenu.createSubMenu, subMenuData, CreatedBy);
    if (response) {
      yield put(SubMenuSlice.actions.createSubMenusuccess(response));
    } else {
      yield put(SubMenuSlice.actions.createSubMenuFailed(messages.listMenuAPIFailed));
    }
  } catch (error) {
    yield put(SubMenuSlice.actions.createSubMenuFailed(messages.listMenuSagaFailed));
  }
}
function* updateSubMenusaga(
  action: PayloadAction<{
    SubMenuId: string;
    updateData: SubMenuFormFieldTypes;
    ModifiedBy: string;
  }>,
): Generator<Effect, void, unknown> {
  try {
    const { SubMenuId, updateData, ModifiedBy } = action.payload;

    const response = yield call(api.submenu.updateSubMenu, SubMenuId, updateData, ModifiedBy);
    if (response) {
      yield put(SubMenuSlice.actions.updateSubMenusuccess(response));
    } else {
      yield put(SubMenuSlice.actions.updateSubMenuFailed(messages.listSubscriberAPIFailed));
    }
  } catch (error) {
    yield put(SubMenuSlice.actions.updateSubMenuFailed(messages.listSubscriberSagaFailed));
  }
}
function* deleteSubMenusaga(
  action: PayloadAction<{ SubMenuId: string; ModifiedBy: string }>,
): Generator<Effect, void, unknown> {
  try {
    const { SubMenuId, ModifiedBy } = action.payload;
    const response = yield call(api.submenu.deleteSubMenu, SubMenuId, ModifiedBy);
    if (response) {
      yield put(SubMenuSlice.actions.deleteSubMenusuccess(response));
    } else {
      yield put(SubMenuSlice.actions.deleteSubMenuFailed(messages.deleteMenuAPIFailed));
    }
  } catch (error) {
    yield put(SubMenuSlice.actions.deleteSubMenuFailed(messages.deleteMenuSagaFailed));
  }
}
export default function* SubMenusaga() {
  yield takeEvery(SubMenuSlice.actions.listSubMenusRequest, listSubMenusSaga);
  yield takeEvery(SubMenuSlice.actions.createSubMenuRequest, createSubMenusaga);
  yield takeEvery(SubMenuSlice.actions.updateSubMenuRequest, updateSubMenusaga);
  yield takeEvery(SubMenuSlice.actions.deleteSubMenuRequest, deleteSubMenusaga);
  yield takeEvery(SubMenuSlice.actions.getSubMenuRequest, getSubMenusaga);
}
