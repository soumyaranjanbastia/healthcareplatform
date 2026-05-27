import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  successMessage: '',
  emailKey: '',
  phoneKey: '',
};

const resendHospitalOtpSlice = createSlice({
  name: 'resendHospitalOtp',
  initialState,
  reducers: {
    resendHospitalOtpRequest: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
      state.successMessage = '';
      state.emailKey = '';
      state.phoneKey = '';
    },
    resendHospitalOtpSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.successMessage = action.payload.message || 'Verification codes resent successfully.';
      state.emailKey = action.payload.emailKey || '';
      state.phoneKey = action.payload.phoneKey || '';
    },
    resendHospitalOtpFailure: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    resetResendHospitalOtpState: () => initialState,
  },
});

export const { resendHospitalOtpRequest, resendHospitalOtpSuccess, resendHospitalOtpFailure, resetResendHospitalOtpState } = resendHospitalOtpSlice.actions;

export default resendHospitalOtpSlice.reducer;
