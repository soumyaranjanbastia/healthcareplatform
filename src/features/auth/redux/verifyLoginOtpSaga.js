import { call, put, takeLatest } from 'redux-saga/effects';
import { apiGateway } from '../../../api/apiGateway';
import { API_METHODS } from '../../../api/apiConfig';
import API_ENDPOINTS from '../../../api/apiEndpoints';
import {
  verifyLoginOtpRequest,
  verifyLoginOtpSuccess,
  verifyLoginOtpFailure
} from './verifyLoginOtpSlice';

function* handleVerifyLoginOtp(action) {
  try {
    const payload = action.payload; // { otp, encryptionKey }
    
    const response = yield call(
      apiGateway,
      API_ENDPOINTS.verifyLoginOtp,
      API_METHODS.POST,
      payload
    );

    yield put(verifyLoginOtpSuccess(response.data || response));
  } catch (error) {
    yield put(verifyLoginOtpFailure(error.message || 'Failed to verify OTP. Please try again.'));
  }
}

export function* watchVerifyLoginOtpSaga() {
  yield takeLatest(verifyLoginOtpRequest.type, handleVerifyLoginOtp);
}
