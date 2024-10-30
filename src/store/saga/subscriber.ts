import { takeEvery, call, put, Effect } from 'redux-saga/effects';
import api from '../api';
import subscriberSlice from '../reducers/subscriberSlice';
import { messages } from 'config/messages';
import { PayloadAction } from '@reduxjs/toolkit';
import { SubscriberFormFieldTypes } from 'utils/types';

function* listSubscribersSaga(): Generator<Effect, void, unknown> {
  try {
    const response = yield call(api.subscriber.listAllSubscribers);
    if (response) {
      yield put(subscriberSlice.actions.listSubscribersSuccess(response));
    } else {
      yield put(subscriberSlice.actions.listSubscribersFailed(messages.listSubscriberAPIFailed));
    }
  } catch (error) {
    yield put(subscriberSlice.actions.listSubscribersFailed(messages.listSubscriberSagaFailed));
  }
}

function* listLogsSaga(action: PayloadAction<string>): Generator<Effect, void, unknown> {
  try {
    const response = yield call(api.subscriber.listAllLogs, action.payload);
    if (response) {
      yield put(subscriberSlice.actions.listLogsSuccess(response));
    } else {
      yield put(subscriberSlice.actions.listLogsFailed(messages.listSubscriberAPIFailed));
    }
  } catch (error) {
    yield put(subscriberSlice.actions.listLogsFailed(messages.listSubscriberSagaFailed));
  }
}

function* getSubscriberSaga(action: PayloadAction<string>): Generator<Effect, void, unknown> {
  try {
    const response = yield call(api.subscriber.getSubscriber, action.payload);
    if (response) {
      yield put(subscriberSlice.actions.getSubscriberSuccess(response));
    } else {
      yield put(subscriberSlice.actions.getSubscribersFailed(messages.getSubscriberAPIFailed));
    }
  } catch (error) {
    yield put(subscriberSlice.actions.getSubscribersFailed(messages.getSubscriberSagaFailed));
  }
}

function* createSubscriberSaga(
  action: PayloadAction<{
    subscriberData: SubscriberFormFieldTypes;
    CreatedBy: string;
  }>,
): Generator<Effect, void, unknown> {
  try {
    const { subscriberData, CreatedBy } = action.payload;
    const response = yield call(api.subscriber.createSubscriber, subscriberData, CreatedBy);
    if (response) {
      yield put(subscriberSlice.actions.createSubscriberSuccess(response));
    } else {
      yield put(subscriberSlice.actions.createSubscriberFailed(messages.createSubscriberAPIFailed));
    }
  } catch (error) {
    yield put(subscriberSlice.actions.createSubscriberFailed(messages.createSubscriberAPIFailed));
  }
}
function* updateSubscriberSaga(
  action: PayloadAction<{
    subscriberId: string;
    updateData: SubscriberFormFieldTypes;
    sendPassword: boolean;
    ModifiedBy: string;
  }>,
): Generator<Effect, void, unknown> {
  try {
    const { subscriberId, updateData, sendPassword, ModifiedBy } = action.payload;
    const response = yield call(
      api.subscriber.updateSubscriber,
      subscriberId,
      updateData,
      sendPassword,
      ModifiedBy,
    );
    if (response) {
      yield put(subscriberSlice.actions.updateSubscriberSuccess(response));
    } else {
      yield put(subscriberSlice.actions.updateSubscriberFailed(messages.listSubscriberAPIFailed));
    }
  } catch (error) {
    yield put(subscriberSlice.actions.updateSubscriberFailed(messages.listSubscriberSagaFailed));
  }
}
function* deleteSubscriberSaga(
  action: PayloadAction<{ subscriberId: string; ModifiedBy: string }>, // Assuming the payload is a string representing the subscriber ID
): Generator<Effect, void, unknown> {
  try {
    const { subscriberId, ModifiedBy } = action.payload;
    const response = yield call(api.subscriber.deleteSubscriber, subscriberId, ModifiedBy);
    if (response) {
      yield put(subscriberSlice.actions.deleteSubscriberSuccess(response));
    } else {
      yield put(subscriberSlice.actions.deleteSubscriberFailed(messages.deleteSubscriberAPIFailed));
    }
  } catch (error) {
    yield put(subscriberSlice.actions.deleteSubscriberFailed(messages.deleteSubscriberSagaFailed));
  }
}
export default function* subscriberSaga() {
  yield takeEvery(subscriberSlice.actions.listSubscribersRequest, listSubscribersSaga);
  yield takeEvery(subscriberSlice.actions.listLogsRequest, listLogsSaga);
  yield takeEvery(subscriberSlice.actions.createSubscriberRequest, createSubscriberSaga);
  yield takeEvery(subscriberSlice.actions.updateSubscriberRequest, updateSubscriberSaga);
  yield takeEvery(subscriberSlice.actions.deleteSubscriberRequest, deleteSubscriberSaga);
  yield takeEvery(subscriberSlice.actions.getSubscriberRequest, getSubscriberSaga);
}
