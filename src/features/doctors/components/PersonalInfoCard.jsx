import React from 'react';
import styled from 'styled-components';
import { UserCheck } from 'lucide-react';

const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.01);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 12px;
  color: #009688;

  h3 {
    font-size: 15px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 140px 1fr;
  font-size: 13px;
  line-height: 1.4;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 4px;
  }
`;

const Label = styled.span`
  color: #94a3b8;
  font-weight: 500;
`;

const Value = styled.span`
  color: #1e293b;
  font-weight: 600;
`;

const PersonalInfoCard = ({ doctor }) => {
  return (
    <Card>
      <SectionHeader>
        <UserCheck size={16} />
        <h3>Personal Information</h3>
      </SectionHeader>

      <Grid>
        <Row>
          <Label>Full Name:</Label>
          <Value>{doctor.name}</Value>
        </Row>
        <Row>
          <Label>Date of Birth:</Label>
          <Value>{doctor.dob}</Value>
        </Row>
        <Row>
          <Label>Employee ID:</Label>
          <Value>{doctor.empId}</Value>
        </Row>
        <Row>
          <Label>Phone:</Label>
          <Value>{doctor.phone}</Value>
        </Row>
        <Row>
          <Label>Email:</Label>
          <Value>{doctor.email}</Value>
        </Row>
        <Row>
          <Label>Address:</Label>
          <Value>{doctor.address}</Value>
        </Row>
      </Grid>
    </Card>
  );
};

export default PersonalInfoCard;
