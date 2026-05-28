import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.isOpen ? 1 : 0};
  pointer-events: ${props => props.isOpen ? 'auto' : 'none'};
  transition: opacity 0.3s ease;
`;

const ModalCard = styled.div`
  background: white;
  width: 90%;
  max-width: 400px;
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transform: ${props => props.isOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)'};
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  font-family: 'Outfit', 'Inter', sans-serif;
`;

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #fef2f2;
  color: #ef4444;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  
  svg {
    width: 32px;
    height: 32px;
  }
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 8px 0;
`;

const Message = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0 0 24px 0;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`;

const Button = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
`;

const CancelBtn = styled(Button)`
  background: #f1f5f9;
  color: #475569;
  
  &:hover {
    background: #e2e8f0;
  }
`;

const ConfirmBtn = styled(Button)`
  background: #ef4444;
  color: white;
  
  &:hover {
    background: #dc2626;
  }
`;

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = "OK", cancelText = "Cancel" }) => {
  return (
    <Overlay isOpen={isOpen}>
      <ModalCard isOpen={isOpen}>
        <IconWrapper>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
        </IconWrapper>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <ButtonGroup>
          <CancelBtn onClick={onCancel}>{cancelText}</CancelBtn>
          <ConfirmBtn onClick={onConfirm}>{confirmText}</ConfirmBtn>
        </ButtonGroup>
      </ModalCard>
    </Overlay>
  );
};

export default ConfirmModal;
