import { call, put, takeLatest } from 'redux-saga/effects';
import { apiGateway } from '../../../api/apiGateway';
import { API_METHODS } from '../../../api/apiConfig';
import API_ENDPOINTS from '../../../api/apiEndpoints';
import {
  mapDoctorRequest,
  mapDoctorSuccess,
  mapDoctorFailure
} from './mapDoctorSlice';

function* handleMapDoctor(action) {
  try {
    const payload = action.payload; // expects { doctorId, branchId }
    console.log('Saga: Mapping doctor to branch...', payload);
    
    const response = yield call(
      apiGateway,
      API_ENDPOINTS.mapDoctorBranch,
      API_METHODS.POST,
      payload
    );
    
    console.log('Saga: mapDoctor POST response:', response);
    if (response && response.success) {
      yield put(mapDoctorSuccess(response.data || response));
    } else {
      throw new Error(response?.message || 'Failed to map doctor to branch');
    }
  } catch (error) {
    yield put(mapDoctorFailure(error.message || 'An error occurred while mapping doctor to branch'));
  }
}

export default function* mapDoctorSaga() {
  yield takeLatest(mapDoctorRequest.type, handleMapDoctor);
}
