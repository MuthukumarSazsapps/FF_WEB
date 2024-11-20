import { takeEvery, call, put, Effect } from 'redux-saga/effects';
import api from '../api';
import { messages } from 'config/messages';
import { PayloadAction } from '@reduxjs/toolkit';
import { EnumMasterFormFieldTypes } from 'utils/types';
import EnumMasterSlice from 'store/reducers/enumMasterSlice';

function* createVehiclesaga(
  action: PayloadAction<{ EnumMasterData: EnumMasterFormFieldTypes }>,
): Generator<Effect, void, unknown> {
  try {
    const { EnumMasterData } = action.payload;
    const response = yield call(api.enumMaster.createEnumMaster, EnumMasterData);
    if (response) {
      yield put(EnumMasterSlice.actions.createEnumMasterSuccess(response));
    } else {
      yield put(EnumMasterSlice.actions.createEnumMasterFailed(messages.listMenuAPIFailed));
    }
  } catch (error) {
    yield put(EnumMasterSlice.actions.createEnumMasterFailed(messages.listMenuSagaFailed));
  }
}

export default function* enumMastersaga() {
  yield takeEvery(EnumMasterSlice.actions.createEnumMasterRequest, createVehiclesaga);
}
