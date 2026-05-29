import { createSlice } from '@reduxjs/toolkit';
import { getTokens, storeTokens, clearAuthStorage } from '../../../utils/tokenManager';

const { accessToken, user } = getTokens();

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
  isAuthenticated: !!accessToken,
  currentUser: user || null,
  clinicDetails: user?.clinic || null,
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
  extraReducers: (builder) => {
    builder
      .addCase('LOGIN_SUCCESS', (state, action) => {
        const clinicDetails = action.payload.clinic || {
          name: "Swastyam General Clinic",
          specialties: ["Cardiology"],
          address: "123 Healthcare Way, Sector 5",
          license: "SW-88291"
        };
        storeTokens({
          userType: action.payload.user?.role,
          user: { ...action.payload.user, clinic: clinicDetails }
        });
        state.isAuthenticated = true;
        state.currentUser = action.payload.user;
        state.clinicDetails = clinicDetails;
        state.error = null;
      })
      .addCase('ONBOARD_SUCCESS', (state, action) => {
        state.isAuthenticated = true;
        state.currentUser = action.payload.user;
        state.clinicDetails = action.payload.clinic;
        state.error = null;
      })
      .addCase('LOGOUT', (state) => {
        clearAuthStorage();
        state.isAuthenticated = false;
        state.currentUser = null;
        state.clinicDetails = null;
        state.error = null;
      });
  }
});

export const {
  sendLoginOtpRequest,
  sendLoginOtpSuccess,
  sendLoginOtpFailure,
  resetSendLoginOtp
} = sendLoginOtpSlice.actions;

export default sendLoginOtpSlice.reducer;
