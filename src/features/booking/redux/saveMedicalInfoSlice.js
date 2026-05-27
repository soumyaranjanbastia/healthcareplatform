import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  data: null,
};

const saveMedicalInfoSlice = createSlice({
  name: 'saveMedicalInfo',
  initialState,
  reducers: {
    saveMedicalInfoRequest: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    },
    saveMedicalInfoSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    },
    saveMedicalInfoFailure: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    resetSaveMedicalInfoState: () => initialState,
  },
});

export const { saveMedicalInfoRequest, saveMedicalInfoSuccess, saveMedicalInfoFailure, resetSaveMedicalInfoState } = saveMedicalInfoSlice.actions;

export default saveMedicalInfoSlice.reducer;
