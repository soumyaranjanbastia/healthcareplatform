import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  
  /* Sizes */
  ${props => {
    switch (props.size) {
      case 'sm':
        return css`
          padding: 8px 14px;
          font-size: 12px;
        `;
      case 'lg':
        return css`
          padding: 14px 24px;
          font-size: 15px;
        `;
      case 'md':
      default:
        return css`
          padding: 11px 18px;
          font-size: 13px;
        `;
    }
  }}

  /* Types */
  ${props => {
    if (props.primary) {
      return css`
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        border: 1px solid transparent;
        color: #ffffff;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);

        &:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(16, 185, 129, 0.3);
          background: linear-gradient(135deg, #12c48a 0%, #05a171 100%);
        }
      `;
    }
    if (props.secondary) {
      return css`
        background: rgba(30, 41, 59, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.08);
        color: #e2e8f0;

        &:hover:not(:disabled) {
          transform: translateY(-2px);
          background: rgba(30, 41, 59, 0.8);
          border-color: rgba(255, 255, 255, 0.15);
        }
      `;
    }
    if (props.danger) {
      return css`
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        border: 1px solid transparent;
        color: #ffffff;
        box-shadow: 0 4px 12px rgba(239, 68, 68, 0.15);

        &:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(239, 68, 68, 0.25);
          background: linear-gradient(135deg, #f87171 0%, #e11d48 100%);
        }
      `;
    }
    // Default outlines
    return css`
      background: transparent;
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #10b981;

      &:hover:not(:disabled) {
        transform: translateY(-2px);
        background: rgba(16, 185, 129, 0.08);
        border-color: #10b981;
      }
    `;
  }}

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

const Button = ({ children, loading, disabled, ...props }) => {
  return (
    <StyledButton disabled={disabled || loading} {...props}>
      {loading ? <Spinner /> : children}
    </StyledButton>
  );
};

export default Button;
