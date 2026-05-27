import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useDispatch } from 'react-redux';
import { ShieldCheck, Mail, Phone as PhoneIcon, Lock, CheckCircle2 } from 'lucide-react';
import { validateEmailOtpRequest, validatePhoneOtpRequest } from '../redux/otpValidationSlice';
import { resendOtpRequest } from '../redux/resendOtpSlice';

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
  grid-template-columns: 1fr 1.2fr;
  gap: 40px;
  width: 100%;
  max-width: 950px;
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
  height: fit-content;
  align-self: center;
`;

const IconWrapper = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: #ffffff;
  color: #009688;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 150, 136, 0.1);
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
  gap: 24px;
`;

const FormSection = styled.div`
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.3s ease;
  position: relative;
  opacity: ${props => props.disabled ? 0.6 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  h4 {
    font-size: 14px;
    font-weight: 700;
    color: #1e293b;
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
  }
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  background-color: ${props => props.success ? '#e6f9f3' : '#fffbeb'};
  color: ${props => props.success ? '#059669' : '#d97706'};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 700;
  color: #1e293b;
`;

const ReadOnlyInput = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  font-size: 13px;
  font-weight: 600;
  background-color: #f8fafc;
  color: #64748b;
  outline: none;
  cursor: not-allowed;
`;

const InputWithVerify = styled.div`
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

  &:focus:not(:disabled) {
    border-color: #009688;
    box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.08);
  }

  &::placeholder {
    color: #94a3b8;
  }

  &:disabled {
    background-color: #f1f5f9;
    cursor: not-allowed;
  }
`;

const VerifyBtn = styled.button`
  padding: 12px 24px;
  background-color: #009688;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background-color: #00796b;
  }

  &:disabled {
    background-color: #cbd5e1;
    cursor: not-allowed;
  }
`;

const ActionButtonsRow = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
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

const LockBanner = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: #d97706;
  background-color: #fffbeb;
  border: 1px solid #fef3c7;
  border-radius: 8px;
  padding: 10px 14px;
  margin-bottom: -4px;
`;

const OtpVerificationStep = ({ 
  phone, 
  email,
  currentEncryptionKey,
  otpValidationState,
  resendOtpState,
  onSkipVerification,
  onVerifyLater
}) => {
  const dispatch = useDispatch();
  const [emailOtp, setEmailOtp] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');

  const isEmailVerified = otpValidationState.isEmailSuccess;
  const isPhoneVerified = otpValidationState.isPhoneSuccess;

  const handleVerifyEmail = () => {
    if (!emailOtp) {
      alert("Please enter the 6-digit Email OTP!");
      return;
    }
    if (!currentEncryptionKey) {
      alert("Signup session has expired. Please return and re-submit details.");
      return;
    }
    dispatch(validateEmailOtpRequest({
      encryptionKey: currentEncryptionKey,
      emailOtp: emailOtp
    }));
  };

  const handleVerifyPhone = () => {
    if (!phoneOtp) {
      alert("Please enter the 6-digit Phone OTP!");
      return;
    }
    if (!currentEncryptionKey) {
      alert("Signup session has expired. Please return and re-submit details.");
      return;
    }
    dispatch(validatePhoneOtpRequest({
      encryptionKey: currentEncryptionKey,
      phoneOtp: phoneOtp
    }));
  };

  const handleResend = (type) => {
    if (!currentEncryptionKey) {
      alert("Verification session has expired. Please re-submit details.");
      return;
    }
    dispatch(resendOtpRequest({
      encryptionKey: currentEncryptionKey,
      type: type // 'email' | 'phone'
    }));
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <StepTitle>Verify Credentials</StepTitle>
      
      <VerificationGrid>
        {/* Left Info Panel */}
        <LeftPanel>
          <IconWrapper>
            <ShieldCheck size={36} />
          </IconWrapper>
          <OptionalTitle>Auto-Generated OTPs</OptionalTitle>
          <OptionalDesc>
            Verification codes have been automatically dispatched by our backend to your credentials on save. No manual trigger required!
          </OptionalDesc>
        </LeftPanel>

        {/* Right Input Panel */}
        <RightPanel>
          
          {/* Section 1: Email OTP (Always verified first) */}
          <FormSection>
            <SectionHeader>
              <h4>
                <Mail size={16} style={{ color: '#009688' }} /> Email ID Verification
              </h4>
              {isEmailVerified ? (
                <StatusBadge success>
                  <CheckCircle2 size={12} /> Verified
                </StatusBadge>
              ) : (
                <StatusBadge>Pending</StatusBadge>
              )}
            </SectionHeader>

            <InputGroup>
              <Label>Email ID</Label>
              <ReadOnlyInput type="text" value={email || ''} readOnly />
            </InputGroup>

            <InputGroup>
              <Label>Enter 6-digit Email OTP</Label>
              <InputWithVerify>
                <Input 
                  type="text" 
                  maxLength={6}
                  placeholder="Enter Email OTP" 
                  value={emailOtp}
                  onChange={e => setEmailOtp(e.target.value)}
                  disabled={isEmailVerified || otpValidationState.isEmailLoading}
                />
                <VerifyBtn 
                  onClick={handleVerifyEmail}
                  disabled={isEmailVerified || !emailOtp || otpValidationState.isEmailLoading}
                >
                  {otpValidationState.isEmailLoading ? 'Verifying...' : 'Verify'}
                </VerifyBtn>
              </InputWithVerify>
              {!isEmailVerified && (
                <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <span>Hint: Use 123456 for testing</span>
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); handleResend('email'); }}
                    style={{ color: '#009688', textDecoration: 'none', fontWeight: 700 }}
                  >
                    {resendOtpState?.isLoading ? 'Resending...' : 'Resend OTP'}
                  </a>
                </span>
              )}
            </InputGroup>
          </FormSection>

          {/* Section 2: Phone OTP (Locked until Email is verified) */}
          <FormSection disabled={!isEmailVerified}>
            <SectionHeader>
              <h4>
                <PhoneIcon size={16} style={{ color: '#009688' }} /> Phone Number Verification
              </h4>
              {isPhoneVerified ? (
                <StatusBadge success>
                  <CheckCircle2 size={12} /> Verified
                </StatusBadge>
              ) : (
                <StatusBadge>Pending</StatusBadge>
              )}
            </SectionHeader>

            {!isEmailVerified && (
              <LockBanner>
                <Lock size={14} /> Verify Email OTP first to unlock Phone verification
              </LockBanner>
            )}

            <InputGroup>
              <Label>Phone Number</Label>
              <ReadOnlyInput type="text" value={phone || ''} readOnly />
            </InputGroup>

            <InputGroup>
              <Label>Enter 6-digit Phone OTP</Label>
              <InputWithVerify>
                <Input 
                  type="text" 
                  maxLength={6}
                  placeholder="Enter Phone OTP" 
                  value={phoneOtp}
                  onChange={e => setPhoneOtp(e.target.value)}
                  disabled={!isEmailVerified || isPhoneVerified || otpValidationState.isPhoneLoading}
                />
                <VerifyBtn 
                  onClick={handleVerifyPhone}
                  disabled={!isEmailVerified || isPhoneVerified || !phoneOtp || otpValidationState.isPhoneLoading}
                >
                  {otpValidationState.isPhoneLoading ? 'Verifying...' : 'Verify'}
                </VerifyBtn>
              </InputWithVerify>
              {isEmailVerified && !isPhoneVerified && (
                <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <span>Hint: Use 123456 for testing</span>
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); handleResend('phone'); }}
                    style={{ color: '#009688', textDecoration: 'none', fontWeight: 700 }}
                  >
                    {resendOtpState?.isLoading ? 'Resending...' : 'Resend OTP'}
                  </a>
                </span>
              )}
            </InputGroup>
          </FormSection>

          {/* Action buttons to skip/verify later */}
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
