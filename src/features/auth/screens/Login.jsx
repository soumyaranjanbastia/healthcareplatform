import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Mail, Lock, Key, ArrowRight } from 'lucide-react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const FormContainer = styled.div`
  animation: ${fadeIn} 0.5s ease-out;
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 24px;
  h2 {
    font-family: 'Outfit', sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 6px;
  }
  p {
    font-size: 13px;
    color: #64748b;
  }
`;

const TabContainer = styled.div`
  display: flex;
  background-color: #f8fafc;
  padding: 5px;
  border-radius: 12px;
  margin-bottom: 24px;
  border: 1px solid #f1f5f9;
`;

const TabButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 14px;
  border: none;
  background-color: ${props => props.active ? '#ffffff' : 'transparent'};
  color: ${props => props.active ? '#0f172a' : '#64748b'};
  font-size: 13px;
  font-weight: ${props => props.active ? '600' : '500'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${props => props.active ? '0 4px 10px rgba(15, 23, 42, 0.04)' : 'none'};

  &:hover {
    color: #0f172a;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 18px;
`;

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #334155;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 14px;
  color: #94a3b8;
  display: flex;
  align-items: center;
  pointer-events: none;
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px 14px 12px 42px;
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
`;

const ErrorMsg = styled.span`
  font-size: 12px;
  color: #ef4444;
  font-weight: 500;
  margin-top: 4px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #009688;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 6px;
  box-shadow: 0 4px 10px rgba(0, 150, 136, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: #00796b;
    transform: translateY(-1px);
  }
`;

const FooterText = styled.p`
  text-align: center;
  font-size: 13px;
  color: #64748b;
  margin-top: 24px;
`;

const SwitchLink = styled.span`
  color: #009688;
  font-weight: 600;
  cursor: pointer;
  margin-left: 4px;
  &:hover {
    text-decoration: underline;
  }
`;

const Login = ({ onLogin, onSwitchToSignup }) => {
  const [activeTab, setActiveTab] = useState('password'); // password | otp
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpTarget, setOtpTarget] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpStep, setOtpStep] = useState(1); // 1 = input target, 2 = verify otp
  const [error, setError] = useState('');

  const handlePasswordLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    onLogin();
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    setError('');

    if (!otpTarget) {
      setError('Please enter your email or phone number.');
      return;
    }
    setOtpStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setError('');

    if (!otpCode) {
      setError('Please enter the OTP code.');
      return;
    }
    onLogin();
  };

  return (
    <FormContainer>
      <FormHeader>
        <h2>Welcome Back</h2>
        <p>Sign in to access your dashboard</p>
      </FormHeader>

      <TabContainer>
        <TabButton 
          active={activeTab === 'password'} 
          onClick={() => { setActiveTab('password'); setError(''); setOtpStep(1); }}
        >
          <Lock size={14} /> Password
        </TabButton>
        <TabButton 
          active={activeTab === 'otp'} 
          onClick={() => { setActiveTab('otp'); setError(''); }}
        >
          <Key size={14} /> OTP
        </TabButton>
      </TabContainer>

      {activeTab === 'password' ? (
        <form onSubmit={handlePasswordLogin}>
          <FormGroup>
            <Label htmlFor="login-email">Email</Label>
            <InputWrapper>
              <InputIcon><Mail size={15} /></InputIcon>
              <InputField 
                id="login-email" 
                type="email" 
                placeholder="you@hospital.com" 
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <LabelRow>
              <Label htmlFor="login-password">Password</Label>
            </LabelRow>
            <InputWrapper>
              <InputIcon><Lock size={15} /></InputIcon>
              <InputField 
                id="login-password" 
                type="password" 
                placeholder="Enter password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </InputWrapper>
            {error && <ErrorMsg>{error}</ErrorMsg>}
          </FormGroup>

          <SubmitButton type="submit">
            Sign In <ArrowRight size={15} />
          </SubmitButton>
        </form>
      ) : (
        <>
          {otpStep === 1 ? (
            <form onSubmit={handleSendOtp}>
              <FormGroup>
                <Label htmlFor="login-otp-target">Email / Phone</Label>
                <InputWrapper>
                  <InputIcon><Mail size={15} /></InputIcon>
                  <InputField 
                    id="login-otp-target" 
                    type="text" 
                    placeholder="Enter email or phone number" 
                    value={otpTarget}
                    onChange={e => setOtpTarget(e.target.value)}
                  />
                </InputWrapper>
                {error && <ErrorMsg>{error}</ErrorMsg>}
              </FormGroup>
              <SubmitButton type="submit">
                Send OTP
              </SubmitButton>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <FormGroup>
                <Label htmlFor="login-otp-code">Enter OTP Code</Label>
                <InputWrapper>
                  <InputIcon><Key size={15} /></InputIcon>
                  <InputField 
                    id="login-otp-code" 
                    type="text" 
                    placeholder="6-digit OTP" 
                    value={otpCode}
                    maxLength={6}
                    onChange={e => setOtpCode(e.target.value.replace(/\D/g, ''))}
                  />
                </InputWrapper>
                {error && <ErrorMsg>{error}</ErrorMsg>}
              </FormGroup>
              <SubmitButton type="submit">
                Verify & Sign In <ArrowRight size={15} />
              </SubmitButton>
            </form>
          )}
        </>
      )}

      <FooterText>
        New clinic setup? 
        <SwitchLink onClick={onSwitchToSignup}>Initialize Clinic</SwitchLink>
      </FooterText>
    </FormContainer>
  );
};

export default Login;
