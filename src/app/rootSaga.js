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
import resendHospitalOtpSaga from '../features/auth/redux/resendHospitalOtpSaga';
import { watchRegisterDoctorSaga } from '../features/auth/redux/registerDoctorSaga';
import getExistingUserSaga from '../features/booking/redux/getExistingUserSaga';
import verifyExistingPatientOtpSaga from '../features/booking/redux/verifyExistingPatientOtpSaga';
import { watchDashboardOverviewSaga } from '../features/dashboard/redux/dashboardOverviewSaga';
import { watchSendLoginOtpSaga } from '../features/auth/redux/sendLoginOtpSaga';
import { watchVerifyLoginOtpSaga } from '../features/auth/redux/verifyLoginOtpSaga';
import sendDoctorOtpSaga from '../features/doctors/redux/sendDoctorOtpSaga';
import verifyDoctorOtpSaga from '../features/doctors/redux/verifyDoctorOtpSaga';
import resendDoctorOtpSaga from '../features/doctors/redux/resendDoctorOtpSaga';
import watchDoctorRegisterFeatureSaga from '../features/doctors/redux/registerDoctorSaga';
import professionalDetailsSaga from '../features/doctors/redux/professionalDetailsSaga';
import { watchLogout } from '../features/auth/redux/logoutSaga';

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
    fork(resendHospitalOtpSaga),
    fork(watchRegisterDoctorSaga),
    fork(getExistingUserSaga),
    fork(verifyExistingPatientOtpSaga),
    fork(watchDashboardOverviewSaga),
    fork(watchSendLoginOtpSaga),
    fork(watchVerifyLoginOtpSaga),
    fork(sendDoctorOtpSaga),
    fork(verifyDoctorOtpSaga),
    fork(resendDoctorOtpSaga),
    fork(watchDoctorRegisterFeatureSaga),
    fork(professionalDetailsSaga),
    fork(watchLogout),
  ]);
}
