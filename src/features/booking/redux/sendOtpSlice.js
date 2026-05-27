import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  data: null,
};

const sendOtpSlice = createSlice({
  name: 'sendOtp',
  initialState,
  reducers: {
    sendOtpRequest: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    },
    sendOtpSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    },
    sendOtpFailure: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    resetSendOtpState: () => initialState,
  },
});

export const { sendOtpRequest, sendOtpSuccess, sendOtpFailure, resetSendOtpState } = sendOtpSlice.actions;

export default sendOtpSlice.reducer;
