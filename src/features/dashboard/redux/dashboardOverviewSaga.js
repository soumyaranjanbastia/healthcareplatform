import { call, put, takeLatest } from 'redux-saga/effects';
import { apiGateway } from '../../../api/apiGateway';
import { API_METHODS } from '../../../api/apiConfig';
import API_ENDPOINTS from '../../../api/apiEndpoints';
import {
  dashboardOverviewRequest,
  dashboardOverviewSuccess,
  dashboardOverviewFailure
} from './dashboardOverviewSlice';

function* handleDashboardOverview(action) {
  try {
    const payload = action.payload; // e.g., { companyId: 274 }
    
    const response = yield call(
      apiGateway,
      API_ENDPOINTS.dashboardOverview,
      API_METHODS.POST,
      payload
    );

    yield put(dashboardOverviewSuccess(response.data || response));
  } catch (error) {
    yield put(dashboardOverviewFailure(error.message || 'Failed to fetch dashboard overview.'));
  }
}

export function* watchDashboardOverviewSaga() {
  yield takeLatest(dashboardOverviewRequest.type, handleDashboardOverview);
}
