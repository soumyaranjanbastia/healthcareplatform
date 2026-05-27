import { combineReducers } from "redux";
import authReducer from "../features/auth/redux/authReducer";
import dashboardReducer from "../features/dashboard/redux/dashboardReducer";
import bookingReducer from "../features/booking/redux/bookingReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  staff: dashboardReducer, // Bound as 'staff' to prevent breaking legacy App.jsx selectors
  booking: bookingReducer,
});

export default rootReducer;
