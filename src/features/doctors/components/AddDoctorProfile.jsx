import React from 'react';
import styled from 'styled-components';
import { Camera, Plus } from 'lucide-react';

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
`;

const FormTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 700;
  color: #1e293b;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  font-size: 13.5px;
  outline: none;
  font-weight: 600;
  background-color: #ffffff;
  color: #1e293b;
  box-sizing: border-box;
  transition: all 0.2s ease;

  &:focus {
    border-color: #009688;
    box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.08);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  font-size: 13.5px;
  outline: none;
  font-weight: 600;
  background-color: #ffffff;
  color: #1e293b;
  cursor: pointer;
  box-sizing: border-box;

  &:focus {
    border-color: #009688;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const AvatarUploaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
`;

const BigAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #f1f5f9;
  border: 1px dashed #cbd5e1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CameraBadge = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #009688;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GenderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  width: 100%;
`;

const GenderTab = styled.button`
  padding: 12px;
  border-radius: 10px;
  border: 1px solid ${props => props.active ? '#009688' : '#e2e8f0'};
  background-color: ${props => props.active ? '#e6f9f3' : '#ffffff'};
  color: ${props => props.active ? '#009688' : '#475569'};
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: #009688;
    color: #009688;
  }
`;

const ContinueBtn = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #009688;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  margin-top: 10px;

  &:hover {
    background-color: #00796b;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 150, 136, 0.15);
  }
`;

const AddDoctorProfile = ({
  title, setTitle,
  firstName, setFirstName,
  lastName, setLastName,
  profileName, setProfileName,
  gender, setGender,
  dob, setDob,
  altEmail, setAltEmail,
  country, setCountry,
  state, setState,
  city, setCity,
  geoData,
  onContinue
}) => {
  const handleNext = () => {
    if (!firstName || !profileName || !dob || !country || !state || !city || !altEmail) {
      alert("Please fill in all required profile details (including Country, State, and City)!");
      return;
    }
    onContinue();
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
        cityOptions = selectedState.cities.map((ct) => ({ value: ct.name, label: ct.name }));
      }
    }
  }

  return (
    <FormSection>
      <AvatarUploaderWrapper>
        <BigAvatar onClick={() => alert('Profile photo selector stimulated!')}>
          <Camera size={28} color="#94a3b8" />
          <CameraBadge><Plus size={12} /></CameraBadge>
        </BigAvatar>
        <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>Add photo (optional)</span>
      </AvatarUploaderWrapper>

      <FormTitle>Complete Your Profile</FormTitle>

      <Row>
        <InputGroup style={{ flex: '0 0 100px' }}>
          <Label>Title</Label>
          <Select value={title} onChange={e => setTitle(e.target.value)}>
            <option>Dr.</option>
            <option>Mr.</option>
            <option>Mrs.</option>
          </Select>
        </InputGroup>

        <InputGroup>
          <Label>First Name*</Label>
          <Input 
            type="text" 
            placeholder="First Name" 
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <Label>Last Name</Label>
          <Input 
            type="text" 
            placeholder="Last Name" 
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </InputGroup>
      </Row>

      <InputGroup>
        <Label>Profile name</Label>
        <Input 
          type="text" 
          placeholder="Profile name" 
          value={profileName}
          onChange={e => setProfileName(e.target.value)}
        />
      </InputGroup>

      <InputGroup>
        <Label>Gender*</Label>
        <GenderGrid>
          {['Male', 'Female', 'Other'].map(g => (
            <GenderTab 
              key={g} 
              type="button"
              active={gender === g}
              onClick={() => setGender(g)}
            >
              {g}
            </GenderTab>
          ))}
        </GenderGrid>
      </InputGroup>

      <Row>
        <InputGroup>
          <Label>Date of birth*</Label>
          <Input 
            type="date" 
            value={dob}
            onChange={e => setDob(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <Label>Alternative email*</Label>
          <Input 
            type="email" 
            placeholder="Alternative email" 
            value={altEmail}
            onChange={e => setAltEmail(e.target.value)}
          />
        </InputGroup>
      </Row>

      <Row>
        <InputGroup>
          <Label>Country*</Label>
          <Select value={country} onChange={e => {
            setCountry(e.target.value);
            setState('');
            setCity('');
          }}>
            {countryOptions.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </Select>
        </InputGroup>

        <InputGroup>
          <Label>State*</Label>
          <Select value={state} onChange={e => {
            setState(e.target.value);
            setCity('');
          }}>
            <option value="">Select State</option>
            {stateOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </Select>
        </InputGroup>

        <InputGroup>
          <Label>City*</Label>
          <Select value={city} onChange={e => setCity(e.target.value)}>
            <option value="">Select City</option>
            {cityOptions.map(ct => <option key={ct.value} value={ct.value}>{ct.label}</option>)}
          </Select>
        </InputGroup>
      </Row>

      <ContinueBtn onClick={handleNext}>
        Continue
      </ContinueBtn>
    </FormSection>
  );
};

export default AddDoctorProfile;
