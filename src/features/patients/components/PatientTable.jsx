import React from 'react';
import styled from 'styled-components';
import { Eye, FileText } from 'lucide-react';

const TableContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const Th = styled.th`
  padding: 16px 24px;
  font-size: 10px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #f1f5f9;
  white-space: nowrap;
`;

const Td = styled.td`
  padding: 20px 24px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 13px;
  vertical-align: middle;
  white-space: nowrap;
`;

const Tr = styled.tr`
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #fafbfc;
  }
`;

const PatientIdCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  span:first-child {
    font-weight: 700;
    color: #1e293b;
  }

  span:last-child {
    font-size: 11px;
    font-weight: 600;
    color: #94a3b8;
  }
`;

const PatientNameCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  span:first-child {
    font-weight: 700;
    color: #0f172a;
    font-size: 14px;
  }

  span:last-child {
    font-size: 11px;
    font-weight: 600;
    color: #64748b;
  }
`;

const PillBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 50px;
  
  background-color: ${props => {
    if (props.type === 'Paid' || props.type === 'Completed') return '#e6f9f3';
    if (props.type === 'Pending' || props.type === 'Waiting') return '#fff7ed';
    if (props.type === 'In Consultation') return '#e0f2fe';
    return '#f1f5f9';
  }};
  
  color: ${props => {
    if (props.type === 'Paid' || props.type === 'Completed') return '#10b981';
    if (props.type === 'Pending' || props.type === 'Waiting') return '#f97316';
    if (props.type === 'In Consultation') return '#0284c7';
    return '#475569';
  }};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  transition: all 0.15s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${props => props.view ? '#009688' : '#3b82f6'};
    background-color: ${props => props.view ? '#e6f9f3' : '#e0f2fe'};
  }
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const PatientTable = ({ filteredPatients, onSelectPatient, onSelectConsultation }) => {
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <Th>Patient ID</Th>
            <Th>Name</Th>
            <Th>Phone</Th>
            <Th>Doctor</Th>
            <Th>Last Visit</Th>
            <Th>Payment</Th>
            <Th>Type</Th>
            <Th>Status</Th>
            <Th style={{ textAlign: 'center' }}>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <Tr key={patient.id}>
                <Td>
                  <PatientIdCol>
                    <span>{patient.id}</span>
                    <span>{patient.fileNo}</span>
                  </PatientIdCol>
                </Td>
                <Td>
                  <PatientNameCol>
                    <span>{patient.name}</span>
                    <span>{patient.age}Y • {patient.gender}</span>
                  </PatientNameCol>
                </Td>
                <Td style={{ fontWeight: '500', color: '#1e293b' }}>{patient.phone}</Td>
                <Td style={{ fontWeight: '500', color: '#1e293b' }}>{patient.doctor}</Td>
                <Td style={{ fontWeight: '500', color: '#64748b' }}>{patient.lastVisit}</Td>
                <Td>
                  <PillBadge type={patient.payment}>{patient.payment}</PillBadge>
                </Td>
                <Td style={{ fontWeight: '600', color: '#475569' }}>{patient.type}</Td>
                <Td>
                  <PillBadge type={patient.status}>{patient.status}</PillBadge>
                </Td>
                <Td>
                  <ActionGroup style={{ justifyContent: 'center' }}>
                    <ActionButton
                      view
                      title="View Patient Details"
                      onClick={() => onSelectPatient(patient)}
                    >
                      <Eye size={16} />
                    </ActionButton>
                    <ActionButton
                      title="View Latest Consultation"
                      onClick={() => {
                        if (patient.visits && patient.visits.length > 0) {
                          onSelectConsultation(patient, patient.visits[0]);
                        } else {
                          alert('No previous consultations found for this patient.');
                        }
                      }}
                    >
                      <FileText size={16} />
                    </ActionButton>
                  </ActionGroup>
                </Td>
              </Tr>
            ))
          ) : (
            <tr>
              <Td colSpan="9" style={{ textAlign: 'center', padding: '40px', color: '#64748b', fontStyle: 'italic' }}>
                No patients found matching the criteria.
              </Td>
            </tr>
          )}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default PatientTable;
