import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  userData: null,
};

const getExistingUserSlice = createSlice({
  name: 'getExistingUser',
  initialState,
  reducers: {
    getExistingUserRequest: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    },
    getExistingUserSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.userData = action.payload;
    },
    getExistingUserFailure: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    resetGetExistingUserState: () => initialState,
  },
});

export const { 
  getExistingUserRequest, 
  getExistingUserSuccess, 
  getExistingUserFailure, 
  resetGetExistingUserState 
} = getExistingUserSlice.actions;

export default getExistingUserSlice.reducer;
