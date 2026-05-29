import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { sendDoctorOtpRequest, resetSendDoctorOtpState } from '../redux/sendDoctorOtpSlice';
import SearchableSelect from '../../auth/components/SearchableSelect';

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

const PhoneInputContainer = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`;

const CountryCode = styled.select`
  width: 90px;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  font-size: 13.5px;
  font-weight: 600;
  outline: none;
  background-color: #ffffff;
  color: #1e293b;
`;

const InfoBanner = styled.div`
  background-color: #e6f9f3;
  border: 1px solid #c2f0e3;
  color: #065f46;
  border-radius: 10px;
  padding: 14px 18px;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
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

const FootNote = styled.p`
  font-size: 11px;
  color: #94a3b8;
  text-align: center;
  font-weight: 600;
  margin: 0;
`;

const ErrorText = styled.span`
  font-size: 11px;
  color: #ef4444;
  font-weight: 600;
  margin-top: 4px;
  display: block;
`;

const AddDoctorVerification = ({ email, setEmail, phone, setPhone, phonePrefix, setPhonePrefix, geoData, onContinue, onOtpKeyReceived }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const { isLoading, isSuccess, isError, errorMessage, data } = useSelector(state => state.sendDoctorOtp);

  const getPhoneLimit = () => {
    if (geoData && Array.isArray(geoData)) {
      const countryObj = geoData.find(c => {
        let code = c.dialCode || c.phoneCode || c.phonePrefix || c.prefix || c.code || '+91';
        let strCode = String(code).trim();
        if (!strCode.startsWith('+')) strCode = '+' + strCode;
        return strCode === phonePrefix;
      });
      if (countryObj && countryObj.digits) {
        return Number(countryObj.digits) || 10;
      }
    }
    return 10;
  };

  const handleNext = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email Address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) newErrors.email = 'Please enter a valid Email Address.';
    }

    const phoneLimit = getPhoneLimit();
    if (!phone) {
      newErrors.phone = 'Mobile Number is required.';
    } else if (phone.length !== phoneLimit) {
      newErrors.phone = `Phone number must be exactly ${phoneLimit} digits.`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    dispatch(sendDoctorOtpRequest({ email, phone: `${phonePrefix}${phone}` }));
  };

  // Derive prefix options dynamically from geoData
  let prefixOptions = [];

  if (geoData && Array.isArray(geoData)) {
    const rawOptions = geoData.map((c) => {
      let code = c.dialCode || c.phoneCode || c.phonePrefix || c.prefix || c.code || '+91';
      let strCode = String(code).trim();
      if (!strCode.startsWith('+')) {
        strCode = '+' + strCode;
      }
      return { value: strCode, label: strCode };
    });

    // Deduplicate options by prefix value
    const seen = new Set();
    prefixOptions = rawOptions.filter(opt => {
      const isDuplicate = seen.has(opt.value);
      seen.add(opt.value);
      return !isDuplicate;
    });

    // Make sure +91 is always an option
    if (!seen.has('+91')) {
      prefixOptions.unshift({ value: '+91', label: '+91' });
    }
  } else {
    prefixOptions = [{ value: '+91', label: '+91' }];
  }

  useEffect(() => {
    if (isSuccess && data) {
      console.log('Send Doctor OTP success, response:', data);
      // Pass OTP keys to parent so OTP step can use them for verification
      if (onOtpKeyReceived) {
        onOtpKeyReceived({
          encryptionKey: data?.result?.data?.encryptionKey || data?.data?.encryptionKey || '',
          userId: data?.result?.data?.userId || data?.data?.userId || '',
          userType: data?.result?.data?.userType || data?.data?.userType || 'provider',
        });
      }
      dispatch(resetSendDoctorOtpState());
      onContinue();
    }
  }, [isSuccess, data]);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      dispatch(resetSendDoctorOtpState());
    };
  }, []);

  return (
    <FormSection>
      <InputGroup>
        <Label>Email</Label>
        <Input 
          type="email" 
          placeholder="Abc@example.com" 
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={errors.email ? { borderColor: '#ef4444', boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.08)' } : {}}
        />
        {errors.email && <ErrorText>{errors.email}</ErrorText>}
      </InputGroup>

      <InputGroup>
        <Label>Mobile Number</Label>
        <PhoneInputContainer>
          <div style={{ width: '120px' }}>
            <SearchableSelect 
              value={phonePrefix} 
              onChange={e => setPhonePrefix(e.target.value)} 
              options={prefixOptions}
            />
          </div>
          <Input 
            type="text" 
            placeholder="Enter number" 
            value={phone}
            maxLength={getPhoneLimit()}
            onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
            style={errors.phone ? { borderColor: '#ef4444', boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.08)' } : {}}
          />
        </PhoneInputContainer>
        {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
      </InputGroup>

      {isError && (
        <ErrorBanner>
          {errorMessage || 'Failed to send OTP. Please try again.'}
        </ErrorBanner>
      )}

      <InfoBanner>
        We'll send you a one-time password (OTP) to verify your Email & Number
      </InfoBanner>

      <ContinueBtn onClick={handleNext} disabled={isLoading}>
        {isLoading ? <><Spinner /> Sending OTP...</> : 'Continue ➜'}
      </ContinueBtn>
      <FootNote>By continuing, you agree to our Terms of Service and Privacy Policy</FootNote>
    </FormSection>
  );
};

export default AddDoctorVerification;
