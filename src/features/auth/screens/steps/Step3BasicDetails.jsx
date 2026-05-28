import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowRight, Calendar } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import WizardCard from '../../components/WizardCard';
import WizardInput from '../../components/WizardInput';
import WizardSelect from '../../components/WizardSelect';
import WizardButton, { ButtonWrapper } from '../../components/WizardButton';

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const CountryPhoneRow = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`;

const PrefixWrapper = styled.div`
  width: 90px;
`;

const PhoneInputWrapper = styled.div`
  flex: 1;
`;

const Step3BasicDetails = ({ onNext, onPrev, data, updateData }) => {
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState(data.fullName || '');
  const [profileName, setProfileName] = useState(data.profileName || '');
  const [dob, setDob] = useState(data.dob || '');
  
  const [contactEmail, setContactEmail] = useState(data.contactEmail || '');
  const [alternateEmail, setAlternateEmail] = useState(data.alternateEmail || '');
  const [phonePrefix, setPhonePrefix] = useState(data.phonePrefix || '+91');
  const [contactPhone, setContactPhone] = useState(data.contactPhone || '');

  const handleContinue = (e) => {
    e.preventDefault();

    updateData({
      fullName, profileName, dob,
      contactEmail, alternateEmail, phonePrefix, contactPhone
    });
    onNext();
  };

  return (
    <form onSubmit={handleContinue}>
      {/* Card 1: Personal Details */}
      <WizardCard title="Admin User Personal Details" subtitle="Primary admin account information">
        <FormRow>
          <WizardInput 
            label="Full Name" 
            placeholder="Enter your full name" 
            value={fullName}
            onChange={e => setFullName(e.target.value)}
          />
          <WizardInput 
            label="Profile Name" 
            placeholder="Display name on platform" 
            value={profileName}
            onChange={e => setProfileName(e.target.value)}
          />
        </FormRow>
        <FormRow>
          <WizardInput 
            label="Date of Birth" 
            type="date" 
            value={dob}
            onChange={e => setDob(e.target.value)}
            icon={<Calendar size={18} />}
          />
        </FormRow>
      </WizardCard>

      {/* Card 2: Contact Information */}
      <WizardCard title="Admin User Contact Information" subtitle="Used for verification and account recovery">
        <FormRow>
          <WizardInput 
            label="Email" 
            type="email" 
            placeholder="you@company.com" 
            value={contactEmail}
            onChange={e => setContactEmail(e.target.value)}
          />
          <WizardInput 
            label="Alternate Email" 
            type="email" 
            placeholder="backup@company.com" 
            value={alternateEmail}
            onChange={e => setAlternateEmail(e.target.value)}
          />
        </FormRow>
        
        <div>
          <label style={{ fontSize: '13px', fontWeight: 600, color: '#334155', marginBottom: '6px', display: 'block' }}>
            Phone Number
          </label>
          <CountryPhoneRow>
            <PrefixWrapper>
              <WizardSelect 
                value={phonePrefix} 
                onChange={e => setPhonePrefix(e.target.value)} 
                options={[
                  { value: '+91', label: '+91' },
                  { value: '+1', label: '+1' },
                  { value: '+44', label: '+44' }
                ]}
              />
            </PrefixWrapper>
            <PhoneInputWrapper>
              <WizardInput 
                placeholder="XXXXX XXXXX" 
                value={contactPhone}
                maxLength={10}
                onChange={e => setContactPhone(e.target.value.replace(/\D/g, ''))}
              />
            </PhoneInputWrapper>
          </CountryPhoneRow>
        </div>
      </WizardCard>

      <ButtonWrapper>
        <WizardButton variant="secondary" onClick={onPrev}>
          Previous
        </WizardButton>
        <WizardButton type="submit">
          Continue <ArrowRight size={16} />
        </WizardButton>
      </ButtonWrapper>
    </form>
  );
};

export default Step3BasicDetails;
