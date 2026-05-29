import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roles: [],
  rolesLoading: false,
  rolesError: null,
  
  createLoading: false,
  createSuccess: false,
  createError: null,
  createdData: null,

  staffList: [],
  staffLoading: false,
  staffError: null,

  deleteLoading: false,
  deleteSuccess: false,
  deleteError: null,
};

const staffRegistrationSlice = createSlice({
  name: 'staffRegistration',
  initialState,
  reducers: {
    getRolesRequest: (state) => {
      state.rolesLoading = true;
      state.rolesError = null;
    },
    getRolesSuccess: (state, action) => {
      state.rolesLoading = false;
      state.roles = action.payload;
      state.rolesError = null;
    },
    getRolesFailure: (state, action) => {
      state.rolesLoading = false;
      state.rolesError = action.payload;
    },
    
    createStaffRequest: (state, action) => {
      state.createLoading = true;
      state.createSuccess = false;
      state.createError = null;
      state.createdData = null;
    },
    createStaffSuccess: (state, action) => {
      state.createLoading = false;
      state.createSuccess = true;
      state.createdData = action.payload;
      state.createError = null;
    },
    createStaffFailure: (state, action) => {
      state.createLoading = false;
      state.createSuccess = false;
      state.createError = action.payload;
    },
    
    resetCreateStaffState: (state) => {
      state.createLoading = false;
      state.createSuccess = false;
      state.createError = null;
      state.createdData = null;
    },

    getStaffRequest: (state, action) => {
      state.staffLoading = true;
      state.staffError = null;
    },
    getStaffSuccess: (state, action) => {
      state.staffLoading = false;
      state.staffList = action.payload;
      state.staffError = null;
    },
    getStaffFailure: (state, action) => {
      state.staffLoading = false;
      state.staffError = action.payload;
    },

    deleteStaffRequest: (state, action) => {
      state.deleteLoading = true;
      state.deleteSuccess = false;
      state.deleteError = null;
    },
    deleteStaffSuccess: (state, action) => {
      state.deleteLoading = false;
      state.deleteSuccess = true;
      state.deleteError = null;
    },
    deleteStaffFailure: (state, action) => {
      state.deleteLoading = false;
      state.deleteSuccess = false;
      state.deleteError = action.payload;
    },
    resetDeleteStaffState: (state) => {
      state.deleteLoading = false;
      state.deleteSuccess = false;
      state.deleteError = null;
    }
  }
});

export const {
  getRolesRequest,
  getRolesSuccess,
  getRolesFailure,
  createStaffRequest,
  createStaffSuccess,
  createStaffFailure,
  resetCreateStaffState,
  getStaffRequest,
  getStaffSuccess,
  getStaffFailure,
  deleteStaffRequest,
  deleteStaffSuccess,
  deleteStaffFailure,
  resetDeleteStaffState,
} = staffRegistrationSlice.actions;

export default staffRegistrationSlice.reducer;
