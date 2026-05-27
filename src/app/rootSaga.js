import { all, fork } from 'redux-saga/effects';
import authSaga from '../features/auth/redux/authSaga';
import bookingSaga from '../features/booking/redux/bookingSaga';
import dashboardSaga from '../features/dashboard/redux/dashboardSaga';
import geoDataSaga from '../features/auth/redux/geoDataSaga';
import sendOtpSaga from '../features/booking/redux/sendOtpSaga';
import sendHospitalOtpSaga from '../features/auth/redux/sendHospitalOtpSaga';
import verifyHospitalOtpSaga from '../features/auth/redux/verifyHospitalOtpSaga';
import registerPatientSaga from '../features/booking/redux/registerPatientSaga';
import otpValidationSaga from '../features/booking/redux/otpValidationSaga';
import resendOtpSaga from '../features/booking/redux/resendOtpSaga';
import saveMedicalInfoSaga from '../features/booking/redux/saveMedicalInfoSaga';

export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(bookingSaga),
    fork(dashboardSaga),
    fork(geoDataSaga),
    fork(sendOtpSaga),
    fork(sendHospitalOtpSaga),
    fork(verifyHospitalOtpSaga),
    fork(registerPatientSaga),
    fork(otpValidationSaga),
    fork(resendOtpSaga),
    fork(saveMedicalInfoSaga),
  ]);
}
