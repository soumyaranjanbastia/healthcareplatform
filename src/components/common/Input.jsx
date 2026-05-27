import React from 'react';
import styled, { css } from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  margin-bottom: ${props => props.noMargin ? '0px' : '18px'};
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #94a3b8;
  font-family: 'Outfit', sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid ${props => props.hasError ? 'rgba(239, 68, 68, 0.4)' : 'rgba(255, 255, 255, 0.08)'};
  border-radius: 12px;
  padding: 0 16px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  color: #ffffff;

  &:focus-within {
    border-color: ${props => props.hasError ? '#ef4444' : '#10b981'};
    box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)'};
    background: rgba(15, 23, 42, 0.8);
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  margin-right: 12px;
  
  ${props => props.focused && css`
    color: #10b981;
  `}
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 0;
  background: transparent;
  border: none;
  outline: none;
  color: #ffffff;
  font-size: 14px;
  font-family: 'Inter', sans-serif;

  &::placeholder {
    color: #475569;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: #ffffff;
    -webkit-box-shadow: 0 0 0px 1000px #0b0f19 inset;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 12px 0;
  background: transparent;
  border: none;
  outline: none;
  color: #ffffff;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  cursor: pointer;

  option {
    background-color: #0b0f19;
    color: #ffffff;
    padding: 12px;
  }
`;

const ErrorMessage = styled.span`
  font-size: 11px;
  color: #ef4444;
  font-weight: 500;
  margin-top: 2px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Input = ({
  label,
  error,
  icon: Icon,
  type = 'text',
  options, // For dropdown select
  fullWidth = true,
  noMargin = false,
  ...props
}) => {
  return (
    <InputContainer fullWidth={fullWidth} noMargin={noMargin}>
      {label && <Label>{label}</Label>}
      <InputWrapper hasError={!!error}>
        {Icon && (
          <IconWrapper>
            <Icon size={18} />
          </IconWrapper>
        )}
        {options ? (
          <StyledSelect {...props}>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </StyledSelect>
        ) : (
          <StyledInput type={type} {...props} />
        )}
      </InputWrapper>
      {error && <ErrorMessage>⚠️ {error}</ErrorMessage>}
    </InputContainer>
  );
};

export default Input;
