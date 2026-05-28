import React from 'react';
import styled from 'styled-components';
import { FileText } from 'lucide-react';

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

const DocTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const Th = styled.th`
  padding: 12px 16px;
  font-size: 10px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #f1f5f9;
  background-color: #fafbfc;
`;

const Td = styled.td`
  padding: 14px 16px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 13px;
  font-weight: 500;
  color: #1e293b;
`;

const PillBadge = styled.span`
  background-color: #e6f9f3;
  color: #10b981;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 50px;
  width: fit-content;
  display: inline-flex;
`;

const LabOrdersTable = ({ labOrders }) => {
  if (!labOrders || labOrders.length === 0) return null;

  return (
    <DocSection>
      <SectionHeader>
        <FileText size={16} />
        <h3>Lab Orders</h3>
      </SectionHeader>
      <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
        <DocTable>
          <thead>
            <tr>
              <Th>Test</Th>
              <Th>Priority</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {labOrders.map((lab, idx) => (
              <tr key={idx}>
                <Td style={{ fontWeight: '600', color: '#0f172a' }}>{lab.test}</Td>
                <Td>{lab.priority}</Td>
                <Td>
                  <PillBadge>{lab.status}</PillBadge>
                </Td>
              </tr>
            ))}
          </tbody>
        </DocTable>
      </div>
    </DocSection>
  );
};

export default LabOrdersTable;
