import React from 'react';
import styled from 'styled-components';
import { CreditCard, DollarSign, TrendingUp, BarChart2 } from 'lucide-react';

const Container = styled.div`
  padding: 24px;
  background: #0f1624;
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 20px;
  font-family: 'Outfit', sans-serif;
  color: #ffffff;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #a855f7;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #64748b;
  margin-bottom: 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const ToolCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  padding: 20px;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.2s ease;
  &:hover {
    transform: translateY(-2px);
    border-color: rgba(168, 85, 247, 0.2);
  }
`;

const IconWrapper = styled.div`
  color: #a855f7;
  background: rgba(168, 85, 247, 0.08);
  width: fit-content;
  padding: 10px;
  border-radius: 10px;
`;

const ToolTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
`;

const ToolDesc = styled.p`
  font-size: 12px;
  color: #64748b;
  line-height: 1.5;
`;

const FinanceDashboard = () => {
  return (
    <Container>
      <Title>Financial Operations Console</Title>
      <Subtitle>Welcome to the Clinical Billing & Claims module. Generate invoices, track transactions, and audit revenue.</Subtitle>
      <Grid>
        <ToolCard>
          <IconWrapper><CreditCard size={20} /></IconWrapper>
          <ToolTitle>Invoice Generator</ToolTitle>
          <ToolDesc>Produce printable billing receipts matching patient triages and laboratory metrics.</ToolDesc>
        </ToolCard>
        <ToolCard>
          <IconWrapper><DollarSign size={20} /></IconWrapper>
          <ToolTitle>Claims Audit</ToolTitle>
          <ToolDesc>Review and authorize insurance medical claims, payouts, and settlements.</ToolDesc>
        </ToolCard>
        <ToolCard>
          <IconWrapper><TrendingUp size={20} /></IconWrapper>
          <ToolTitle>Clinic Ledger</ToolTitle>
          <ToolDesc>Generate automated monthly revenue charts, income audit trails, and statements.</ToolDesc>
        </ToolCard>
      </Grid>
    </Container>
  );
};

export default FinanceDashboard;
