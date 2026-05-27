import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  successMessage: '',
};

const verifyHospitalOtpSlice = createSlice({
  name: 'verifyHospitalOtp',
  initialState,
  reducers: {
    verifyHospitalOtpRequest: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
      state.successMessage = '';
    },
    verifyHospitalOtpSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.successMessage = action.payload.message || 'Email and phone verified successfully.';
    },
    verifyHospitalOtpFailure: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    resetVerifyHospitalOtpState: () => initialState,
  },
});

export const { verifyHospitalOtpRequest, verifyHospitalOtpSuccess, verifyHospitalOtpFailure, resetVerifyHospitalOtpState } = verifyHospitalOtpSlice.actions;

export default verifyHospitalOtpSlice.reducer;
