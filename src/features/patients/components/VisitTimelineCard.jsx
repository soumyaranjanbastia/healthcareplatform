import React from 'react';
import styled from 'styled-components';
import { Activity } from 'lucide-react';

const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.01);
  position: relative;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 8px 16px -2px rgba(0, 0, 0, 0.03);
    border-color: #cbd5e1;
  }
`;

const TimelineConnector = styled.div`
  position: absolute;
  left: -25px;
  top: 32px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 3px solid #3b82f6;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    top: 9px;
    left: 2px;
    width: 2px;
    height: 300px;
    background-color: #e2e8f0;
    z-index: 1;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 12px;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DateText = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
`;

const SubText = styled.span`
  font-size: 13px;
  color: #64748b;
  font-weight: 500;
`;

const TypeBadge = styled.span`
  background-color: ${props => props.type === 'Online' ? '#e0f2fe' : '#f1f5f9'};
  color: ${props => props.type === 'Online' ? '#0369a1' : '#475569'};
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 50px;
  height: fit-content;
`;

const GridContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Value = styled.span`
  font-size: 13px;
  color: #1e293b;
  font-weight: 600;
  line-height: 1.4;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f1f5f9;
  padding-top: 16px;
  margin-top: 4px;
  flex-wrap: wrap;
  gap: 12px;
`;

const FollowUpText = styled.span`
  font-size: 13px;
  color: #64748b;
  font-weight: 600;
  
  &::before {
    content: 'Follow-Up: ';
    color: #94a3b8;
    font-weight: 500;
  }
`;

const LinkButton = styled.button`
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    color: #1d4ed8;
    transform: translateX(2px);
  }
`;

const VisitTimelineCard = ({ visit, onSelect }) => {
  return (
    <div style={{ position: 'relative' }}>
      <TimelineConnector />
      <Card>
        <Header>
          <HeaderLeft>
            <DateText>{visit.date}</DateText>
            <SubText>{visit.doctor} • {visit.department} • {visit.room}</SubText>
          </HeaderLeft>
          <TypeBadge type={visit.type}>{visit.type}</TypeBadge>
        </Header>

        <GridContent>
          <InfoBox>
            <Label>Symptoms</Label>
            <Value>{visit.symptoms}</Value>
          </InfoBox>
          <InfoBox>
            <Label>Diagnosis</Label>
            <Value>{visit.diagnosis}</Value>
          </InfoBox>
          <InfoBox>
            <Label>Prescription</Label>
            <Value>
              {visit.prescription && visit.prescription.length > 0
                ? visit.prescription.map(p => p.medicine).join(', ')
                : 'None'}
            </Value>
          </InfoBox>
          <InfoBox>
            <Label>Lab Orders</Label>
            <Value>
              {visit.labOrders && visit.labOrders.length > 0
                ? visit.labOrders.map(l => l.test).join(', ')
                : 'None'}
            </Value>
          </InfoBox>
        </GridContent>

        <Footer>
          <FollowUpText>{visit.followUp || 'None'}</FollowUpText>
          <LinkButton onClick={() => onSelect(visit)}>
            View Full Consultation →
          </LinkButton>
        </Footer>
      </Card>
    </div>
  );
};

export default VisitTimelineCard;
