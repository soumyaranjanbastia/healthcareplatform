const initialStaffState = {
  members: [
    {
      id: "STF-101",
      name: "Dr. Aditya Vardhan",
      role: "Doctor",
      specialty: "Cardiology",
      email: "aditya.vardhan@swastyam.com",
      phone: "+91 98765 43210",
      status: "Active",
      shift: "General Shift (9 AM - 5 PM)",
      dateAdded: "15 Jan 2026"
    },
    {
      id: "STF-102",
      name: "Dr. Sarah Joseph",
      role: "Doctor",
      specialty: "Pediatrics",
      email: "sarah.joseph@swastyam.com",
      phone: "+91 98123 45678",
      status: "Active",
      shift: "Morning Shift (7 AM - 3 PM)",
      dateAdded: "18 Feb 2026"
    },
    {
      id: "STF-103",
      name: "Priya Sharma",
      role: "Receptionist",
      specialty: "Front Desk",
      email: "priya.sharma@swastyam.com",
      phone: "+91 95551 23456",
      status: "Active",
      shift: "Evening Shift (3 PM - 11 PM)",
      dateAdded: "01 Mar 2026"
    },
    {
      id: "STF-104",
      name: "Amit Patel",
      role: "Finance Manager",
      specialty: "Billing & Claims",
      email: "amit.patel@swastyam.com",
      phone: "+91 94444 88888",
      status: "Inactive",
      shift: "General Shift (9 AM - 5 PM)",
      dateAdded: "12 Mar 2026"
    }
  ]
};

const dashboardReducer = (state = initialStaffState, action) => {
  switch (action.type) {
    case 'ADD_STAFF':
      return {
        ...state,
        members: [action.payload, ...state.members]
      };
    case 'TOGGLE_STAFF_STATUS':
      return {
        ...state,
        members: state.members.map(member =>
          member.id === action.payload
            ? { ...member, status: member.status === 'Active' ? 'Inactive' : 'Active' }
            : member
        )
      };
    case 'DELETE_STAFF':
      return {
        ...state,
        members: state.members.filter(member => member.id !== action.payload)
      };
    case 'UPDATE_STAFF':
      return {
        ...state,
        members: state.members.map(member =>
          member.id === action.payload.id ? action.payload : member
        )
      };
    default:
      return state;
  }
};

export default dashboardReducer;
