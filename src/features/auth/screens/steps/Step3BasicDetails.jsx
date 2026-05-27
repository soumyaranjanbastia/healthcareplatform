import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import WizardCard from '../../components/WizardCard';
import WizardInput from '../../components/WizardInput';
import WizardSelect from '../../components/WizardSelect';
import WizardButton, { ButtonWrapper } from '../../components/WizardButton';
import { getGeoDataRequest } from '../../redux/geoDataSlice';

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
  const dispatch = useDispatch();
  const { geoData } = useSelector((state) => state.geoData);

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

  useEffect(() => {
    if (!geoData) {
      dispatch(getGeoDataRequest());
    }
  }, [dispatch, geoData]);

  const handleContinue = (e) => {
    e.preventDefault();

    updateData({
      fullName, profileName, dob, companyName,
      contactEmail, alternateEmail, phonePrefix, contactPhone,
      country, state, city
    });
    onNext();
  };

  // Derive dropdown options from geoData
  let countryOptions = [{ value: 'India', label: 'India' }];
  let stateOptions = [{ value: 'Maharashtra', label: 'Maharashtra' }];
  let cityOptions = [{ value: '', label: 'Select City' }];

  if (geoData && Array.isArray(geoData)) {
    countryOptions = geoData.map((c) => ({ value: c.name, label: c.name }));

    const selectedCountry = geoData.find((c) => c.name === country);
    if (selectedCountry && selectedCountry.states) {
      stateOptions = selectedCountry.states.map((s) => ({ value: s.name, label: s.name }));

      const selectedState = selectedCountry.states.find((s) => s.name === state);
      if (selectedState && selectedState.cities) {
        cityOptions = [
          { value: '', label: 'Select City' },
          ...selectedState.cities.map((ct) => ({ value: ct.name, label: ct.name }))
        ];
      }
    }
  }

  return (
    <form onSubmit={handleContinue}>
      {/* Card 1: Personal Details */}
      <WizardCard title="Personal Details" subtitle="Primary account holder information">
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
            helper="This will be visible to patients"
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
          />
          <WizardInput 
            label="Company Name" 
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

      {/* Card 3: Location */}
      <WizardCard title="Location" subtitle="Primary operating location">
        <LocationGrid>
          <WizardSelect 
            label="Country" 
            value={country} 
            onChange={e => {
              setCountry(e.target.value);
              setState(''); // Reset state when country changes
              setCity(''); // Reset city when country changes
            }}
            options={countryOptions}
          />
          <WizardSelect 
            label="State" 
            value={state} 
            onChange={e => {
              setState(e.target.value);
              setCity(''); // Reset city when state changes
            }}
            options={stateOptions}
          />
          <WizardSelect 
            label="City" 
            value={city} 
            onChange={e => setCity(e.target.value)}
            options={cityOptions}
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
