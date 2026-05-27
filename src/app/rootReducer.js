import { combineReducers } from "redux";
import authReducer from "../features/auth/redux/authReducer";
import dashboardReducer from "../features/dashboard/redux/dashboardReducer";
import bookingReducer from "../features/booking/redux/bookingReducer";
import geoDataReducer from "../features/auth/redux/geoDataSlice";
import sendOtpReducer from "../features/booking/redux/sendOtpSlice";
import sendHospitalOtpReducer from "../features/auth/redux/sendHospitalOtpSlice";
import verifyHospitalOtpReducer from "../features/auth/redux/verifyHospitalOtpSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  staff: dashboardReducer, // Bound as 'staff' to prevent breaking legacy App.jsx selectors
  booking: bookingReducer,
  geoData: geoDataReducer,
  sendOtp: sendOtpReducer,
  sendHospitalOtp: sendHospitalOtpReducer,
  verifyHospitalOtp: verifyHospitalOtpReducer,
});

export default rootReducer;
