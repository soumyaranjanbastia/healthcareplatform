import { takeLatest, call, put } from 'redux-saga/effects';
import { apiGateway } from '../../../api/apiGateway';
import { API_METHODS } from '../../../api/apiConfig';
import API_ENDPOINTS from '../../../api/apiEndpoints';
import {
  submitProfessionalDetailsRequest,
  submitProfessionalDetailsSuccess,
  submitProfessionalDetailsFailure,
} from './professionalDetailsSlice';

function* handleProfessionalDetails(action) {
  console.log('ProfessionalDetails action req', action.payload);

  try {
    const response = yield call(
      apiGateway,
      API_ENDPOINTS.professionalDetails,
      API_METHODS.POST,
      action.payload
    );
    console.log('ProfessionalDetails Saga Response:', response);

    // Check if the API response indicates success
    if (response.success) {
      yield put(submitProfessionalDetailsSuccess(response));
    } else {
      // API returned success: false, treat as failure
      yield put(submitProfessionalDetailsFailure(response.message || 'Failed to submit professional details'));
    }
  } catch (error) {
    yield put(submitProfessionalDetailsFailure(error.message || 'An error occurred while submitting professional details'));
  }
}

export function* professionalDetailsSaga() {
  yield takeLatest(
    submitProfessionalDetailsRequest.type,
    handleProfessionalDetails
  );
}

export default professionalDetailsSaga;
