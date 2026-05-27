import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

const registerDoctorSlice = createSlice({
  name: 'registerDoctor',
  initialState,
  reducers: {
    registerDoctorRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    registerDoctorSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.data = action.payload;
    },
    registerDoctorFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    resetRegisterDoctor: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    }
  },
});

export const {
  registerDoctorRequest,
  registerDoctorSuccess,
  registerDoctorFailure,
  resetRegisterDoctor
} = registerDoctorSlice.actions;

export default registerDoctorSlice.reducer;
