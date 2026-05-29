import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getAvailabilityRequest,
  getAvailabilitySuccess,
  getAvailabilityFailure,
} from './getAvailabilitySlice';
import { apiGateway } from '../../../api/apiGateway';
import API_ENDPOINTS from '../../../api/apiEndpoints';
import { API_METHODS } from '../../../api/apiConfig';

function* handleGetAvailability(action) {
  console.log('Get Availability saga called with payload:', action.payload);
  try {
    const response = yield call(
      apiGateway,
      API_ENDPOINTS.getAvailability,
      API_METHODS.POST,
      action.payload
    );
    console.log('📥 Saga: Get Availability Response:', JSON.stringify(response, null, 2));
    yield put(getAvailabilitySuccess(response));
  } catch (error) {
    yield put(getAvailabilityFailure(error.message || 'Something went wrong'));
  }
}

export default function* getAvailabilitySaga() {
  yield takeLatest(getAvailabilityRequest.type, handleGetAvailability);
}
