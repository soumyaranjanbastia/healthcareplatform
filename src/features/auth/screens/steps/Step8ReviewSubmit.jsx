import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { registerDoctorRequest, resetRegisterDoctor } from '../../redux/registerDoctorSlice';
import WizardCard from '../../components/WizardCard';
import WizardButton, { ButtonWrapper } from '../../components/WizardButton';

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  margin-top: 10px;
`;

const ReviewRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8fafc;
  border: 1px solid #f1f5f9;
  border-radius: 10px;
  padding: 14px 18px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
`;

const RowLabel = styled.span`
  color: #64748b;
  font-weight: 500;
`;

const RowValue = styled.span`
  color: #0f172a;
  font-weight: 600;
  text-align: right;
`;

const ConsentBox = styled.div`
  background-color: #fffbeb;
  border: 1px solid #fef3c7;
  border-radius: 10px;
  padding: 14px 16px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #b45309;
  font-weight: 500;
  width: 100%;
  margin-top: 20px;
  text-align: center;
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Spinner = styled(Loader2)`
  animation: ${spin} 1s linear infinite;
  margin-left: 8px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background: #ffffff;
  padding: 40px;
  border-radius: 20px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
`;

const SuccessIconWrapper = styled.div`
  width: 80px;
  height: 80px;
  background: #dcfce7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px auto;
  color: #16a34a;
`;

const ModalTitle = styled.h2`
  font-family: 'Outfit', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 12px;
`;

const ModalText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 30px;
`;

const ErrorText = styled.div`
  color: #ef4444;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 16px;
  text-align: center;
  font-family: 'Inter', sans-serif;
`;

const Step8ReviewSubmit = ({ onNext, onPrev, data }) => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.registerDoctor);

  useEffect(() => {
    // Reset state when mounting just in case
    dispatch(resetRegisterDoctor());
  }, [dispatch]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Remove sensitive OTP and key fields before submitting/logging
    const { emailKey, phoneKey, emailOtp, phoneOtp, ...sanitizedData } = data;
    
    console.log('Final Registration Payload:', sanitizedData);
    
    // Dispatch the API request instead of calling onNext directly
    dispatch(registerDoctorRequest(sanitizedData));
  };

  const handleGoToDashboard = () => {
    // Calling onNext will trigger handleFinish in Registration.jsx,
    // which dispatches onSignup and navigates to the Admin Dashboard.
    dispatch(resetRegisterDoctor());
    onNext();
  };

  return (
    <>
      {success && (
        <ModalOverlay>
          <ModalContent>
            <SuccessIconWrapper>
              <CheckCircle size={40} />
            </SuccessIconWrapper>
            <ModalTitle>Registration Successful!</ModalTitle>
            <ModalText>
              Your account has been created successfully. Welcome to Swastyam Connect!
            </ModalText>
            <WizardButton type="button" onClick={handleGoToDashboard} style={{ width: '100%', justifyContent: 'center' }}>
              Go to Dashboard <ArrowRight size={16} />
            </WizardButton>
          </ModalContent>
        </ModalOverlay>
      )}

      <form onSubmit={handleFormSubmit}>
        <WizardCard title="Review & Submit" icon={<CheckCircle size={20} color="#009688" />}>
          <ReviewList>
            <ReviewRow>
              <RowLabel>Email</RowLabel>
              <RowValue>{data.contactEmail || 'Not provided'}</RowValue>
            </ReviewRow>
            <ReviewRow>
              <RowLabel>Mobile</RowLabel>
              <RowValue>{data.contactPhone ? `${data.phonePrefix} ${data.contactPhone}` : 'Not provided'}</RowValue>
            </ReviewRow>
            <ReviewRow>
              <RowLabel>Name</RowLabel>
              <RowValue>{data.fullName || 'Not provided'}</RowValue>
            </ReviewRow>
            <ReviewRow>
              <RowLabel>Business</RowLabel>
              <RowValue>{data.businessName || 'Not provided'}</RowValue>
            </ReviewRow>
            <ReviewRow>
              <RowLabel>City</RowLabel>
              <RowValue>{data.city || 'Not provided'}</RowValue>
            </ReviewRow>
            <ReviewRow>
              <RowLabel>Screens</RowLabel>
              <RowValue>{data.screens || '1'}</RowValue>
            </ReviewRow>
          </ReviewList>

          <ConsentBox>
            By submitting, you agree to our Terms of Service and Privacy Policy
          </ConsentBox>
        </WizardCard>

        {error && <ErrorText>{error}</ErrorText>}

        <ButtonWrapper>
          <WizardButton variant="secondary" onClick={onPrev} disabled={loading}>
            Previous
          </WizardButton>
          <WizardButton type="submit" disabled={loading}>
            {loading ? (
              <>
                Submitting <Spinner size={16} />
              </>
            ) : (
              <>
                Submit Application <ArrowRight size={16} />
              </>
            )}
          </WizardButton>
        </ButtonWrapper>
      </form>
    </>
  );
};

export default Step8ReviewSubmit;
