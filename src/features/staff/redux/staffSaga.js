import { call, put, takeLatest } from 'redux-saga/effects';
import { apiGateway } from '../../../api/apiGateway';
import { API_METHODS } from '../../../api/apiConfig';
import API_ENDPOINTS from '../../../api/apiEndpoints';
import {
  getRolesRequest,
  getRolesSuccess,
  getRolesFailure,
  createStaffRequest,
  createStaffSuccess,
  createStaffFailure,
  getStaffRequest,
  getStaffSuccess,
  getStaffFailure,
  deleteStaffRequest,
  deleteStaffSuccess,
  deleteStaffFailure
} from './staffSlice';

function* handleGetRoles() {
  try {
    const response = yield call(
      apiGateway,
      API_ENDPOINTS.getRoleMaster,
      API_METHODS.GET
    );
    
    if (response.success) {
      yield put(getRolesSuccess(response.data || []));
    } else {
      yield put(getRolesFailure(response.message || 'Failed to fetch roles'));
    }
  } catch (error) {
    yield put(getRolesFailure(error.message || 'An error occurred while fetching roles'));
  }
}

function* handleCreateStaff(action) {
  try {
    const payload = action.payload;
    const response = yield call(
      apiGateway,
      API_ENDPOINTS.createStaff,
      API_METHODS.POST,
      payload
    );
    
    if (response.success) {
      yield put(createStaffSuccess(response.data || response));
    } else {
      yield put(createStaffFailure(response.message || 'Failed to create staff'));
    }
  } catch (error) {
    yield put(createStaffFailure(error.message || 'An error occurred while creating staff'));
  }
}

function* handleGetStaff(action) {
  try {
    const payload = action.payload || {};
    const response = yield call(
      apiGateway,
      API_ENDPOINTS.getStaff,
      API_METHODS.POST,
      payload
    );
    
    if (response.success) {
      yield put(getStaffSuccess(response.data || []));
    } else {
      yield put(getStaffFailure(response.message || 'Failed to fetch staff members'));
    }
  } catch (error) {
    yield put(getStaffFailure(error.message || 'An error occurred while fetching staff members'));
  }
}

function* handleDeleteStaff(action) {
  try {
    const payload = action.payload;
    const response = yield call(
      apiGateway,
      API_ENDPOINTS.deleteStaff,
      API_METHODS.POST,
      payload
    );
    
    if (response.success) {
      yield put(deleteStaffSuccess(response));
    } else {
      yield put(deleteStaffFailure(response.message || 'Failed to delete staff member'));
    }
  } catch (error) {
    yield put(deleteStaffFailure(error.message || 'An error occurred while deleting staff member'));
  }
}

export default function* staffRegistrationSaga() {
  yield takeLatest(getRolesRequest.type, handleGetRoles);
  yield takeLatest(createStaffRequest.type, handleCreateStaff);
  yield takeLatest(getStaffRequest.type, handleGetStaff);
  yield takeLatest(deleteStaffRequest.type, handleDeleteStaff);
}
