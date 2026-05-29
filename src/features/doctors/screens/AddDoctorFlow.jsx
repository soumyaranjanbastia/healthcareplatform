import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { ArrowLeft } from 'lucide-react';

import AddDoctorVerification from '../components/AddDoctorVerification';
import AddDoctorOtp from '../components/AddDoctorOtp';
import AddDoctorProfile from '../components/AddDoctorProfile';
import AddDoctorProfessional from '../components/AddDoctorProfessional';
import AddDoctorDocuments from '../components/AddDoctorDocuments';
import AddDoctorBank from '../components/AddDoctorBank';
import AddDoctorReview from '../components/AddDoctorReview';

import { registerDoctorRequest, resetRegisterDoctor } from '../redux/registerDoctorSlice';
import { submitProfessionalDetailsRequest, clearProfessionalDetailsMessages } from '../redux/professionalDetailsSlice';
import { getGeoDataRequest } from '../../auth/redux/geoDataSlice';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const SpinnerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 16px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #009688;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Outfit', sans-serif;
  animation: ${fadeIn} 0.4s ease-out;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
`;



const BackBtn = styled.button`
  background: none;
  border: none;
  font-size: 13px;
  font-weight: 700;
  color: #475569;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  transition: all 0.2s ease;

  &:hover {
    color: #009688;
    transform: translateX(-2px);
  }
`;

const TitleBlock = styled.div`
  h2 {
    font-size: 24px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }
  p {
    font-size: 13px;
    color: #64748b;
    margin-top: 4px;
    font-weight: 500;
  }
`;

const WizardCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 640px) {
    padding: 20px;
  }
`;

const StepBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
`;

const StepBarTrack = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
`;

const StepSegment = styled.div`
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background-color: ${props => props.active ? '#009688' : '#e2e8f0'};
  transition: background-color 0.3s ease;
`;

const StepBarMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  color: #64748b;

  span:last-child {
    color: #009688;
  }
`;

const AddDoctorFlow = ({ onClose, onComplete }) => {
  const dispatch = useDispatch();
  const registerState = useSelector(state => state.registerDoctorFeature);
  const professionalDetailsState = useSelector(state => state.professionalDetails);
  const { geoData } = useSelector(state => state.geoData);

  const [step, setStep] = useState(1);

  // OTP keys returned from sendOtp API
  const [otpKeys, setOtpKeys] = useState({ encryptionKey: '', userId: '', userType: '' });

  // STEP 1 & 2: VERIFICATION
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phonePrefix, setPhonePrefix] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [phoneCode, setPhoneCode] = useState('');

  // STEP 3: PROFILE
  const [title, setTitle] = useState('Dr.');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileName, setProfileName] = useState('');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('');
  const [altEmail, setAltEmail] = useState('');
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('Maharashtra');
  const [city, setCity] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  // STEP 4: PROFESSIONAL
  const [regNo, setRegNo] = useState('');
  const [council, setCouncil] = useState('');
  const [qualification, setQualification] = useState('');
  const [degree, setDegree] = useState('');
  const [specialization, setSpecialization] = useState('Cardiology');
  const [experience, setExperience] = useState(5);
  const [selectedLanguages, setSelectedLanguages] = useState(['English', 'Hindi']);
  const [condition, setCondition] = useState('');
  const [conditionsList, setConditionsList] = useState(['Heart block', 'Arrhythmia']);
  const [about, setAbout] = useState('');

  // STEP 5: DOCUMENTS
  const [uploadedFiles, setUploadedFiles] = useState({});

  // STEP 6: BANK
  const [accHolderName, setAccHolderName] = useState('');
  const [accNumber, setAccNumber] = useState('');
  const [confirmAccNumber, setConfirmAccNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [bankName, setBankName] = useState('');
  const [panNumber, setPanNumber] = useState('');

  // Fetch geo data on mount
  useEffect(() => {
    if (!geoData) {
      dispatch(getGeoDataRequest());
    }
  }, [dispatch, geoData]);

  // Set default prefix once geoData is loaded if not already selected
  useEffect(() => {
    if (geoData && Array.isArray(geoData) && !phonePrefix) {
      const india = geoData.find(c => c.name === 'India');
      if (india) {
        const code = india.dialCode || india.phoneCode || india.phonePrefix || india.prefix || india.code || '+91';
        let strCode = String(code).trim();
        if (!strCode.startsWith('+')) strCode = '+' + strCode;
        setPhonePrefix(strCode);
      }
    }
  }, [geoData, phonePrefix]);

  // Monitor professional details success/error for step transitions & final submission
  useEffect(() => {
    if (professionalDetailsState.isSuccess) {
      dispatch(clearProfessionalDetailsMessages());
      if (step === 7) {
        // Final registration completed successfully -> create local doctor and complete
        const newDoctor = {
          id: `D00${Math.floor(5 + Math.random() * 95)}`,
          empId: `EMP-2026-00${Math.floor(10 + Math.random() * 90)}`,
          name: `${title} ${firstName} ${lastName || ''}`.trim(),
          role: `Senior ${specialization}ist`,
          department: specialization === 'Cardiology' ? 'Cardiology' : specialization === 'Neurology' ? 'Neurology' : 'Pediatrics',
          specialization: degree || 'Interventional Cardiology',
          experience: experience,
          shift: 'Morning (9:00 AM - 4:00 PM)',
          phone: `${phonePrefix} ${phone}`,
          email: email,
          dob: dob,
          address: fullLocation,
          joinDate: new Date().toISOString().split('T')[0],
          avatar: profileImage || `${firstName[0]}${lastName ? lastName[0] : ''}`.toUpperCase(),
          status: 'Active',
          aadhaar: 'XXXX-XXXX-9988',
          pan: panNumber.toUpperCase(),
          licenseNo: regNo,
          licenseIssueDate: '2020-06-15',
          licenseExpiryDate: '2030-06-15',
          licenseStatus: 'Active',
          deaNumber: 'FJ9999999',
          verification: {
            aadhaar: 'Verified',
            pan: 'Verified',
            license: 'Verified',
            education: 'Verified',
            background: 'Verified'
          },
          education: [
            { degree: degree || 'MD - Cardiology', institute: 'New York Medical College', year: 2018 }
          ],
          certifications: [
            { name: 'Board Certified Specialist', institute: council || 'Medical Council of India', date: 2020 }
          ],
          bankDetails: {
            holder: accHolderName,
            account: accNumber,
            bank: bankName,
            ifsc: ifscCode
          }
        };
        onComplete(newDoctor);
      } else {
        setStep(prev => prev + 1);
      }
    }
  }, [professionalDetailsState.isSuccess, dispatch, step, onComplete]);

  useEffect(() => {
    if (professionalDetailsState.isError && professionalDetailsState.errorMessage) {
      alert(`Error saving progress: ${professionalDetailsState.errorMessage}`);
      dispatch(clearProfessionalDetailsMessages());
    }
  }, [professionalDetailsState.isError, professionalDetailsState.errorMessage, dispatch]);

  const handleContinue = () => {
    if (step < 7) {
      setStep(prev => prev + 1);
    }
  };

  const fullLocation = `${city ? city + ', ' : ''}${state ? state + ', ' : ''}${country}`.trim().replace(/,\s*$/, '');

  const handleStepSubmit = (currentStepNumber) => {
    const payload = {
      registrationType: 'provider',
    };

    if (currentStepNumber === 3) {
      payload.BasicInfo = {
        email,
        phone: `${phonePrefix}${phone}`,
        profileImage: profileImage,
        salutation: title,
        profileName: profileName || `${title} ${firstName} ${lastName}`.trim(),
        fullName: `${firstName} ${lastName}`.trim(),
        dateOfBirth: dob ? new Date(dob).toISOString().split('T')[0] : null,
        gender,
        alternativeEmail: altEmail,
        location: fullLocation,
      };
    } else if (currentStepNumber === 4) {
      payload.ProfessionalDetails = {
        registrationNumber: regNo,
        registrationCouncil: council,
        highestQualification: qualification,
        specialization,
        yearsOfExperience: experience,
        about,
      };
    } else if (currentStepNumber === 5) {
      payload.Documents = {
        medicalCertificate: uploadedFiles['Medical Registration Certificate'] || null,
        degreeCertificate: uploadedFiles['Degree Certificate'] || null,
        governmentId: uploadedFiles['Government ID Proof'] || null,
        digitalSignature: uploadedFiles['Digital Signature'] || null,
      };
    } else if (currentStepNumber === 6) {
      payload.BankDetails = {
        accountHolderName: accHolderName,
        accountNumber: accNumber,
        ifscCode,
        bankName,
        panNumber,
      };
    }

    console.log(`Sending step ${currentStepNumber} payload to professional details:`, payload);
    dispatch(submitProfessionalDetailsRequest(payload));
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    } else {
      onClose();
    }
  };

  // Called from AddDoctorVerification when OTP is sent successfully
  const handleOtpKeyReceived = (keys) => {
    setOtpKeys(keys);
  };

  const handleSubmitFinal = () => {
    const payload = {
      registrationType: 'provider',
      BasicInfo: {
        email,
        phone: `${phonePrefix}${phone}`,
        profileImage: profileImage,
        salutation: title,
        profileName: profileName || `${title} ${firstName} ${lastName}`.trim(),
        fullName: `${firstName} ${lastName}`.trim(),
        dateOfBirth: dob ? new Date(dob).toISOString().split('T')[0] : null,
        gender,
        alternativeEmail: altEmail,
        location: fullLocation,
      },
      ProfessionalDetails: {
        registrationNumber: regNo,
        registrationCouncil: council,
        highestQualification: qualification,
        specialization,
        yearsOfExperience: experience,
        about,
      },
      Documents: {
        medicalCertificate: uploadedFiles['Medical Registration Certificate'] || null,
        degreeCertificate: uploadedFiles['Degree Certificate'] || null,
        governmentId: uploadedFiles['Government ID Proof'] || null,
        digitalSignature: uploadedFiles['Digital Signature'] || null,
      },
      BankDetails: {
        accountHolderName: accHolderName,
        accountNumber: accNumber,
        ifscCode,
        bankName,
        panNumber,
      },
    };

    console.log('Sending final professional details payload:', payload);
    dispatch(submitProfessionalDetailsRequest(payload));
  };

  // Package all state for the Review & Submit step
  const formData = {
    title, firstName, lastName, email, phone, gender, dob, location: fullLocation, altEmail,
    regNo, council, qualification, degree, specialization, experience,
    selectedLanguages, conditionsList, about,
    accHolderName, accNumber, bankName, ifscCode, panNumber, phonePrefix // Include phonePrefix in review data
  };

  return (
    <Container>
      <Header>
        <BackBtn onClick={handleBack}>
          <ArrowLeft size={16} /> Back
        </BackBtn>
        <TitleBlock>
          <h2>Registration</h2>
          <p>Complete your profile to get started</p>
        </TitleBlock>
      </Header>

      <WizardCard style={{ position: 'relative' }}>
        {professionalDetailsState.isLoading && (
          <SpinnerOverlay>
            <Spinner />
          </SpinnerOverlay>
        )}

        {/* Step Indicator Progress Bar - 7 segments */}
        <StepBarContainer>
          <StepBarTrack>
            {[1, 2, 3, 4, 5, 6, 7].map(seg => (
              <StepSegment key={seg} active={seg <= step} />
            ))}
          </StepBarTrack>
          <StepBarMeta>
            <span>Step {step} of 7</span>
            <span>
              {step === 1 && 'Verification'}
              {step === 2 && 'OTP Validation'}
              {step === 3 && 'Complete Your Profile'}
              {step === 4 && 'Professional Details'}
              {step === 5 && 'Document Upload'}
              {step === 6 && 'Bank Details'}
              {step === 7 && 'Review & Submit'}
            </span>
          </StepBarMeta>
        </StepBarContainer>

        {/* Dynamic step components */}
        {step === 1 && (
          <AddDoctorVerification 
            email={email} 
            setEmail={setEmail} 
            phone={phone} 
            setPhone={setPhone} 
            phonePrefix={phonePrefix}
            setPhonePrefix={setPhonePrefix}
            geoData={geoData}
            onContinue={handleContinue}
            onOtpKeyReceived={handleOtpKeyReceived}
          />
        )}

        {step === 2 && (
          <AddDoctorOtp 
            email={email} 
            phone={phone} 
            phonePrefix={phonePrefix}
            emailCode={emailCode} 
            setEmailCode={setEmailCode} 
            phoneCode={phoneCode} 
            setPhoneCode={setPhoneCode} 
            onContinue={handleContinue}
            otpKeys={otpKeys}
          />
        )}

        {step === 3 && (
          <AddDoctorProfile 
            title={title} setTitle={setTitle}
            firstName={firstName} setFirstName={setFirstName}
            lastName={lastName} setLastName={setLastName}
            profileName={profileName} setProfileName={setProfileName}
            gender={gender} setGender={setGender}
            dob={dob} setDob={setDob}
            altEmail={altEmail} setAltEmail={setAltEmail}
            country={country} setCountry={setCountry}
            state={state} setState={setState}
            city={city} setCity={setCity}
            geoData={geoData}
            profileImage={profileImage}
            setProfileImage={setProfileImage}
            onContinue={() => handleStepSubmit(3)}
          />
        )}

        {step === 4 && (
          <AddDoctorProfessional 
            regNo={regNo} setRegNo={setRegNo}
            council={council} setCouncil={setCouncil}
            qualification={qualification} setQualification={setQualification}
            degree={degree} setDegree={setDegree}
            specialization={specialization} setSpecialization={setSpecialization}
            experience={experience} setExperience={setExperience}
            selectedLanguages={selectedLanguages} setSelectedLanguages={setSelectedLanguages}
            condition={condition} setCondition={setCondition}
            conditionsList={conditionsList} setConditionsList={setConditionsList}
            about={about} setAbout={setAbout}
            onContinue={() => handleStepSubmit(4)}
          />
        )}

        {step === 5 && (
          <AddDoctorDocuments 
            uploadedFiles={uploadedFiles} 
            setUploadedFiles={setUploadedFiles} 
            onContinue={() => handleStepSubmit(5)} 
          />
        )}

        {step === 6 && (
          <AddDoctorBank 
            accHolderName={accHolderName} setAccHolderName={setAccHolderName}
            accNumber={accNumber} setAccNumber={setAccNumber}
            confirmAccNumber={confirmAccNumber} setConfirmAccNumber={setConfirmAccNumber}
            ifscCode={ifscCode} setIfscCode={setIfscCode}
            bankName={bankName} setBankName={setBankName}
            panNumber={panNumber} setPanNumber={setPanNumber}
            onContinue={() => handleStepSubmit(6)}
          />
        )}

        {step === 7 && (
          <AddDoctorReview 
            formData={formData} 
            onSubmit={handleSubmitFinal}
            isLoading={professionalDetailsState.isLoading}
            error={professionalDetailsState.errorMessage}
          />
        )}
      </WizardCard>
    </Container>
  );
};

export default AddDoctorFlow;
