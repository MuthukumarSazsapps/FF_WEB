import { takeEvery, call, put, Effect } from 'redux-saga/effects';
import api from '../api';
import { messages } from 'config/messages';
import { PayloadAction } from '@reduxjs/toolkit';
import { DueEntryFormFieldTypes } from 'utils/types';
import DueSlice from 'store/reducers/dueSlice';

function* listPendingDuesSaga(
  action: PayloadAction<{ SubscriberId: string; BranchId: string }>,
): Generator<Effect, void, unknown> {
  try {
    const { SubscriberId, BranchId } = action.payload;
    const response = yield call(api.due.listPendingDues, SubscriberId, BranchId);
    if (response) {
      yield put(DueSlice.actions.listPendingDuesSuccess(response));
    } else {
      yield put(DueSlice.actions.listPendingDuesFailed(messages.listMenuAPIFailed));
    }
  } catch (error) {
    yield put(DueSlice.actions.listPendingDuesFailed(messages.listMenuSagaFailed));
  }
}
function* getDayReportSaga(action: PayloadAction<any>): Generator<Effect, void, unknown> {
  try {
    const response = yield call(api.due.getDayReport, action.payload);
    if (response) {
      yield put(DueSlice.actions.getDayReportSuccess(response));
    } else {
      yield put(DueSlice.actions.getDayReportFailed(messages.listMenuAPIFailed));
    }
  } catch (error) {
    yield put(DueSlice.actions.getDayReportFailed(messages.listMenuSagaFailed));
  }
}

function* getDueSaga(action: PayloadAction<string>): Generator<Effect, void, unknown> {
  try {
    const response = yield call(api.due.getDue, action.payload);
    if (response) {
      yield put(DueSlice.actions.getDueSuccess(response));
    } else {
      yield put(DueSlice.actions.getDueFailed(messages.getMenuAPIFailed));
    }
  } catch (error) {
    yield put(DueSlice.actions.getDueFailed(messages.getMenuSagaFailed));
  }
}
function* getPrecloseAmountSaga(
  action: PayloadAction<{ LoanId: string; Interest: string }>,
): Generator<Effect, void, unknown> {
  try {
    const { LoanId, Interest } = action.payload;
    const response = yield call(api.due.getPrecloseAmount, LoanId, Interest);
    if (response) {
      yield put(DueSlice.actions.getPrecloseSuccess(response));
    } else {
      yield put(DueSlice.actions.getPrecloseFailed(messages.getMenuAPIFailed));
    }
  } catch (error) {
    yield put(DueSlice.actions.getPrecloseFailed(messages.getMenuSagaFailed));
  }
}
function* updateDueSaga(
  action: PayloadAction<{
    LoanId: string;
    formData: DueEntryFormFieldTypes;
  }>,
): Generator<Effect, void, unknown> {
  try {
    const { LoanId, formData } = action.payload;
    const response = yield call(api.due.updateDue, LoanId, formData);
    if (response) {
      yield put(DueSlice.actions.updateDueSuccess(response));
    } else {
      yield put(DueSlice.actions.updateDueFailed(messages.listSubscriberAPIFailed));
    }
  } catch (error) {
    yield put(DueSlice.actions.updateDueFailed(messages.listSubscriberSagaFailed));
  }
}
function* deleteDueSaga(
  action: PayloadAction<{
    LoanId: string;
    Installment: string;
    ModifiedBy: String;
  }>,
): Generator<Effect, void, unknown> {
  try {
    const { LoanId, Installment, ModifiedBy } = action.payload;
    const response = yield call(api.due.deleteDue, LoanId, Installment, ModifiedBy);
    if (response) {
      yield put(DueSlice.actions.deleteDueSuccess(response));
    } else {
      yield put(DueSlice.actions.deleteDueFailed(messages.listSubscriberAPIFailed));
    }
  } catch (error) {
    yield put(DueSlice.actions.deleteDueFailed(messages.listSubscriberSagaFailed));
  }
}
function* precloseLoanSaga(
  action: PayloadAction<DueEntryFormFieldTypes>,
): Generator<Effect, void, unknown> {
  try {
    const response = yield call(api.due.precloseLoan, action.payload);
    if (response) {
      yield put(DueSlice.actions.precloseLoanSuccess(response));
    } else {
      yield put(DueSlice.actions.precloseLoanFailed(messages.listSubscriberAPIFailed));
    }
  } catch (error) {
    yield put(DueSlice.actions.precloseLoanFailed(messages.listSubscriberSagaFailed));
  }
}

export default function* duesaga() {
  yield takeEvery(DueSlice.actions.updateDueRequest, updateDueSaga);
  yield takeEvery(DueSlice.actions.deleteDueRequest, deleteDueSaga);
  yield takeEvery(DueSlice.actions.getDueRequest, getDueSaga);
  yield takeEvery(DueSlice.actions.getPrecloseRequest, getPrecloseAmountSaga);
  yield takeEvery(DueSlice.actions.listPendingDuesRequest, listPendingDuesSaga);
  yield takeEvery(DueSlice.actions.getDayReportRequest, getDayReportSaga);
  yield takeEvery(DueSlice.actions.precloseLoanRequest, precloseLoanSaga);
}
