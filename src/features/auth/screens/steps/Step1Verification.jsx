import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Mail, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import WizardCard from '../../components/WizardCard';
import WizardInput from '../../components/WizardInput';
import WizardButton, { ButtonWrapper } from '../../components/WizardButton';
import { sendHospitalOtpRequest, resetSendHospitalOtpState } from '../../redux/sendHospitalOtpSlice';
import { verifyHospitalOtpRequest, resetVerifyHospitalOtpState } from '../../redux/verifyHospitalOtpSlice';
import { resendHospitalOtpRequest, resetResendHospitalOtpState } from '../../redux/resendHospitalOtpSlice';

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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.div`
  color: #ef4444;
  font-size: 13px;
  margin-bottom: 12px;
  text-align: center;
`;

const SuccessText = styled.div`
  color: #10b981;
  font-size: 13px;
  margin-bottom: 12px;
  text-align: center;
`;

// Simple Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background: white;
  padding: 32px;
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const ModalTitle = styled.h3`
  font-family: 'Outfit', sans-serif;
  font-size: 24px;
  color: #1e293b;
  margin: 16px 0 8px;
`;

const ModalText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #64748b;
  margin-bottom: 24px;
`;

const Step1Verification = ({ onNext, onPrev, data, updateData }) => {
  const dispatch = useDispatch();

  // States from Redux
  const { isLoading, isSuccess, isError, errorMessage, successMessage, emailKey, phoneKey } = useSelector((state) => state.sendHospitalOtp);

  const {
    isLoading: isVerifyLoading,
    isSuccess: isVerifySuccess,
    isError: isVerifyError,
    errorMessage: verifyErrorMessage,
    successMessage: verifySuccessMessage
  } = useSelector((state) => state.verifyHospitalOtp);

  const {
    isLoading: isResendLoading,
    isSuccess: isResendSuccess,
    isError: isResendError,
    errorMessage: resendErrorMessage,
    successMessage: resendSuccessMessage,
    emailKey: resendEmailKey,
    phoneKey: resendPhoneKey
  } = useSelector((state) => state.resendHospitalOtp);

  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState(data.email || '');
  const [phone, setPhone] = useState(data.phone || '');
  const [emailOtp, setEmailOtp] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [agreed, setAgreed] = useState(data.agreed || false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showOtpWarningModal, setShowOtpWarningModal] = useState(false);
  const [errors, setErrors] = useState({});

  // Active Keys Logic: Prioritize the keys from the Resend API if available
  const activeEmailKey = resendEmailKey || emailKey;
  const activePhoneKey = resendPhoneKey || phoneKey;

  // Active Messages Logic
  const displayErrorMsg = isVerifyError ? verifyErrorMessage : (isResendError ? resendErrorMessage : (isError ? errorMessage : ''));
  const displaySuccessMsg = isResendSuccess ? resendSuccessMessage : (isSuccess ? successMessage : '');
  const isAnyLoading = isLoading || isResendLoading;

  useEffect(() => {
    if (isSuccess || isResendSuccess) {
      setOtpSent(true);
    }
  }, [isSuccess, isResendSuccess]);

  useEffect(() => {
    if (isVerifySuccess) {
      setShowSuccessModal(true);
    }
  }, [isVerifySuccess]);

  // Clean up on unmount or reset if needed
  useEffect(() => {
    return () => {
      dispatch(resetSendHospitalOtpState());
      dispatch(resetVerifyHospitalOtpState());
      dispatch(resetResendHospitalOtpState());
    };
  }, [dispatch]);

  const handleSendOtp = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email Address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) newErrors.email = 'Please enter a valid Email Address.';
    }
    if (!phone) {
      newErrors.phone = 'Mobile Number is required.';
    } else if (phone.length !== 10) {
      newErrors.phone = 'Phone number must be exactly 10 digits.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    if (otpSent) {
      dispatch(resendHospitalOtpRequest({ email, phone }));
    } else {
      dispatch(sendHospitalOtpRequest({ email, phone }));
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email Address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) newErrors.email = 'Please enter a valid Email Address.';
    }
    if (!phone) {
      newErrors.phone = 'Mobile Number is required.';
    } else if (phone.length !== 10) {
      newErrors.phone = 'Phone number must be exactly 10 digits.';
    }
    if (!agreed) {
      newErrors.agreed = 'Please agree to the Terms of Service and Privacy Policy.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!otpSent || !emailOtp || !phoneOtp) {
      setShowOtpWarningModal(true);
      return;
    }

    if (emailOtp.length !== 6) {
      newErrors.emailOtp = 'OTP must be exactly 6 digits.';
    }
    if (phoneOtp.length !== 6) {
      newErrors.phoneOtp = 'OTP must be exactly 6 digits.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    dispatch(verifyHospitalOtpRequest({
      emailOtp,
      emailKey: activeEmailKey,
      phoneOtp,
      phoneKey: activePhoneKey
    }));
  };

  const handleModalContinue = () => {
    setShowSuccessModal(false);
    updateData({
      email,
      phone,
      agreed,
      emailKey: activeEmailKey,
      phoneKey: activePhoneKey,
      emailOtp,
      phoneOtp
    });
    onNext();
  };

  return (
    <>
      <form onSubmit={handleContinue} noValidate>
        <WizardCard title="Company Email & Mobile Verification" icon={<Mail size={20} />}>
          <WizardInput
            label="Email Address"
            required
            type="email"
            placeholder="partner@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={errors.email}
          />
          <WizardInput
            label="Mobile Number"
            required
            type="tel"
            placeholder="9876543210"
            value={phone}
            maxLength={10}
            onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
            error={errors.phone}
          />

          {displayErrorMsg && <ErrorText>{displayErrorMsg}</ErrorText>}
          {displaySuccessMsg && <SuccessText>{displaySuccessMsg}</SuccessText>}

          <SendOtpBtn type="button" onClick={handleSendOtp} disabled={isAnyLoading}>
            {isAnyLoading ? 'Sending...' : otpSent ? 'Resend OTP' : 'Send OTP'}
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
                error={errors.emailOtp}
              />
              <WizardInput
                label="Enter Phone OTP"
                required
                placeholder="6-digit OTP"
                value={phoneOtp}
                maxLength={6}
                onChange={e => setPhoneOtp(e.target.value.replace(/\D/g, ''))}
                error={errors.phoneOtp}
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
          {errors.agreed && (
            <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: 600, display: 'block', marginTop: '4px' }}>
              {errors.agreed}
            </span>
          )}
        </WizardCard>

        <ButtonWrapper>
          <WizardButton type="submit" disabled={isVerifyLoading}>
            {isVerifyLoading ? 'Verifying...' : 'Submit'} <ArrowRight size={16} />
          </WizardButton>
        </ButtonWrapper>
      </form>

      {showSuccessModal && (
        <ModalOverlay>
          <ModalContent>
            <CheckCircle size={64} color="#10b981" style={{ margin: '0 auto' }} />
            <ModalTitle>Verification Successful</ModalTitle>
            <ModalText>{verifySuccessMessage || 'Your email and phone number have been successfully verified.'}</ModalText>
            <ButtonWrapper>
              <WizardButton type="button" onClick={handleModalContinue}>
                Continue
              </WizardButton>
            </ButtonWrapper>
          </ModalContent>
        </ModalOverlay>
      )}

      {showOtpWarningModal && (
        <ModalOverlay>
          <ModalContent>
            <AlertCircle size={64} color="#ef4444" style={{ margin: '0 auto' }} />
            <ModalTitle>Validate OTP</ModalTitle>
            <ModalText>OTP Validation Required</ModalText>
            <ButtonWrapper>
              <WizardButton type="button" onClick={() => setShowOtpWarningModal(false)}>
                Close
              </WizardButton>
            </ButtonWrapper>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default Step1Verification;
