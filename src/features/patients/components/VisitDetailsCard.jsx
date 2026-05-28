import React from 'react';
import styled from 'styled-components';
import { Calendar } from 'lucide-react';

const DocSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  padding: 20px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #009688;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 12px;

  h3 {
    font-size: 14px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }
`;

const VisitGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;

  @media (max-width: 962px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  span:first-child {
    font-size: 11px;
    font-weight: 600;
    color: #94a3b8;
    text-transform: uppercase;
  }

  span:last-child {
    font-size: 13px;
    font-weight: 600;
    color: #1e293b;
  }
`;

const RoomText = styled.span`
  color: #009688 !important;
  background-color: #e6f9f3;
  padding: 2px 8px;
  border-radius: 4px;
  width: fit-content;
`;

const VisitDetailsCard = ({ visit }) => {
  return (
    <DocSection>
      <SectionHeader>
        <Calendar size={16} />
        <h3>Visit Details</h3>
      </SectionHeader>
      <VisitGrid>
        <GridItem>
          <span>Visit Date</span>
          <span>{visit.date}</span>
        </GridItem>
        <GridItem>
          <span>Doctor</span>
          <span>{visit.doctor}</span>
        </GridItem>
        <GridItem>
          <span>Department</span>
          <span>{visit.department}</span>
        </GridItem>
        <GridItem>
          <span>OPD Room</span>
          <RoomText>{visit.room}</RoomText>
        </GridItem>
        <GridItem>
          <span>Consultation Type</span>
          <span>{visit.type}</span>
        </GridItem>
      </VisitGrid>
    </DocSection>
  );
};

export default VisitDetailsCard;
