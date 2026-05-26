import { combineReducers } from "redux";

// Basic placeholder reducer to initialize store
const initialAppState = {
  initialized: true,
  portalName: "Swastyam Healthcare Platform",
  user: {
    name: "Dr. Aditya Vardhan",
    role: "Administrator",
    specialty: "Cardiology",
    hospital: "Swastyam General Hospital"
  }
};

const appReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case 'INITIALIZE_APP':
      return { ...state, initialized: true };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;
