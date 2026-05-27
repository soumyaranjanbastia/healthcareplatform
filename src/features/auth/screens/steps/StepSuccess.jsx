import React from 'react';
import styled from 'styled-components';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import WizardCard from '../../components/WizardCard';
import WizardButton from '../../components/WizardButton';

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px 0;
`;

const IconWrapper = styled.div`
  color: #10b981;
  background-color: #ecfdf5;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: 0 10px 25px rgba(16, 185, 129, 0.1);
`;

const HeaderText = styled.h2`
  font-family: 'Outfit', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
`;

const DescText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #64748b;
  line-height: 1.5;
  max-width: 320px;
  margin-bottom: 28px;
`;

const SummaryTable = styled.div`
  background-color: #fafafa;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  width: 100%;
  padding: 16px 20px;
  margin-bottom: 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-family: 'Inter', sans-serif;
`;

const LabelText = styled.span`
  color: #64748b;
  font-weight: 500;
`;

const ValueText = styled.span`
  color: #1e293b;
  font-weight: 600;
`;

const StepSuccess = ({ onFinish, data }) => {
  return (
    <WizardCard noDivider>
      <SuccessContainer>
        <IconWrapper>
          <CheckCircle2 size={36} />
        </IconWrapper>
        <HeaderText>Clinic Profile Complete!</HeaderText>
        <DescText>
          Your Swastyam Connect onboarding profile has been initialized successfully. Let's head inside to access your main clinical panels.
        </DescText>

        <SummaryTable>
          <SummaryRow>
            <LabelText>Clinic Business Name</LabelText>
            <ValueText>{data.businessName || 'HealthFirst Pharmacy'}</ValueText>
          </SummaryRow>
          <SummaryRow>
            <LabelText>Primary Administrator</LabelText>
            <ValueText>{data.fullName || 'Dr. Abhinav Kumar'}</ValueText>
          </SummaryRow>
          <SummaryRow>
            <LabelText>Clinic Location</LabelText>
            <ValueText>{data.city ? `${data.city}, ${data.state}` : 'Mumbai, MH'}</ValueText>
          </SummaryRow>
        </SummaryTable>

        <WizardButton onClick={onFinish}>
          Enter Clinic Dashboard <ChevronRight size={16} />
        </WizardButton>
      </SuccessContainer>
    </WizardCard>
  );
};

export default StepSuccess;
