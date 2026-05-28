import React from 'react';
import styled from 'styled-components';
import { BookOpen } from 'lucide-react';

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

const PrescriptionTable = ({ prescription }) => {
  if (!prescription || prescription.length === 0) return null;

  return (
    <DocSection>
      <SectionHeader>
        <BookOpen size={16} />
        <h3>Prescription</h3>
      </SectionHeader>
      <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
        <DocTable>
          <thead>
            <tr>
              <Th>Medicine</Th>
              <Th>Dosage</Th>
              <Th>Frequency</Th>
              <Th>Duration</Th>
            </tr>
          </thead>
          <tbody>
            {prescription.map((presc, idx) => (
              <tr key={idx}>
                <Td style={{ fontWeight: '600', color: '#0f172a' }}>{presc.medicine}</Td>
                <Td>{presc.dosage}</Td>
                <Td>{presc.frequency}</Td>
                <Td>{presc.duration}</Td>
              </tr>
            ))}
          </tbody>
        </DocTable>
      </div>
    </DocSection>
  );
};

export default PrescriptionTable;
