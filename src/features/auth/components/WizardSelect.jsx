import React from 'react';
import styled from 'styled-components';

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  margin-bottom: 16px;
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

const SelectField = styled.select`
  width: 100%;
  padding: 12px 14px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #0f172a;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    border-color: #009688;
    box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.08);
  }
`;

const WizardSelect = ({ label, required = false, id, value, onChange, options = [] }) => {
  return (
    <FormGroup>
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <RequiredStar>*</RequiredStar>}
        </Label>
      )}
      <SelectField id={id} value={value} onChange={onChange}>
        {options.map((option, index) => (
          <option key={`${option.value}-${index}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectField>
    </FormGroup>
  );
};

export default WizardSelect;
