import { call, put, takeLatest } from 'redux-saga/effects';
import { apiGateway } from '../../../api/apiGateway';
import API_ENDPOINTS from '../../../api/apiEndpoints';
import { API_METHODS } from '../../../api/apiConfig';
import { getGeoDataRequest, getGeoDataSuccess, getGeoDataFailure } from './geoDataSlice';

function* handleGetGeoData(action) {
  try {
    const payload = {}; // request payload is empty as requested
    console.log('get geo data saga request:', payload);

    const response = yield call(
      apiGateway,
      API_ENDPOINTS.getGeoData,
      API_METHODS.POST,
      payload
    );
    console.log('get geo data saga response:', response);

    yield put(getGeoDataSuccess(response.data)); // We only dispatch response.data which contains the array of countries
  } catch (error) {
    yield put(getGeoDataFailure(error.message || 'Failed to fetch geo data'));
  }
}

export default function* geoDataSaga() {
  yield takeLatest(getGeoDataRequest.type, handleGetGeoData);
}
