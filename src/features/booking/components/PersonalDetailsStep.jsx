import React from 'react';
import styled, { keyframes } from 'styled-components';

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

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  width: 100%;
  max-width: 900px;
  animation: ${scaleUp} 0.3s ease-out;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormFields = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  .full-width {
    grid-column: span 2;
  }
`;

const HelperPanel = styled.div`
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  height: fit-content;
  align-self: center;
`;

const AutoGenerateHeader = styled.div`
  font-size: 11px;
  color: #94a3b8;
  font-weight: 700;
  text-transform: uppercase;
`;

const AutoFieldBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  span:first-child {
    font-size: 12px;
    font-weight: 600;
    color: #64748b;
  }
  span:last-child {
    font-size: 15px;
    font-weight: 700;
    color: #2563eb;
  }
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

const Input = styled.input`
  width: 100%;
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

const CheckboxGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 4px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
`;

const RadioInput = styled.input`
  cursor: pointer;
  accent-color: #009688;
`;

const PersonalDetailsStep = ({ personalDetails, setPersonalDetails, patientId, fileNo }) => {
  const handleChange = (field, val) => {
    setPersonalDetails(prev => ({
      ...prev,
      [field]: val
    }));
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <StepTitle>Personal Details</StepTitle>
      <StepSubtitle>Fill in the basic demographic details of the patient</StepSubtitle>

      <FormGrid>
        <FormFields>
          <InputGroup className="full-width">
            <Label>Full Name <span style={{ color: '#ef4444' }}>*</span></Label>
            <Input 
              type="text" 
              placeholder="Enter patient's full name" 
              value={personalDetails.fullName}
              onChange={e => handleChange('fullName', e.target.value)}
            />
          </InputGroup>

          <InputGroup>
            <Label>Gender</Label>
            <select 
              style={{ padding: 12, borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13, outline: 'none', fontWeight: 600, backgroundColor: '#ffffff', color: '#1e293b' }}
              value={personalDetails.gender}
              onChange={e => handleChange('gender', e.target.value)}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </InputGroup>

          <InputGroup>
            <Label>Age</Label>
            <Input 
              type="number" 
              placeholder="e.g. 28" 
              value={personalDetails.age}
              onChange={e => handleChange('age', e.target.value)}
            />
          </InputGroup>

          <InputGroup className="full-width">
            <Label>Address</Label>
            <Input 
              type="text" 
              placeholder="Enter street, city, state address" 
              value={personalDetails.address}
              onChange={e => handleChange('address', e.target.value)}
            />
          </InputGroup>

          <InputGroup>
            <Label>Phone Number <span style={{ color: '#ef4444' }}>*</span></Label>
            <Input 
              type="tel" 
              placeholder="10-digit mobile number" 
              value={personalDetails.phone}
              onChange={e => handleChange('phone', e.target.value)}
            />
          </InputGroup>

          <InputGroup>
            <Label>Email ID</Label>
            <Input 
              type="email" 
              placeholder="e.g., example@gmail.com" 
              value={personalDetails.email}
              onChange={e => handleChange('email', e.target.value)}
            />
          </InputGroup>

          <InputGroup className="full-width">
            <Label>Register with OTP</Label>
            <CheckboxGroup>
              <CheckboxLabel>
                <RadioInput 
                  type="radio" 
                  name="regOtp" 
                  checked={personalDetails.registerWithOtp === 'Yes'}
                  onChange={() => handleChange('registerWithOtp', 'Yes')}
                />
                Yes
              </CheckboxLabel>
              <CheckboxLabel>
                <RadioInput 
                  type="radio" 
                  name="regOtp" 
                  checked={personalDetails.registerWithOtp === 'No'}
                  onChange={() => handleChange('registerWithOtp', 'No')}
                />
                No
              </CheckboxLabel>
            </CheckboxGroup>
          </InputGroup>
        </FormFields>

        <HelperPanel>
          <AutoGenerateHeader>Auto-generated on save:</AutoGenerateHeader>
          <AutoFieldBox>
            <span>Patient ID</span>
            <span>{patientId}</span>
          </AutoFieldBox>
          <AutoFieldBox>
            <span>File No</span>
            <span>{fileNo}</span>
          </AutoFieldBox>
        </HelperPanel>
      </FormGrid>
    </div>
  );
};

export default PersonalDetailsStep;
