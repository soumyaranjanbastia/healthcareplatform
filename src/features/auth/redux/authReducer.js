const initialAuthState = {
  isAuthenticated: false,
  currentUser: null, // { name, email, phone, role: 'Admin', designation }
  clinicDetails: null, // { name, specialties, address, license }
  loading: false,
  error: null
};

const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload.user,
        clinicDetails: action.payload.clinic || {
          name: "Swastyam General Clinic",
          specialties: ["Cardiology"],
          address: "123 Healthcare Way, Sector 5",
          license: "SW-88291"
        },
        error: null
      };
    case 'ONBOARD_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload.user,
        clinicDetails: action.payload.clinic,
        error: null
      };
    case 'LOGOUT':
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
