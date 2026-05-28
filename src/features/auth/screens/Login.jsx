import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Mail, Lock, Key, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { sendLoginOtpRequest, resetSendLoginOtp } from '../redux/sendLoginOtpSlice';
import { verifyLoginOtpRequest, resetVerifyLoginOtp } from '../redux/verifyLoginOtpSlice';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const FormContainer = styled.div`
  animation: ${fadeIn} 0.5s ease-out;
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Spinner = styled(Loader2)`
  animation: ${spin} 1s linear infinite;
  margin-left: 8px;
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

const SuccessMsg = styled.div`
  background-color: #dcfce7;
  color: #166534;
  border: 1px solid #bbf7d0;
  padding: 12px 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  animation: ${fadeIn} 0.3s ease-out;
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
  const dispatch = useDispatch();
  const { loading: sendLoading, success: sendSuccess, data: sendData, error: sendError } = useSelector((state) => state.sendLoginOtp);
  const { loading: verifyLoading, success: verifySuccess, data: verifyData, error: verifyError } = useSelector((state) => state.verifyLoginOtp);

  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpStep, setOtpStep] = useState(1); // 1 = input target, 2 = verify otp
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (sendSuccess && otpStep === 1) {
      if (sendData?.isRegistered !== false) {
        setOtpStep(2);
      }
    }
  }, [sendSuccess, otpStep, sendData]);

  React.useEffect(() => {
    if (verifySuccess && verifyData) {
      window.alert(verifyData.message || "Login successful.");
      
      const rawRole = verifyData.user?.role || 'Receptionist';
      let formattedRole = rawRole;
      if (rawRole.toUpperCase() === 'SUPER ADMIN' || rawRole.toUpperCase() === 'ADMIN') {
        formattedRole = 'Admin';
      } else {
        formattedRole = rawRole.charAt(0).toUpperCase() + rawRole.slice(1).toLowerCase();
      }
      
      onLogin({
        ...verifyData,
        user: {
          ...verifyData.user,
          role: formattedRole
        }
      });
      dispatch(resetVerifyLoginOtp());
    }
  }, [verifySuccess, verifyData, onLogin, dispatch]);

  const handleSendOtp = (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    
    dispatch(sendLoginOtpRequest({ email }));
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setError('');

    if (!otpCode) {
      setError('Please enter the OTP code.');
      return;
    }
    
    const encryptionKey = sendData?.encryptionKey;
    if (!encryptionKey) {
      setError('Session expired. Please send OTP again.');
      return;
    }

    dispatch(verifyLoginOtpRequest({ otp: otpCode, encryptionKey }));
  };

  return (
    <FormContainer>
      <FormHeader>
        <h2>Welcome Back</h2>
        <p>Sign in to access your dashboard</p>
      </FormHeader>

      {otpStep === 1 ? (
        <form onSubmit={handleSendOtp}>
          {sendData?.message && sendData?.isRegistered === false && (
            <SuccessMsg>
              <CheckCircle2 size={16} /> {sendData.message}
            </SuccessMsg>
          )}
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
            {(error || sendError) && <ErrorMsg>{error || sendError}</ErrorMsg>}
          </FormGroup>
          <SubmitButton type="submit" disabled={sendLoading}>
            {sendLoading ? (
              <>Sending <Spinner size={16} /></>
            ) : (
              'Send OTP'
            )}
          </SubmitButton>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          {sendData?.message && (
            <SuccessMsg>
              <CheckCircle2 size={16} /> {sendData.message}
            </SuccessMsg>
          )}
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
            {(error || verifyError) && <ErrorMsg>{error || verifyError}</ErrorMsg>}
          </FormGroup>
          <SubmitButton type="submit" disabled={verifyLoading}>
            {verifyLoading ? (
              <>Verifying <Spinner size={16} /></>
            ) : (
              <>Verify & Sign In <ArrowRight size={15} /></>
            )}
          </SubmitButton>
        </form>
      )}

      <FooterText>
        New clinic setup? 
        <SwitchLink onClick={onSwitchToSignup}>Initialize Clinic</SwitchLink>
      </FooterText>
    </FormContainer>
  );
};

export default Login;
