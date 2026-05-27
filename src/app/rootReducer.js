import { combineReducers } from "redux";
import authReducer from "../features/auth/redux/authReducer";
import dashboardReducer from "../features/dashboard/redux/dashboardReducer";
import bookingReducer from "../features/booking/redux/bookingReducer";
import geoDataReducer from "../features/auth/redux/geoDataSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  staff: dashboardReducer, // Bound as 'staff' to prevent breaking legacy App.jsx selectors
  booking: bookingReducer,
  geoData: geoDataReducer,
});

export default rootReducer;
