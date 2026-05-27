import React from 'react';
import styled from 'styled-components';

const CardWrapper = styled.div`
  background: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);
  padding: 24px;
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2`
  font-family: 'Outfit', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Subtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #64748b;
  margin: 0;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #f1f5f9;
  width: 100%;
  margin-bottom: 20px;
`;

const CardContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const WizardCard = ({ title, subtitle, icon, children, noDivider = false }) => {
  return (
    <CardWrapper>
      {(title || subtitle) && (
        <CardHeader>
          <TitleRow>
            {icon && <span style={{ color: '#009688', display: 'flex', alignItems: 'center' }}>{icon}</span>}
            <Title>{title}</Title>
          </TitleRow>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </CardHeader>
      )}
      {!noDivider && (title || subtitle) && <Divider />}
      <CardContent>{children}</CardContent>
    </CardWrapper>
  );
};

export default WizardCard;
