import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  branches: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  
  deleteLoading: false,
  deleteSuccess: false,
  deleteError: false,
  deleteErrorMessage: '',
};

const branchesSlice = createSlice({
  name: 'branches',
  initialState,
  reducers: {
    getBranchesRequest: (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = '';
    },
    getBranchesSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.branches = action.payload;
    },
    getBranchesFailure: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    
    deleteBranchRequest: (state) => {
      state.deleteLoading = true;
      state.deleteSuccess = false;
      state.deleteError = false;
      state.deleteErrorMessage = '';
    },
    deleteBranchSuccess: (state, action) => {
      state.deleteLoading = false;
      state.deleteSuccess = true;
    },
    deleteBranchFailure: (state, action) => {
      state.deleteLoading = false;
      state.deleteError = true;
      state.deleteErrorMessage = action.payload;
    },
    
    clearDeleteState: (state) => {
      state.deleteLoading = false;
      state.deleteSuccess = false;
      state.deleteError = false;
      state.deleteErrorMessage = '';
    },
    resetBranchesState: () => initialState,
  },
});

export const {
  getBranchesRequest,
  getBranchesSuccess,
  getBranchesFailure,
  deleteBranchRequest,
  deleteBranchSuccess,
  deleteBranchFailure,
  clearDeleteState,
  resetBranchesState,
} = branchesSlice.actions;

export default branchesSlice.reducer;
