import React from 'react';
import styled from 'styled-components';

const PrimaryButton = styled.button`
  flex: 1;
  padding: 14px 20px;
  background-color: #009688;
  color: #ffffff;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 150, 136, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: #00796b;
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #cbd5e1;
    color: #94a3b8;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;

const SecondaryButton = styled.button`
  flex: 1;
  padding: 14px 20px;
  background-color: #ffffff;
  color: #475569;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: #f8fafc;
    color: #0f172a;
    border-color: #cbd5e1;
  }

  &:disabled {
    background-color: #f1f5f9;
    color: #cbd5e1;
    cursor: not-allowed;
    border-color: #e2e8f0;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  margin-top: 24px;
`;

const WizardButton = ({ 
  onClick, 
  variant = 'primary', 
  children, 
  disabled = false, 
  type = 'button',
  ...props
}) => {
  if (variant === 'secondary') {
    return (
      <SecondaryButton type={type} onClick={onClick} disabled={disabled} {...props}>
        {children}
      </SecondaryButton>
    );
  }
  return (
    <PrimaryButton type={type} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </PrimaryButton>
  );
};

export { ButtonWrapper };
export default WizardButton;
