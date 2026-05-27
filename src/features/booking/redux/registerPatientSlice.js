import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  patientData: null,
};

const registerPatientSlice = createSlice({
  name: 'registerPatient',
  initialState,
  reducers: {
    registerPatientRequest: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    },
    registerPatientSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.patientData = action.payload;
    },
    registerPatientFailure: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    resetRegisterPatientState: () => initialState,
  },
});

export const { registerPatientRequest, registerPatientSuccess, registerPatientFailure, resetRegisterPatientState } = registerPatientSlice.actions;

export default registerPatientSlice.reducer;
