import { combineReducers } from 'redux';
import counterSlice from './counter';
import authSlice from './auth';
import subscriberSlice from './subscriberSlice';
import userSlice from './userSlice';
import MenuSlice from './menuSlice';
import SubMenuSlice from './submenuSlice';
import LocationSlice from './locationSlice';
import CitySlice from './citySlice';
import LedgerGroupSlice from './ledgerGroupSlice';
import LedgerSlice from './ledgerSlice';
import SubCitySlice from './sub-citySlice';
import BranchSlice from './branchSlice';
import AgentSlice from './agentSlice';
import ShowRoomSlice from './showroomSlice';
import CustomerSlice from './customerSlice';
import VehicleSlice from './vehicleSlice';
import LoanSlice from './loanSlice';
import DueSlice from './dueSlice';
import ReportSlice from './reportSlice';
import PaymentSlice from './paymentSlice';

const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  auth: authSlice.reducer,
  subscribers: subscriberSlice.reducer,
  users: userSlice.reducer,
  menus: MenuSlice.reducer,
  submenus: SubMenuSlice.reducer,
  locations: LocationSlice.reducer,
  cities: CitySlice.reducer,
  LedgerGroups: LedgerGroupSlice.reducer,
  Ledger: LedgerSlice.reducer,
  subcities: SubCitySlice.reducer,
  branches: BranchSlice.reducer,
  agents: AgentSlice.reducer,
  showrooms: ShowRoomSlice.reducer,
  customers: CustomerSlice.reducer,
  vehicles: VehicleSlice.reducer,
  loans: LoanSlice.reducer,
  dues: DueSlice.reducer,
  report: ReportSlice.reducer,
  payment: PaymentSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
