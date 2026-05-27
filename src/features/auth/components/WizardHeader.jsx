import React from 'react';
import styled from 'styled-components';
import { ArrowLeft } from 'lucide-react';

const HeaderWrapper = styled.div`
  margin-bottom: 24px;
  width: 100%;
`;

const BackLink = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #475569;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  margin-bottom: 16px;
  transition: color 0.2s ease;

  &:hover {
    color: #0f172a;
  }
`;

const Title = styled.h1`
  font-family: 'Outfit', sans-serif;
  font-size: 26px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 6px 0;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0;
`;

const WizardHeader = ({ onBack, title = "Registration", subtitle = "Complete your profile to get started" }) => {
  return (
    <HeaderWrapper>
      <BackLink onClick={onBack}>
        <ArrowLeft size={16} /> Back
      </BackLink>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </HeaderWrapper>
  );
};

export default WizardHeader;
