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

const sendHospitalOtpSlice = createSlice({
  name: 'sendHospitalOtp',
  initialState,
  reducers: {
    sendHospitalOtpRequest: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
      state.successMessage = '';
      state.emailKey = '';
      state.phoneKey = '';
    },
    sendHospitalOtpSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.successMessage = action.payload.message || 'Verification codes sent successfully.';
      state.emailKey = action.payload.emailKey || '';
      state.phoneKey = action.payload.phoneKey || '';
    },
    sendHospitalOtpFailure: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    resetSendHospitalOtpState: () => initialState,
  },
});

export const { sendHospitalOtpRequest, sendHospitalOtpSuccess, sendHospitalOtpFailure, resetSendHospitalOtpState } = sendHospitalOtpSlice.actions;

export default sendHospitalOtpSlice.reducer;
