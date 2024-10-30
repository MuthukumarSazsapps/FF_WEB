import { takeEvery, call, put, Effect } from 'redux-saga/effects';
import api from '../api';
import MenuSlice from '../reducers/menuSlice';
import { messages } from 'config/messages';
import { PayloadAction } from '@reduxjs/toolkit';
import { MenuFormFieldTypes } from 'utils/types';

function* listMenusSaga(
  action: PayloadAction<{ userId: string }>,
): Generator<Effect, void, unknown> {
  try {
    const response = yield call(api.menu.listAllMenus, action.payload.userId);
    if (response) {
      yield put(MenuSlice.actions.listMenusSuccess(response));
    } else {
      yield put(MenuSlice.actions.listMenusFailed(messages.listMenuAPIFailed));
    }
  } catch (error) {
    yield put(MenuSlice.actions.listMenusFailed(messages.listMenuSagaFailed));
  }
}
function* getMenusaga(action: PayloadAction<string>): Generator<Effect, void, unknown> {
  try {
    const response = yield call(api.user.getUser, action.payload);
    if (response) {
      yield put(MenuSlice.actions.getMenusuccess(response));
    } else {
      yield put(MenuSlice.actions.getMenusFailed(messages.getMenuAPIFailed));
    }
  } catch (error) {
    yield put(MenuSlice.actions.getMenusFailed(messages.getMenuSagaFailed));
  }
}

function* createMenusaga(
  action: PayloadAction<{ menuData: MenuFormFieldTypes; CreatedBy: string }>,
): Generator<Effect, void, unknown> {
  try {
    const { menuData, CreatedBy } = action.payload;
    const response = yield call(api.menu.createMenu, menuData, CreatedBy);
    if (response) {
      yield put(MenuSlice.actions.createMenusuccess(response));
    } else {
      yield put(MenuSlice.actions.createMenuFailed(messages.listMenuAPIFailed));
    }
  } catch (error) {
    yield put(MenuSlice.actions.createMenuFailed(messages.listMenuSagaFailed));
  }
}
function* updateMenusaga(
  action: PayloadAction<{
    MenuId: string;
    updateData: MenuFormFieldTypes;
    ModifiedBy: string;
  }>,
): Generator<Effect, void, unknown> {
  try {
    const { MenuId, updateData, ModifiedBy } = action.payload;
    const response = yield call(api.menu.updateMenu, MenuId, updateData, ModifiedBy);
    if (response) {
      yield put(MenuSlice.actions.updateMenusuccess(response));
    } else {
      yield put(MenuSlice.actions.updateMenuFailed(messages.listSubscriberAPIFailed));
    }
  } catch (error) {
    yield put(MenuSlice.actions.updateMenuFailed(messages.listSubscriberSagaFailed));
  }
}
function* deleteMenusaga(
  action: PayloadAction<{ MenuId: string; ModifiedBy: string }>, // Assuming the payload is a string representing the subscriber ID
): Generator<Effect, void, unknown> {
  try {
    const { MenuId, ModifiedBy } = action.payload;
    const response = yield call(api.menu.deleteMenu, MenuId, ModifiedBy);
    if (response) {
      yield put(MenuSlice.actions.deleteMenusuccess(response));
    } else {
      yield put(MenuSlice.actions.deleteMenuFailed(messages.deleteMenuAPIFailed));
    }
  } catch (error) {
    yield put(MenuSlice.actions.deleteMenuFailed(messages.deleteMenuSagaFailed));
  }
}
export default function* Menusaga() {
  yield takeEvery(MenuSlice.actions.listMenusRequest, listMenusSaga);
  yield takeEvery(MenuSlice.actions.createMenuRequest, createMenusaga);
  yield takeEvery(MenuSlice.actions.updateMenuRequest, updateMenusaga);
  yield takeEvery(MenuSlice.actions.deleteMenuRequest, deleteMenusaga);
  yield takeEvery(MenuSlice.actions.getMenuRequest, getMenusaga);
}
