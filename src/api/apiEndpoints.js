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
  saveMedicalInfo: 'hospital/medicalDetails',

  resendHospitalOtp: 'hospital/resend-hospital-registration-otp',
  registerDoctor: 'hospital/register-doctor',
};

export default API_ENDPOINTS;
