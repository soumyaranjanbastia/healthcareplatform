import { all, fork } from 'redux-saga/effects';
import authSaga from '../features/auth/redux/authSaga';
import bookingSaga from '../features/booking/redux/bookingSaga';
import dashboardSaga from '../features/dashboard/redux/dashboardSaga';

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(bookingSaga),
    fork(dashboardSaga),
  ]);
}
