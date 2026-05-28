import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  successMessage: '',
  data: null,
};

const verifyDoctorOtpSlice = createSlice({
  name: 'verifyDoctorOtp',
  initialState,
  reducers: {
    verifyDoctorOtpRequest: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
      state.successMessage = '';
      state.data = null;
    },
    verifyDoctorOtpSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.successMessage = action.payload.message || 'Verification successful.';
      state.data = action.payload;
    },
    verifyDoctorOtpFailure: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    resetVerifyDoctorOtpState: () => initialState,
  },
});

export const { verifyDoctorOtpRequest, verifyDoctorOtpSuccess, verifyDoctorOtpFailure, resetVerifyDoctorOtpState } = verifyDoctorOtpSlice.actions;

export default verifyDoctorOtpSlice.reducer;
