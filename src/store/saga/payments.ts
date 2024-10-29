import { takeEvery, call, put, Effect } from 'redux-saga/effects';
import api from '../api';
import { messages } from 'config/messages';
import { PayloadAction } from '@reduxjs/toolkit';
import PaymentSlice from 'store/reducers/paymentSlice';

function* loanDisburseSaga(
  action: PayloadAction<{ paymentData: any }>,
): Generator<Effect, void, unknown> {
  try {
    const response = yield call(api.payments.loanDisburse, action.payload);
    if (response) {
      yield put(PaymentSlice.actions.loanDisburseSuccess(response));
    } else {
      yield put(PaymentSlice.actions.loanDisburseFailed(messages.listMenuAPIFailed));
    }
  } catch (error) {
    yield put(PaymentSlice.actions.loanDisburseFailed(messages.listMenuSagaFailed));
  }
}
export default function* paymentsaga() {
  yield takeEvery(PaymentSlice.actions.loanDisburseRequest, loanDisburseSaga);
}
