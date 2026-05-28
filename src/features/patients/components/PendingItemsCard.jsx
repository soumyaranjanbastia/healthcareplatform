import React from 'react';
import styled from 'styled-components';
import { FileText } from 'lucide-react';

const AlertCard = styled.div`
  background-color: #fbfbfd;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
  flex: 1;
`;

const AlertContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  h5 {
    font-size: 13px;
    font-weight: 700;
    color: #475569;
    margin: 0;
  }

  p {
    font-size: 12px;
    color: #64748b;
    margin: 0;
    font-weight: 500;
    line-height: 1.4;
  }
`;

const PendingItemsCard = ({ pendingItems }) => {
  return (
    <AlertCard>
      <FileText size={18} color="#f97316" style={{ marginTop: 2 }} />
      <AlertContent>
        <h5>Pending Items</h5>
        <p>{pendingItems || 'No pending labs or follow-ups'}</p>
      </AlertContent>
    </AlertCard>
  );
};

export default PendingItemsCard;
