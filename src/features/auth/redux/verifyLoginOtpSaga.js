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

    const responseData = response.data || response;
    
    // Store companyId in localStorage for subsequent API calls
    if (responseData?.user?.companyId) {
      localStorage.setItem('companyId', responseData.user.companyId);
    }

    yield put(verifyLoginOtpSuccess(responseData));
  } catch (error) {
    yield put(verifyLoginOtpFailure(error.message || 'Failed to verify OTP. Please try again.'));
  }
}

export function* watchVerifyLoginOtpSaga() {
  yield takeLatest(verifyLoginOtpRequest.type, handleVerifyLoginOtp);
}
