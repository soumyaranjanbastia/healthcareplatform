import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

const sendLoginOtpSlice = createSlice({
  name: 'sendLoginOtp',
  initialState,
  reducers: {
    sendLoginOtpRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    sendLoginOtpSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.data = action.payload;
    },
    sendLoginOtpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    resetSendLoginOtp: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    }
  },
});

export const {
  sendLoginOtpRequest,
  sendLoginOtpSuccess,
  sendLoginOtpFailure,
  resetSendLoginOtp
} = sendLoginOtpSlice.actions;

export default sendLoginOtpSlice.reducer;
