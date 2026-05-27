import { call, put, takeLatest } from 'redux-saga/effects';
import { apiGateway } from '../../../api/apiGateway';
import API_ENDPOINTS from '../../../api/apiEndpoints';
import { API_METHODS } from '../../../api/apiConfig';
import { verifyHospitalOtpRequest, verifyHospitalOtpSuccess, verifyHospitalOtpFailure } from './verifyHospitalOtpSlice';

function* handleVerifyHospitalOtp(action) {
  try {
    const { emailOtp, emailKey, phoneOtp, phoneKey } = action.payload;

    const payload = {
      emailOtp,
      emailKey,
      phoneOtp,
      phoneKey,
    };
    console.log('verify hospital otp saga request:', payload);

    const response = yield call(
      apiGateway,
      API_ENDPOINTS.verifyHospitalOtp,
      API_METHODS.POST,
      payload
    );
    console.log('verify hospital otp saga response:', response);

    yield put(verifyHospitalOtpSuccess(response));
  } catch (error) {
    yield put(verifyHospitalOtpFailure(error.message || 'Failed to verify OTP'));
  }
}

export default function* verifyHospitalOtpSaga() {
  yield takeLatest(verifyHospitalOtpRequest.type, handleVerifyHospitalOtp);
}
