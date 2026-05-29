import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { Check } from 'lucide-react';
import { verifyDoctorOtpRequest, resetVerifyDoctorOtpState } from '../redux/verifyDoctorOtpSlice';
import { resendDoctorOtpRequest, resetResendDoctorOtpState } from '../redux/resendDoctorOtpSlice';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 700;
  color: #1e293b;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  font-size: 13.5px;
  outline: none;
  font-weight: 600;
  background-color: #ffffff;
  color: #1e293b;
  box-sizing: border-box;
  transition: all 0.2s ease;

  &:focus {
    border-color: #009688;
    box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.08);
  }
`;

const VerificationBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
`;

const SuccessShield = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #e6f9f3;
  color: #10b981;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TimerRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -4px;
`;

const TimerText = styled.span`
  font-size: 12px;
  color: #94a3b8;
  font-weight: 600;
`;

const ResendBtn = styled.button`
  font-size: 12px;
  font-weight: 700;
  color: ${props => props.disabled ? '#94a3b8' : '#009688'};
  background: none;
  border: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  padding: 0;

  &:hover:not(:disabled) {
    text-decoration: underline;
  }
`;

const ErrorBanner = styled.div`
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
  border-radius: 10px;
  padding: 14px 18px;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
`;

const SuccessBanner = styled.div`
  background-color: #e6f9f3;
  border: 1px solid #c2f0e3;
  color: #065f46;
  border-radius: 10px;
  padding: 14px 18px;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
`;

const ContinueBtn = styled.button`
  width: 100%;
  padding: 14px;
  background-color: ${props => props.disabled ? '#94a3b8' : '#009688'};
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  margin-top: 10px;

  &:hover:not(:disabled) {
    background-color: #00796b;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 150, 136, 0.15);
  }
`;

const Spinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;

const AddDoctorOtp = ({ email, phone, phonePrefix = '+91', emailCode, setEmailCode, phoneCode, setPhoneCode, onContinue, otpKeys }) => {
  const dispatch = useDispatch();
  const verifyState = useSelector(state => state.verifyDoctorOtp);
  const resendState = useSelector(state => state.resendDoctorOtp);

  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [phoneKey, setPhoneKey] = useState('');

  // Countdown timer for resend
  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = () => {
    if (!isEmailVerified) {
      if (!emailCode) {
        alert("Please enter the OTP code sent to your email!");
        return;
      }
      dispatch(verifyDoctorOtpRequest({
        code: emailCode,
        key: otpKeys?.encryptionKey || '',
        type: 'email',
        email: email,
        userId: otpKeys?.userId || '',
      }));
    } else {
      if (!phoneCode) {
        alert("Please enter the OTP code sent to your phone!");
        return;
      }
      dispatch(verifyDoctorOtpRequest({
        code: phoneCode,
        key: phoneKey || otpKeys?.encryptionKey || '',
        type: 'phone',
        userId: otpKeys?.userId || '',
      }));
    }
  };

  const handleResend = useCallback(() => {
    if (!canResend) return;
    dispatch(resendDoctorOtpRequest({ email, phone: `${phonePrefix}${phone}` }));
    setTimer(60);
    setCanResend(false);
  }, [canResend, email, phonePrefix, phone]);

  // On verify success
  useEffect(() => {
    if (verifyState.isSuccess && verifyState.data) {
      const responseData = verifyState.data;
      console.log('Verify Doctor OTP success response:', responseData);

      // Check if this was the Email OTP verification success
      const pKey = responseData?.data?.phoneEncryptionKey || responseData?.result?.data?.phoneEncryptionKey;
      if (pKey) {
        setPhoneKey(pKey);
        setIsEmailVerified(true);
        dispatch(resetVerifyDoctorOtpState());
        // Reset timer for phone OTP resend
        setTimer(60);
        setCanResend(false);
      } else {
        // Final verification successful
        dispatch(resetVerifyDoctorOtpState());
        onContinue();
      }
    }
  }, [verifyState.isSuccess, verifyState.data, dispatch, onContinue]);

  // On resend success → show feedback
  useEffect(() => {
    if (resendState.isSuccess) {
      console.log('Resend Doctor OTP success:', resendState.data);
      // Reset after 3 seconds
      const t = setTimeout(() => dispatch(resetResendDoctorOtpState()), 3000);
      return () => clearTimeout(t);
    }
  }, [resendState.isSuccess]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      dispatch(resetVerifyDoctorOtpState());
      dispatch(resetResendDoctorOtpState());
    };
  }, []);

  return (
    <FormSection>
      <VerificationBox>
        <SuccessShield>
          <Check size={28} />
        </SuccessShield>
        <span style={{ fontSize: 14, color: '#334155', fontWeight: 600 }}>
          {!isEmailVerified ? 'Enter verification code sent to' : 'Email verified! Enter phone verification code sent to'}
        </span>
        <span style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>
          {!isEmailVerified ? email : `${phonePrefix} ${phone}`}
        </span>
      </VerificationBox>

      <InputGroup>
        <Label>Enter Email Code</Label>
        <Input 
          type="text" 
          placeholder="Enter 6-digit code" 
          value={emailCode}
          maxLength={6}
          onChange={e => setEmailCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
          disabled={isEmailVerified || verifyState.isLoading}
        />
        {!isEmailVerified && (
          <TimerRow>
            <TimerText>
              {canResend ? 'You can resend now' : `Resend code in ${timer}s`}
            </TimerText>
            <ResendBtn disabled={!canResend || resendState.isLoading} onClick={handleResend}>
              {resendState.isLoading ? 'Sending...' : 'Resend OTP'}
            </ResendBtn>
          </TimerRow>
        )}
      </InputGroup>

      {isEmailVerified ? (
        <InputGroup>
          <Label>Enter Phone Code</Label>
          <Input 
            type="text" 
            placeholder="Enter 6-digit code" 
            value={phoneCode}
            maxLength={6}
            onChange={e => setPhoneCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            disabled={verifyState.isLoading}
          />
          <TimerRow>
            <TimerText>
              {canResend ? 'You can resend now' : `Resend code in ${timer}s`}
            </TimerText>
            <ResendBtn disabled={!canResend || resendState.isLoading} onClick={handleResend}>
              {resendState.isLoading ? 'Sending...' : 'Resend OTP'}
            </ResendBtn>
          </TimerRow>
        </InputGroup>
      ) : (
        <InputGroup style={{ opacity: 0.5 }}>
          <Label>Enter Phone Code</Label>
          <Input 
            type="text" 
            placeholder="Disabled until email is verified" 
            value={phoneCode}
            disabled={true}
          />
        </InputGroup>
      )}

      {verifyState.isError && (
        <ErrorBanner>
          {verifyState.errorMessage || 'OTP verification failed. Please try again.'}
        </ErrorBanner>
      )}

      {resendState.isSuccess && (
        <SuccessBanner>
          OTP resent successfully!
        </SuccessBanner>
      )}

      {resendState.isError && (
        <ErrorBanner>
          {resendState.errorMessage || 'Failed to resend OTP. Please try again.'}
        </ErrorBanner>
      )}

      <ContinueBtn onClick={handleVerify} disabled={verifyState.isLoading}>
        {verifyState.isLoading ? (
          <><Spinner /> Verifying...</>
        ) : !isEmailVerified ? (
          'Verify Email OTP'
        ) : (
          'Verify Phone OTP & Continue'
        )}
      </ContinueBtn>
    </FormSection>
  );
};

export default AddDoctorOtp;
