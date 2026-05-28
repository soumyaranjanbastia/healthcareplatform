import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  data: null,
};

const sendDoctorOtpSlice = createSlice({
  name: 'sendDoctorOtp',
  initialState,
  reducers: {
    sendDoctorOtpRequest: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
      state.data = null;
    },
    sendDoctorOtpSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    },
    sendDoctorOtpFailure: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    resetSendDoctorOtpState: () => initialState,
  },
});

export const { sendDoctorOtpRequest, sendDoctorOtpSuccess, sendDoctorOtpFailure, resetSendDoctorOtpState } = sendDoctorOtpSlice.actions;

export default sendDoctorOtpSlice.reducer;
