import { takeEvery, call, put, Effect } from 'redux-saga/effects';
import api from '../api';
import { messages } from 'config/messages';
import { PayloadAction } from '@reduxjs/toolkit';
import { SubCityFormFieldTypes } from 'utils/types';
import SubCitySlice from 'store/reducers/sub-citySlice';

function* listSubscriberCitiesSaga(
  action: PayloadAction<{ SubscriberId: string; BranchId: string }>,
): Generator<Effect, void, unknown> {
  try {
    const { SubscriberId, BranchId } = action.payload;
    const response = yield call(api.subcity.listAllSubscriberCities, SubscriberId, BranchId);
    if (response) {
      yield put(SubCitySlice.actions.listSubCitiesSuccess(response));
    } else {
      yield put(SubCitySlice.actions.listSubCitiesFailed(messages.listMenuAPIFailed));
    }
  } catch (error) {
    yield put(SubCitySlice.actions.listSubCitiesFailed(messages.listMenuSagaFailed));
  }
}

function* createSubscriberCitysaga(
  action: PayloadAction<{
    SubscriberId: string;
    cityData: SubCityFormFieldTypes;
  }>,
): Generator<Effect, void, unknown> {
  try {
    const { SubscriberId, cityData } = action.payload;
    const response = yield call(api.subcity.createSubscriberCity, SubscriberId, cityData);
    if (response) {
      yield put(SubCitySlice.actions.createSubCitySuccess(response));
    } else {
      yield put(SubCitySlice.actions.createSubCityFailed(messages.listMenuAPIFailed));
    }
  } catch (error) {
    yield put(SubCitySlice.actions.createSubCityFailed(messages.listMenuSagaFailed));
  }
}
function* updateSubscriberCitysaga(
  action: PayloadAction<{
    CityId: string;
    updateData: SubCityFormFieldTypes;
  }>,
): Generator<Effect, void, unknown> {
  try {
    const { CityId, updateData } = action.payload;
    const response = yield call(api.subcity.updateSubscriberCity, CityId, updateData);
    if (response) {
      yield put(SubCitySlice.actions.updateSubCitySuccess(response));
    } else {
      yield put(SubCitySlice.actions.updateSubCityFailed(messages.listSubscriberAPIFailed));
    }
  } catch (error) {
    yield put(SubCitySlice.actions.updateSubCityFailed(messages.listSubscriberSagaFailed));
  }
}
function* deleteSubscriberCitysaga(
  action: PayloadAction<{ CityId: string; ModifiedBy: string }>,
): Generator<Effect, void, unknown> {
  try {
    const { CityId, ModifiedBy } = action.payload;
    const response = yield call(api.subcity.deleteSubscriberCity, CityId, ModifiedBy);
    if (response) {
      yield put(SubCitySlice.actions.deleteSubCitySuccess(response));
    } else {
      yield put(SubCitySlice.actions.deleteSubCityFailed(messages.deleteMenuAPIFailed));
    }
  } catch (error) {
    yield put(SubCitySlice.actions.deleteSubCityFailed(messages.deleteMenuSagaFailed));
  }
}
export default function* subscribercitysaga() {
  yield takeEvery(SubCitySlice.actions.listSubCitiesRequest, listSubscriberCitiesSaga);
  yield takeEvery(SubCitySlice.actions.createSubCityRequest, createSubscriberCitysaga);
  yield takeEvery(SubCitySlice.actions.updateSubCityRequest, updateSubscriberCitysaga);
  yield takeEvery(SubCitySlice.actions.deleteSubCityRequest, deleteSubscriberCitysaga);
}
