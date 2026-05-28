import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

const dashboardOverviewSlice = createSlice({
  name: 'dashboardOverview',
  initialState,
  reducers: {
    dashboardOverviewRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    dashboardOverviewSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.data = action.payload;
    },
    dashboardOverviewFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    resetDashboardOverview: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    }
  },
});

export const {
  dashboardOverviewRequest,
  dashboardOverviewSuccess,
  dashboardOverviewFailure,
  resetDashboardOverview
} = dashboardOverviewSlice.actions;

export default dashboardOverviewSlice.reducer;
