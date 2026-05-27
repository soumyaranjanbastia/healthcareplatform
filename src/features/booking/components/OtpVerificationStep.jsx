import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ShieldCheck } from 'lucide-react';

const scaleUp = keyframes`
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const StepTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  text-align: center;
  margin-bottom: 24px;
`;

const VerificationGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 40px;
  width: 100%;
  max-width: 900px;
  animation: ${scaleUp} 0.3s ease-out;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LeftPanel = styled.div`
  background-color: #f0f7ff;
  border-radius: 16px;
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 16px;
  border: 1px solid #e0effe;
`;

const IconWrapper = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: #ffffff;
  color: #10b981;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(16, 185, 129, 0.1);
`;

const OptionalTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
`;

const OptionalDesc = styled.p`
  font-size: 13px;
  color: #64748b;
  line-height: 1.6;
  font-weight: 500;
  max-width: 260px;
`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
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

const RowWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const Input = styled.input`
  flex: 1;
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

  &::placeholder {
    color: #94a3b8;
  }
`;

const SendOtpBtn = styled.button`
  padding: 12px 20px;
  background-color: #009688;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #00796b;
  }
`;

const ActionButtonsRow = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 10px;
`;

const ActionBtn = styled.button`
  flex: 1;
  padding: 12px;
  background-color: #e2e8f0;
  color: #475569;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #cbd5e1;
    color: #1e293b;
  }
`;

const SuccessText = styled.span`
  font-size: 11px;
  color: #10b981;
  font-weight: 700;
  margin-top: -4px;
`;

const OtpVerificationStep = ({ 
  phone, 
  email,
  onSkipVerification,
  onVerifyLater
}) => {
  const [phoneVal, setPhoneVal] = useState(phone || '');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);

  const [emailVal, setEmailVal] = useState(email || '');
  const [emailOtp, setEmailOtp] = useState('');
  const [emailOtpSent, setEmailOtpSent] = useState(false);

  const handleSendPhoneOtp = () => {
    if (!phoneVal) {
      alert("Please enter a valid phone number!");
      return;
    }
    setPhoneOtpSent(true);
    alert(`OTP sent successfully to ${phoneVal}! Use demo code "123456"`);
  };

  const handleSendEmailOtp = () => {
    if (!emailVal) {
      alert("Please enter a valid Email ID!");
      return;
    }
    setEmailOtpSent(true);
    alert(`OTP sent successfully to ${emailVal}! Use demo code "123456"`);
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <VerificationGrid>
        {/* Left Panel */}
        <LeftPanel>
          <IconWrapper>
            <ShieldCheck size={36} />
          </IconWrapper>
          <OptionalTitle>Optional Verification</OptionalTitle>
          <OptionalDesc>
            Walk-in patients may skip verification. OTP can be completed later.
          </OptionalDesc>
        </LeftPanel>

        {/* Right Panel */}
        <RightPanel>
          {/* Phone verification */}
          <InputGroup>
            <Label>Phone Number</Label>
            <RowWrapper>
              <Input 
                type="tel" 
                placeholder="+91 88765 43210" 
                value={phoneVal}
                onChange={e => setPhoneVal(e.target.value)}
              />
              <SendOtpBtn onClick={handleSendPhoneOtp}>
                Send OTP
              </SendOtpBtn>
            </RowWrapper>
            {phoneOtpSent && <SuccessText>✓ OTP sent successfully!</SuccessText>}
          </InputGroup>

          <InputGroup>
            <Label>Phone OTP</Label>
            <Input 
              type="text" 
              placeholder="6-digit code" 
              value={phoneOtp}
              onChange={e => setPhoneOtp(e.target.value)}
            />
          </InputGroup>

          {/* Email verification */}
          <InputGroup style={{ marginTop: 8 }}>
            <Label>Email ID</Label>
            <RowWrapper>
              <Input 
                type="email" 
                placeholder="example@gmail.com" 
                value={emailVal}
                onChange={e => setEmailVal(e.target.value)}
              />
              <SendOtpBtn onClick={handleSendEmailOtp}>
                Send OTP
              </SendOtpBtn>
            </RowWrapper>
            {emailOtpSent && <SuccessText>✓ OTP sent successfully!</SuccessText>}
          </InputGroup>

          <InputGroup>
            <Label>Email OTP</Label>
            <Input 
              type="text" 
              placeholder="6-digit code" 
              value={emailOtp}
              onChange={e => setEmailOtp(e.target.value)}
            />
          </InputGroup>

          <ActionButtonsRow>
            <ActionBtn onClick={onSkipVerification}>
              Skip Verification
            </ActionBtn>
            <ActionBtn onClick={onVerifyLater}>
              Verify Later
            </ActionBtn>
          </ActionButtonsRow>
        </RightPanel>
      </VerificationGrid>
    </div>
  );
};

export default OtpVerificationStep;
