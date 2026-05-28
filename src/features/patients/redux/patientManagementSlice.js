import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const patientManagementSlice = createSlice({
  name: 'patientManagement',
  initialState,
  reducers: {
    fetchPatientsRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    fetchPatientsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchPatientsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchPatientsRequest, fetchPatientsSuccess, fetchPatientsFailure } = patientManagementSlice.actions;
export default patientManagementSlice.reducer;
