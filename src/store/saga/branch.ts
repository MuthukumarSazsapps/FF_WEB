import { takeEvery, call, put, Effect } from 'redux-saga/effects';
import api from '../api';
import { messages } from 'config/messages';
import { PayloadAction } from '@reduxjs/toolkit';
import BranchSlice from 'store/reducers/branchSlice';
import { BranchFormFieldTypes } from 'utils/types';
import { actions } from 'store';

function* listBranchesSaga(
  action: PayloadAction<{ SubscriberId: string }>,
): Generator<Effect, void, unknown> {
  try {
    const { SubscriberId } = action.payload;
    const response = yield call(api.branch.listAllBranches, SubscriberId);
    if (response) {
      yield put(BranchSlice.actions.listBranchesSuccess(response));
    } else {
      yield put(BranchSlice.actions.listBranchesFailed(messages.listMenuAPIFailed));
    }
  } catch (error) {
    yield put(BranchSlice.actions.listBranchesFailed(messages.listMenuSagaFailed));
  }
}

function* createBranchsaga(
  action: PayloadAction<{ SubscriberId: string; branchData: BranchFormFieldTypes }>,
): Generator<Effect, void, unknown> {
  try {
    const { SubscriberId, branchData } = action.payload;
    const response = yield call(api.branch.createBranch, SubscriberId, branchData);
    if (response) {
      yield put(BranchSlice.actions.createBranchSuccess(response));
    } else {
      yield put(BranchSlice.actions.createBranchFailed(messages.listMenuAPIFailed));
    }
  } catch (error) {
    yield put(BranchSlice.actions.createBranchFailed(messages.listMenuSagaFailed));
  }
}
function* updateBranchsaga(
  action: PayloadAction<{
    BranchId: string;
    updateData: BranchFormFieldTypes;
  }>,
): Generator<Effect, void, unknown> {
  try {
    const { BranchId, updateData } = action.payload;
    const response = yield call(api.branch.updateBranch, BranchId, updateData);
    if (response) {
      yield put(BranchSlice.actions.updateBranchSuccess(response));
    } else {
      yield put(BranchSlice.actions.updateBranchFailed(messages.listSubscriberAPIFailed));
    }
  } catch (error) {
    yield put(BranchSlice.actions.updateBranchFailed(messages.listSubscriberSagaFailed));
  }
}
function* deleteBranchsaga(
  action: PayloadAction<{ BranchId: string; ModifiedBy: string }>,
): Generator<Effect, void, unknown> {
  try {
    const { BranchId, ModifiedBy } = action.payload;
    const response = yield call(api.branch.deleteBranch, BranchId, ModifiedBy);
    if (response) {
      yield put(BranchSlice.actions.deleteBranchSuccess(response));
    } else {
      yield put(BranchSlice.actions.deleteBranchFailed(messages.deleteMenuAPIFailed));
    }
  } catch (error) {
    yield put(BranchSlice.actions.deleteBranchFailed(messages.deleteMenuSagaFailed));
  }
}
export default function* branchsaga() {
  yield takeEvery(BranchSlice.actions.listBranchesRequest, listBranchesSaga);
  yield takeEvery(BranchSlice.actions.createBranchRequest, createBranchsaga);
  yield takeEvery(BranchSlice.actions.updateBranchRequest, updateBranchsaga);
  yield takeEvery(BranchSlice.actions.deleteBranchRequest, deleteBranchsaga);
}
