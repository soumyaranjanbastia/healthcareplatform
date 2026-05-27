import { all, fork } from 'redux-saga/effects';

function* watchAuthInit() {
  console.log('🔒 Auth Saga initialized: monitoring session tokens...');
  yield null;
}

export default function* authSaga() {
  yield all([
    fork(watchAuthInit)
  ]);
}
