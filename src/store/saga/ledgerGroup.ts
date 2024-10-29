import { takeEvery, call, put, Effect } from 'redux-saga/effects';
import api from '../api';
import { messages } from 'config/messages';
import { PayloadAction } from '@reduxjs/toolkit';
import LedgerGroupSlice from 'store/reducers/ledgerGroupSlice';
import { LedgerGroupFormFieldTypes } from 'utils/types';

function* listLedgerGroupSaga(): Generator<Effect, void, unknown> {
  try {
    const response = yield call(api.ledgerGroup.listAllLedgerGroups);
    if (response) {
      yield put(LedgerGroupSlice.actions.listLedgerGroupSuccess(response));
    } else {
      yield put(LedgerGroupSlice.actions.listLedgerGroupFailed(messages.listMenuAPIFailed));
    }
  } catch (error) {
    yield put(LedgerGroupSlice.actions.listLedgerGroupFailed(messages.listMenuSagaFailed));
  }
}

function* getLedgerGroupSaga(action: PayloadAction<string>): Generator<Effect, void, unknown> {
  try {
    const response = yield call(api.location.getLocation, action.payload);
    if (response) {
      yield put(LedgerGroupSlice.actions.getLedgerGroupsuccess(response));
    } else {
      yield put(LedgerGroupSlice.actions.getLedgerGroupFailed(messages.getMenuAPIFailed));
    }
  } catch (error) {
    yield put(LedgerGroupSlice.actions.getLedgerGroupFailed(messages.getMenuSagaFailed));
  }
}

function* createLedgerGroupsaga(
  action: PayloadAction<LedgerGroupFormFieldTypes>,
): Generator<Effect, void, unknown> {
  try {
    const response = yield call(api?.ledgerGroup?.createLedgerGroup, action.payload);
    if (response) {
      yield put(LedgerGroupSlice.actions.createLedgerGroupSuccess(response));
    } else {
      yield put(LedgerGroupSlice.actions.createLedgerGroupFailed(messages.listMenuAPIFailed));
    }
  } catch (error) {
    yield put(LedgerGroupSlice.actions.createLedgerGroupFailed(messages.listMenuSagaFailed));
  }
}

function* updateLedgerGroupsaga(
  action: PayloadAction<{
    LedgerGroupId: string;
    updateData: LedgerGroupFormFieldTypes;
  }>,
): Generator<Effect, void, unknown> {
  try {
    const { LedgerGroupId, updateData } = action.payload;
    const response = yield call(api.ledgerGroup.updateLedgerGroup, LedgerGroupId, updateData);
    if (response) {
      yield put(LedgerGroupSlice.actions.updateLedgerGroupSuccess(response));
    } else {
      yield put(LedgerGroupSlice.actions.updateLedgerGroupFailed(messages.listSubscriberAPIFailed));
    }
  } catch (error) {
    yield put(LedgerGroupSlice.actions.updateLedgerGroupFailed(messages.listSubscriberSagaFailed));
  }
}
function* deleteLedgerGroupsaga(
  action: PayloadAction<{ LedgerGroupId: string; ModifiedBy: string }>,
): Generator<Effect, void, unknown> {
  try {
    const { LedgerGroupId, ModifiedBy } = action.payload;
    const response = yield call(api.ledgerGroup.deleteLedgerGroup, LedgerGroupId, ModifiedBy);
    if (response) {
      yield put(LedgerGroupSlice.actions.deleteLedgerGroupSuccess(response));
    } else {
      yield put(LedgerGroupSlice.actions.deleteLedgerGroupFailed(messages.deleteMenuAPIFailed));
    }
  } catch (error) {
    yield put(LedgerGroupSlice.actions.deleteLedgerGroupFailed(messages.deleteMenuSagaFailed));
  }
}

export default function* ledgerGroupsaga() {
  yield takeEvery(LedgerGroupSlice.actions.listLedgerGroupRequest, listLedgerGroupSaga);
  yield takeEvery(LedgerGroupSlice.actions.createLedgerGroupRequest, createLedgerGroupsaga);
  yield takeEvery(LedgerGroupSlice.actions.updateLedgerGroupRequest, updateLedgerGroupsaga);
  yield takeEvery(LedgerGroupSlice.actions.deleteLedgerGroupRequest, deleteLedgerGroupsaga);
  yield takeEvery(LedgerGroupSlice.actions.getLedgerGroupRequest, getLedgerGroupSaga);
}
