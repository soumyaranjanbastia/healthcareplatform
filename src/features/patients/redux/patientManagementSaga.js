import { call, put, takeLatest } from 'redux-saga/effects';
import { apiGateway } from '../../../api/apiGateway';
import API_ENDPOINTS from '../../../api/apiEndpoints';
import { fetchPatientsRequest, fetchPatientsSuccess, fetchPatientsFailure } from './patientManagementSlice';

function* handleFetchPatients(action) {
  try {
    const payload = action.payload || {};
    const response = yield call(apiGateway, API_ENDPOINTS.patientManagement, 'POST', payload);

    if (response.success) {
      // Assuming response.data contains the list of patients
      yield put(fetchPatientsSuccess(response.data || []));
    } else {
      yield put(fetchPatientsFailure(response.message || 'Failed to fetch patients'));
    }
  } catch (error) {
    yield put(fetchPatientsFailure(error.message || 'An error occurred while fetching patients'));
  }
}

export default function* patientManagementSaga() {
  yield takeLatest(fetchPatientsRequest.type, handleFetchPatients);
}
