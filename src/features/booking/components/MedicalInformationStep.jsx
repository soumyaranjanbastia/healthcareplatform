import React from 'react';
import styled, { keyframes } from 'styled-components';

const scaleUp = keyframes`
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const StepTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 800px;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 16px;
  margin-bottom: 24px;
`;

const StepTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
`;

const SkipBtn = styled.button`
  padding: 6px 18px;
  border-radius: 50px;
  background-color: #f1f5f9;
  color: #475569;
  border: none;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #cbd5e1;
    color: #1e293b;
  }
`;

const MedicalGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  width: 100%;
  max-width: 800px;
  animation: ${scaleUp} 0.3s ease-out;

  .full-width {
    grid-column: span 2;
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
  color: #1e293b;
  background-color: #ffffff;
  transition: all 0.2s ease;

  &:focus {
    border-color: #009688;
    box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.08);
  }

  &::placeholder {
    color: #cbd5e1;
    font-weight: 500;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  font-size: 13px;
  outline: none;
  font-weight: 600;
  color: #1e293b;
  background-color: #ffffff;
  font-family: inherit;
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    border-color: #009688;
    box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.08);
  }
`;

const MedicalInformationStep = ({ medicalInfo, setMedicalInfo, onSkip }) => {
  const handleChange = (field, val) => {
    setMedicalInfo(prev => ({
      ...prev,
      [field]: val
    }));
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Title with skip button at top-right inside card */}
      <StepTitleRow>
        <StepTitle>Medical & Health Information</StepTitle>
        <SkipBtn onClick={onSkip}>
          Skip
        </SkipBtn>
      </StepTitleRow>

      <MedicalGrid>
        {/* Symptoms (Full Width) */}
        <InputGroup className="full-width">
          <Label>Symptoms</Label>
          <TextArea 
            placeholder="Enter active symptoms, concerns or complaints..." 
            value={medicalInfo.symptoms || ''}
            onChange={e => handleChange('symptoms', e.target.value)}
          />
        </InputGroup>

        {/* Medical History */}
        <InputGroup>
          <Label>Medical History</Label>
          <Input 
            type="text" 
            placeholder="Previous surgeries, hospitalizations, or chronic logs" 
            value={medicalInfo.medicalHistory || ''}
            onChange={e => handleChange('medicalHistory', e.target.value)}
          />
        </InputGroup>

        {/* Existing Diseases */}
        <InputGroup>
          <Label>Existing Diseases</Label>
          <Input 
            type="text" 
            placeholder="e.g., Diabetes, Hypertension" 
            value={medicalInfo.existingDiseases || ''}
            onChange={e => handleChange('existingDiseases', e.target.value)}
          />
        </InputGroup>

        {/* Current Medication */}
        <InputGroup>
          <Label>Current Medication</Label>
          <Input 
            type="text" 
            placeholder="e.g., Metformin 500mg" 
            value={medicalInfo.currentMedication || ''}
            onChange={e => handleChange('currentMedication', e.target.value)}
          />
        </InputGroup>

        {/* Allergies */}
        <InputGroup>
          <Label>Allergies</Label>
          <Input 
            type="text" 
            placeholder="e.g., Penicillin, Pollen" 
            value={medicalInfo.allergies || ''}
            onChange={e => handleChange('allergies', e.target.value)}
          />
        </InputGroup>

        {/* Chronic Conditions */}
        <InputGroup>
          <Label>Chronic Conditions</Label>
          <Input 
            type="text" 
            placeholder="e.g., Asthma" 
            value={medicalInfo.chronicConditionsString || ''}
            onChange={e => handleChange('chronicConditionsString', e.target.value)}
          />
        </InputGroup>
      </MedicalGrid>
    </div>
  );
};

export default MedicalInformationStep;
