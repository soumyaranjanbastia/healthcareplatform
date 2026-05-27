import { call, put, takeLatest } from 'redux-saga/effects';
import { apiGateway } from '../../../api/apiGateway';
import API_ENDPOINTS from '../../../api/apiEndpoints';
import { API_METHODS } from '../../../api/apiConfig';
import { sendHospitalOtpRequest, sendHospitalOtpSuccess, sendHospitalOtpFailure } from './sendHospitalOtpSlice';

function* handleSendHospitalOtp(action) {
  try {
    const { email, phone } = action.payload;

    const payload = {
      email,
      phone,
    };
    console.log('send hospital otp saga request:', payload);

    const response = yield call(
      apiGateway,
      API_ENDPOINTS.sendHospitalOtp,
      API_METHODS.POST,
      payload
    );
    console.log('send hospital otp saga response:', response);

    yield put(sendHospitalOtpSuccess(response));
  } catch (error) {
    yield put(sendHospitalOtpFailure(error.message || 'Failed to send OTP'));
  }
}

export default function* sendHospitalOtpSaga() {
  yield takeLatest(sendHospitalOtpRequest.type, handleSendHospitalOtp);
}
