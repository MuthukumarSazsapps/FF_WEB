import { takeEvery, call, put, Effect } from 'redux-saga/effects';
import api from '../api';
import userSlice from '../reducers/userSlice';
import { messages } from 'config/messages';
import { PayloadAction } from '@reduxjs/toolkit';
import { SubMenu, UserFormFieldTypes } from 'utils/types';
import { Menu } from 'utils/types';

function* listUsersSaga(action: PayloadAction<string>): Generator<Effect, void, unknown> {
  try {
    const response = yield call(api.user.listAllUsers, action.payload);
    if (response) {
      yield put(userSlice.actions.listUsersSuccess(response));
    } else {
      yield put(userSlice.actions.listUsersFailed(messages.listSubscriberAPIFailed));
    }
  } catch (error) {
    yield put(userSlice.actions.listUsersFailed(messages.listSubscriberSagaFailed));
  }
}
function* getUserSaga(action: PayloadAction<string>): Generator<Effect, void, unknown> {
  try {
    const response = yield call(api.user.getUser, action.payload);
    if (response) {
      yield put(userSlice.actions.getUserSuccess(response));
    } else {
      yield put(userSlice.actions.getUsersFailed(messages.getSubscriberAPIFailed));
    }
  } catch (error) {
    yield put(userSlice.actions.getUsersFailed(messages.getSubscriberSagaFailed));
  }
}

function* createUserSaga(
  action: PayloadAction<{
    SubscriberId: string;
    formData: UserFormFieldTypes;
    menus: Menu[];
  }>,
): Generator<Effect, void, unknown> {
  try {
    const { SubscriberId, formData, menus } = action.payload;
    const response = yield call(api.user.createUser, formData, SubscriberId, menus);
    if (response) {
      yield put(userSlice.actions.createUserSuccess(response));
    } else {
      yield put(userSlice.actions.createUserFailed(messages.listSubscriberAPIFailed));
    }
  } catch (error) {
    yield put(userSlice.actions.createUserFailed(messages.listSubscriberSagaFailed));
  }
}
function* updateUserSaga(
  action: PayloadAction<{
    userId: string;
    SubscriberId: string;
    updateData: UserFormFieldTypes;
    sendPassword: boolean;
    menus: Menu[];
  }>,
): Generator<Effect, void, unknown> {
  try {
    const { userId, SubscriberId, updateData, sendPassword, menus } = action.payload;
    const response = yield call(
      api.user.updateUser,
      userId,
      SubscriberId,
      updateData,
      sendPassword,
      menus,
    );
    if (response) {
      yield put(userSlice.actions.updateUserSuccess(response));
    } else {
      yield put(userSlice.actions.updateUserFailed(messages.listSubscriberAPIFailed));
    }
  } catch (error) {
    yield put(userSlice.actions.updateUserFailed(messages.listSubscriberSagaFailed));
  }
}
function* deleteUserSaga(
  action: PayloadAction<{ userId: string; email: string }>, // Assuming the payload is a string representing the subscriber ID
): Generator<Effect, void, unknown> {
  try {
    const { userId, email } = action.payload;
    const response = yield call(api.user.deleteUser, userId, email);
    if (response) {
      yield put(userSlice.actions.deleteUserSuccess(response));
    } else {
      yield put(userSlice.actions.deleteUserFailed(messages.deleteSubscriberAPIFailed));
    }
  } catch (error) {
    yield put(userSlice.actions.deleteUserFailed(messages.deleteSubscriberSagaFailed));
  }
}
export default function* userSaga() {
  yield takeEvery(userSlice.actions.listUsersRequest, listUsersSaga);
  yield takeEvery(userSlice.actions.createUserRequest, createUserSaga);
  yield takeEvery(userSlice.actions.updateUserRequest, updateUserSaga);
  yield takeEvery(userSlice.actions.deleteUserRequest, deleteUserSaga);
  yield takeEvery(userSlice.actions.getUserRequest, getUserSaga);
}
