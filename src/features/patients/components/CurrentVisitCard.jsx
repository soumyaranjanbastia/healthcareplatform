import React from 'react';
import styled from 'styled-components';

const RightCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
  flex: 1;
`;

const CardTitle = styled.h4`
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
`;

const VisitDetailsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const VisitRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
`;

const VisitLabel = styled.span`
  color: #64748b;
  font-weight: 500;
`;

const VisitValue = styled.span`
  color: ${props => props.token ? '#2563eb' : '#1e293b'};
  font-weight: ${props => props.token || props.bold ? '700' : '600'};
  font-size: ${props => props.token ? '15px' : '13px'};
`;

const CurrentVisitCard = ({ currentVisit }) => {
  if (!currentVisit) {
    return (
      <RightCard style={{ justifyContent: 'center', alignItems: 'center', height: '120px', backgroundColor: '#f8fafc' }}>
        <span style={{ fontSize: 13, color: '#64748b', fontWeight: '500', fontStyle: 'italic' }}>
          No active visit today
        </span>
      </RightCard>
    );
  }

  return (
    <RightCard>
      <CardTitle>Current Visit</CardTitle>
      <VisitDetailsList>
        <VisitRow>
          <VisitLabel>Token</VisitLabel>
          <VisitValue token>{currentVisit.token}</VisitValue>
        </VisitRow>
        <VisitRow>
          <VisitLabel>Doctor</VisitLabel>
          <VisitValue bold>{currentVisit.doctor}</VisitValue>
        </VisitRow>
        <VisitRow>
          <VisitLabel>Room</VisitLabel>
          <VisitValue>{currentVisit.room}</VisitValue>
        </VisitRow>
        <VisitRow>
          <VisitLabel>Time</VisitLabel>
          <VisitValue>{currentVisit.time}</VisitValue>
        </VisitRow>
        <VisitRow>
          <VisitLabel>Status</VisitLabel>
          <span
            style={{
              backgroundColor: currentVisit.status === 'In-consultation' ? '#e0f2fe' : '#fff7ed',
              color: currentVisit.status === 'In-consultation' ? '#0284c7' : '#f97316',
              fontSize: '11px',
              fontWeight: '700',
              padding: '4px 10px',
              borderRadius: '50px'
            }}
          >
            {currentVisit.status}
          </span>
        </VisitRow>
      </VisitDetailsList>
    </RightCard>
  );
};

export default CurrentVisitCard;
