import { getTokens, storeTokens, clearAuthStorage } from '../../../utils/tokenManager';

const { accessToken, user } = getTokens();

const initialAuthState = {
  isAuthenticated: !!accessToken,
  currentUser: user || null,
  clinicDetails: user?.clinic || null,
  loading: false,
  error: null
};

const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS': {
      const clinicDetails = action.payload.clinic || {
        name: "Swastyam General Clinic",
        specialties: ["Cardiology"],
        address: "123 Healthcare Way, Sector 5",
        license: "SW-88291"
      };

      // Store in localStorage to persist across refreshes
      storeTokens({
        userType: action.payload.user?.role,
        user: { ...action.payload.user, clinic: clinicDetails }
      });

      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload.user,
        clinicDetails: clinicDetails,
        error: null
      };
    }
    case 'ONBOARD_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload.user,
        clinicDetails: action.payload.clinic,
        error: null
      };
    case 'LOGOUT':
      clearAuthStorage();
      return {
        ...state,
        isAuthenticated: false,
        currentUser: null,
        clinicDetails: null,
        error: null
      };
    default:
      return state;
  }
};

export default authReducer;
