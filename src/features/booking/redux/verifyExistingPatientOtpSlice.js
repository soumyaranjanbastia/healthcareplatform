import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  data: null,
};

const verifyExistingPatientOtpSlice = createSlice({
  name: 'verifyExistingPatientOtp',
  initialState,
  reducers: {
    verifyExistingPatientOtpRequest: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    },
    verifyExistingPatientOtpSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    },
    verifyExistingPatientOtpFailure: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    resetVerifyExistingPatientOtpState: () => initialState,
  },
});

export const {
  verifyExistingPatientOtpRequest,
  verifyExistingPatientOtpSuccess,
  verifyExistingPatientOtpFailure,
  resetVerifyExistingPatientOtpState,
} = verifyExistingPatientOtpSlice.actions;

export default verifyExistingPatientOtpSlice.reducer;
