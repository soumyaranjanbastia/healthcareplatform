import { all } from 'redux-saga/effects';

function* helloSaga() {
  console.log('🌟 Swastyam Healthcare Platform Saga Initialized successfully!');
  yield null;
}

export default function* rootSaga() {
  yield all([
    helloSaga(),
  ]);
}
