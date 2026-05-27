import React from 'react';
import styled from 'styled-components';
import { Activity, Heart, FileText } from 'lucide-react';

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
  color: #0ea5e9;
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
    border-color: rgba(14, 165, 233, 0.2);
  }
`;

const IconWrapper = styled.div`
  color: #0ea5e9;
  background: rgba(14, 165, 233, 0.08);
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

const DoctorDashboard = () => {
  return (
    <Container>
      <Title>Clinical Physician Node</Title>
      <Subtitle>Welcome, Doctor. View patient records, telemetry, and diagnose clinical triages.</Subtitle>
      <Grid>
        <ToolCard>
          <IconWrapper><Activity size={20} /></IconWrapper>
          <ToolTitle>Live Vitals Monitor</ToolTitle>
          <ToolDesc>Tune in to active ECG waveform simulations and triaged warnings.</ToolDesc>
        </ToolCard>
        <ToolCard>
          <IconWrapper><FileText size={20} /></IconWrapper>
          <ToolTitle>Medical Records (EMR)</ToolTitle>
          <ToolDesc>View and update patient clinical history, summaries, and triages.</ToolDesc>
        </ToolCard>
        <ToolCard>
          <IconWrapper><Heart size={20} /></IconWrapper>
          <ToolTitle>Prescriptions Panel</ToolTitle>
          <ToolDesc>Draft and submit digital pharmacy requests and dosage instructions.</ToolDesc>
        </ToolCard>
      </Grid>
    </Container>
  );
};

export default DoctorDashboard;
