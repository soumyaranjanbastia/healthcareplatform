import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
  selectedDuration: null,
};

const setAvailabilitySlice = createSlice({
  name: 'setAvailability',
  initialState,
  reducers: {
    setAvailabilityRequest(state, action) {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    setAvailabilitySuccess(state, action) {
      state.loading = false;
      state.success = true;
      state.data = action.payload;
    },
    setAvailabilityFailure(state, action) {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    setSelectedDuration(state, action) {
      state.selectedDuration = action.payload;
    },
    clearAvailabilityResponse() {
      return initialState;
    },
  },
});

export const {
  setAvailabilityRequest,
  setAvailabilitySuccess,
  setAvailabilityFailure,
  clearAvailabilityResponse,
  setSelectedDuration,
} = setAvailabilitySlice.actions;

export default setAvailabilitySlice.reducer;
