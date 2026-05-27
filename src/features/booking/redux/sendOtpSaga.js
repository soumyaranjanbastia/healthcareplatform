import { call, put, takeLatest } from 'redux-saga/effects';
import { apiGateway } from '../../../api/apiGateway';
import API_ENDPOINTS from '../../../api/apiEndpoints';
import { API_METHODS } from '../../../api/apiConfig';
import { sendOtpRequest, sendOtpSuccess, sendOtpFailure } from './sendOtpSlice';

function* handleSendOtp(action) {
  try {
    const payload = {
      identifier: action.payload.identifier
    };
    console.log('send otp saga request:', payload);

    const response = yield call(
      apiGateway,
      API_ENDPOINTS.sendOtp,
      API_METHODS.POST,
      payload
    );
    console.log('send otp saga response:', response);

    yield put(sendOtpSuccess(response));
  } catch (error) {
    yield put(sendOtpFailure(error.message || 'Failed to send OTP'));
  }
}

export default function* sendOtpSaga() {
  yield takeLatest(sendOtpRequest.type, handleSendOtp);
}
