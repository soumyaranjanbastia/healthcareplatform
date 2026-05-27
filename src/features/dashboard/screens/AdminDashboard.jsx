import React from 'react';
import styled from 'styled-components';
import { Settings, ShieldCheck, UserCheck } from 'lucide-react';

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
  color: #f59e0b;
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
    border-color: rgba(245, 158, 11, 0.2);
  }
`;

const IconWrapper = styled.div`
  color: #f59e0b;
  background: rgba(245, 158, 11, 0.08);
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

const AdminDashboard = () => {
  return (
    <Container>
      <Title>Administrative Node Control</Title>
      <Subtitle>Administrative panel. Setup clinic rosters, monitor staff shifts, and configure clinic nodes.</Subtitle>
      <Grid>
        <ToolCard>
          <IconWrapper><UserCheck size={20} /></IconWrapper>
          <ToolTitle>Staff Roster Control</ToolTitle>
          <ToolDesc>Appoint new doctors/nurses, shift schedules, and manage clinic rotations.</ToolDesc>
        </ToolCard>
        <ToolCard>
          <IconWrapper><ShieldCheck size={20} /></IconWrapper>
          <ToolTitle>Security Logs</ToolTitle>
          <ToolDesc>Verify clinical EMR audit trails, login tokens, and access permissions.</ToolDesc>
        </ToolCard>
        <ToolCard>
          <IconWrapper><Settings size={20} /></IconWrapper>
          <ToolTitle>System Configurations</ToolTitle>
          <ToolDesc>Modify clinic details, specialties lists, medical licenses, and local databases.</ToolDesc>
        </ToolCard>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
