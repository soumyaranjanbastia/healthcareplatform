import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

const mapDoctorSlice = createSlice({
  name: 'mapDoctor',
  initialState,
  reducers: {
    mapDoctorRequest: (state, action) => {
      state.loading = true;
      state.success = false;
      state.error = null;
      state.data = null;
    },
    mapDoctorSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.data = action.payload;
      state.error = null;
    },
    mapDoctorFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    resetMapDoctorState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    }
  }
});

export const {
  mapDoctorRequest,
  mapDoctorSuccess,
  mapDoctorFailure,
  resetMapDoctorState
} = mapDoctorSlice.actions;

export default mapDoctorSlice.reducer;
