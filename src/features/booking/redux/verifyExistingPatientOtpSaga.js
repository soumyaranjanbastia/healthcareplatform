import { call, put, takeLatest } from 'redux-saga/effects';
import { apiGateway } from '../../../api/apiGateway';
import API_ENDPOINTS from '../../../api/apiEndpoints';
import { API_METHODS } from '../../../api/apiConfig';
import {
  verifyExistingPatientOtpRequest,
  verifyExistingPatientOtpSuccess,
  verifyExistingPatientOtpFailure,
} from './verifyExistingPatientOtpSlice';

function* handleVerifyExistingPatientOtp(action) {
  try {
    const payload = {
      identifier: action.payload.identifier,
      code: action.payload.code,
      key: action.payload.key,
    };
    console.log('verify existing patient otp saga request:', payload);

    const response = yield call(
      apiGateway,
      API_ENDPOINTS.verifyExistingPatientOtp,
      API_METHODS.POST,
      payload
    );
    console.log('verify existing patient otp saga response:', response);

    yield put(verifyExistingPatientOtpSuccess(response.data || response));
  } catch (error) {
    yield put(verifyExistingPatientOtpFailure(error.message || 'OTP verification failed'));
  }
}

export default function* verifyExistingPatientOtpSaga() {
  yield takeLatest(verifyExistingPatientOtpRequest.type, handleVerifyExistingPatientOtp);
}
