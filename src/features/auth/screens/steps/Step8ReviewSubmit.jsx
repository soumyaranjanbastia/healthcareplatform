import React from 'react';
import styled from 'styled-components';
import { ArrowRight, CheckCircle } from 'lucide-react';
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

const Step8ReviewSubmit = ({ onNext, onPrev, data }) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onNext(); // Transition to success step screen!
  };

  return (
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

      <ButtonWrapper>
        <WizardButton variant="secondary" onClick={onPrev}>
          Previous
        </WizardButton>
        <WizardButton type="submit">
          Submit Application <ArrowRight size={16} />
        </WizardButton>
      </ButtonWrapper>
    </form>
  );
};

export default Step8ReviewSubmit;
