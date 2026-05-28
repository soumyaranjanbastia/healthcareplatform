import React from 'react';
import styled, { keyframes } from 'styled-components';
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleIn = keyframes`
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999;
  animation: ${fadeIn} 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
`;

const ModalCard = styled.div`
  background: #ffffff;
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 20px;
  width: 90%;
  max-width: 440px;
  padding: 28px;
  box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.15);
  animation: ${scaleIn} 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  position: relative;
  font-family: 'Outfit', 'Inter', sans-serif;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f1f5f9;
    color: #475569;
    transform: rotate(90deg);
  }
`;

const IconContainer = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  background-color: ${props => props.isSuccess ? '#e6f9f3' : props.isError ? '#fef2f2' : '#eff6ff'};
  color: ${props => props.isSuccess ? '#10b981' : props.isError ? '#ef4444' : '#3b82f6'};
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
`;

const Message = styled.p`
  font-size: 14px;
  color: #475569;
  line-height: 1.6;
  margin-bottom: 24px;
  font-weight: 500;
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #009688 0%, #00796b 100%);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 150, 136, 0.2);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 150, 136, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const AlertModal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  // Dynamically determine icon type based on message text
  const lowerMsg = message.toLowerCase();
  const isSuccess = lowerMsg.includes('success') || lowerMsg.includes('complete') || lowerMsg.includes('verified');
  const isError = lowerMsg.includes('fail') || lowerMsg.includes('error') || lowerMsg.includes('invalid') || lowerMsg.includes('please upload') || lowerMsg.includes('please fill') || lowerMsg.includes('agree') || lowerMsg.includes('sent');

  const title = isSuccess ? 'Success' : isError ? 'Attention' : 'Alert';

  return (
    <Overlay onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <X size={18} />
        </CloseButton>

        <IconContainer isSuccess={isSuccess} isError={isError}>
          {isSuccess ? <CheckCircle size={28} /> : isError ? <AlertCircle size={28} /> : <Info size={28} />}
        </IconContainer>

        <Title>{title}</Title>
        <Message>{message}</Message>

        <Button onClick={onClose}>
          Okay
        </Button>
      </ModalCard>
    </Overlay>
  );
};

export default AlertModal;
