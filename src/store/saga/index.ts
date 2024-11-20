import { all, fork } from 'redux-saga/effects';
import counterSaga from './counter';
import authSaga from './auth';
import subscriberSaga from './subscriber';
import userSaga from './user';
import menuSaga from './menu';
import SubMenusaga from './submenu';
import locationsaga from './location';
import citysaga from './city';
import ledgerGroupsaga from './ledgerGroup';
import ledgersaga from './ledger';
import subscribercitysaga from './sub-city';
import branchsaga from './branch';
import agentsaga from './agent';
import showroomsaga from './showroom';
import customersaga from './customer';
import vehiclesaga from './vehicle';
import loansaga from './loan';
import duesaga from './due';
import reportSaga from './report';
import paymentsaga from './payments';
import enumMastersaga from './enumMaster';
function* rootSaga() {
  yield all([
    fork(counterSaga),
    fork(authSaga),
    fork(subscriberSaga),
    fork(userSaga),
    fork(menuSaga),
    fork(SubMenusaga),
    fork(locationsaga),
    fork(citysaga),
    fork(ledgerGroupsaga),
    fork(ledgersaga),
    fork(subscribercitysaga),
    fork(branchsaga),
    fork(agentsaga),
    fork(showroomsaga),
    fork(customersaga),
    fork(vehiclesaga),
    fork(loansaga),
    fork(duesaga),
    fork(reportSaga),
    fork(paymentsaga),
    fork(enumMastersaga),
  ]);
}

export default rootSaga;
