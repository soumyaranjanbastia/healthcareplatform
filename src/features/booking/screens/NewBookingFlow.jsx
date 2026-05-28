import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { ArrowLeft, Check } from 'lucide-react';

// Step components
import RegistrationTypeStep from '../components/RegistrationTypeStep';
import OtpVerificationStep from '../components/OtpVerificationStep';
import PersonalDetailsStep from '../components/PersonalDetailsStep';
import MedicalInformationStep from '../components/MedicalInformationStep';
import DoctorSelectionStep from '../components/DoctorSelectionStep';
import SlotAssignmentStep from '../components/SlotAssignmentStep';
import PaymentStep from '../components/PaymentStep';
import ConfirmationStep from '../components/ConfirmationStep';

// Actions
import { sendOtpRequest, resetSendOtpState } from '../redux/sendOtpSlice';
import { registerPatientRequest, resetRegisterPatientState } from '../redux/registerPatientSlice';
import { validateEmailOtpRequest, validatePhoneOtpRequest, resetOtpValidationState } from '../redux/otpValidationSlice';
import { resendOtpRequest, resetResendOtpState } from '../redux/resendOtpSlice';
import { saveMedicalInfoRequest, resetSaveMedicalInfoState } from '../redux/saveMedicalInfoSlice';
import { getExistingUserRequest, resetGetExistingUserState } from '../redux/getExistingUserSlice';
import { verifyExistingPatientOtpRequest, resetVerifyExistingPatientOtpState } from '../redux/verifyExistingPatientOtpSlice';

// --- KEYFRAMES ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

// --- STYLED COMPONENTS ---
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: ${fadeIn} 0.4s ease-out;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Outfit', 'Inter', sans-serif;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const BackBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #1e293b;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8fafc;
    color: #009688;
    transform: translateX(-2px);
  }
`;

const HeaderText = styled.div`
  h2 {
    font-size: 20px;
    font-weight: 700;
    color: #0f172a;
  }
  p {
    font-size: 13px;
    color: #64748b;
    font-weight: 500;
    margin-top: 2px;
  }
`;

const WizardCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

// STEP PERSTYLE
const StepperOuter = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 16px;
  background-color: #ffffff;

  @media (min-width: 641px) {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const StepperContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 8px 24px;
  background-color: #ffffff;
  width: 100%;
  flex-wrap: nowrap;

  @media (max-width: 640px) {
    padding: 16px 16px 4px 16px;
    gap: 0;
  }
`;

const StepItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  opacity: ${props => props.active || props.completed ? 1 : 0.5};
  transition: opacity 0.3s ease;

  @media (max-width: 640px) {
    gap: 0;
  }
`;

const StepCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${props => {
    if (props.completed) return '#10b981';
    if (props.active) return '#009688';
    return '#f1f5f9';
  }};
  color: ${props => props.active || props.completed ? '#ffffff' : '#64748b'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.active ? '#009688' : 'transparent'};
  flex-shrink: 0;
`;

const StepText = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.active ? '#009688' : '#1e293b'};
  white-space: nowrap;
  display: ${props => props.active ? 'inline' : 'none'};

  @media (max-width: 640px) {
    display: none;
  }
`;

const StepDivider = styled.div`
  flex: 1;
  height: 2px;
  background-color: ${props => props.completed ? '#10b981' : '#f1f5f9'};
  min-width: 20px;
  max-width: 60px;
  transition: background-color 0.3s ease;

  @media (max-width: 640px) {
    min-width: 8px;
    max-width: none;
  }
`;

const ActiveStepLabelMobile = styled.div`
  display: none;
  @media (max-width: 640px) {
    display: block;
    text-align: center;
    font-size: 13px;
    font-weight: 700;
    color: #009688;
    margin-top: 8px;
    background-color: #e6f9f3;
    padding: 6px 14px;
    border-radius: 20px;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0 2px 8px rgba(0, 150, 136, 0.05);
    animation: ${fadeIn} 0.3s ease-out;
  }
`;

// WIZARD BODY
const WizardBody = styled.div`
  padding: 40px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;

  @media (max-width: 768px) {
    padding: 24px 16px;
  }
`;

// FOOTER STYLE
const WizardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #fafbfc;
  border-top: 1px solid #f1f5f9;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const CancelBtn = styled.button`
  padding: 12px 24px;
  background-color: #e2e8f0;
  color: #475569;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #cbd5e1;
    color: #1e293b;
  }
`;

const NextBtn = styled.button`
  padding: 12px 28px;
  background-color: #009688;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover:not(:disabled) {
    background-color: #00796b;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 150, 136, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const MOCK_DOCTORS = [
  { id: 1, name: 'Dr. Sam Sharma', specialty: 'Cardiology', room: 'OPD-03', fee: 500, avatar: 'SS' },
  { id: 2, name: 'Dr. Sam Rao', specialty: 'Pediatrics', room: 'OPD-05', fee: 600, avatar: 'SR' },
  { id: 3, name: 'Dr. Sam Ram', specialty: 'General Medicine', room: 'OPD-07', fee: 400, avatar: 'SR' },
];

const NewBookingFlow = ({ onClose, onComplete }) => {
  const dispatch = useDispatch();
  const sendOtpState = useSelector(state => state.sendOtp);
  const registerPatientState = useSelector(state => state.registerPatient);
  const otpValidationState = useSelector(state => state.otpValidation);
  const resendOtpState = useSelector(state => state.resendOtp);
  const saveMedicalInfoState = useSelector(state => state.saveMedicalInfo);
  const getExistingUserState = useSelector(state => state.getExistingUser);
  const verifyExistingPatientOtpState = useSelector(state => state.verifyExistingPatientOtp);

  const [step, setStep] = useState(1);
  const [subStep, setSubStep] = useState(1); // subStep handles Screens under Step 1: 1 = Consultation Type, 2 = Are you Existing vs New Patient, 3 = Search Existing Patient Lookup
  const [isExistingPatient, setIsExistingPatient] = useState('Existing'); // 'Existing' | 'New'
  const [consultationType, setConsultationType] = useState('Physical'); // 'Physical' | 'Online'
  const [searchMethod, setSearchMethod] = useState('CaseNumber'); // 'CaseNumber' | 'MobileOtp'
  const [caseNumber, setCaseNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isPatientVerified, setIsPatientVerified] = useState(false);
  const [lastConsulted, setLastConsulted] = useState({ doctorName: 'Dr. Anita Sharma', specialty: 'Cardiology' });
  const [currentEncryptionKey, setCurrentEncryptionKey] = useState(null);
  const [registeredUserId, setRegisteredUserId] = useState(null);

  // Registration data
  const [personalDetails, setPersonalDetails] = useState({
    fullName: '',
    address: '',
    phone: '',
    email: '',
    gender: 'Male',
    age: '',
    registerWithOtp: 'No'
  });

  // Vitals & Medical data
  const [medicalInfo, setMedicalInfo] = useState({
    symptoms: '',
    medicalHistory: '',
    existingDiseases: '',
    currentMedication: '',
    allergies: '',
    chronicConditionsString: '',
    chronicConditions: [],
    allergiesArray: []
  });

  // Selection states
  const [selectedDoctor, setSelectedDoctor] = useState(MOCK_DOCTORS[0]);
  const [bookingDate, setBookingDate] = useState('2026-05-27');
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM - 10:30 AM');
  const [paymentMethod, setPaymentMethod] = useState('Cash'); // 'Cash' | 'Card' | 'UPI'

  // Pre-generated demo IDs
  const tempPatientId = personalDetails.fullName ? `PT-2026-${personalDetails.fullName.replace(/\s+/g, '').substring(0, 4).toUpperCase()}` : 'PT-2026-XXXX';
  const tempFileNo = personalDetails.fullName ? `FILE-OPD-${Math.floor(1000 + Math.random() * 9000)}` : 'FILE-OPD-XXXX';

  useEffect(() => {
    if (sendOtpState.isSuccess) {
      setOtpSent(true);
      const encryptionKey = sendOtpState.data?.encryptionKey || sendOtpState.data?.data?.encryptionKey || sendOtpState.data?.key || sendOtpState.data?.data?.key;
      if (encryptionKey) {
        setCurrentEncryptionKey(encryptionKey);
        console.log('Stored OTP encryption key:', encryptionKey);
      }
      alert(`OTP sent successfully to: ${mobileNumber}!`);
      dispatch(resetSendOtpState());
    }
    if (sendOtpState.isError) {
      alert(`Failed to send OTP: ${sendOtpState.errorMessage}`);
      dispatch(resetSendOtpState());
    }
  }, [sendOtpState.isSuccess, sendOtpState.isError, sendOtpState.errorMessage, dispatch, mobileNumber]);

  useEffect(() => {
    if (registerPatientState.isSuccess) {
      alert("Patient demographic details registered successfully via API!");
      console.log('Registered Patient Response:', registerPatientState.patientData);

      const encKey = registerPatientState.patientData?.encryptionKey || registerPatientState.patientData?.data?.encryptionKey;
      if (encKey) {
        setCurrentEncryptionKey(encKey);
        console.log('Stored initial encryptionKey from signup:', encKey);
      }

      const userId = registerPatientState.patientData?.userId || registerPatientState.patientData?.data?.userId;
      if (userId) {
        setRegisteredUserId(userId);
        console.log('Stored userId from signup:', userId);
      }

      // Navigate sequentially depending on OTP option
      if (personalDetails.registerWithOtp === 'Yes') {
        setStep(3);
      } else {
        setStep(5);
      }

      dispatch(resetRegisterPatientState());
    }
    if (registerPatientState.isError) {
      alert(`Failed to register patient: ${registerPatientState.errorMessage}`);
      dispatch(resetRegisterPatientState());
    }
  }, [registerPatientState.isSuccess, registerPatientState.isError, registerPatientState.errorMessage, dispatch, personalDetails.registerWithOtp]);

  useEffect(() => {
    if (otpValidationState.isEmailSuccess) {
      alert("Email OTP verified successfully!");
      const nextKey = otpValidationState.emailEncryptionKey;
      if (nextKey) {
        setCurrentEncryptionKey(nextKey);
        console.log('Stored next encryptionKey from Email success:', nextKey);
      }
    }
    if (otpValidationState.isEmailError) {
      alert(`Email OTP validation failed: ${otpValidationState.emailErrorMessage}`);
    }
  }, [otpValidationState.isEmailSuccess, otpValidationState.isEmailError, otpValidationState.emailErrorMessage, otpValidationState.emailEncryptionKey]);

  useEffect(() => {
    if (otpValidationState.isPhoneSuccess) {
      alert("Phone OTP verified successfully! Patient identified.");
      setStep(4);
      dispatch(resetOtpValidationState());
    }
    if (otpValidationState.isPhoneError) {
      alert(`Phone OTP validation failed: ${otpValidationState.phoneErrorMessage}`);
    }
  }, [otpValidationState.isPhoneSuccess, otpValidationState.isPhoneError, otpValidationState.phoneErrorMessage, dispatch]);

  useEffect(() => {
    if (resendOtpState.isSuccess) {
      alert("Verification OTP resent successfully!");
      dispatch(resetResendOtpState());
    }
    if (resendOtpState.isError) {
      alert(`Failed to resend OTP: ${resendOtpState.errorMessage}`);
      dispatch(resetResendOtpState());
    }
  }, [resendOtpState.isSuccess, resendOtpState.isError, resendOtpState.errorMessage, dispatch]);

  useEffect(() => {
    if (saveMedicalInfoState.isSuccess) {
      console.log('Medical info saved successfully:', saveMedicalInfoState.data);
      setStep(isExistingPatient === 'Existing' ? 4 : 5);
      dispatch(resetSaveMedicalInfoState());
    }
    if (saveMedicalInfoState.isError) {
      alert(`Failed to save medical information: ${saveMedicalInfoState.errorMessage}`);
      dispatch(resetSaveMedicalInfoState());
    }
  }, [saveMedicalInfoState.isSuccess, saveMedicalInfoState.isError, saveMedicalInfoState.errorMessage, dispatch, isExistingPatient]);

  useEffect(() => {
    if (getExistingUserState.isSuccess) {
      const user = getExistingUserState.userData?.data || getExistingUserState.userData;
      console.log('get existing user saga response processed:', user);
      if (user) {
        // Calculate age dynamically from dob if dob exists
        let calculatedAge = '42';
        if (user.dob) {
          try {
            const birthDate = new Date(user.dob);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
              age--;
            }
            calculatedAge = age.toString();
          } catch (e) {
            console.error('Error calculating age from dob:', e);
          }
        } else if (user.age) {
          calculatedAge = user.age.toString();
        }

         setPersonalDetails({
          fullName: user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Rajesh Kumar',
          address: user.address || 'Sector 5, Salt Lake, Kolkata',
          phone: user.phone || mobileNumber || '+91 98765 41234',
          email: user.email || 'rajesh.kumar@example.com',
          gender: user.gender || 'Male',
          age: calculatedAge,
          registerWithOtp: 'Yes',
          profileImageUrl: user.profileImageUrl || ''
        });

        // Crucial: Store the identifier/userId for medical info submissions
        const uId = user.id || user.userId;
        if (uId) {
          setRegisteredUserId(uId.toString());
          console.log('Stored existing patient userId:', uId);
        }

        setIsExistingPatient('Existing');
        setIsPatientVerified(true);

        if (user.lastConsultedDoctor) {
          setLastConsulted({
            doctorName: `${user.lastConsultedDoctor.salutation || 'Dr.'} ${user.lastConsultedDoctor.firstName} ${user.lastConsultedDoctor.lastName || ''}`.trim(),
            specialty: user.lastConsultedDoctor.specialty || 'General Medicine'
          });
        } else {
          setLastConsulted({
            doctorName: 'Dr. Anita Sharma',
            specialty: 'Cardiology'
          });
        }
      } else {
        alert("Patient identified but details could not be retrieved.");
      }
      dispatch(resetGetExistingUserState());
    }
    if (getExistingUserState.isError) {
      alert(`Failed to fetch patient details: ${getExistingUserState.errorMessage}`);
      dispatch(resetGetExistingUserState());
    }
  }, [getExistingUserState.isSuccess, getExistingUserState.isError, getExistingUserState.userData, getExistingUserState.errorMessage, dispatch, mobileNumber]);

  useEffect(() => {
    if (verifyExistingPatientOtpState.isSuccess) {
      alert("OTP verified successfully!");
      // Automatically load the patient details now that OTP validation is successful
      dispatch(getExistingUserRequest({ identifier: mobileNumber }));
      dispatch(resetVerifyExistingPatientOtpState());
    }
    if (verifyExistingPatientOtpState.isError) {
      alert(`OTP verification failed: ${verifyExistingPatientOtpState.errorMessage}`);
      dispatch(resetVerifyExistingPatientOtpState());
    }
  }, [verifyExistingPatientOtpState.isSuccess, verifyExistingPatientOtpState.isError, verifyExistingPatientOtpState.errorMessage, dispatch, mobileNumber]);

  const handleSendOtp = () => {
    if (!mobileNumber) {
      alert("Please enter a valid mobile number or email ID!");
      return;
    }
    dispatch(sendOtpRequest({ identifier: mobileNumber }));
  };

  const handleSearchPatient = () => {
    if (searchMethod === 'CaseNumber') {
      if (!caseNumber) {
        alert("Please enter a valid Case Number!");
        return;
      }
      dispatch(getExistingUserRequest({ identifier: caseNumber }));
    } else {
      if (!mobileNumber) {
        alert("Please enter a valid Mobile number/Email!");
        return;
      }
      if (!otpSent) {
        alert("Please send OTP first!");
        return;
      }
      if (!otpCode) {
        alert("Please enter the OTP code sent to your phone/email!");
        return;
      }
      dispatch(verifyExistingPatientOtpRequest({
        identifier: mobileNumber,
        code: otpCode,
        key: currentEncryptionKey
      }));
    }
  };

  const stepNames = isExistingPatient === 'Existing'
    ? [
      "Registration Type",
      "Patient Search",
      "Medical Information",
      "Doctor Selection",
      "Slot Assignment",
      "Payment",
      "Confirmation"
    ]
    : [
      "Registration Type",
      "Personal Details",
      "OTP Verification",
      "Medical Information",
      "Doctor Selection",
      "Slot Assignment",
      "Payment",
      "Confirmation"
    ];

  const handleNext = () => {
    if (isExistingPatient === 'Existing') {
      if (step === 1) {
        if (subStep === 1) {
          setSubStep(2);
        } else if (subStep === 2) {
          setStep(2);
        }
      } else if (step === 2) {
        setStep(3);
      } else if (step === 3) {
        // Step 3 is Medical Information for Existing Patient. Save it to API.
        const medicalPayload = {
          userId: registeredUserId,
          symptoms: medicalInfo.symptoms || '',
          medicalHistory: medicalInfo.medicalHistory || '',
          existingDiseases: medicalInfo.existingDiseases || '',
          currentMedication: medicalInfo.currentMedication || '',
          allergies: medicalInfo.allergies || '',
          chronicConditions: medicalInfo.chronicConditionsString
            ? medicalInfo.chronicConditionsString.split(',').map(s => s.trim()).filter(Boolean)
            : [],
        };
        dispatch(saveMedicalInfoRequest(medicalPayload));
      } else if (step === 4) {
        setStep(5);
      } else if (step === 5) {
        setStep(6);
      } else if (step === 6) {
        setStep(7);
      }
    } else {
      // New Patient Flow
      if (step === 1) {
        if (subStep === 1) {
          setSubStep(2);
        } else if (subStep === 2) {
          setStep(2);
        }
      } else if (step === 2) {
        if (!personalDetails.fullName || !personalDetails.phone) {
          alert("Please fill in required fields (Full Name, Phone Number)!");
          return;
        }

        // [INCOMING CHANGE]: Dispatch API request to register patient demographic details!
        const registrationPayload = {
          fullName: personalDetails.fullName,
          address: personalDetails.address,
          gender: personalDetails.gender,
          age: personalDetails.age ? Number(personalDetails.age) : 0,
          phone: personalDetails.phone,
          emailId: personalDetails.email,
          registrationOtp: personalDetails.registerWithOtp ? personalDetails.registerWithOtp.toLowerCase() : 'no'
        };

        dispatch(registerPatientRequest(registrationPayload));
      } else if (step === 3) {
        // Step 3 (OTP Verification) goes to Step 4 (Medical Info)
        setStep(4);
      } else if (step === 4) {
        // [INCOMING CHANGE]: Dispatch Save Medical Info API
        const medicalPayload = {
          userId: registeredUserId,
          symptoms: medicalInfo.symptoms || '',
          medicalHistory: medicalInfo.medicalHistory || '',
          existingDiseases: medicalInfo.existingDiseases || '',
          currentMedication: medicalInfo.currentMedication || '',
          allergies: medicalInfo.allergies || '',
          chronicConditions: medicalInfo.chronicConditionsString
            ? medicalInfo.chronicConditionsString.split(',').map(s => s.trim()).filter(Boolean)
            : [],
        };
        dispatch(saveMedicalInfoRequest(medicalPayload));
      } else {
        setStep(prev => Math.min(prev + 1, 8));
      }
    }
  };

  const handleBack = () => {
    if (isExistingPatient === 'Existing') {
      if (step === 7) {
        setStep(6);
      } else if (step === 6) {
        setStep(5);
      } else if (step === 5) {
        setStep(4);
      } else if (step === 4) {
        setStep(3);
      } else if (step === 3) {
        setStep(2);
      } else if (step === 2) {
        setStep(1);
        setSubStep(2);
      } else if (step === 1) {
        if (subStep === 2) {
          setSubStep(1);
        } else {
          onClose();
        }
      }
    } else {
      if (step === 5) {
        if (personalDetails.registerWithOtp === 'Yes') {
          setStep(4);
        } else {
          setStep(2);
        }
      } else if (step === 4) {
        setStep(3);
      } else if (step === 3) {
        setStep(2);
      } else if (step === 2) {
        setStep(1);
        setSubStep(2);
      } else if (step === 1) {
        if (subStep === 2) {
          setSubStep(1);
        } else {
          onClose();
        }
      } else {
        setStep(prev => Math.max(prev - 1, 1));
      }
    }
  };

  const totalFee = selectedDoctor ? selectedDoctor.fee + 50 + 18 : 568; // fee + registration fee + gst

  return (
    <Container>

      {/* HEADER SECTION */}
      <Header>
        <BackBtn onClick={onClose}>
          <ArrowLeft size={18} />
        </BackBtn>
        <HeaderText>
          <h2>New Booking</h2>
          <p>Step {step} of {stepNames.length}: {stepNames[step - 1]}</p>
        </HeaderText>
      </Header>

      {/* WIZARD CONTAINER */}
      <WizardCard>

        {/* STEP PROGRESS BAR */}
        <StepperOuter>
          <StepperContainer>
            {stepNames.map((name, i) => {
              const stepNum = i + 1;
              const active = step === stepNum;
              const completed = step > stepNum;
              return (
                <React.Fragment key={name}>
                  <StepItem active={active} completed={completed}>
                    <StepCircle active={active} completed={completed}>
                      {completed ? <Check size={14} /> : stepNum}
                    </StepCircle>
                    <StepText active={active}>{name}</StepText>
                  </StepItem>
                  {i < stepNames.length - 1 && <StepDivider completed={completed} />}
                </React.Fragment>
              );
            })}
          </StepperContainer>
          <ActiveStepLabelMobile>
            Step {step}: {stepNames[step - 1]}
          </ActiveStepLabelMobile>
        </StepperOuter>

        {/* STEP BODY */}
        <WizardBody>

          {/* STEP 1: Registration Type */}
          {step === 1 && (
            <RegistrationTypeStep
              step={step}
              subStep={subStep}
              consultationType={consultationType}
              setConsultationType={setConsultationType}
              isExistingPatient={isExistingPatient}
              setIsExistingPatient={setIsExistingPatient}
              searchMethod={searchMethod}
              setSearchMethod={setSearchMethod}
              caseNumber={caseNumber}
              setCaseNumber={setCaseNumber}
              mobileNumber={mobileNumber}
              setMobileNumber={setMobileNumber}
              otpSent={otpSent}
              handleSendOtp={handleSendOtp}
              otpCode={otpCode}
              setOtpCode={setOtpCode}
              handleSearchPatient={handleSearchPatient}
              onRegisterNew={() => {
                setIsExistingPatient('New');
                setStep(2);
              }}
              isPatientVerified={isPatientVerified}
              setIsPatientVerified={setIsPatientVerified}
              personalDetails={personalDetails}
              lastConsulted={lastConsulted}
            />
          )}

          {/* STEP 2 for Existing Patient: Patient Search */}
          {isExistingPatient === 'Existing' && step === 2 && (
            <RegistrationTypeStep
              step={1}
              subStep={3}
              consultationType={consultationType}
              setConsultationType={setConsultationType}
              isExistingPatient={isExistingPatient}
              setIsExistingPatient={setIsExistingPatient}
              searchMethod={searchMethod}
              setSearchMethod={setSearchMethod}
              caseNumber={caseNumber}
              setCaseNumber={setCaseNumber}
              mobileNumber={mobileNumber}
              setMobileNumber={setMobileNumber}
              otpSent={otpSent}
              handleSendOtp={handleSendOtp}
              otpCode={otpCode}
              setOtpCode={setOtpCode}
              handleSearchPatient={handleSearchPatient}
              onRegisterNew={() => {
                setIsExistingPatient('New');
                setStep(2);
              }}
              isPatientVerified={isPatientVerified}
              setIsPatientVerified={setIsPatientVerified}
              personalDetails={personalDetails}
              lastConsulted={lastConsulted}
            />
          )}

          {/* STEP 2 for New Patient: Personal Details */}
          {isExistingPatient === 'New' && step === 2 && (
            <PersonalDetailsStep
              personalDetails={personalDetails}
              setPersonalDetails={setPersonalDetails}
              patientId={tempPatientId}
              fileNo={tempFileNo}
            />
          )}

          {/* STEP 3 for New Patient: OTP Verification */}
          {isExistingPatient === 'New' && step === 3 && (
            <OtpVerificationStep
              phone={personalDetails.phone}
              email={personalDetails.email}
              currentEncryptionKey={currentEncryptionKey}
              otpValidationState={otpValidationState}
              resendOtpState={resendOtpState}
              onSkipVerification={() => setStep(4)}
              onVerifyLater={() => setStep(4)}
            />
          )}

          {/* STEP 3 (Existing) or 4 (New): Medical Information */}
          {((isExistingPatient === 'Existing' && step === 3) || (isExistingPatient === 'New' && step === 4)) && (
            <MedicalInformationStep
              medicalInfo={medicalInfo}
              setMedicalInfo={setMedicalInfo}
              onSkip={() => setStep(isExistingPatient === 'Existing' ? 4 : 5)}
              isLoading={saveMedicalInfoState.isLoading}
            />
          )}

          {/* STEP 4 (Existing) or 5 (New): Doctor Selection */}
          {((isExistingPatient === 'Existing' && step === 4) || (isExistingPatient === 'New' && step === 5)) && (
            <DoctorSelectionStep
              doctors={MOCK_DOCTORS}
              selectedDoctor={selectedDoctor}
              onSelectDoctor={setSelectedDoctor}
            />
          )}

          {/* STEP 5 (Existing) or 6 (New): Slot Assignment */}
          {((isExistingPatient === 'Existing' && step === 5) || (isExistingPatient === 'New' && step === 6)) && (
            <SlotAssignmentStep
              selectedDoctor={selectedDoctor}
              bookingDate={bookingDate}
              setBookingDate={setBookingDate}
              selectedSlot={selectedSlot}
              setSelectedSlot={setSelectedSlot}
            />
          )}

          {/* STEP 6 (Existing) or 7 (New): Payment */}
          {((isExistingPatient === 'Existing' && step === 6) || (isExistingPatient === 'New' && step === 7)) && (
            <PaymentStep
              selectedDoctor={selectedDoctor}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              totalFee={totalFee}
            />
          )}

          {/* STEP 7 (Existing) or 8 (New): Confirmation Summary */}
          {((isExistingPatient === 'Existing' && step === 7) || (isExistingPatient === 'New' && step === 8)) && (
            <ConfirmationStep
              personalDetails={personalDetails}
              patientId={tempPatientId}
              selectedDoctor={selectedDoctor}
              bookingDate={bookingDate}
              selectedSlot={selectedSlot}
              paymentMethod={paymentMethod}
              onComplete={onComplete}
            />
          )}

        </WizardBody>

        {/* STEP FOOTER */}
        {step < stepNames.length && (
          <WizardFooter>
            <CancelBtn onClick={onClose}>
              Cancel
            </CancelBtn>

            <div style={{ display: 'flex', gap: 12 }}>
              {(step > 1 || (step === 1 && subStep > 1)) && (
                <CancelBtn onClick={handleBack}>
                  Back
                </CancelBtn>
              )}

              <NextBtn
                onClick={handleNext}
                disabled={registerPatientState.isLoading || sendOtpState.isLoading || saveMedicalInfoState.isLoading}
              >
                {registerPatientState.isLoading ? 'Registering...' : saveMedicalInfoState.isLoading ? 'Saving...' : 'Next'} <span style={{ fontSize: 12 }}>➜</span>
              </NextBtn>
            </div>
          </WizardFooter>
        )}

      </WizardCard>
    </Container>
  );
};

export default NewBookingFlow;
