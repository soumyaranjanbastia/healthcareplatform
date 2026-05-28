import React from 'react';
import styled from 'styled-components';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';

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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const DocBox = styled.div`
  border: 1px solid #e2e8f0;
  background-color: #f8fafc;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DocMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  span:first-child {
    font-size: 13px;
    font-weight: 700;
    color: #334155;
  }

  span:last-child {
    font-size: 12px;
    font-weight: 600;
    color: #64748b;
  }
`;

const VerifiedPill = styled.span`
  background-color: #e6f9f3;
  color: #10b981;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const VerificationDocsCard = ({ doctor }) => {
  return (
    <Card>
      <SectionHeader>
        <ShieldAlert size={16} />
        <h3>Identification & Verification Documents</h3>
      </SectionHeader>

      <Grid>
        <DocBox>
          <DocMeta>
            <span>Aadhaar Card</span>
            <span>{doctor.aadhaar}</span>
          </DocMeta>
          <VerifiedPill>
            <CheckCircle2 size={12} /> Verified
          </VerifiedPill>
        </DocBox>

        <DocBox>
          <DocMeta>
            <span>PAN Card</span>
            <span>{doctor.pan}</span>
          </DocMeta>
          <VerifiedPill>
            <CheckCircle2 size={12} /> Verified
          </VerifiedPill>
        </DocBox>
      </Grid>
    </Card>
  );
};

export default VerificationDocsCard;
