import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowRight, Calendar } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import WizardCard from '../../components/WizardCard';
import WizardInput from '../../components/WizardInput';
import WizardSelect from '../../components/WizardSelect';
import SearchableSelect from '../../components/SearchableSelect';
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
  width: 140px; /* Wider to accommodate prefix and country name */
`;

const PhoneInputWrapper = styled.div`
  flex: 1;
`;

const Step3BasicDetails = ({ onNext, onPrev, data, updateData }) => {
  const dispatch = useDispatch();
  const { geoData } = useSelector((state) => state.geoData);

  const [fullName, setFullName] = useState(data.fullName || '');
  const [profileName, setProfileName] = useState(data.profileName || '');
  
  const [contactEmail, setContactEmail] = useState(data.contactEmail || '');
  const [alternateEmail, setAlternateEmail] = useState(data.alternateEmail || '');
  const [phonePrefix, setPhonePrefix] = useState(data.phonePrefix || '+91');
  const [contactPhone, setContactPhone] = useState(data.contactPhone || '');

  useEffect(() => {
    if (!geoData) {
      dispatch(getGeoDataRequest());
    }
  }, [dispatch, geoData]);

  // Set default prefix once geoData is loaded if not already selected
  useEffect(() => {
    if (geoData && Array.isArray(geoData) && !data.phonePrefix) {
      // Find India or +91
      const india = geoData.find(c => c.name === 'India');
      if (india) {
        const code = india.dialCode || india.phoneCode || india.phonePrefix || india.prefix || india.code || '+91';
        let strCode = String(code).trim();
        if (!strCode.startsWith('+')) strCode = '+' + strCode;
        setPhonePrefix(strCode);
      }
    }
  }, [geoData, data.phonePrefix]);

  const getPhoneLimit = () => {
    if (geoData && Array.isArray(geoData)) {
      const countryObj = geoData.find(c => {
        let code = c.dialCode || c.phoneCode || c.phonePrefix || c.prefix || c.code || '+91';
        let strCode = String(code).trim();
        if (!strCode.startsWith('+')) strCode = '+' + strCode;
        return strCode === phonePrefix;
      });
      if (countryObj && countryObj.digits) {
        return Number(countryObj.digits) || 10;
      }
    }
    return 10;
  };

  const handleContinue = (e) => {
    e.preventDefault();

    if (!fullName || !profileName || !contactEmail || !contactPhone) {
      alert('Please fill in all required fields.');
      return;
    }

    const phoneLimit = getPhoneLimit();
    if (contactPhone.length !== phoneLimit) {
      alert(`Phone number must be exactly ${phoneLimit} digits.`);
      return;
    }

    updateData({
      fullName, profileName,
      contactEmail, alternateEmail, phonePrefix, contactPhone
    });
    onNext();
  };

  // Derive prefix options dynamically from geoData
  let prefixOptions = [];

  if (geoData && Array.isArray(geoData)) {
    const rawOptions = geoData.map((c) => {
      let code = c.dialCode || c.phoneCode || c.phonePrefix || c.prefix || c.code || '+91';
      let strCode = String(code).trim();
      if (!strCode.startsWith('+')) {
        strCode = '+' + strCode;
      }
      return { value: strCode, label: strCode };
    });

    // Deduplicate options by prefix value
    const seen = new Set();
    prefixOptions = rawOptions.filter(opt => {
      const isDuplicate = seen.has(opt.value);
      seen.add(opt.value);
      return !isDuplicate;
    });

    // Make sure +91 is always an option
    if (!seen.has('+91')) {
      prefixOptions.unshift({ value: '+91', label: '+91' });
    }
  } else {
    prefixOptions = [{ value: '+91', label: '+91' }];
  }

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
              <SearchableSelect 
                value={phonePrefix} 
                onChange={e => setPhonePrefix(e.target.value)} 
                options={prefixOptions}
              />
            </PrefixWrapper>
            <PhoneInputWrapper>
              <WizardInput 
                placeholder="9876543210" 
                value={contactPhone}
                maxLength={getPhoneLimit()}
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
