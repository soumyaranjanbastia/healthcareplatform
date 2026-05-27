import React from 'react';
import styled from 'styled-components';
import { Calendar, Users, Clock } from 'lucide-react';

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
  color: #10b981;
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
    border-color: rgba(16, 185, 129, 0.2);
  }
`;

const IconWrapper = styled.div`
  color: #10b981;
  background: rgba(16, 185, 129, 0.08);
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

const ReceptionistDashboard = () => {
  return (
    <Container>
      <Title>Receptionist Desk</Title>
      <Subtitle>Welcome to the Front Desk module. Patient triage and registration operations.</Subtitle>
      <Grid>
        <ToolCard>
          <IconWrapper><Users size={20} /></IconWrapper>
          <ToolTitle>Patient Check-In</ToolTitle>
          <ToolDesc>Register walk-ins and verify existing patient profiles instantly.</ToolDesc>
        </ToolCard>
        <ToolCard>
          <IconWrapper><Calendar size={20} /></IconWrapper>
          <ToolTitle>Appointment Logs</ToolTitle>
          <ToolDesc>Schedule or modify patient visits, and assign them to doctors.</ToolDesc>
        </ToolCard>
        <ToolCard>
          <IconWrapper><Clock size={20} /></IconWrapper>
          <ToolTitle>Queue Manager</ToolTitle>
          <ToolDesc>Audit real-time queue states and triage waiting rooms.</ToolDesc>
        </ToolCard>
      </Grid>
    </Container>
  );
};

export default ReceptionistDashboard;
