import { PayloadAction } from '@reduxjs/toolkit';
import { takeEvery, call, Effect, put } from 'redux-saga/effects';
import api from '../api';
import authSlice from 'store/reducers/auth';

function* loginSaga(
  action: PayloadAction<{ username: string; password: string }>,
): Generator<Effect, void, unknown> {
  try {
    const response = yield call(api.auth.login, action.payload);
    // Now we are just recieving the token,
    // We need to recieve a proper error from the backend
    // If the request not even touched the backend, we need create message and put the login failed properly.
    if (response) {
      yield put(authSlice.actions.loginSucess(response));
    } else {
      yield put(authSlice.actions.loginFailed('Invalid credentials'));
    }
  } catch (error) {
    console.log(error);
  }
}
function* refreshTokenSaga(
  action: PayloadAction<{ username: string; refresh_token: string; refresh_key: string }>,
): Generator<Effect, void, unknown> {
  try {
    const response = yield call(api.auth.refreshTokenLogin, action.payload);
    // Now we are just recieving the token,
    // We need to recieve a proper error from the backend
    // If the request not even touched the backend, we need create message and put the login failed properly.
    if (response) {
      yield put(authSlice.actions.refreshTokenSuccess(response));
    } else {
      yield put(authSlice.actions.refreshTokenFailure('No token recieved'));
    }
  } catch (error) {
    console.log(error);
  }
}
export default function* authSaga() {
  yield takeEvery(authSlice.actions.loginRequest, loginSaga);
  yield takeEvery(authSlice.actions.refreshTokenRequest, refreshTokenSaga);
}
