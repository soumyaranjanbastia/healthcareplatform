import { combineReducers } from "redux";
import authReducer from "../features/auth/redux/authReducer";
import dashboardReducer from "../features/dashboard/redux/dashboardReducer";
import bookingReducer from "../features/booking/redux/bookingReducer";
import geoDataReducer from "../features/auth/redux/geoDataSlice";
import sendOtpReducer from "../features/booking/redux/sendOtpSlice";
import sendHospitalOtpReducer from "../features/auth/redux/sendHospitalOtpSlice";
import verifyHospitalOtpReducer from "../features/auth/redux/verifyHospitalOtpSlice";
import registerPatientReducer from "../features/booking/redux/registerPatientSlice";
import otpValidationReducer from "../features/booking/redux/otpValidationSlice";
import resendOtpReducer from "../features/booking/redux/resendOtpSlice";
import saveMedicalInfoReducer from "../features/booking/redux/saveMedicalInfoSlice";
import resendHospitalOtpReducer from "../features/auth/redux/resendHospitalOtpSlice";
import registerDoctorReducer from "../features/auth/redux/registerDoctorSlice";
import getExistingUserReducer from "../features/booking/redux/getExistingUserSlice";
import verifyExistingPatientOtpReducer from "../features/booking/redux/verifyExistingPatientOtpSlice";
import dashboardOverviewReducer from "../features/dashboard/redux/dashboardOverviewSlice";
import sendLoginOtpReducer from "../features/auth/redux/sendLoginOtpSlice";
import verifyLoginOtpReducer from "../features/auth/redux/verifyLoginOtpSlice";
import logoutReducer from "../features/auth/redux/logoutSlice";
import sendDoctorOtpReducer from "../features/doctors/redux/sendDoctorOtpSlice";
import verifyDoctorOtpReducer from "../features/doctors/redux/verifyDoctorOtpSlice";
import resendDoctorOtpReducer from "../features/doctors/redux/resendDoctorOtpSlice";
import registerDoctorFeatureReducer from "../features/doctors/redux/registerDoctorSlice";
import professionalDetailsReducer from "../features/doctors/redux/professionalDetailsSlice";
import branchesReducer from "../features/doctors/redux/branchesSlice";

const appReducer = combineReducers({
  auth: authReducer,
  staff: dashboardReducer, // Bound as 'staff' to prevent breaking legacy App.jsx selectors
  booking: bookingReducer,
  geoData: geoDataReducer,
  sendOtp: sendOtpReducer,
  sendHospitalOtp: sendHospitalOtpReducer,
  verifyHospitalOtp: verifyHospitalOtpReducer,
  registerPatient: registerPatientReducer,
  otpValidation: otpValidationReducer,
  resendOtp: resendOtpReducer,
  saveMedicalInfo: saveMedicalInfoReducer,
  resendHospitalOtp: resendHospitalOtpReducer,
  registerDoctor: registerDoctorReducer,
  getExistingUser: getExistingUserReducer,
  verifyExistingPatientOtp: verifyExistingPatientOtpReducer,
  dashboardOverview: dashboardOverviewReducer,
  sendLoginOtp: sendLoginOtpReducer,
  verifyLoginOtp: verifyLoginOtpReducer,
  logout: logoutReducer,
  sendDoctorOtp: sendDoctorOtpReducer,
  verifyDoctorOtp: verifyDoctorOtpReducer,
  resendDoctorOtp: resendDoctorOtpReducer,
  registerDoctorFeature: registerDoctorFeatureReducer,
  professionalDetails: professionalDetailsReducer,
  branches: branchesReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    // Preserve any state that shouldn't be wiped (e.g. geoData)
    const { geoData } = state || {};
    state = geoData ? { geoData } : undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
