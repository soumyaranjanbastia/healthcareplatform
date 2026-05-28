import { call, put, takeLatest } from 'redux-saga/effects';
import { apiGateway } from '../../../api/apiGateway';
import API_ENDPOINTS from '../../../api/apiEndpoints';
import { API_METHODS } from '../../../api/apiConfig';
import {
  getDoctorListRequest,
  getDoctorListSuccess,
  getDoctorListFailure,
} from './doctorListSlice';

function* handleGetDoctorList(action) {
  try {
    const payload = action.payload || {}; // Default empty object payload
    console.log('Saga: Fetching doctor list with payload:', payload);

    const response = yield call(
      apiGateway,
      API_ENDPOINTS.getDoctorList,
      API_METHODS.POST,
      payload
    );
    console.log('Saga: Fetch doctor list response:', response);

    if (response?.success && response?.data) {
      yield put(getDoctorListSuccess(response.data));
    } else {
      throw new Error(response?.message || 'Failed to retrieve doctors');
    }
  } catch (error) {
    yield put(getDoctorListFailure(error.message || 'Failed to retrieve doctors'));
  }
}

export default function* doctorListSaga() {
  yield takeLatest(getDoctorListRequest.type, handleGetDoctorList);
}
