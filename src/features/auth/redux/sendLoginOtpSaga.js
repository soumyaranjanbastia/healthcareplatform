import { call, put, takeLatest } from 'redux-saga/effects';
import { apiGateway } from '../../../api/apiGateway';
import { API_METHODS } from '../../../api/apiConfig';
import API_ENDPOINTS from '../../../api/apiEndpoints';
import {
  sendLoginOtpRequest,
  sendLoginOtpSuccess,
  sendLoginOtpFailure
} from './sendLoginOtpSlice';

function* handleSendLoginOtp(action) {
  try {
    const payload = action.payload; // { email: "..." }

    const response = yield call(
      apiGateway,
      API_ENDPOINTS.sendLoginOtp,
      API_METHODS.POST,
      payload
    );

    yield put(sendLoginOtpSuccess(response.data || response));
  } catch (error) {
    yield put(sendLoginOtpFailure(error.message || 'Failed to send OTP. Please try again.'));
  }
}

export function* watchSendLoginOtpSaga() {
  yield takeLatest(sendLoginOtpRequest.type, handleSendLoginOtp);
}
