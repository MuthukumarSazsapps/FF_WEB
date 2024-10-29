import { takeEvery, call, put, Effect } from 'redux-saga/effects';
import api from '../api';
import { messages } from 'config/messages';
import { PayloadAction } from '@reduxjs/toolkit';
import { CityFormFieldTypes } from 'utils/types';
import CitySlice from 'store/reducers/citySlice';

function* listCitiesSaga(): Generator<Effect, void, unknown> {
  try {
    const response = yield call(api.city.listAllCities);
    if (response) {
      yield put(CitySlice.actions.listCitiesSuccess(response));
    } else {
      yield put(CitySlice.actions.listCitiesFailed(messages.listMenuAPIFailed));
    }
  } catch (error) {
    yield put(CitySlice.actions.listCitiesFailed(messages.listMenuSagaFailed));
  }
}
function* getCitySaga(action: PayloadAction<string>): Generator<Effect, void, unknown> {
  try {
    const response = yield call(api.location.getLocation, action.payload);
    if (response) {
      yield put(CitySlice.actions.getCitiesuccess(response));
    } else {
      yield put(CitySlice.actions.getCitiesFailed(messages.getMenuAPIFailed));
    }
  } catch (error) {
    yield put(CitySlice.actions.getCitiesFailed(messages.getMenuSagaFailed));
  }
}

function* createCitysaga(
  action: PayloadAction<CityFormFieldTypes>,
): Generator<Effect, void, unknown> {
  try {
    const response = yield call(api.city.createCity, action.payload);
    if (response) {
      yield put(CitySlice.actions.createCitySuccess(response));
    } else {
      yield put(CitySlice.actions.createCityFailed(messages.listMenuAPIFailed));
    }
  } catch (error) {
    yield put(CitySlice.actions.createCityFailed(messages.listMenuSagaFailed));
  }
}
function* updateCitysaga(
  action: PayloadAction<{
    CityId: string;
    updateData: CityFormFieldTypes;
  }>,
): Generator<Effect, void, unknown> {
  try {
    const { CityId, updateData } = action.payload;
    const response = yield call(api.city.updateCity, CityId, updateData);
    if (response) {
      yield put(CitySlice.actions.updateCitySuccess(response));
    } else {
      yield put(CitySlice.actions.updateCityFailed(messages.listSubscriberAPIFailed));
    }
  } catch (error) {
    yield put(CitySlice.actions.updateCityFailed(messages.listSubscriberSagaFailed));
  }
}
function* deleteCitysaga(
  action: PayloadAction<{ CityId: string; ModifiedBy: string }>,
): Generator<Effect, void, unknown> {
  try {
    const { CityId, ModifiedBy } = action.payload;
    const response = yield call(api.city.deleteCity, CityId, ModifiedBy);
    if (response) {
      yield put(CitySlice.actions.deleteCitySuccess(response));
    } else {
      yield put(CitySlice.actions.deleteCityFailed(messages.deleteMenuAPIFailed));
    }
  } catch (error) {
    yield put(CitySlice.actions.deleteCityFailed(messages.deleteMenuSagaFailed));
  }
}
export default function* citysaga() {
  yield takeEvery(CitySlice.actions.listCitiesRequest, listCitiesSaga);
  yield takeEvery(CitySlice.actions.createCityRequest, createCitysaga);
  yield takeEvery(CitySlice.actions.updateCityRequest, updateCitysaga);
  yield takeEvery(CitySlice.actions.deleteCityRequest, deleteCitysaga);
  yield takeEvery(CitySlice.actions.getCityRequest, getCitySaga);
}
