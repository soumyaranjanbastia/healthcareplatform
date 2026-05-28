import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

const verifyLoginOtpSlice = createSlice({
  name: 'verifyLoginOtp',
  initialState,
  reducers: {
    verifyLoginOtpRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    verifyLoginOtpSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.data = action.payload;
    },
    verifyLoginOtpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    resetVerifyLoginOtp: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    }
  },
});

export const {
  verifyLoginOtpRequest,
  verifyLoginOtpSuccess,
  verifyLoginOtpFailure,
  resetVerifyLoginOtp
} = verifyLoginOtpSlice.actions;

export default verifyLoginOtpSlice.reducer;
