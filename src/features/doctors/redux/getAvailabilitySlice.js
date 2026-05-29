import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

const getAvailabilitySlice = createSlice({
  name: 'getAvailability',
  initialState,
  reducers: {
    getAvailabilityRequest(state, action) {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    getAvailabilitySuccess(state, action) {
      state.loading = false;
      state.success = true;
      state.data = action.payload;
    },
    getAvailabilityFailure(state, action) {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    clearGetAvailabilityResponse(state) {
      return initialState;
    },
  },
});

export const {
  getAvailabilityRequest,
  getAvailabilitySuccess,
  getAvailabilityFailure,
  clearGetAvailabilityResponse,
} = getAvailabilitySlice.actions;

export default getAvailabilitySlice.reducer;
