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
const StepperContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  background-color: #ffffff;
  border-bottom: 1px solid #f1f5f9;
  flex-wrap: wrap;
  gap: 16px;
  overflow-x: auto;
`;

const StepItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  opacity: ${props => props.active || props.completed ? 1 : 0.5};
  transition: opacity 0.3s ease;
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
`;

const StepText = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.active ? '#009688' : '#1e293b'};
  white-space: nowrap;
`;

const StepDivider = styled.div`
  flex: 1;
  height: 2px;
  background-color: ${props => props.completed ? '#10b981' : '#f1f5f9'};
  min-width: 20px;
  max-width: 60px;
  transition: background-color 0.3s ease;

  @media (max-width: 1024px) {
    display: none;
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
`;

// FOOTER STYLE
const WizardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #fafbfc;
  border-top: 1px solid #f1f5f9;
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
      alert(`OTP sent successfully to: ${mobileNumber}!`);
      dispatch(resetSendOtpState());
    }
    if (sendOtpState.isError) {
      alert(`Failed to send OTP: ${sendOtpState.errorMessage}`);
      dispatch(resetSendOtpState());
    }
  }, [sendOtpState.isSuccess, sendOtpState.isError, sendOtpState.errorMessage, dispatch, mobileNumber]);

  const handleSendOtp = () => {
    if (!mobileNumber) {
      alert("Please enter a valid mobile number or email ID!");
      return;
    }
    dispatch(sendOtpRequest({ identifier: mobileNumber }));
  };

  const handleSearchPatient = () => {
    // Check if searching Case Number or Mobile OTP with our demo queries
    if (caseNumber === 'CASE-2026-00452' || caseNumber === 'PT-2028-00452' || mobileNumber === '9876543210' || otpCode === '123456') {
      setPersonalDetails({
        fullName: 'Rajesh Kumar',
        address: 'Sector 5, Salt Lake, Kolkata',
        phone: '+91 98765 41234',
        email: 'rajesh.kumar@example.com',
        gender: 'Male',
        age: '42',
        registerWithOtp: 'Yes'
      });
      setIsExistingPatient('Existing');
      setIsPatientVerified(true);
      setLastConsulted({
        doctorName: 'Dr. Anita Sharma',
        specialty: 'Cardiology'
      });
    } else {
      alert("No patient records found. Try using Case Number 'CASE-2026-00452' or OTP hint '123456'.");
    }
  };

  const stepNames = [
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
    if (step === 1) {
      if (subStep === 1) {
        setSubStep(2);
      } else if (subStep === 2) {
        if (isExistingPatient === 'New') {
          // New Patient goes to Step 2: Personal Details
          setStep(2);
        } else {
          setSubStep(3);
        }
      } else if (subStep === 3) {
        if (isExistingPatient === 'Existing') {
          // Existing Patient successfully found goes STRAIGHT to Step 5: Doctor Selection
          setStep(5);
        } else {
          setStep(2);
        }
      }
    } else if (step === 2) {
      if (!personalDetails.fullName || !personalDetails.phone) {
        alert("Please fill in required fields (Full Name, Phone Number)!");
        return;
      }
      
      if (personalDetails.registerWithOtp === 'Yes') {
        setStep(3); // Go to Step 3: OTP Verification
      } else {
        setStep(5); // Skip both Step 3 (OTP Verification) and Step 4 (Medical Info)
      }
    } else if (step === 3) {
      // Step 3 (OTP Verification) goes to Step 4 (Medical Info)
      setStep(4);
    } else if (step === 4) {
      // Step 4 (Medical Info) goes to Step 5 (Doctor Selection)
      setStep(5);
    } else {
      setStep(prev => Math.min(prev + 1, 8));
    }
  };

  const handleBack = () => {
    if (step === 5) {
      if (isExistingPatient === 'Existing') {
        setStep(1);
        setSubStep(3);
      } else {
        if (personalDetails.registerWithOtp === 'Yes') {
          setStep(4);
        } else {
          setStep(2);
        }
      }
    } else if (step === 4) {
      setStep(3);
    } else if (step === 3) {
      setStep(2);
    } else if (step === 2) {
      setStep(1);
      setSubStep(2);
    } else if (step === 1) {
      if (subStep === 3) {
        setSubStep(2);
      } else if (subStep === 2) {
        setSubStep(1);
      } else {
        onClose();
      }
    } else {
      setStep(prev => Math.max(prev - 1, 1));
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
          <p>Step {step} of 8: {stepNames[step - 1]}</p>
        </HeaderText>
      </Header>

      {/* WIZARD CONTAINER */}
      <WizardCard>
        
        {/* STEP PROGRESS BAR */}
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

        {/* STEP BODY */}
        <WizardBody>

          {/* STEP 1: Registration Type & Lookup */}
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

          {/* STEP 2: Personal Details */}
          {step === 2 && (
            <PersonalDetailsStep 
              personalDetails={personalDetails}
              setPersonalDetails={setPersonalDetails}
              patientId={tempPatientId}
              fileNo={tempFileNo}
            />
          )}

          {/* STEP 3: OTP Verification */}
          {step === 3 && (
            <OtpVerificationStep 
              phone={personalDetails.phone}
              email={personalDetails.email}
              onSkipVerification={() => setStep(4)}
              onVerifyLater={() => setStep(4)}
            />
          )}

          {/* STEP 4: Medical Information */}
          {step === 4 && (
            <MedicalInformationStep 
              medicalInfo={medicalInfo}
              setMedicalInfo={setMedicalInfo}
              onSkip={() => setStep(5)}
            />
          )}

          {/* STEP 5: Doctor Selection */}
          {step === 5 && (
            <DoctorSelectionStep 
              doctors={MOCK_DOCTORS}
              selectedDoctor={selectedDoctor}
              onSelectDoctor={setSelectedDoctor}
            />
          )}

          {/* STEP 6: Slot Assignment */}
          {step === 6 && (
            <SlotAssignmentStep 
              selectedDoctor={selectedDoctor}
              bookingDate={bookingDate}
              setBookingDate={setBookingDate}
              selectedSlot={selectedSlot}
              setSelectedSlot={setSelectedSlot}
            />
          )}

          {/* STEP 7: Payment */}
          {step === 7 && (
            <PaymentStep 
              selectedDoctor={selectedDoctor}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              totalFee={totalFee}
            />
          )}

          {/* STEP 8: Confirmation Summary */}
          {step === 8 && (
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
        {step < 8 && (
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
              
              <NextBtn onClick={handleNext}>
                Next <span style={{ fontSize: 12 }}>➜</span>
              </NextBtn>
            </div>
          </WizardFooter>
        )}

      </WizardCard>
    </Container>
  );
};

export default NewBookingFlow;
