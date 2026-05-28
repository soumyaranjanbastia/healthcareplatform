import { call, put, takeLatest } from 'redux-saga/effects';
import { apiGateway } from '../../../api/apiGateway';
import API_ENDPOINTS from '../../../api/apiEndpoints';
import { API_METHODS } from '../../../api/apiConfig';
import { getExistingUserRequest, getExistingUserSuccess, getExistingUserFailure } from './getExistingUserSlice';

function* handleGetExistingUser(action) {
  try {
    const payload = {
      identifier: action.payload.identifier
    };
    console.log('get existing user saga request:', payload);

    const response = yield call(
      apiGateway,
      API_ENDPOINTS.getExistingUser,
      API_METHODS.POST,
      payload
    );
    console.log('get existing user saga response:', response);

    yield put(getExistingUserSuccess(response.data || response));
  } catch (error) {
    yield put(getExistingUserFailure(error.message || 'Failed to get existing patient details'));
  }
}

export default function* getExistingUserSaga() {
  yield takeLatest(getExistingUserRequest.type, handleGetExistingUser);
}
