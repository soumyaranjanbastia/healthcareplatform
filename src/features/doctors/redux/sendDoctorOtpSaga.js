import { call, put, takeLatest } from 'redux-saga/effects';
import { apiGateway } from '../../../api/apiGateway';
import API_ENDPOINTS from '../../../api/apiEndpoints';
import { API_METHODS } from '../../../api/apiConfig';
import { sendDoctorOtpRequest, sendDoctorOtpSuccess, sendDoctorOtpFailure } from './sendDoctorOtpSlice';

function* handleSendDoctorOtp(action) {
  try {
    const { email, phone } = action.payload;

    const payload = {
      email,
      phone,
      type: 'doctor',
    };
    console.log('send doctor otp saga request:', payload);

    const response = yield call(
      apiGateway,
      API_ENDPOINTS.insertEmailandPhone,
      API_METHODS.POST,
      payload
    );
    console.log('send doctor otp saga response:', response);

    yield put(sendDoctorOtpSuccess(response));
  } catch (error) {
    yield put(sendDoctorOtpFailure(error.message || 'Failed to send OTP'));
  }
}

export default function* sendDoctorOtpSaga() {
  yield takeLatest(sendDoctorOtpRequest.type, handleSendDoctorOtp);
}
