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

const rootReducer = combineReducers({
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
});

export default rootReducer;
