import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  professionalData: null,
  successMessage: "",
  draftData: null,
  draftStep: 0,
};

const professionalDetailsSlice = createSlice({
  name: "professionalDetails",
  initialState,
  reducers: {
    submitProfessionalDetailsRequest: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
      state.successMessage = "";
    },
    submitProfessionalDetailsSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.professionalData = action.payload;
      state.successMessage = action.payload?.message || "Professional details submitted successfully!";
    },
    submitProfessionalDetailsFailure: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },
    resetProfessionalDetailsState: (state) => {
      Object.assign(state, initialState);
    },
    clearProfessionalDetailsMessages: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
      state.isSuccess = false;
      state.isError = false;
    },
    updateDraft: (state, action) => {
      if (action.payload.data !== undefined) {
        state.draftData = { ...state.draftData, ...action.payload.data };
      }
      if (action.payload.step !== undefined) {
        state.draftStep = action.payload.step;
      }
    },
    clearDraft: (state) => {
      state.draftData = null;
      state.draftStep = 0;
    },
  },
});

export const {
  submitProfessionalDetailsRequest,
  submitProfessionalDetailsSuccess,
  submitProfessionalDetailsFailure,
  resetProfessionalDetailsState,
  clearProfessionalDetailsMessages,
  updateDraft,
  clearDraft,
} = professionalDetailsSlice.actions;

export default professionalDetailsSlice.reducer;
