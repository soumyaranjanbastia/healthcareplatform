import { all, fork } from 'redux-saga/effects';

function* watchBookingInit() {
  console.log('📅 Booking Saga initialized: monitoring queue slots...');
  yield null;
}

export default function* bookingSaga() {
  yield all([
    fork(watchBookingInit)
  ]);
}
