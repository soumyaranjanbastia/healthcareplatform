import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  width: 100%;
  margin-bottom: 24px;
`;

const SegmentsWrapper = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  margin-bottom: 12px;
`;

const Segment = styled.div`
  flex: 1;
  height: 6px;
  border-radius: 10px;
  background-color: ${props => props.active ? '#009688' : '#e2e8f0'};
  transition: background-color 0.3s ease;
`;

const LabelsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
`;

const StepText = styled.span`
  color: #64748b;
`;

const LabelText = styled.span`
  color: #009688;
  font-weight: 600;
  text-transform: capitalize;
`;

const STEP_LABELS = {
  1: "Basic Details",
  2: "Business Details",
  3: "Bank Details",
  4: "Documents",
  5: "Roster Setup",
  6: "Review Details",
  7: "Verification Completed"
};

const WizardProgressBar = ({ currentStep = 1, totalSteps = 7 }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <Container>
      <SegmentsWrapper>
        {steps.map(step => (
          <Segment key={step} active={step <= currentStep} />
        ))}
      </SegmentsWrapper>
      <LabelsRow>
        <StepText>Step {currentStep} of {totalSteps}</StepText>
        <LabelText>{STEP_LABELS[currentStep] || "Processing"}</LabelText>
      </LabelsRow>
    </Container>
  );
};

export default WizardProgressBar;
