import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled, { keyframes, css } from 'styled-components';
import { Heart, Activity, ShieldAlert, Award, FileText, ChevronRight, ChevronLeft, MapPin, Phone, Building, Briefcase, Mail, User } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';

// --- KEYFRAMES ---
const slideIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ripple = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
  100% { box-shadow: 0 0 0 12px rgba(16, 185, 129, 0); }
`;

// --- STYLED COMPONENTS ---
const ScreenContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #070a13;
  padding: 40px 24px;
  position: relative;
  overflow-y: auto;
  color: #f8fafc;
`;

const FormLayout = styled.div`
  display: grid;
  grid-template-columns: ${props => props.showPreview ? '1.2fr 1fr' : '1fr'};
  gap: 36px;
  width: 100%;
  max-width: ${props => props.showPreview ? '1000px' : '640px'};
  z-index: 10;
  animation: ${slideIn} 0.5s ease-out;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const FormCard = styled.div`
  background: linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(9, 13, 22, 0.95) 100%);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
  border-radius: 24px;
  padding: 40px;
  backdrop-filter: blur(16px);
`;

const StepHeader = styled.div`
  margin-bottom: 30px;
  text-align: left;

  span {
    font-size: 11px;
    font-weight: 700;
    color: #10b981;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  h3 {
    font-size: 22px;
    font-weight: 700;
    color: #ffffff;
    margin-top: 6px;
  }

  p {
    font-size: 13px;
    color: #64748b;
    margin-top: 4px;
  }
`;

const ProgressTrack = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
`;

const ProgressStep = styled.div`
  flex: 1;
  height: 4px;
  background-color: ${props => props.active ? '#10b981' : props.completed ? 'rgba(16, 185, 129, 0.4)' : 'rgba(255, 255, 255, 0.06)'};
  border-radius: 2px;
  transition: all 0.3s ease;
`;

/* --- PARTNER TYPE CARDS --- */
const PartnerGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-bottom: 28px;
`;

const PartnerCard = styled.div`
  background: rgba(30, 41, 59, 0.3);
  border: 2px solid ${props => props.selected ? '#10b981' : 'rgba(255, 255, 255, 0.04)'};
  border-radius: 16px;
  padding: 20px 24px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  opacity: ${props => props.disabled ? 0.6 : 1};

  &:hover {
    ${props => !props.disabled && css`
      border-color: ${props => props.selected ? '#10b981' : 'rgba(255, 255, 255, 0.12)'};
      background: rgba(30, 41, 59, 0.5);
      transform: translateY(-2px);
    `}
  }
`;

const PartnerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const PartnerIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${props => props.selected ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.04)'};
  color: ${props => props.selected ? '#10b981' : '#64748b'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
`;

const PartnerText = styled.div`
  text-align: left;
  h4 {
    font-size: 15px;
    font-weight: 700;
    color: #ffffff;
  }
  p {
    font-size: 12px;
    color: #64748b;
    margin-top: 2px;
  }
`;

const StatusBadge = styled.span`
  font-size: 10px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 12px;
  background-color: ${props => props.type === 'primary' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 255, 255, 0.05)'};
  color: ${props => props.type === 'primary' ? '#10b981' : '#94a3b8'};
  border: 1px solid ${props => props.type === 'primary' ? 'rgba(16, 185, 129, 0.2)' : 'transparent'};
`;

/* --- LIVE INTERACTIVE BADGE PREVIEW --- */
const PreviewColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 900px) {
    display: none;
  }
`;

const ClinicBadgeCard = styled.div`
  width: 100%;
  max-width: 360px;
  background: linear-gradient(135deg, #111827 0%, #060b13 100%);
  border: 2px solid rgba(16, 185, 129, 0.2);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: linear-gradient(90deg, #10b981 0%, #0ea5e9 100%);
  }
`;

const BadgeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
`;

const BadgeChip = styled.div`
  width: 44px;
  height: 32px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  position: absolute;
  top: 30px;
  left: 30px;
`;

const BadgeAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(14, 165, 233, 0.2) 100%);
  border: 3px solid rgba(16, 185, 129, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 700;
  color: #10b981;
  margin-bottom: 16px;
  margin-top: 10px;
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.15);
  animation: ${ripple} 2s infinite;
`;

const BadgeName = styled.h4`
  font-family: 'Outfit', sans-serif;
  font-size: 18px;
  color: #ffffff;
  font-weight: 700;
`;

const BadgeTitle = styled.span`
  font-size: 11px;
  color: #10b981;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-top: 4px;
`;

const BadgeDivider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
  margin: 20px 0;
`;

const BadgeDetailGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  text-align: left;
`;

const BadgeDetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: #94a3b8;

  svg {
    color: #64748b;
  }
  span.value {
    color: #ffffff;
    font-weight: 600;
  }
`;

const AvatarPicker = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 18px;
  justify-content: flex-start;
  align-items: center;
`;

const AvatarOption = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: ${props => props.bg || '#1e293b'};
  border: 2px solid ${props => props.selected ? '#10b981' : 'rgba(255,255,255,0.1)'};
  color: #ffffff;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.08);
  }
`;

const SignUpScreen = ({ onNavigateToLogin }) => {
  const dispatch = useDispatch();
  const [partnerType, setPartnerType] = useState('Clinic'); // Clinic, Hospital, OT
  const [step, setStep] = useState(0); // 0 = Select Partner, 1 = Clinic Details, 2 = Admin Details

  // Onboarding Form States
  const [clinicName, setClinicName] = useState('');
  const [specialty, setSpecialty] = useState('Multi-Specialty');
  const [phone, setPhone] = useState('');
  const [license, setLicense] = useState('');
  const [address, setAddress] = useState('');

  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminTitle, setAdminTitle] = useState('Chief Medical Director');
  const [avatarInitials, setAvatarInitials] = useState('AV');

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleNextStep = (e) => {
    e.preventDefault();
    setErrors({});

    if (step === 0) {
      if (partnerType !== 'Clinic') {
        alert("Hospital and OT partners are undergoing beta setup. Please select Clinic to continue onboarding.");
        return;
      }
      setStep(1);
      return;
    }

    if (step === 1) {
      const newErrors = {};
      if (!clinicName.trim()) newErrors.clinicName = 'Clinic Name is required';
      if (!phone.trim() || phone.trim().length < 10) newErrors.phone = 'Valid 10-digit Phone is required';
      if (!license.trim()) newErrors.license = 'Registration/License is required';
      if (!address.trim()) newErrors.address = 'Address is required';

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      const newErrors = {};
      if (!adminName.trim()) newErrors.adminName = 'Administrator Name is required';
      if (!adminEmail.trim() || !adminEmail.includes('@')) newErrors.adminEmail = 'Valid email address is required';

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      // Submit onboarding!
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        dispatch({
          type: 'ONBOARD_SUCCESS',
          payload: {
            user: {
              name: adminName,
              email: adminEmail,
              phone: phone,
              role: 'Admin',
              designation: adminTitle,
              avatar: avatarInitials
            },
            clinic: {
              name: clinicName,
              specialties: ["All Specialties"],
              address: address,
              license: license
            }
          }
        });
      }, 1500);
    }
  };

  const handlePrevStep = () => {
    setErrors({});
    setStep(s => s - 1);
  };

  const handleAvatarSelect = (initials) => {
    setAvatarInitials(initials);
  };

  const showPreview = step > 0;

  return (
    <ScreenContainer>
      <FormLayout showPreview={showPreview}>
        <FormCard>
          <ProgressTrack>
            <ProgressStep active={step === 0} completed={step > 0} />
            <ProgressStep active={step === 1} completed={step > 1} />
            <ProgressStep active={step === 2} completed={step > 2} />
          </ProgressTrack>

          {step === 0 && (
            <div>
              <StepHeader>
                <span>Partner Program</span>
                <h3>Select Partner Type</h3>
                <p>Welcome to Swastyam. Choose your operation type to begin onboarding.</p>
              </StepHeader>

              <PartnerGrid>
                <PartnerCard
                  selected={partnerType === 'Clinic'}
                  onClick={() => setPartnerType('Clinic')}
                >
                  <PartnerInfo selected={partnerType === 'Clinic'}>
                    <PartnerIcon selected={partnerType === 'Clinic'}>
                      <Activity size={20} />
                    </PartnerIcon>
                    <PartnerText>
                      <h4>Single/Multi-Specialty Clinic</h4>
                      <p>For outpatient consultations, diagnostics & polyclinics.</p>
                    </PartnerText>
                  </PartnerInfo>
                  <StatusBadge type="primary">Focus Route</StatusBadge>
                </PartnerCard>

                <PartnerCard
                  disabled={true}
                  selected={partnerType === 'Hospital'}
                  onClick={() => setPartnerType('Hospital')}
                >
                  <PartnerInfo selected={partnerType === 'Hospital'}>
                    <PartnerIcon selected={partnerType === 'Hospital'}>
                      <Building size={20} />
                    </PartnerIcon>
                    <PartnerText>
                      <h4>Multi-Specialty Hospital</h4>
                      <p>Inpatient wards, complex workflows, multiple branches.</p>
                    </PartnerText>
                  </PartnerInfo>
                  <StatusBadge>Coming Soon</StatusBadge>
                </PartnerCard>

                <PartnerCard
                  disabled={true}
                  selected={partnerType === 'OT'}
                  onClick={() => setPartnerType('OT')}
                >
                  <PartnerInfo selected={partnerType === 'OT'}>
                    <PartnerIcon selected={partnerType === 'OT'}>
                      <Award size={20} />
                    </PartnerIcon>
                    <PartnerText>
                      <h4>Stand-alone Operation Theatre (OT)</h4>
                      <p>Surgical spaces, biosensor telemetry sync, recovery blocks.</p>
                    </PartnerText>
                  </PartnerInfo>
                  <StatusBadge>Beta Requests</StatusBadge>
                </PartnerCard>
              </PartnerGrid>

              <Button primary={true} fullWidth={true} onClick={handleNextStep}>
                Proceed to Details <ChevronRight size={16} />
              </Button>
            </div>
          )}

          {step === 1 && (
            <form onSubmit={handleNextStep}>
              <StepHeader>
                <span>Step 1 of 2</span>
                <h3>Clinic Onboarding Registry</h3>
                <p>Provide registry identifiers for your medical clinic facility.</p>
              </StepHeader>

              <Input
                label="Clinic Legal Name"
                placeholder="Enter clinic name (e.g. Apollo Diagnostics)"
                value={clinicName}
                onChange={(e) => setClinicName(e.target.value)}
                icon={Building}
                error={errors.clinicName}
              />

              <Input
                label="Facility Contact Number"
                placeholder="Clinic phone number"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                icon={Phone}
                error={errors.phone}
                maxLength={10}
              />

              <Input
                label="License / Registry License Code"
                placeholder="e.g. SW-MFE-99219"
                value={license}
                onChange={(e) => setLicense(e.target.value)}
                icon={FileText}
                error={errors.license}
              />

              <Input
                label="Physical Address"
                placeholder="Suite, Block, Street Name"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                icon={MapPin}
                error={errors.address}
              />

              <div style={{ display: 'flex', gap: '14px', marginTop: '24px' }}>
                <Button secondary={true} onClick={handlePrevStep} type="button">
                  <ChevronLeft size={16} /> Back
                </Button>
                <Button primary={true} style={{ flex: 1 }} type="submit">
                  Continue Admin Profile <ChevronRight size={16} />
                </Button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNextStep}>
              <StepHeader>
                <span>Step 2 of 2</span>
                <h3>Administrator Credentials</h3>
                <p>Register the clinic lead credentials to manage staff and settings.</p>
              </StepHeader>

              <Input
                label="Administrator Full Name"
                placeholder="Full professional name"
                value={adminName}
                onChange={(e) => {
                  setAdminName(e.target.value);
                  // Auto compute initials
                  const words = e.target.value.trim().split(' ');
                  if (words.length > 0 && words[0]) {
                    const ini = (words[0][0] + (words[1] ? words[1][0] : '')).toUpperCase();
                    setAvatarInitials(ini || 'AD');
                  }
                }}
                icon={User}
                error={errors.adminName}
              />

              <Input
                label="Admin Designatory Title"
                options={[
                  { value: 'Chief Medical Director', label: 'Chief Medical Director' },
                  { value: 'Clinic Manager', label: 'Clinic Manager' },
                  { value: 'Administrative Officer', label: 'Administrative Officer' },
                  { value: 'Chief Executive Officer', label: 'Chief Executive Officer' }
                ]}
                value={adminTitle}
                onChange={(e) => setAdminTitle(e.target.value)}
                icon={Briefcase}
              />

              <Input
                label="Personal Work Email"
                placeholder="e.g. lead@swastyam.com"
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                icon={Mail}
                error={errors.adminEmail}
              />

              <LabelWrapper style={{ marginBottom: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8' }}>Badge Design Colors</label>
              </LabelWrapper>
              <AvatarPicker>
                <AvatarOption
                  selected={avatarInitials === 'AV'}
                  onClick={() => handleAvatarSelect('AV')}
                  type="button"
                  bg="linear-gradient(135deg, #10b981 0%, #06b6d4 100%)"
                >AV</AvatarOption>
                <AvatarOption
                  selected={avatarInitials === 'DR'}
                  onClick={() => handleAvatarSelect('DR')}
                  type="button"
                  bg="linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)"
                >DR</AvatarOption>
                <AvatarOption
                  selected={avatarInitials === 'CL'}
                  onClick={() => handleAvatarSelect('CL')}
                  type="button"
                  bg="linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)"
                >CL</AvatarOption>
              </AvatarPicker>

              <div style={{ display: 'flex', gap: '14px', marginTop: '24px' }}>
                <Button secondary={true} onClick={handlePrevStep} type="button">
                  <ChevronLeft size={16} /> Back
                </Button>
                <Button primary={true} style={{ flex: 1 }} loading={loading} type="submit">
                  Complete Registration & Build Dashboard
                </Button>
              </div>
            </form>
          )}

          <div style={{ textAlign: 'center', marginTop: '24px', color: '#64748b', fontSize: '13px' }}>
            Already registered clinic?{' '}
            <button
              onClick={onNavigateToLogin}
              style={{ background: 'none', border: 'none', color: '#10b981', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Sign In Here
            </button>
          </div>
        </FormCard>

        {showPreview && (
          <PreviewColumn>
            <div style={{ marginBottom: 15, textTransform: 'uppercase', fontSize: 11, fontWeight: 800, color: '#64748b', letterSpacing: '0.15em' }}>
              Live Credential Badge
            </div>
            <ClinicBadgeCard>
              <BadgeChip />
              <BadgeAvatar>{avatarInitials}</BadgeAvatar>
              <BadgeName>{adminName || 'Dr. Practitioner Name'}</BadgeName>
              <BadgeTitle>{adminTitle}</BadgeTitle>
              <BadgeDivider />
              <BadgeDetailGrid>
                <BadgeDetailItem>
                  <Building size={14} />
                  <span>Clinic:</span>
                  <span className="value">{clinicName || 'Digital Medical Facility'}</span>
                </BadgeDetailItem>
                <BadgeDetailItem>
                  <Activity size={14} />
                  <span>Specialty:</span>
                  <span className="value">All Specialties Available</span>
                </BadgeDetailItem>
                <BadgeDetailItem>
                  <FileText size={14} />
                  <span>License No:</span>
                  <span className="value">{license || 'SW-PENDING-REG'}</span>
                </BadgeDetailItem>
                <BadgeDetailItem>
                  <MapPin size={14} />
                  <span>Locality:</span>
                  <span className="value" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '170px' }}>
                    {address || 'Waiting for coordinates'}
                  </span>
                </BadgeDetailItem>
              </BadgeDetailGrid>
            </ClinicBadgeCard>
          </PreviewColumn>
        )}
      </FormLayout>
    </ScreenContainer>
  );
};

const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default SignUpScreen;
