import { call, put, takeLatest } from 'redux-saga/effects';
import { apiGateway } from '../../../api/apiGateway';
import API_ENDPOINTS from '../../../api/apiEndpoints';
import { API_METHODS } from '../../../api/apiConfig';
import { resendDoctorOtpRequest, resendDoctorOtpSuccess, resendDoctorOtpFailure } from './resendDoctorOtpSlice';

function* handleResendDoctorOtp(action) {
  try {
    const { email, phone } = action.payload;

    console.log('resend doctor otp saga request for email and phone');

    // Resend Email OTP
    const emailResponse = yield call(
      apiGateway,
      API_ENDPOINTS.resendAuthOtp,
      API_METHODS.POST,
      { type: 'email', email, phone }
    );
    console.log('resend email otp response:', emailResponse);

    // Resend Phone OTP
    const phoneResponse = yield call(
      apiGateway,
      API_ENDPOINTS.resendAuthOtp,
      API_METHODS.POST,
      { type: 'phone', email, phone }
    );
    console.log('resend phone otp response:', phoneResponse);

    yield put(resendDoctorOtpSuccess(phoneResponse));
  } catch (error) {
    yield put(resendDoctorOtpFailure(error.message || 'Failed to resend OTP'));
  }
}

export default function* resendDoctorOtpSaga() {
  yield takeLatest(resendDoctorOtpRequest.type, handleResendDoctorOtp);
}
