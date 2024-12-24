import { takeEvery, call, put, Effect } from 'redux-saga/effects';
import api from '../api';
import { messages } from 'config/messages';
import { PayloadAction } from '@reduxjs/toolkit';
import { LoanFormFieldTypes } from 'utils/types';
import LoanSlice from 'store/reducers/loanSlice';

function* listLoansSaga(
  action: PayloadAction<{ SubscriberId: string; BranchId: string }>,
): Generator<Effect, void, unknown> {
  try {
    const { SubscriberId, BranchId } = action.payload;
    const response = yield call(api.loan.listAllLoans, SubscriberId, BranchId);
    if (response) {
      yield put(LoanSlice.actions.listLoansSuccess(response));
    } else {
      yield put(LoanSlice.actions.listLoansFailed(messages.listMenuAPIFailed));
    }
  } catch (error) {
    yield put(LoanSlice.actions.listLoansFailed(messages.listMenuSagaFailed));
  }
}

function* createLoansaga(
  action: PayloadAction<{
    CreatedBy: string;
    SubscriberId: string;
    LoanData: LoanFormFieldTypes;
  }>,
): Generator<Effect, void, unknown> {
  try {
    const { CreatedBy, SubscriberId, LoanData } = action.payload;
    const response = yield call(api.loan.createLoan, CreatedBy, SubscriberId, LoanData);
    if (response) {
      yield put(LoanSlice.actions.createLoanSuccess(response));
    } else {
      yield put(LoanSlice.actions.createLoanFailed(messages.listMenuAPIFailed));
    }
  } catch (error) {
    yield put(LoanSlice.actions.createLoanFailed(messages.listMenuSagaFailed));
  }
}
function* updateLoansaga(
  action: PayloadAction<{
    LoanId: string;
    ModifiedBy: string;
    updateData: LoanFormFieldTypes;
  }>,
): Generator<Effect, void, unknown> {
  try {
    const { LoanId, ModifiedBy, updateData } = action.payload;
    const response = yield call(api.loan.updateLoan, LoanId, ModifiedBy, updateData);
    if (response) {
      yield put(LoanSlice.actions.updateLoanSuccess(response));
    } else {
      yield put(LoanSlice.actions.updateLoanFailed(messages.listSubscriberAPIFailed));
    }
  } catch (error) {
    yield put(LoanSlice.actions.updateLoanFailed(messages.listSubscriberSagaFailed));
  }
}
function* deleteLoansaga(
  action: PayloadAction<{ LoanId: string; ModifiedBy: string }>,
): Generator<Effect, void, unknown> {
  try {
    const { LoanId, ModifiedBy } = action.payload;
    const response = yield call(api.loan.deleteLoan, LoanId, ModifiedBy);
    if (response) {
      yield put(LoanSlice.actions.deleteLoanSuccess(response));
    } else {
      yield put(LoanSlice.actions.deleteLoanFailed(messages.deleteMenuAPIFailed));
    }
  } catch (error) {
    yield put(LoanSlice.actions.deleteLoanFailed(messages.deleteMenuSagaFailed));
  }
}
export default function* loansaga() {
  yield takeEvery(LoanSlice.actions.listLoansRequest, listLoansSaga);
  yield takeEvery(LoanSlice.actions.createLoanRequest, createLoansaga);
  yield takeEvery(LoanSlice.actions.updateLoanRequest, updateLoansaga);
  yield takeEvery(LoanSlice.actions.deleteLoanRequest, deleteLoansaga);
}
