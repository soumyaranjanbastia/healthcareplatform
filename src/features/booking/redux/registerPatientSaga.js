import { call, put, takeLatest } from 'redux-saga/effects';
import { apiGateway } from '../../../api/apiGateway';
import API_ENDPOINTS from '../../../api/apiEndpoints';
import { API_METHODS } from '../../../api/apiConfig';
import { registerPatientRequest, registerPatientSuccess, registerPatientFailure } from './registerPatientSlice';

function* handleRegisterPatient(action) {
  try {
    const payload = action.payload;
    console.log('register patient saga request:', payload);

    const response = yield call(
      apiGateway,
      API_ENDPOINTS.registerPatient,
      API_METHODS.POST,
      payload
    );
    console.log('register patient saga response:', response);

    yield put(registerPatientSuccess(response.data || response));
  } catch (error) {
    yield put(registerPatientFailure(error.message || 'Failed to register patient'));
  }
}

export default function* registerPatientSaga() {
  yield takeLatest(registerPatientRequest.type, handleRegisterPatient);
}
