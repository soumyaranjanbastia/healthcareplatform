import { call, put, takeLatest } from 'redux-saga/effects';
import { apiGateway } from '../../../api/apiGateway';
import API_ENDPOINTS from '../../../api/apiEndpoints';
import { API_METHODS } from '../../../api/apiConfig';
import { resendOtpRequest, resendOtpSuccess, resendOtpFailure } from './resendOtpSlice';

function* handleResendOtp(action) {
  try {
    const payload = {
      encryptionKey: action.payload.encryptionKey,
      type: action.payload.type, // 'email' | 'phone'
    };
    console.log('resend otp saga request:', payload);

    const response = yield call(
      apiGateway,
      API_ENDPOINTS.resendOtp,
      API_METHODS.POST,
      payload
    );
    console.log('resend otp saga response:', response);

    yield put(resendOtpSuccess(response.data || response));
  } catch (error) {
    yield put(resendOtpFailure(error.message || 'Failed to resend OTP'));
  }
}

export default function* resendOtpSaga() {
  yield takeLatest(resendOtpRequest.type, handleResendOtp);
}
