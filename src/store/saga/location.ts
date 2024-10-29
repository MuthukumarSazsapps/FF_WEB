import { takeEvery, call, put, Effect } from 'redux-saga/effects';
import api from '../api';
import LocationSlice from 'store/reducers/locationSlice';
import { messages } from 'config/messages';
import { PayloadAction } from '@reduxjs/toolkit';
import { LocationFormFieldTypes } from 'utils/types';

function* listLocationsSaga(): Generator<Effect, void, unknown> {
  try {
    const response = yield call(api.location.listAllLocations);
    if (response) {
      yield put(LocationSlice.actions.listLocationsSuccess(response));
    } else {
      yield put(LocationSlice.actions.listLocationsFailed(messages.listMenuAPIFailed));
    }
  } catch (error) {
    yield put(LocationSlice.actions.listLocationsFailed(messages.listMenuSagaFailed));
  }
}
function* getLocationsaga(action: PayloadAction<string>): Generator<Effect, void, unknown> {
  try {
    const response = yield call(api.location.getLocation, action.payload);
    if (response) {
      yield put(LocationSlice.actions.getLocationsuccess(response));
    } else {
      yield put(LocationSlice.actions.getLocationsFailed(messages.getMenuAPIFailed));
    }
  } catch (error) {
    yield put(LocationSlice.actions.getLocationsFailed(messages.getMenuSagaFailed));
  }
}

function* createLocationsaga(
  action: PayloadAction<LocationFormFieldTypes>,
): Generator<Effect, void, unknown> {
  try {
    const response = yield call(api.location.createLocation, action.payload);
    if (response) {
      yield put(LocationSlice.actions.createLocationsuccess(response));
    } else {
      yield put(LocationSlice.actions.createLocationFailed(messages.listMenuAPIFailed));
    }
  } catch (error) {
    yield put(LocationSlice.actions.createLocationFailed(messages.listMenuSagaFailed));
  }
}
function* updateLocationsaga(
  action: PayloadAction<{
    StateId: string;
    updateData: LocationFormFieldTypes;
  }>,
): Generator<Effect, void, unknown> {
  try {
    const { StateId, updateData } = action.payload;

    const response = yield call(api.location.updateLocation, StateId, updateData);
    if (response) {
      yield put(LocationSlice.actions.updateLocationsuccess(response));
    } else {
      yield put(LocationSlice.actions.updateLocationFailed(messages.listSubscriberAPIFailed));
    }
  } catch (error) {
    yield put(LocationSlice.actions.updateLocationFailed(messages.listSubscriberSagaFailed));
  }
}
function* deleteLocationsaga(
  action: PayloadAction<{ StateId: string; ModifiedBy: string }>,
): Generator<Effect, void, unknown> {
  try {
    const { StateId, ModifiedBy } = action.payload;
    const response = yield call(api.location.deleteLocation, StateId, ModifiedBy);
    if (response) {
      yield put(LocationSlice.actions.deleteLocationsuccess(response));
    } else {
      yield put(LocationSlice.actions.deleteLocationFailed(messages.deleteMenuAPIFailed));
    }
  } catch (error) {
    yield put(LocationSlice.actions.deleteLocationFailed(messages.deleteMenuSagaFailed));
  }
}
export default function* locationsaga() {
  yield takeEvery(LocationSlice.actions.listLocationsRequest, listLocationsSaga);
  yield takeEvery(LocationSlice.actions.createLocationRequest, createLocationsaga);
  yield takeEvery(LocationSlice.actions.updateLocationRequest, updateLocationsaga);
  yield takeEvery(LocationSlice.actions.deleteLocationRequest, deleteLocationsaga);
  yield takeEvery(LocationSlice.actions.getLocationRequest, getLocationsaga);
}
