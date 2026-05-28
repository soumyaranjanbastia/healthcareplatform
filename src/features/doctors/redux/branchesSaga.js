import { call, put, takeLatest } from 'redux-saga/effects';
import { apiGateway } from '../../../api/apiGateway';
import API_ENDPOINTS from '../../../api/apiEndpoints';
import { API_METHODS } from '../../../api/apiConfig';
import {
  getBranchesRequest,
  getBranchesSuccess,
  getBranchesFailure,
  deleteBranchRequest,
  deleteBranchSuccess,
  deleteBranchFailure,
} from './branchesSlice';

function* handleGetBranches(action) {
  try {
    const payload = action.payload || {}; // Accept dynamic parameters if any
    console.log('Saga: Fetching branches with POST payload:', payload);
    
    const response = yield call(
      apiGateway,
      API_ENDPOINTS.getBranches,
      API_METHODS.POST,
      payload
    );
    console.log('Saga: Fetch branches response:', response);

    if (response?.success && response?.data) {
      yield put(getBranchesSuccess(response.data));
    } else {
      throw new Error(response?.message || 'Failed to retrieve branches');
    }
  } catch (error) {
    yield put(getBranchesFailure(error.message || 'Failed to retrieve branches'));
  }
}

function* handleDeleteBranch(action) {
  try {
    const payload = action.payload; // expects { branchId }
    console.log('Saga: Deleting branch payload:', payload);

    const response = yield call(
      apiGateway,
      API_ENDPOINTS.deleteBranch,
      API_METHODS.POST,
      payload
    );
    console.log('Saga: Delete branch response:', response);

    if (response?.success) {
      yield put(deleteBranchSuccess(response));
    } else {
      throw new Error(response?.message || 'Failed to delete branch');
    }
  } catch (error) {
    yield put(deleteBranchFailure(error.message || 'Failed to delete branch'));
  }
}

export default function* branchesSaga() {
  yield takeLatest(getBranchesRequest.type, handleGetBranches);
  yield takeLatest(deleteBranchRequest.type, handleDeleteBranch);
}
