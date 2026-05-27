import { call, put, takeLatest } from 'redux-saga/effects';
import { apiGateway } from '../../../api/apiGateway';
import API_ENDPOINTS from '../../../api/apiEndpoints';
import { API_METHODS } from '../../../api/apiConfig';
import {
  validateEmailOtpRequest,
  validateEmailOtpSuccess,
  validateEmailOtpFailure,
  validatePhoneOtpRequest,
  validatePhoneOtpSuccess,
  validatePhoneOtpFailure,
} from './otpValidationSlice';

function* handleValidateEmailOtp(action) {
  try {
    const payload = {
      encryptionKey: action.payload.encryptionKey,
      emailOtp: action.payload.emailOtp,
    };
    console.log('validate email otp saga request:', payload);

    const response = yield call(
      apiGateway,
      API_ENDPOINTS.validateOtp,
      API_METHODS.POST,
      payload
    );
    console.log('validate email otp saga response:', response);

    yield put(validateEmailOtpSuccess(response.data || response));
  } catch (error) {
    yield put(validateEmailOtpFailure(error.message || 'Email OTP validation failed'));
  }
}

function* handleValidatePhoneOtp(action) {
  try {
    const payload = {
      encryptionKey: action.payload.encryptionKey,
      phoneOtp: action.payload.phoneOtp,
    };
    console.log('validate phone otp saga request:', payload);

    const response = yield call(
      apiGateway,
      API_ENDPOINTS.validateOtp,
      API_METHODS.POST,
      payload
    );
    console.log('validate phone otp saga response:', response);

    yield put(validatePhoneOtpSuccess(response.data || response));
  } catch (error) {
    yield put(validatePhoneOtpFailure(error.message || 'Phone OTP validation failed'));
  }
}

export default function* otpValidationSaga() {
  yield takeLatest(validateEmailOtpRequest.type, handleValidateEmailOtp);
  yield takeLatest(validatePhoneOtpRequest.type, handleValidatePhoneOtp);
}
