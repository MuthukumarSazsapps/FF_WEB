import { takeEvery, call, put, Effect } from 'redux-saga/effects';
import api from '../api';
import { messages } from 'config/messages';
import { PayloadAction } from '@reduxjs/toolkit';
import { VehicleFormFieldTypes } from 'utils/types';
import VehicleSlice from 'store/reducers/vehicleSlice';

function* listVehiclesSaga(
  action: PayloadAction<{ SubscriberId: string; BranchId: string }>,
): Generator<Effect, void, unknown> {
  try {
    const { SubscriberId, BranchId } = action.payload;
    const response = yield call(api.vehicle.listAllVehicles, SubscriberId, BranchId);
    if (response) {
      yield put(VehicleSlice.actions.listVehiclesSuccess(response));
    } else {
      yield put(VehicleSlice.actions.listVehiclesFailed(messages.listMenuAPIFailed));
    }
  } catch (error) {
    yield put(VehicleSlice.actions.listVehiclesFailed(messages.listMenuSagaFailed));
  }
}

function* createVehiclesaga(
  action: PayloadAction<{ VehicleData: VehicleFormFieldTypes }>,
): Generator<Effect, void, unknown> {
  try {
    const { VehicleData } = action.payload;
    const response = yield call(api.vehicle.createVehicle, VehicleData);
    if (response) {
      yield put(VehicleSlice.actions.createVehicleSuccess(response));
    } else {
      yield put(VehicleSlice.actions.createVehicleFailed(messages.listMenuAPIFailed));
    }
  } catch (error) {
    yield put(VehicleSlice.actions.createVehicleFailed(messages.listMenuSagaFailed));
  }
}
function* updateVehiclesaga(
  action: PayloadAction<{
    VehicleTypeId: string;
    updateData: VehicleFormFieldTypes;
  }>,
): Generator<Effect, void, unknown> {
  try {
    const { VehicleTypeId, updateData } = action.payload;
    const response = yield call(api.vehicle.updateVehicle, VehicleTypeId, updateData);
    if (response) {
      yield put(VehicleSlice.actions.updateVehicleSuccess(response));
    } else {
      yield put(VehicleSlice.actions.updateVehicleFailed(messages.listSubscriberAPIFailed));
    }
  } catch (error) {
    yield put(VehicleSlice.actions.updateVehicleFailed(messages.listSubscriberSagaFailed));
  }
}
function* deleteVehiclesaga(
  action: PayloadAction<{ VehicleTypeId: string; ModifiedBy: string }>,
): Generator<Effect, void, unknown> {
  try {
    const { VehicleTypeId, ModifiedBy } = action.payload;
    const response = yield call(api.vehicle.deleteVehicle, VehicleTypeId, ModifiedBy);
    if (response) {
      yield put(VehicleSlice.actions.deleteVehicleSuccess(response));
    } else {
      yield put(VehicleSlice.actions.deleteVehicleFailed(messages.deleteMenuAPIFailed));
    }
  } catch (error) {
    yield put(VehicleSlice.actions.deleteVehicleFailed(messages.deleteMenuSagaFailed));
  }
}
export default function* vehiclesaga() {
  yield takeEvery(VehicleSlice.actions.listVehiclesRequest, listVehiclesSaga);
  yield takeEvery(VehicleSlice.actions.createVehicleRequest, createVehiclesaga);
  yield takeEvery(VehicleSlice.actions.updateVehicleRequest, updateVehiclesaga);
  yield takeEvery(VehicleSlice.actions.deleteVehicleRequest, deleteVehiclesaga);
}
