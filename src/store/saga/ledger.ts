import { takeEvery, call, put, Effect } from 'redux-saga/effects';
import api from '../api';
import { messages } from 'config/messages';
import { PayloadAction } from '@reduxjs/toolkit';
// import LedgerSlice from 'store/reducers/ledgerGroupSlice';
// import { LedgerGroupFormFieldTypes } from 'utils/types';
import LedgerSlice from 'store/reducers/ledgerSlice';
import { LedgerFormFieldTypes } from 'utils/types';

function* listLedgerSaga(
  action: PayloadAction<{ SubscriberId: string; BranchId: string }>,
): Generator<Effect, void, unknown> {
  try {
    const { SubscriberId, BranchId } = action.payload;
    const response = yield call(api.ledger.listAllLedger, SubscriberId, BranchId);
    if (response) {
      yield put(LedgerSlice.actions.listLedgerSuccess(response));
    } else {
      yield put(LedgerSlice.actions.listLedgerFailed(messages.listMenuAPIFailed));
    }
  } catch (error) {
    yield put(LedgerSlice.actions.listLedgerFailed(messages.listMenuSagaFailed));
  }
}

function* getLedgerSaga(action: PayloadAction<string>): Generator<Effect, void, unknown> {
  try {
    const response = yield call(api.ledger.getLedger, action.payload);
    if (response) {
      yield put(LedgerSlice.actions.getLedgersuccess(response));
    } else {
      yield put(LedgerSlice.actions.getLedgerFailed(messages.getMenuAPIFailed));
    }
  } catch (error) {
    yield put(LedgerSlice.actions.getLedgerFailed(messages.getMenuSagaFailed));
  }
}

function* createLedgersaga(
  action: PayloadAction<LedgerFormFieldTypes>,
): Generator<Effect, void, unknown> {
  try {
    const response = yield call(api?.ledger.createLedger, action.payload);
    if (response) {
      yield put(LedgerSlice.actions.createLedgerSuccess(response));
    } else {
      yield put(LedgerSlice.actions.createLedgerFailed(messages.listMenuAPIFailed));
    }
  } catch (error) {
    yield put(LedgerSlice.actions.createLedgerFailed(messages.listMenuSagaFailed));
  }
}

function* updateLedgersaga(
  action: PayloadAction<{
    LedgerId: string;
    updateData: LedgerFormFieldTypes;
  }>,
): Generator<Effect, void, unknown> {
  try {
    const { LedgerId, updateData } = action.payload;
    const response = yield call(api.ledger.updateLedger, LedgerId, updateData);
    if (response) {
      yield put(LedgerSlice.actions.updateLedgerSuccess(response));
    } else {
      yield put(LedgerSlice.actions.updateLedgerFailed(messages.listSubscriberAPIFailed));
    }
  } catch (error) {
    yield put(LedgerSlice.actions.updateLedgerFailed(messages.listSubscriberSagaFailed));
  }
}
function* deleteLedgersaga(
  action: PayloadAction<{ LedgerId: string; ModifiedBy: string }>,
): Generator<Effect, void, unknown> {
  try {
    const { LedgerId, ModifiedBy } = action.payload;
    const response = yield call(api.ledger.deleteLedger, LedgerId, ModifiedBy);
    if (response) {
      yield put(LedgerSlice.actions.deleteLedgerSuccess(response));
    } else {
      yield put(LedgerSlice.actions.deleteLedgerFailed(messages.deleteMenuAPIFailed));
    }
  } catch (error) {
    yield put(LedgerSlice.actions.deleteLedgerFailed(messages.deleteMenuSagaFailed));
  }
}

export default function* ledgersaga() {
  yield takeEvery(LedgerSlice.actions.listLedgerRequest, listLedgerSaga);
  yield takeEvery(LedgerSlice.actions.createLedgerRequest, createLedgersaga);
  yield takeEvery(LedgerSlice.actions.updateLedgerRequest, updateLedgersaga);
  yield takeEvery(LedgerSlice.actions.deleteLedgerRequest, deleteLedgersaga);
  yield takeEvery(LedgerSlice.actions.getLedgerRequest, getLedgerSaga);
}
