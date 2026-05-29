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
    const payload = action.payload || {};
    const companyId = payload.companyId || localStorage.getItem('companyId');
    
    console.log('Saga: Fetching professions (trying POST)...', { companyId });
    
    const response = yield call(
      apiGateway,
      API_ENDPOINTS.getProfession,
      API_METHODS.POST,
      companyId ? { companyId: Number(companyId) } : {}
    );
    
    console.log('Saga: getProfession POST response:', response);
    if (response && response.success) {
      yield put(getProfessionSuccess(response));
    } else {
      throw new Error(response?.message || 'Failed to retrieve professions');
    }
  } catch (error) {
    yield put(getProfessionFailure(error.message || 'Failed to fetch professions'));
  }
}

export default function* getProfessionSaga() {
  yield takeLatest(getProfessionRequest.type, handleGetProfession);
}
