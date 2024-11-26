import { PayloadAction } from '@reduxjs/toolkit';
import { messages } from 'config/messages';
import { Effect, call, put, takeEvery } from 'redux-saga/effects';
import api from 'store/api';
import reportSlice from 'store/reducers/reportSlice';

function* pendingListSaga(
  action: PayloadAction<{ SubscriberId: string; BranchId: string }>,
): Generator<Effect, void, unknown> {
  try {
    const { SubscriberId, BranchId } = action.payload;
    const response = yield call(api.report.alllistpending, SubscriberId, BranchId);
    if (response) {
      yield put(reportSlice.actions.pendingListSuccess(response));
    } else {
      yield put(reportSlice.actions.pendingListFailure(messages.pendingListAPIFailed));
    }
  } catch (error) {
    yield put(reportSlice.actions.pendingListFailure(messages.pendinglistSagaFailed));
  }
}

function* pendingCapitalListSaga(
  action: PayloadAction<{ SubscriberId: string; BranchId: string }>,
): Generator<Effect, void, unknown> {
  try {
    const { SubscriberId, BranchId } = action.payload;
    const response = yield call(api.report.allPendingCapitalList, SubscriberId, BranchId);
    if (response) {
      yield put(reportSlice.actions.pendingCapitalListSuccess(response));
    } else {
      yield put(
        reportSlice.actions.pendingCapitalListFailure(messages.pendingCapitalListAPIFailed),
      );
    }
  } catch (error) {
    yield put(reportSlice.actions.pendingCapitalListFailure(messages.pendingCapitallistSagaFailed));
  }
}

function* defaultListSaga(
  action: PayloadAction<{ SubscriberId: string; BranchId: string }>,
): Generator<Effect, void, unknown> {
  try {
    const { SubscriberId, BranchId } = action.payload;
    const response = yield call(api.report.alldefaultlist, SubscriberId, BranchId);
    if (response) {
      yield put(reportSlice.actions.defaultListSuccess(response));
    } else {
      yield put(reportSlice.actions.defaultListFailure(messages.pendingListAPIFailed));
    }
  } catch (error) {
    yield put(reportSlice.actions.defaultListFailure(messages.pendinglistSagaFailed));
  }
}

function* updatePendingRemarksaga(
  action: PayloadAction<{
    updateData: any;
  }>,
): Generator<Effect, void, unknown> {
  try {
    const { updateData } = action.payload;
    const response = yield call(api.report.updatePendingRemarks, updateData);
    if (response) {
      yield put(reportSlice.actions.updatePendingSuccess(response));
    } else {
      yield put(reportSlice.actions.updatePendingFailure(messages.pendingListAPIFailed));
    }
  } catch (error) {
    yield put(reportSlice.actions.updatePendingFailure(messages.pendinglistSagaFailed));
  }
}

function* pendingDocumentsListSaga(
  action: PayloadAction<{ SubscriberId: string; BranchId: string }>,
): Generator<Effect, void, unknown> {
  try {
    const { SubscriberId, BranchId } = action.payload;
    const response = yield call(api.report.pendingDocuments, SubscriberId, BranchId);
    if (response) {
      yield put(reportSlice.actions.pendingDocumentsListSuccess(response));
    } else {
      yield put(reportSlice.actions.pendingDocumentsListFailure(messages.pendingListAPIFailed));
    }
  } catch (error) {
    yield put(reportSlice.actions.pendingDocumentsListFailure(messages.pendinglistSagaFailed));
  }
}
function* updatePendingDocssaga(
  action: PayloadAction<{
    updateData: any;
  }>,
): Generator<Effect, void, unknown> {
  try {
    const { updateData } = action.payload;
    const response = yield call(api.report.pendingDocUpdate, updateData);
    if (response) {
      yield put(reportSlice.actions.updatePendingDocsSuccess(response));
    } else {
      yield put(reportSlice.actions.updatePendingDocsFailure(messages.pendingListAPIFailed));
    }
  } catch (error) {
    yield put(reportSlice.actions.updatePendingDocsFailure(messages.pendinglistSagaFailed));
  }
}
export default function* reportSaga() {
  yield takeEvery(reportSlice.actions.pendingListRequest, pendingListSaga);
  yield takeEvery(reportSlice.actions.pendingCaptialListRequest, pendingCapitalListSaga);
  yield takeEvery(reportSlice.actions.defaultListRequest, defaultListSaga);
  yield takeEvery(reportSlice.actions.pendingDocumentsListRequest, pendingDocumentsListSaga);
  yield takeEvery(reportSlice.actions.updatePendingRequest, updatePendingRemarksaga);
  yield takeEvery(reportSlice.actions.updatePendingDocsRequest, updatePendingDocssaga);
}
