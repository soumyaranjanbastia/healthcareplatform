import { call, put, takeLatest } from 'redux-saga/effects';
import { apiGateway } from '../../../api/apiGateway';
import API_ENDPOINTS from '../../../api/apiEndpoints';
import { API_METHODS } from '../../../api/apiConfig';
import {
  getProfessionRequest,
  getProfessionSuccess,
  getProfessionFailure,
} from './getProfessionSlice';

function* handleGetProfession(action) {
  try {
    console.log('Saga: Fetching professions (trying GET)...');
    try {
      const response = yield call(
        apiGateway,
        API_ENDPOINTS.getProfession,
        API_METHODS.GET
      );
      console.log('Saga: getProfession GET response:', response);
      if (response && response.success) {
        yield put(getProfessionSuccess(response));
        return;
      }
      throw new Error(response?.message || 'GET failed or not successful');
    } catch (getError) {
      console.warn('Saga: GET professions failed, trying POST fallback...', getError);
      const response = yield call(
        apiGateway,
        API_ENDPOINTS.getProfession,
        API_METHODS.POST,
        {}
      );
      console.log('Saga: getProfession POST response:', response);
      if (response && response.success) {
        yield put(getProfessionSuccess(response));
      } else {
        throw new Error(response?.message || 'Failed to retrieve professions');
      }
    }
  } catch (error) {
    yield put(getProfessionFailure(error.message || 'Failed to fetch professions'));
  }
}

export default function* getProfessionSaga() {
  yield takeLatest(getProfessionRequest.type, handleGetProfession);
}
