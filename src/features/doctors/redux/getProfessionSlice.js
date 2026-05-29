import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  professions: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

const getProfessionSlice = createSlice({
  name: 'getProfession',
  initialState,
  reducers: {
    getProfessionRequest: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    },
    getProfessionSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.professions = action.payload;
    },
    getProfessionFailure: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    resetProfessionState: () => initialState,
  },
});

export const {
  getProfessionRequest,
  getProfessionSuccess,
  getProfessionFailure,
  resetProfessionState,
} = getProfessionSlice.actions;

export default getProfessionSlice.reducer;
