import { call, put, takeLatest } from 'redux-saga/effects';
import {
  setAvailabilityRequest,
  setAvailabilitySuccess,
  setAvailabilityFailure,
} from './setAvailabilitySlice';
import { getAvailabilityRequest } from './getAvailabilitySlice';
import { apiGateway } from '../../../api/apiGateway';
import API_ENDPOINTS from '../../../api/apiEndpoints';
import { API_METHODS } from '../../../api/apiConfig';

function* handleSetAvailability(action) {
  console.log('🚀 [setAvailabilitySaga] Request Payload:', JSON.stringify(action.payload, null, 2));

  try {
    const response = yield call(
      apiGateway,
      API_ENDPOINTS.setAvailability,
      API_METHODS.POST,
      action.payload
    );
    console.log('📥 [setAvailabilitySaga] API Response:', JSON.stringify(response, null, 2));

    if (response.success === false || response.error) {
      const errorMessage = response.message || response.error || 'Failed to save schedule';
      yield put(setAvailabilityFailure(errorMessage));
      return;
    }

    yield put(setAvailabilitySuccess(response));

    // Immediately reload availability schedule
    yield put(getAvailabilityRequest({
      doctorId: action.payload.doctorId,
      location: action.payload.location || 'Asia/Kolkata',
      country: action.payload.country || 'IN',
    }));

  } catch (error) {
    console.error('❌ [setAvailabilitySaga] FATAL ERROR:', error);
    yield put(setAvailabilityFailure(error.message || 'Something went wrong'));
  }
}

export default function* setAvailabilitySaga() {
  yield takeLatest(setAvailabilityRequest.type, handleSetAvailability);
}
