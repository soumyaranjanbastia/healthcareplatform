import { call, put, takeLatest } from 'redux-saga/effects';
import { apiGateway } from '../../../api/apiGateway';
import API_ENDPOINTS from '../../../api/apiEndpoints';
import { API_METHODS } from '../../../api/apiConfig';
import { saveMedicalInfoRequest, saveMedicalInfoSuccess, saveMedicalInfoFailure } from './saveMedicalInfoSlice';

function* handleSaveMedicalInfo(action) {
  try {
    const payload = action.payload;
    console.log('save medical info saga request:', payload);

    const response = yield call(
      apiGateway,
      API_ENDPOINTS.saveMedicalInfo,
      API_METHODS.POST,
      payload
    );
    console.log('save medical info saga response:', response);

    yield put(saveMedicalInfoSuccess(response.data || response));
  } catch (error) {
    yield put(saveMedicalInfoFailure(error.message || 'Failed to save medical details'));
  }
}

export default function* saveMedicalInfoSaga() {
  yield takeLatest(saveMedicalInfoRequest.type, handleSaveMedicalInfo);
}
