import React from 'react';
import styled from 'styled-components';

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  margin-bottom: 16px;
`;

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.label`
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #334155;
`;

const RequiredStar = styled.span`
  color: #ef4444;
  margin-left: 2px;
`;

const HelperText = styled.span`
  font-size: 11px;
  color: #64748b;
  margin-top: 2px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px 14px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #0f172a;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    border-color: #009688;
    box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.08);
  }

  &:disabled {
    background-color: #f8fafc;
    color: #64748b;
    cursor: not-allowed;
  }
`;

const WizardInput = ({ 
  label, 
  required = false, 
  helper, 
  id, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  disabled = false,
  maxLength
}) => {
  return (
    <FormGroup>
      <LabelRow>
        {label && (
          <Label htmlFor={id}>
            {label}
            {required && <RequiredStar>*</RequiredStar>}
          </Label>
        )}
      </LabelRow>
      <InputField 
        id={id} 
        type={type} 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange}
        disabled={disabled}
        maxLength={maxLength}
        autoComplete="off"
      />
      {helper && <HelperText>{helper}</HelperText>}
    </FormGroup>
  );
};

export default WizardInput;
