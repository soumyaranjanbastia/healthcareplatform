import React from 'react';
import styled from 'styled-components';
import { Award, CheckCircle2 } from 'lucide-react';

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

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const InfoPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 160px 1fr;
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

const StatusPill = styled.span`
  background-color: #e6f9f3;
  color: #10b981;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  width: fit-content;
`;

const ChecklistPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-left: 1px solid #f1f5f9;
  padding-left: 24px;

  @media (max-width: 768px) {
    border-left: none;
    padding-left: 0;
    border-top: 1px solid #f1f5f9;
    padding-top: 20px;
  }
`;

const CheckTitle = styled.h4`
  font-size: 12px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  margin: 0;
  margin-bottom: 4px;
`;

const CheckRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
`;

const VerifiedBadge = styled.span`
  color: #10b981;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 700;
`;

const MedicalLicenseCard = ({ doctor }) => {
  return (
    <Card>
      <SectionHeader>
        <Award size={16} />
        <h3>Medical License & Credentials</h3>
      </SectionHeader>

      <LayoutGrid>
        <InfoPanel>
          <Row>
            <Label>Medical License No:</Label>
            <Value>{doctor.licenseNo}</Value>
          </Row>
          <Row>
            <Label>Issue Date:</Label>
            <Value>{doctor.licenseIssueDate}</Value>
          </Row>
          <Row>
            <Label>Expiry Date:</Label>
            <Value>{doctor.licenseExpiryDate}</Value>
          </Row>
          <Row>
            <Label>License Status:</Label>
            <StatusPill>{doctor.licenseStatus}</StatusPill>
          </Row>
          <Row>
            <Label>DEA Number:</Label>
            <Value>{doctor.deaNumber}</Value>
          </Row>
        </InfoPanel>

        <ChecklistPanel>
          <CheckTitle>Verification Status</CheckTitle>
          <CheckRow>
            <span>Aadhaar</span>
            <VerifiedBadge><CheckCircle2 size={13} /> Verified</VerifiedBadge>
          </CheckRow>
          <CheckRow>
            <span>PAN Card</span>
            <VerifiedBadge><CheckCircle2 size={13} /> Verified</VerifiedBadge>
          </CheckRow>
          <CheckRow>
            <span>Medical License</span>
            <VerifiedBadge><CheckCircle2 size={13} /> Verified</VerifiedBadge>
          </CheckRow>
          <CheckRow>
            <span>Education</span>
            <VerifiedBadge><CheckCircle2 size={13} /> Verified</VerifiedBadge>
          </CheckRow>
          <CheckRow>
            <span>Background Check</span>
            <VerifiedBadge><CheckCircle2 size={13} /> Verified</VerifiedBadge>
          </CheckRow>
        </ChecklistPanel>
      </LayoutGrid>
    </Card>
  );
};

export default MedicalLicenseCard;
