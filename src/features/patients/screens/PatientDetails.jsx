import React from 'react';
import styled from 'styled-components';
import { ArrowLeft } from 'lucide-react';
import PatientInfoCard from '../components/PatientInfoCard';
import VisitTimelineCard from '../components/VisitTimelineCard';
import CurrentVisitCard from '../components/CurrentVisitCard';
import PendingItemsCard from '../components/PendingItemsCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const BackBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #1e293b;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8fafc;
    color: #009688;
    transform: translateX(-2px);
  }
`;

const HeaderText = styled.div`
  h2 {
    font-size: 20px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }
  p {
    font-size: 13px;
    color: #64748b;
    font-weight: 500;
    margin-top: 2px;
  }
`;

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr 280px;
  gap: 24px;
  align-items: start;

  @media (max-width: 1200px) {
    grid-template-columns: 280px 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TimelineColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TimelineTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  h3 {
    font-size: 16px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }

  span {
    font-size: 12px;
    font-weight: 600;
    color: #64748b;
  }
`;

const TimelineList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-left: 24px;
  border-left: 2px dashed #e2e8f0;
  margin-left: 8px;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 1200px) {
    grid-column: span 2;
    flex-direction: row;
  }

  @media (max-width: 768px) {
    grid-column: span 1;
    flex-direction: column;
  }
`;

const PatientDetails = ({ patient, onBack, onSelectConsultation }) => {
  return (
    <Container>
      <Header>
        <BackBtn onClick={onBack}>
          <ArrowLeft size={18} />
        </BackBtn>
        <HeaderText>
          <h2>{patient.name}</h2>
          <p>{patient.id} • {patient.fileNo}</p>
        </HeaderText>
      </Header>

      <LayoutGrid>
        {/* Left Patient Info Card */}
        <PatientInfoCard patient={patient} />

        {/* Center Timeline */}
        <TimelineColumn>
          <TimelineTitle>
            <h3>Consultation Timeline</h3>
            <span>{patient.visits?.length || 0} visits recorded</span>
          </TimelineTitle>

          <TimelineList>
            {patient.visits && patient.visits.length > 0 ? (
              patient.visits.map((visit) => (
                <VisitTimelineCard
                  key={visit.date}
                  visit={visit}
                  onSelect={(v) => onSelectConsultation(patient, v)}
                />
              ))
            ) : (
              <span style={{ fontSize: 13, color: '#64748b', fontStyle: 'italic' }}>
                No consultation visits on record
              </span>
            )}
          </TimelineList>
        </TimelineColumn>

        {/* Right Active Visit and Actions */}
        <RightColumn>
          <CurrentVisitCard currentVisit={patient.currentVisit} />
          <PendingItemsCard
            pendingItems={patient.currentVisit ? patient.currentVisit.pendingItems : 'No pending labs or follow-ups'}
          />
        </RightColumn>
      </LayoutGrid>
    </Container>
  );
};

export default PatientDetails;
