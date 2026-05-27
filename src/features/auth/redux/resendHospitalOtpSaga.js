import { call, put, takeLatest } from 'redux-saga/effects';
import { apiGateway } from '../../../api/apiGateway';
import API_ENDPOINTS from '../../../api/apiEndpoints';
import { API_METHODS } from '../../../api/apiConfig';
import { resendHospitalOtpRequest, resendHospitalOtpSuccess, resendHospitalOtpFailure } from './resendHospitalOtpSlice';

function* handleResendHospitalOtp(action) {
  try {
    const { email, phone } = action.payload;

    const payload = {
      email,
      phone,
    };
    console.log('resend hospital otp saga request:', payload);

    const response = yield call(
      apiGateway,
      API_ENDPOINTS.resendHospitalOtp,
      API_METHODS.POST,
      payload
    );
    console.log('resend hospital otp saga response:', response);

    yield put(resendHospitalOtpSuccess(response));
  } catch (error) {
    yield put(resendHospitalOtpFailure(error.message || 'Failed to resend OTP'));
  }
}

export default function* resendHospitalOtpSaga() {
  yield takeLatest(resendHospitalOtpRequest.type, handleResendHospitalOtp);
}
