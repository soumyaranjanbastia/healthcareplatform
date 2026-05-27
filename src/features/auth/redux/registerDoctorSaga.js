import { call, put, takeLatest } from 'redux-saga/effects';
import { apiGateway } from '../../../api/apiGateway';
import { API_METHODS } from '../../../api/apiConfig';
import API_ENDPOINTS from '../../../api/apiEndpoints';
import {
  registerDoctorRequest,
  registerDoctorSuccess,
  registerDoctorFailure
} from './registerDoctorSlice';

function* handleRegisterDoctor(action) {
  try {
    const payload = action.payload;
    
    const response = yield call(
      apiGateway,
      API_ENDPOINTS.registerDoctor,
      API_METHODS.POST,
      payload
    );

    yield put(registerDoctorSuccess(response.data || response));
  } catch (error) {
    yield put(registerDoctorFailure(error.message || 'Failed to register doctor. Please try again.'));
  }
}

export function* watchRegisterDoctorSaga() {
  yield takeLatest(registerDoctorRequest.type, handleRegisterDoctor);
}
