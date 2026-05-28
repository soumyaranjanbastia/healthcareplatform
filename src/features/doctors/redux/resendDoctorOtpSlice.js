import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  data: null,
};

const resendDoctorOtpSlice = createSlice({
  name: 'resendDoctorOtp',
  initialState,
  reducers: {
    resendDoctorOtpRequest: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
      state.data = null;
    },
    resendDoctorOtpSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    },
    resendDoctorOtpFailure: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    resetResendDoctorOtpState: () => initialState,
  },
});

export const { resendDoctorOtpRequest, resendDoctorOtpSuccess, resendDoctorOtpFailure, resetResendDoctorOtpState } = resendDoctorOtpSlice.actions;

export default resendDoctorOtpSlice.reducer;
