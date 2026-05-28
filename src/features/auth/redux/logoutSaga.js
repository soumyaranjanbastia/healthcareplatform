import { call, put, takeLatest } from 'redux-saga/effects';
import { apiGateway } from '../../../api/apiGateway';
import API_ENDPOINTS from '../../../api/apiEndpoints';
import { logoutRequest, logoutSuccess, logoutFailure } from './logoutSlice';

function* handleLogout(action) {
  try {
    // API Call
    const response = yield call(apiGateway, API_ENDPOINTS.logout, 'POST', {});
    
    if (response.success) {
      // Clear specific localStorage items as requested
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('companyId');
      
      // Also clear token from apiGateway instances if you have them configured there
      // (This happens automatically on page reload, but good practice if needed)
      
      // Dispatch success for the slice to react
      yield put(logoutSuccess(response.message || 'Logout successful'));
      
      // Trigger the global alert modal
      window.alert('Logout successful.');
      
      // Dispatch global LOGOUT action to clear authReducer state and navigate
      yield put({ type: 'LOGOUT' });
    } else {
      yield put(logoutFailure(response.message || 'Logout failed'));
    }
  } catch (error) {
    yield put(logoutFailure(error.message || 'Failed to logout. Please try again.'));
  }
}

export function* watchLogout() {
  yield takeLatest(logoutRequest.type, handleLogout);
}
