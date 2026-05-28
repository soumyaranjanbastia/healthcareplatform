import { call, put, takeLatest } from 'redux-saga/effects';
import { apiGateway } from '../../../api/apiGateway';
import API_ENDPOINTS from '../../../api/apiEndpoints';
import { API_METHODS } from '../../../api/apiConfig';
import { verifyDoctorOtpRequest, verifyDoctorOtpSuccess, verifyDoctorOtpFailure } from './verifyDoctorOtpSlice';

function* handleVerifyDoctorOtp(action) {
  try {
    const { code, key, type, email, userId, phoneVerificationKey } = action.payload;

    const payload = {
      code: code.toString().trim(),
      key: key.toString().trim(),
      type: type.toString().trim(),
      registrationType: 'provider',
      flowType: 'registration',
    };

    if (email) {
      payload.email = email;
    }
    if (userId) {
      payload.userId = userId;
    }
    if (type === 'email') {
      payload.phoneVerificationKey = phoneVerificationKey !== undefined ? phoneVerificationKey : true;
    }

    console.log(`verify doctor ${type} otp request:`, payload);

    const response = yield call(
      apiGateway,
      API_ENDPOINTS.verifyAuthOtp,
      API_METHODS.POST,
      payload
    );
    console.log(`verify doctor ${type} otp response:`, response);

    if (response?.success === false || response?.result?.success === false) {
      throw new Error(response?.message || response?.result?.message || `Failed to verify ${type} OTP`);
    }

    yield put(verifyDoctorOtpSuccess(response));
  } catch (error) {
    yield put(verifyDoctorOtpFailure(error.message || 'Failed to verify OTP'));
  }
}

export default function* verifyDoctorOtpSaga() {
  yield takeLatest(verifyDoctorOtpRequest.type, handleVerifyDoctorOtp);
}
