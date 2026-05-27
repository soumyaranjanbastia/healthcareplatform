import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  geoData: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

const geoDataSlice = createSlice({
  name: 'geoData',
  initialState,
  reducers: {
    getGeoDataRequest: (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    },
    getGeoDataSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.geoData = action.payload;
    },
    getGeoDataFailure: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    resetGeoDataState: () => initialState,
  },
});

export const { getGeoDataRequest, getGeoDataSuccess, getGeoDataFailure, resetGeoDataState } = geoDataSlice.actions;

export default geoDataSlice.reducer;
