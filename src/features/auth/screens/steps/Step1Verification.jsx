import React, { useState } from 'react';
import styled from 'styled-components';
import { Mail, ArrowRight } from 'lucide-react';
import WizardCard from '../../components/WizardCard';
import WizardInput from '../../components/WizardInput';
import WizardButton, { ButtonWrapper } from '../../components/WizardButton';

const StyledCheckboxLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #64748b;
  margin-top: 16px;
  user-select: none;

  input {
    margin-top: 3px;
    width: 16px;
    height: 16px;
    border: 1px solid #cbd5e1;
    border-radius: 4px;
    cursor: pointer;
    accent-color: #009688;
  }
`;

const SendOtpBtn = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #e2fbf4;
  color: #009688;
  border: 1px solid #a7f3d0;
  border-radius: 10px;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 18px;

  &:hover {
    background-color: #d1fae5;
  }
`;

const Step1Verification = ({ onNext, onPrev, data, updateData }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState(data.email || 'partner@example.com');
  const [phone, setPhone] = useState(data.phone || '9876543210');
  const [emailOtp, setEmailOtp] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [agreed, setAgreed] = useState(data.agreed || false);

  const handleSendOtp = () => {
    if (!email || !phone) return alert('Please enter both Email and Phone.');
    setOtpSent(true);
    alert('Simulated: Verification codes sent to your Email & Phone!');
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (!email || !phone) return alert('Please complete email and phone fields.');
    if (!agreed) return alert('Please agree to the Terms of Service & Privacy Policy.');
    if (!otpSent) return alert('Please click "Send OTP" to receive and enter verification codes.');
    if (!emailOtp || !phoneOtp) return alert('Please enter the OTP codes.');

    updateData({ email, phone, agreed });
    onNext();
  };

  return (
    <form onSubmit={handleContinue}>
      <WizardCard title="Email & Mobile Verification" icon={<Mail size={20} />}>
        <WizardInput 
          label="Email Address" 
          required 
          type="email" 
          placeholder="partner@example.com" 
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <WizardInput 
          label="Mobile Number" 
          required 
          type="tel" 
          placeholder="9876543210" 
          value={phone}
          maxLength={10}
          onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
        />

        <SendOtpBtn type="button" onClick={handleSendOtp}>
          {otpSent ? 'Resend OTP' : 'Send OTP'}
        </SendOtpBtn>

        {otpSent && (
          <>
            <WizardInput 
              label="Enter Email OTP" 
              required 
              placeholder="6-digit OTP" 
              value={emailOtp}
              maxLength={6}
              onChange={e => setEmailOtp(e.target.value.replace(/\D/g, ''))}
            />
            <WizardInput 
              label="Enter Phone OTP" 
              required 
              placeholder="6-digit OTP" 
              value={phoneOtp}
              maxLength={6}
              onChange={e => setPhoneOtp(e.target.value.replace(/\D/g, ''))}
            />
          </>
        )}

        <StyledCheckboxLabel>
          <input 
            type="checkbox" 
            checked={agreed} 
            onChange={e => setAgreed(e.target.checked)} 
          />
          I agree to our Terms of Service and Privacy Policy
        </StyledCheckboxLabel>
      </WizardCard>

      <ButtonWrapper>
        <WizardButton type="submit">
          Submit <ArrowRight size={16} />
        </WizardButton>
      </ButtonWrapper>
    </form>
  );
};

export default Step1Verification;
