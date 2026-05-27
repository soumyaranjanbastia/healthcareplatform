import React from 'react';
import styled, { keyframes } from 'styled-components';

const scaleUp = keyframes`
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const StepTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  text-align: center;
`;

const StepSubtitle = styled.p`
  font-size: 13px;
  color: #64748b;
  margin-top: 6px;
  margin-bottom: 30px;
  text-align: center;
  font-weight: 500;
`;

const DoctorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 900px;
  animation: ${scaleUp} 0.3s ease-out;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const DoctorProfileCard = styled.div`
  border: 2px solid ${props => props.selected ? '#009688' : '#e2e8f0'};
  background-color: ${props => props.selected ? '#e6f9f3' : '#ffffff'};
  border-radius: 14px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &:hover {
    border-color: #009688;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.03);
  }
`;

const DocAvatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #e0f2fe;
  color: #0284c7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
`;

const CardTitle = styled.h4`
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
`;

const DocBadge = styled.span`
  background-color: #d1fae5;
  color: #065f46;
  font-size: 9px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 50px;
  width: fit-content;
  text-transform: uppercase;
`;

const DoctorSelectionStep = ({ doctors, selectedDoctor, onSelectDoctor }) => {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <StepTitle>Select Doctor</StepTitle>
      <StepSubtitle>Assign an active healthcare provider for consultation</StepSubtitle>

      <DoctorGrid>
        {doctors.map(doc => (
          <DoctorProfileCard 
            key={doc.id}
            selected={selectedDoctor?.id === doc.id}
            onClick={() => onSelectDoctor(doc)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <DocAvatar>{doc.avatar}</DocAvatar>
              <div>
                <CardTitle>{doc.name}</CardTitle>
                <p style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>{doc.specialty}</p>
              </div>
            </div>
            
            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <DocBadge>Available</DocBadge>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#009688' }}>
                ₹{doc.fee}
              </span>
            </div>
          </DoctorProfileCard>
        ))}
      </DoctorGrid>
    </div>
  );
};

export default DoctorSelectionStep;
