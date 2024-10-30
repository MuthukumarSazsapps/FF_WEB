import { takeEvery, call, put, Effect } from 'redux-saga/effects';
import api from '../api';
import { messages } from 'config/messages';
import { PayloadAction } from '@reduxjs/toolkit';
import { CustomerFormFieldTypes } from 'utils/types';
import CustomerSlice from 'store/reducers/customerSlice';

function* listCustomersSaga(
  action: PayloadAction<{ SubscriberId: string; BranchId: string }>,
): Generator<Effect, void, unknown> {
  try {
    const { SubscriberId, BranchId } = action.payload;
    const response = yield call(api.customer.listAllCustomers, SubscriberId, BranchId);
    if (response) {
      yield put(CustomerSlice.actions.listCustomersSuccess(response));
    } else {
      yield put(CustomerSlice.actions.listCustomersFailed(messages.listMenuAPIFailed));
    }
  } catch (error) {
    yield put(CustomerSlice.actions.listCustomersFailed(messages.listMenuSagaFailed));
  }
}
function* getCustomersSaga(action: PayloadAction<string>): Generator<Effect, void, unknown> {
  try {
    const response = yield call(api.customer.getCustomer, action.payload);
    if (response) {
      yield put(CustomerSlice.actions.getCustomersSuccess(response));
    } else {
      yield put(CustomerSlice.actions.getCustomersFailed(messages.listMenuAPIFailed));
    }
  } catch (error) {
    yield put(CustomerSlice.actions.getCustomersFailed(messages.listMenuSagaFailed));
  }
}

function* createCustomersaga(
  action: PayloadAction<{
    CreatedBy: string;
    SubscriberId: string;
    CustomerData: CustomerFormFieldTypes;
  }>,
): Generator<Effect, void, unknown> {
  try {
    const { CreatedBy, SubscriberId, CustomerData } = action.payload;
    const response = yield call(api.customer.createCustomer, CreatedBy, SubscriberId, CustomerData);
    if (response) {
      yield put(CustomerSlice.actions.createCustomerSuccess(response));
    } else {
      yield put(CustomerSlice.actions.createCustomerFailed(messages.listMenuAPIFailed));
    }
  } catch (error) {
    yield put(CustomerSlice.actions.createCustomerFailed(messages.listMenuSagaFailed));
  }
}
function* updateCustomersaga(
  action: PayloadAction<{
    ModifiedBy: string;
    CustomerId: string;
    updateData: CustomerFormFieldTypes;
  }>,
): Generator<Effect, void, unknown> {
  try {
    const { ModifiedBy, CustomerId, updateData } = action.payload;
    const response = yield call(api.customer.updateCustomer, ModifiedBy, CustomerId, updateData);
    if (response) {
      yield put(CustomerSlice.actions.updateCustomerSuccess(response));
    } else {
      yield put(CustomerSlice.actions.updateCustomerFailed(messages.listSubscriberAPIFailed));
    }
  } catch (error) {
    yield put(CustomerSlice.actions.updateCustomerFailed(messages.listSubscriberSagaFailed));
  }
}
function* deleteCustomersaga(
  action: PayloadAction<{ CustomerId: string; ModifiedBy: string }>,
): Generator<Effect, void, unknown> {
  try {
    const { CustomerId, ModifiedBy } = action.payload;
    const response = yield call(api.customer.deleteCustomer, CustomerId, ModifiedBy);
    if (response) {
      yield put(CustomerSlice.actions.deleteCustomerSuccess(response));
    } else {
      yield put(CustomerSlice.actions.deleteCustomerFailed(messages.deleteMenuAPIFailed));
    }
  } catch (error) {
    yield put(CustomerSlice.actions.deleteCustomerFailed(messages.deleteMenuSagaFailed));
  }
}
export default function* customersaga() {
  yield takeEvery(CustomerSlice.actions.listCustomersRequest, listCustomersSaga);
  yield takeEvery(CustomerSlice.actions.getCustomersRequest, getCustomersSaga);
  yield takeEvery(CustomerSlice.actions.createCustomerRequest, createCustomersaga);
  yield takeEvery(CustomerSlice.actions.updateCustomerRequest, updateCustomersaga);
  yield takeEvery(CustomerSlice.actions.deleteCustomerRequest, deleteCustomersaga);
}
