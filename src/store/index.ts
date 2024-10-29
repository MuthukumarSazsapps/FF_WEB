import { configureStore } from '@reduxjs/toolkit';
// import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './saga';
import counterSlice from './reducers/counter';
import authSlice from './reducers/auth';
import subscriberSlice from './reducers/subscriberSlice';
import userSlice from './reducers/userSlice';
import menuSlice from './reducers/menuSlice';
import subMenuSlice from './reducers/submenuSlice';
import LocationSlice from './reducers/locationSlice';
import CitySlice from './reducers/citySlice';
import SubCitySlice from './reducers/sub-citySlice';
import BranchSlice from './reducers/branchSlice';
import AgentSlice from './reducers/agentSlice';
import ShowRoomSlice from './reducers/showroomSlice';
import CustomerSlice from './reducers/customerSlice';
import VehicleSlice from './reducers/vehicleSlice';
import LoanSlice from './reducers/loanSlice';
import ledgerGroupSlice from './reducers/ledgerGroupSlice';
import LedgerSlice from './reducers/ledgerSlice';
import DueSlice from './reducers/dueSlice';
import ReportSlice from './reducers/reportSlice';
import PaymentSlice from './reducers/paymentSlice';

const createSagaMiddleware = require('redux-saga').default;

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(middleware),
});

sagaMiddleware.run(rootSaga);

export const dispatch = store.dispatch;
export default store;
export const actions = {
  ...counterSlice.actions,
  ...authSlice.actions,
  ...subscriberSlice.actions,
  ...userSlice.actions,
  ...menuSlice.actions,
  ...subMenuSlice.actions,
  ...LocationSlice.actions,
  ...CitySlice.actions,
  ...SubCitySlice.actions,
  ...BranchSlice.actions,
  ...AgentSlice.actions,
  ...ShowRoomSlice.actions,
  ...CustomerSlice.actions,
  ...VehicleSlice.actions,
  ...LoanSlice.actions,
  ...ledgerGroupSlice.actions,
  ...LedgerSlice.actions,
  ...DueSlice.actions,
  ...ReportSlice.actions,
  ...PaymentSlice.actions,
};
