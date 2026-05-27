import { all, fork } from 'redux-saga/effects';

function* watchDashboardInit() {
  console.log('📈 Dashboard Saga initialized: monitoring medical nodes...');
  yield null;
}

export default function* dashboardSaga() {
  yield all([
    fork(watchDashboardInit)
  ]);
}
