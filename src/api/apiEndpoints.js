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
  registerDoctor: 'hospital/register-doctor',
  dashboardOverview: 'hospital/dashboardOverview',
  sendLoginOtp: 'hospital/send-login-otp',
  verifyLoginOtp: 'hospital/verify-login-otp',
  professionalDetails: 'auth/addProfessionalDetails',
  insertEmailandPhone: 'auth/insertEmailandPhone',
  verifyAuthOtp: 'auth/verify',
  resendAuthOtp: 'auth/resend',
  logout: 'hospital/logout',
};

export default API_ENDPOINTS;
