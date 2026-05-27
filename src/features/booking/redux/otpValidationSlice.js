import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Email validation state
  isEmailLoading: false,
  isEmailSuccess: false,
  isEmailError: false,
  emailErrorMessage: '',
  emailEncryptionKey: null,

  // Phone validation state
  isPhoneLoading: false,
  isPhoneSuccess: false,
  isPhoneError: false,
  phoneErrorMessage: '',
  phoneEncryptionKey: null,
};

const otpValidationSlice = createSlice({
  name: 'otpValidation',
  initialState,
  reducers: {
    validateEmailOtpRequest: (state, action) => {
      state.isEmailLoading = true;
      state.isEmailError = false;
      state.isEmailSuccess = false;
      state.emailErrorMessage = '';
    },
    validateEmailOtpSuccess: (state, action) => {
      state.isEmailLoading = false;
      state.isEmailSuccess = true;
      state.emailEncryptionKey = action.payload.encryptionKey || action.payload.data?.encryptionKey;
    },
    validateEmailOtpFailure: (state, action) => {
      state.isEmailLoading = false;
      state.isEmailError = true;
      state.emailErrorMessage = action.payload;
    },

    validatePhoneOtpRequest: (state, action) => {
      state.isPhoneLoading = true;
      state.isPhoneError = false;
      state.isPhoneSuccess = false;
      state.phoneErrorMessage = '';
    },
    validatePhoneOtpSuccess: (state, action) => {
      state.isPhoneLoading = false;
      state.isPhoneSuccess = true;
      state.phoneEncryptionKey = action.payload.encryptionKey || action.payload.data?.encryptionKey;
    },
    validatePhoneOtpFailure: (state, action) => {
      state.isPhoneLoading = false;
      state.isPhoneError = true;
      state.phoneErrorMessage = action.payload;
    },

    resetOtpValidationState: () => initialState,
  },
});

export const {
  validateEmailOtpRequest,
  validateEmailOtpSuccess,
  validateEmailOtpFailure,
  validatePhoneOtpRequest,
  validatePhoneOtpSuccess,
  validatePhoneOtpFailure,
  resetOtpValidationState,
} = otpValidationSlice.actions;

export default otpValidationSlice.reducer;
