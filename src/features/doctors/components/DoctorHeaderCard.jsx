import React from 'react';
import styled from 'styled-components';
import { ShieldCheck, User, Calendar, CreditCard } from 'lucide-react';

const BlueHeaderCard = styled.div`
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  border-radius: 16px;
  padding: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  box-shadow: 0 10px 25px rgba(37, 99, 235, 0.15);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding: 24px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const InitialsBox = styled.div`
  width: 96px;
  height: 96px;
  background-color: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Name = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
`;

const Role = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
`;

const MetaList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 4px;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.75);
  font-weight: 500;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 24px;

  @media (max-width: 768px) {
    align-items: flex-start;
    width: 100%;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 16px;
  }
`;

const StatusPill = styled.div`
  background-color: #d1fae5;
  color: #065f46;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const CardWatermark = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  opacity: 0.65;

  span:first-child {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  span:last-child {
    font-size: 10px;
    font-weight: 500;
    margin-top: 2px;
  }

  @media (max-width: 768px) {
    align-items: flex-start;
    text-align: left;
  }
`;

const DoctorHeaderCard = ({ doctor }) => {
  return (
    <BlueHeaderCard>
      <LeftSection>
        <InitialsBox>{doctor.avatar}</InitialsBox>
        <TextBlock>
          <Name>{doctor.name}</Name>
          <Role>{doctor.role}</Role>
          
          <MetaList>
            <MetaRow>
              <CreditCard size={13} />
              <span>ID: {doctor.empId}</span>
            </MetaRow>
            <MetaRow>
              <User size={13} />
              <span>{doctor.department}</span>
            </MetaRow>
            <MetaRow>
              <Calendar size={13} />
              <span>Joined: {doctor.joinDate}</span>
            </MetaRow>
          </MetaList>
        </TextBlock>
      </LeftSection>

      <RightSection>
        <StatusPill>
          <ShieldCheck size={14} /> Active
        </StatusPill>
        
        <CardWatermark>
          <span>Hospital Staff ID Card</span>
          <span>Valid through employment</span>
        </CardWatermark>
      </RightSection>
    </BlueHeaderCard>
  );
};

export default DoctorHeaderCard;
