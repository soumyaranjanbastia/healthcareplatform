import React from 'react';
import styled from 'styled-components';
import { Search, Filter, Plus, ChevronRight, Users } from 'lucide-react';

// --- STYLED COMPONENTS ---
const GlassCard = styled.div`
  background: linear-gradient(135deg, rgba(17, 24, 39, 0.7) 0%, rgba(9, 13, 22, 0.8) 100%);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
`;

const SectionTitle = styled.h3`
  font-family: 'Outfit', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 8px 16px;
  width: 320px;
  color: #94a3b8;
  gap: 10px;
  &:focus-within {
    border-color: #10b981;
  }
  input {
    background: transparent;
    border: none;
    outline: none;
    color: #ffffff;
    font-size: 14px;
    width: 100%;
  }
`;

const FilterButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${props => props.primary ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'rgba(30, 41, 59, 0.5)'};
  border: 1px solid ${props => props.primary ? 'transparent' : 'rgba(255, 255, 255, 0.05)'};
  padding: 10px 18px;
  border-radius: 12px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    background: ${props => props.primary ? 'linear-gradient(135deg, #059669 0%, #047857 100%)' : 'rgba(30, 41, 59, 0.8)'};
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 10px;
`;

const CustomTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const Th = styled.th`
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 12px;
  text-transform: uppercase;
  color: #64748b;
  font-weight: 600;
`;

const Td = styled.td`
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  font-size: 14px;
  color: #e2e8f0;
`;

const StatusIndicator = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  background-color: ${props => {
    if (props.type === 'normal' || props.type === 'active') return 'rgba(16, 185, 129, 0.1)';
    if (props.type === 'warning' || props.type === 'pending') return 'rgba(245, 158, 11, 0.1)';
    return 'rgba(239, 68, 68, 0.1)';
  }};
  color: ${props => {
    if (props.type === 'normal' || props.type === 'active') return '#10b981';
    if (props.type === 'warning' || props.type === 'pending') return '#f59e0b';
    return '#ef4444';
  }};
`;

const PatientsTab = ({ filteredPatients, searchTerm, setSearchTerm }) => {
  return (
    <GlassCard>
      <SectionTitle>
        <Users size={16} color="#10b981" />
        Patient Records Directory
      </SectionTitle>

      <FilterBar>
        <SearchBox>
          <Search size={16} />
          <input
            type="text"
            placeholder="Search by Patient Name or Swastyam ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBox>

        <FilterButtons>
          <ActionButton>
            <Filter size={14} />
            <span>Filters</span>
          </ActionButton>
          <ActionButton primary={true}>
            <Plus size={14} />
            <span>Admit Patient</span>
          </ActionButton>
        </FilterButtons>
      </FilterBar>

      <TableWrapper>
        <CustomTable>
          <thead>
            <tr>
              <Th>Patient ID</Th>
              <Th>Patient Name</Th>
              <Th>Age/Gender</Th>
              <Th>Biosensor Vitals</Th>
              <Th>Ward/Bed</Th>
              <Th>Intake Time</Th>
              <Th>Status Badge</Th>
              <Th style={{ textAlign: 'center' }}>Details</Th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <tr key={patient.id}>
                  <Td style={{ fontWeight: '600', color: '#10b981' }}>{patient.id}</Td>
                  <Td style={{ fontWeight: '600' }}>{patient.name}</Td>
                  <Td>{patient.age} Y / {patient.gender}</Td>
                  <Td>{patient.vitals}</Td>
                  <Td>{patient.room}</Td>
                  <Td>{patient.time}</Td>
                  <Td>
                    <StatusIndicator type={patient.status}>{patient.status}</StatusIndicator>
                  </Td>
                  <Td style={{ textAlign: 'center' }}>
                    <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748b', outline: 'none', padding: 0 }}>
                      <ChevronRight size={18} />
                    </button>
                  </Td>
                </tr>
              ))
            ) : (
              <tr>
                <Td colSpan="8" style={{ textAlign: 'center', padding: '30px 0', color: '#64748b' }}>
                  No patient records found matching '{searchTerm}'
                </Td>
              </tr>
            )}
          </tbody>
        </CustomTable>
      </TableWrapper>
    </GlassCard>
  );
};

export default PatientsTab;
