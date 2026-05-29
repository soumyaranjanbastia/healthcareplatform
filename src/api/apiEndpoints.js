const API_ENDPOINTS = {

  // Config
  getGeoData: 'config/geo-data',
  // Assisted OTP
  sendOtp: 'assisted/send-otp',
  sendHospitalOtp: 'hospital/send-hospital-registration-otp',
  verifyHospitalOtp: 'hospital/verify-hospital-registration-otp',
  // Register Patient
  registerPatient: 'hospital/signup',

  // Validate OTP
  validateOtp: 'hospital/otpvalidate',

  // Resend OTP
  resendOtp: 'hospital/resendOtp',

  // Save Medical Details
  saveMedicalInfo: 'hospital/addMedicalDetails',

  // Get Existing User
  getExistingUser: 'hospital/getExistingUser',

  // Verify Existing Patient OTP
  verifyExistingPatientOtp: 'assisted/verify-otp',

  resendHospitalOtp: 'hospital/resend-hospital-registration-otp',
  registerDoctor: 'hospital/register-company',
  dashboardOverview: 'hospital/dashboardOverview',
  sendLoginOtp: 'hospital/send-login-otp',
  verifyLoginOtp: 'hospital/verify-login-otp',
  professionalDetails: 'hospital/addProfessionalDetails',
  insertEmailandPhone: 'auth/insertEmailandPhone',
  getProfession: 'auth/getProfession',
  verifyAuthOtp: 'hospital/verify',
  resendAuthOtp: 'auth/resend',
  logout: 'hospital/logout',
  getBranches: 'hospital/getBranches',
  deleteBranch: 'hospital/deleteBranch',
  getDoctorList: 'hospital/getDoctorList',
  patientManagement: 'hospital/patient-management',
  getRoleMaster: 'hospital/getRoleMaster',
  createStaff: 'hospital/createStaff',
  getStaff: 'hospital/getStaff',
  deleteStaff: 'hospital/deleteStaff',
  mapDoctorBranch: 'hospital/mapWithBranch',
  setAvailability: 'hospital/createSchedule',
  getAvailability: 'hospital/getProviderSchedule',
};

export default API_ENDPOINTS;
