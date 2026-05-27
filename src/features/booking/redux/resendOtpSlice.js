import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  data: null,
};

const resendOtpSlice = createSlice({
  name: 'resendOtp',
  initialState,
  reducers: {
    resendOtpRequest: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    },
    resendOtpSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    },
    resendOtpFailure: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    resetResendOtpState: () => initialState,
  },
});

export const { resendOtpRequest, resendOtpSuccess, resendOtpFailure, resetResendOtpState } = resendOtpSlice.actions;

export default resendOtpSlice.reducer;
