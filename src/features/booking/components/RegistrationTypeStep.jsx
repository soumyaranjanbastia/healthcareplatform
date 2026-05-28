import React from 'react';
import styled, { keyframes } from 'styled-components';
import { 
  User, Stethoscope, FileText, Phone, Search, CheckCircle2, Users, UserPlus, Check, ArrowRight 
} from 'lucide-react';

const scaleUp = keyframes`
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const StepTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  text-align: center;
`;

const StepSubtitle = styled.p`
  font-size: 13px;
  color: #64748b;
  margin-top: 6px;
  margin-bottom: 30px;
  text-align: center;
  font-weight: 500;
`;

const ConsultationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  width: 100%;
  max-width: 700px;
  animation: ${scaleUp} 0.3s ease-out;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const ConsultationCard = styled.div`
  border: 2px solid ${props => props.selected ? '#009688' : '#e2e8f0'};
  background-color: ${props => props.selected ? '#e6f9f3' : '#ffffff'};
  border-radius: 14px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &:hover {
    border-color: #009688;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.04);
  }
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.color || '#eff6ff'};
  color: ${props => props.iconColor || '#3b82f6'};
`;

const CardTitle = styled.h4`
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
`;

const CardDescription = styled.p`
  font-size: 12px;
  color: #64748b;
  line-height: 1.5;
`;

const TabContainer = styled.div`
  display: flex;
  background-color: #f1f5f9;
  padding: 4px;
  border-radius: 10px;
  margin-bottom: 24px;
  width: 100%;
  max-width: 500px;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  background-color: ${props => props.active ? '#ffffff' : 'transparent'};
  color: ${props => props.active ? '#0f172a' : '#64748b'};
  font-size: 13px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: ${props => props.active ? '0 4px 6px -1px rgba(0, 0, 0, 0.05)' : 'none'};
`;

const SearchFormWrapper = styled.div`
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 24px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  gap: 16px;
  animation: ${scaleUp} 0.3s ease-out;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 700;
  color: #1e293b;
`;

const InputWithButton = styled.div`
  display: flex;
  gap: 12px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  font-size: 13px;
  outline: none;
  font-weight: 600;
  background-color: #ffffff;
  color: #1e293b;
  transition: all 0.2s ease;

  &:focus {
    border-color: #009688;
    box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.08);
  }
`;

const SendOtpBtn = styled.button`
  padding: 12px 20px;
  background-color: #009688;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #00796b;
  }
`;

const SearchButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #009688;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: #00796b;
  }
`;

const DividerText = styled.p`
  font-size: 11px;
  color: #94a3b8;
  text-align: center;
  font-weight: 600;
`;

const RegisterNewBtn = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  color: #475569;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8fafc;
    border-color: #cbd5e1;
    color: #0f172a;
  }
`;

const SuccessAlert = styled.div`
  background-color: #e6f9f3;
  border: 1px solid #c2f0e3;
  color: #065f46;
  border-radius: 8px;
  padding: 12px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`;

// PATIENT PROFILE DETAILS STYLED COMPONENTS
const ProfileDetailsContainer = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: ${scaleUp} 0.35s cubic-bezier(0.16, 1, 0.3, 1);
`;

const VerifiedBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #e6f9f3;
  border: 1px solid #c2f0e3;
  color: #065f46;
  border-radius: 10px;
  padding: 14px 20px;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
`;

const PatientCard = styled.div`
  background-color: #ffffff;
  border: 1.5px solid #c2f0e3;
  border-radius: 14px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  box-shadow: 0 4px 15px rgba(0, 150, 136, 0.01);
  text-align: left;
`;

const PatientHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const UserAvatar = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background-color: #e6f9f3;
  color: #009688;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PatientMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  
  h4 {
    font-size: 18px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }
  
  span {
    font-size: 13px;
    color: #94a3b8;
    font-weight: 600;
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: #f1f5f9;
  width: 100%;
`;

const ConsultInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ConsultLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DoctorName = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #1e293b;
`;

const Specialty = styled.div`
  font-size: 12px;
  color: #64748b;
  font-weight: 600;
`;

const WarningBox = styled.div`
  background-color: #fffbeb;
  border: 1px solid #fef3c7;
  color: #b45309;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.5;
`;

const ActionCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 18px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  
  &:hover {
    border-color: #009688;
    box-shadow: 0 4px 12px rgba(0, 150, 136, 0.05);
  }
`;

const ActionText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  
  h4 {
    font-size: 14px;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
  }
  
  p {
    font-size: 12px;
    color: #64748b;
    font-weight: 500;
    margin: 0;
  }
`;

const RegistrationTypeStep = ({ 
  step, 
  subStep,
  consultationType, 
  setConsultationType, 
  isExistingPatient,
  setIsExistingPatient,
  searchMethod, 
  setSearchMethod, 
  caseNumber, 
  setCaseNumber, 
  mobileNumber, 
  setMobileNumber, 
  otpSent, 
  handleSendOtp, 
  otpCode, 
  setOtpCode, 
  handleSearchPatient, 
  onRegisterNew,
  isPatientVerified,
  setIsPatientVerified,
  personalDetails,
  lastConsulted
}) => {
  
  // RENDER DYNAMIC VERIFIED PROFILE DETAILS VIEW
  if (isPatientVerified) {
    const methodLabel = searchMethod === 'CaseNumber' ? 'Case Number' : 'OTP';
    const rawPhone = personalDetails.phone || '';
    const cleanPhone = rawPhone.replace(/\s+/g, '');
    const maskedPhone = cleanPhone.length > 4 
      ? `****${cleanPhone.slice(-4)}` 
      : '****1234';

    return (
      <ProfileDetailsContainer>
        <VerifiedBanner>
          <CheckCircle2 size={16} /> Patient identified via {methodLabel}
        </VerifiedBanner>
        
        <PatientCard>
          <PatientHeader>
            <UserAvatar>
              {personalDetails.profileImageUrl ? (
                <img src={personalDetails.profileImageUrl} alt="Patient Avatar" />
              ) : (
                <User size={24} />
              )}
            </UserAvatar>
            <PatientMeta>
              <h4>{personalDetails.fullName || 'Rajesh Kumar'}</h4>
              <span>{maskedPhone}</span>
            </PatientMeta>
          </PatientHeader>
          
          <Divider />
          
          <ConsultInfo>
            <ConsultLabel>Last Consulted</ConsultLabel>
            <DoctorName>{lastConsulted.doctorName || 'Dr. Anita Sharma'}</DoctorName>
            <Specialty>{lastConsulted.specialty || 'Cardiology'}</Specialty>
          </ConsultInfo>
          
          <WarningBox>
            No medical history, prescriptions or reports accessible from this terminal.
          </WarningBox>
        </PatientCard>
        
        <ActionCard onClick={() => setIsPatientVerified(false)}>
          <ActionText>
            <h4>Consult New Doctor</h4>
            <p>Search for a different specialist</p>
          </ActionText>
          <ArrowRight size={16} style={{ color: '#009688' }} />
        </ActionCard>
      </ProfileDetailsContainer>
    );
  }

  // Screen 1.1: Consultation Type Grid
  if (step === 1 && subStep === 1) {
    return (
      <div style={{ width: '100%' }}>
        <StepTitle>Select Consultation Type</StepTitle>
        <StepSubtitle>Choose how you want to consult with the doctor</StepSubtitle>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ConsultationGrid>
            <ConsultationCard 
              selected={consultationType === 'Physical'}
              onClick={() => setConsultationType('Physical')}
            >
              <IconWrapper color="#eff6ff" iconColor="#2563eb">
                <User size={24} />
              </IconWrapper>
              <div>
                <CardTitle>Physical Consultation</CardTitle>
                <CardDescription>
                  Visit hospital physically for in-person consultation with doctor at OPD.
                </CardDescription>
              </div>
            </ConsultationCard>
 
            <ConsultationCard 
              selected={consultationType === 'Online'}
              onClick={() => setConsultationType('Online')}
            >
              <IconWrapper color="#e6f9f3" iconColor="#009688">
                <Stethoscope size={24} />
              </IconWrapper>
              <div>
                <CardTitle>Online Consultation</CardTitle>
                <CardDescription>
                  Video consultation with doctor remotely from your home.
                </CardDescription>
              </div>
            </ConsultationCard>
          </ConsultationGrid>
        </div>
      </div>
    );
  }

  // Screen 1.2: Are you an existing patient? (The newly requested intermediate screen)
  if (step === 1 && subStep === 2) {
    return (
      <div style={{ width: '100%' }}>
        <StepTitle>Are you an existing patient?</StepTitle>
        <StepSubtitle>This helps us fetch your medical history and previous records</StepSubtitle>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ConsultationGrid>
            <ConsultationCard 
              selected={isExistingPatient === 'Existing'}
              onClick={() => setIsExistingPatient('Existing')}
            >
              <IconWrapper color="#eff6ff" iconColor="#2563eb">
                <Search size={22} />
              </IconWrapper>
              <div>
                <CardTitle>Existing Patient</CardTitle>
                <CardDescription>
                  I have visited this hospital before and have a case number.
                </CardDescription>
              </div>
            </ConsultationCard>

            <ConsultationCard 
              selected={isExistingPatient === 'New'}
              onClick={() => setIsExistingPatient('New')}
            >
              <IconWrapper color="#e6f9f3" iconColor="#009688">
                <Users size={22} />
              </IconWrapper>
              <div>
                <CardTitle>New Patient</CardTitle>
                <CardDescription>
                  This is my first time visiting this hospital.
                </CardDescription>
              </div>
            </ConsultationCard>
          </ConsultationGrid>
        </div>
      </div>
    );
  }

  // Screen 1.3 or Step 2: Patient Lookup Search forms
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <StepTitle>Search Existing Patient</StepTitle>
      <StepSubtitle>Find your previous records using one of the methods below</StepSubtitle>

      <TabContainer>
        <TabButton 
          active={searchMethod === 'CaseNumber'} 
          onClick={() => setSearchMethod('CaseNumber')}
        >
          <FileText size={14} />
          Case Number
        </TabButton>
        <TabButton 
          active={searchMethod === 'MobileOtp'} 
          onClick={() => setSearchMethod('MobileOtp')}
        >
          <Phone size={14} />
          Phone / Email OTP
        </TabButton>
      </TabContainer>

      {searchMethod === 'CaseNumber' ? (
        <SearchFormWrapper>
          <InputGroup>
            <Label>Case Number</Label>
            <Input 
              type="text" 
              placeholder="e.g., CASE-2026-00452" 
              value={caseNumber}
              onChange={e => setCaseNumber(e.target.value)}
            />
            <span style={{ fontSize: 11, color: '#64748b' }}>
              Enter your case number from previous visit (try "CASE-2026-00452")
            </span>
          </InputGroup>

          <SearchButton onClick={handleSearchPatient}>
            <Search size={14} /> Search Patient
          </SearchButton>

          <DividerText>Can't find your records?</DividerText>
          
          <RegisterNewBtn onClick={onRegisterNew}>
            Register as New Patient
          </RegisterNewBtn>
        </SearchFormWrapper>
      ) : (
        <SearchFormWrapper>
          {!otpSent ? (
            <>
              <InputGroup>
                <Label>Phone Number / Email ID</Label>
                <InputWithButton>
                  <Input 
                    type="text" 
                    placeholder="Enter mobile number or email ID" 
                    value={mobileNumber}
                    onChange={e => setMobileNumber(e.target.value)}
                  />
                  <SendOtpBtn onClick={handleSendOtp}>
                    Send OTP
                  </SendOtpBtn>
                </InputWithButton>
                <span style={{ fontSize: 11, color: '#64748b' }}>
                  OTP will be sent to your registered mobile number or email ID
                </span>
              </InputGroup>
            </>
          ) : (
            <>
              <InputGroup>
                <Label>OTP Verification Status</Label>
                <Input 
                  type="text" 
                  value={mobileNumber}
                  readOnly 
                  style={{ backgroundColor: '#f1f5f9' }}
                />
              </InputGroup>

              <SuccessAlert>
                <CheckCircle2 size={16} />
                <div>
                  <span>OTP sent successfully!</span>
                  <p style={{ fontSize: 10, margin: 0, opacity: 0.9 }}>
                    Please enter the 6-digit OTP sent to {mobileNumber}
                  </p>
                </div>
              </SuccessAlert>

              <InputGroup>
                <Label>Enter OTP</Label>
                <Input 
                  type="text" 
                  placeholder="Enter 6-digit OTP" 
                  value={otpCode}
                  onChange={e => setOtpCode(e.target.value)}
                />
                <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>
                  Hint: Use 123456 for demo
                </span>
              </InputGroup>

              <SearchButton onClick={handleSearchPatient}>
                <Search size={14} /> Verify & Search Patient
              </SearchButton>
            </>
          )}

          <DividerText>Can't find your records?</DividerText>
          
          <RegisterNewBtn onClick={onRegisterNew}>
            Register as New Patient
          </RegisterNewBtn>
        </SearchFormWrapper>
      )}
    </div>
  );
};

export default RegistrationTypeStep;
