import React, { useState } from 'react';
import styled from 'styled-components';
import { ArrowRight } from 'lucide-react';
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

const LocationGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1.2fr 1.6fr;
  gap: 16px;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Step3BasicDetails = ({ onNext, onPrev, data, updateData }) => {
  const [fullName, setFullName] = useState(data.fullName || '');
  const [profileName, setProfileName] = useState(data.profileName || '');
  const [dob, setDob] = useState(data.dob || '');
  const [companyName, setCompanyName] = useState(data.companyName || '');
  
  const [contactEmail, setContactEmail] = useState(data.contactEmail || '');
  const [alternateEmail, setAlternateEmail] = useState(data.alternateEmail || '');
  const [phonePrefix, setPhonePrefix] = useState(data.phonePrefix || '+91');
  const [contactPhone, setContactPhone] = useState(data.contactPhone || '');
  
  const [country, setCountry] = useState(data.country || 'India');
  const [state, setState] = useState(data.state || 'Maharashtra');
  const [city, setCity] = useState(data.city || '');

  const handleContinue = (e) => {
    e.preventDefault();
    if (!fullName || !profileName || !dob || !companyName || !contactEmail || !contactPhone || !city) {
      return alert('Please fill in all required fields.');
    }

    updateData({
      fullName, profileName, dob, companyName,
      contactEmail, alternateEmail, phonePrefix, contactPhone,
      country, state, city
    });
    onNext();
  };

  return (
    <form onSubmit={handleContinue}>
      {/* Card 1: Personal Details */}
      <WizardCard title="Personal Details" subtitle="Primary account holder information">
        <FormRow>
          <WizardInput 
            label="Full Name" 
            required 
            placeholder="Enter your full name" 
            value={fullName}
            onChange={e => setFullName(e.target.value)}
          />
          <WizardInput 
            label="Profile Name" 
            required 
            placeholder="Display name on platform" 
            helper="This will be visible to patients"
            value={profileName}
            onChange={e => setProfileName(e.target.value)}
          />
        </FormRow>
        <FormRow>
          <WizardInput 
            label="Date of Birth" 
            required 
            type="date" 
            value={dob}
            onChange={e => setDob(e.target.value)}
          />
          <WizardInput 
            label="Company Name" 
            required 
            placeholder="Registered company name" 
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
          />
        </FormRow>
      </WizardCard>

      {/* Card 2: Contact Information */}
      <WizardCard title="Contact Information" subtitle="Used for verification and account recovery">
        <FormRow>
          <WizardInput 
            label="Email" 
            required 
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
            Phone Number <span style={{ color: '#ef4444' }}>*</span>
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

      {/* Card 3: Location */}
      <WizardCard title="Location" subtitle="Primary operating location">
        <LocationGrid>
          <WizardSelect 
            label="Country" 
            required 
            value={country} 
            onChange={e => setCountry(e.target.value)}
            options={[
              { value: 'India', label: 'India' },
              { value: 'USA', label: 'USA' },
              { value: 'UK', label: 'UK' }
            ]}
          />
          <WizardSelect 
            label="State" 
            required 
            value={state} 
            onChange={e => setState(e.target.value)}
            options={[
              { value: 'Maharashtra', label: 'Maharashtra' },
              { value: 'Delhi', label: 'Delhi' },
              { value: 'Karnataka', label: 'Karnataka' },
              { value: 'California', label: 'California' }
            ]}
          />
          <WizardInput 
            label="City" 
            required 
            placeholder="Enter city" 
            value={city}
            onChange={e => setCity(e.target.value)}
          />
        </LocationGrid>
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
