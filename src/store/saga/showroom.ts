import { takeEvery, call, put, Effect } from 'redux-saga/effects';
import api from '../api';
import { messages } from 'config/messages';
import { PayloadAction } from '@reduxjs/toolkit';
import { ShowRoomFormFieldTypes } from 'utils/types';
import ShowRoomSlice from 'store/reducers/showroomSlice';

function* listShowRoomsSaga(
  action: PayloadAction<{ SubscriberId: string; BranchId: string }>,
): Generator<Effect, void, unknown> {
  try {
    const { SubscriberId, BranchId } = action.payload;
    const response = yield call(api.showroom.listAllShowRooms, SubscriberId, BranchId);
    if (response) {
      yield put(ShowRoomSlice.actions.listShowRoomsSuccess(response));
    } else {
      yield put(ShowRoomSlice.actions.listShowRoomsFailed(messages.listMenuAPIFailed));
    }
  } catch (error) {
    yield put(ShowRoomSlice.actions.listShowRoomsFailed(messages.listMenuSagaFailed));
  }
}

function* createShowRoomsaga(
  action: PayloadAction<{ ShowRoomData: ShowRoomFormFieldTypes }>,
): Generator<Effect, void, unknown> {
  try {
    const { ShowRoomData } = action.payload;
    const response = yield call(api.showroom.createShowRoom, ShowRoomData);
    if (response) {
      yield put(ShowRoomSlice.actions.createShowRoomSuccess(response));
    } else {
      yield put(ShowRoomSlice.actions.createShowRoomFailed(messages.listMenuAPIFailed));
    }
  } catch (error) {
    yield put(ShowRoomSlice.actions.createShowRoomFailed(messages.listMenuSagaFailed));
  }
}
function* updateShowRoomsaga(
  action: PayloadAction<{
    ShowRoomId: string;
    updateData: ShowRoomFormFieldTypes;
  }>,
): Generator<Effect, void, unknown> {
  try {
    const { ShowRoomId, updateData } = action.payload;
    const response = yield call(api.showroom.updateShowRoom, ShowRoomId, updateData);
    if (response) {
      yield put(ShowRoomSlice.actions.updateShowRoomSuccess(response));
    } else {
      yield put(ShowRoomSlice.actions.updateShowRoomFailed(messages.listSubscriberAPIFailed));
    }
  } catch (error) {
    yield put(ShowRoomSlice.actions.updateShowRoomFailed(messages.listSubscriberSagaFailed));
  }
}
function* deleteShowRoomsaga(
  action: PayloadAction<{ ShowRoomId: string; ModifiedBy: string }>,
): Generator<Effect, void, unknown> {
  try {
    const { ShowRoomId, ModifiedBy } = action.payload;
    const response = yield call(api.showroom.deleteShowRoom, ShowRoomId, ModifiedBy);
    if (response) {
      yield put(ShowRoomSlice.actions.deleteShowRoomSuccess(response));
    } else {
      yield put(ShowRoomSlice.actions.deleteShowRoomFailed(messages.deleteMenuAPIFailed));
    }
  } catch (error) {
    yield put(ShowRoomSlice.actions.deleteShowRoomFailed(messages.deleteMenuSagaFailed));
  }
}
export default function* showroomsaga() {
  yield takeEvery(ShowRoomSlice.actions.listShowRoomsRequest, listShowRoomsSaga);
  yield takeEvery(ShowRoomSlice.actions.createShowRoomRequest, createShowRoomsaga);
  yield takeEvery(ShowRoomSlice.actions.updateShowRoomRequest, updateShowRoomsaga);
  yield takeEvery(ShowRoomSlice.actions.deleteShowRoomRequest, deleteShowRoomsaga);
}
