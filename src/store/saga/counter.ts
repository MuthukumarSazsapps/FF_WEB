import { takeEvery, delay } from 'redux-saga/effects';
import counterSlice from 'store/reducers/counter';

function* handleIncrementAsync() {
  yield delay(1000); // Simulate an API call or some async operation
  yield counterSlice.actions.increment();
}

function* handleDecrementAsync() {
  yield delay(1000); // Simulate an API call or some async operation
  yield counterSlice.actions.decrement();
}

export default function* counterSaga() {
  yield takeEvery(counterSlice.actions.increment.type, handleIncrementAsync);
  yield takeEvery(counterSlice.actions.decrement.type, handleDecrementAsync);
}
