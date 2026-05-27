const initialBookingState = {
  appointments: [],
  loading: false,
  error: null
};

const bookingReducer = (state = initialBookingState, action) => {
  switch (action.type) {
    case 'CREATE_BOOKING':
      return {
        ...state,
        appointments: [action.payload, ...state.appointments]
      };
    case 'CANCEL_BOOKING':
      return {
        ...state,
        appointments: state.appointments.filter(appt => appt.id !== action.payload)
      };
    default:
      return state;
  }
};

export default bookingReducer;
