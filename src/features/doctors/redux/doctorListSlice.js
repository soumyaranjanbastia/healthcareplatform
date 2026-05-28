import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  doctors: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

const doctorListSlice = createSlice({
  name: 'doctorList',
  initialState,
  reducers: {
    getDoctorListRequest: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = '';
    },
    getDoctorListSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.doctors = action.payload;
    },
    getDoctorListFailure: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    resetDoctorListState: () => initialState,
  },
});

export const {
  getDoctorListRequest,
  getDoctorListSuccess,
  getDoctorListFailure,
  resetDoctorListState,
} = doctorListSlice.actions;

export default doctorListSlice.reducer;
