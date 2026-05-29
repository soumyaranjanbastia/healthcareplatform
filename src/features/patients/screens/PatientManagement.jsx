import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatientsRequest } from '../redux/patientManagementSlice';
import { Search, Filter, Plus, Eye, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { MOCK_PATIENTS } from '../../../data/mockPatients';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: 'Inter', sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #009688;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #00796b;
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const MetricCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MetricLabel = styled.span`
  font-size: 13px;
  color: #64748b;
  font-weight: 500;
`;

const MetricValue = styled.span`
  font-size: 28px;
  font-weight: 700;
  color: #0f172a;
`;

const Toolbar = styled.div`
  display: flex;
  gap: 16px;
  background: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`;

const SearchInput = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  
  svg {
    position: absolute;
    left: 14px;
    color: #94a3b8;
  }
  
  input {
    width: 100%;
    padding: 10px 14px 10px 40px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
    background: #f8fafc;
    
    &:focus {
      border-color: #009688;
      background: white;
    }
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  color: #475569;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background: #f1f5f9;
  }
`;

const DateInput = styled.input`
  padding: 10px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  color: #475569;
  background: #f8fafc;
  outline: none;
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  overflow: hidden;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e2e8f0;
  padding: 0 24px;
`;

const Tab = styled.button`
  padding: 16px 20px;
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#009688' : 'transparent'};
  color: ${props => props.active ? '#009688' : '#64748b'};
  font-weight: ${props => props.active ? '600' : '500'};
  font-size: 14px;
  cursor: pointer;
  
  span {
    color: ${props => props.active ? '#009688' : '#94a3b8'};
    font-size: 12px;
    margin-left: 6px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 16px 24px;
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #e2e8f0;
`;

const Td = styled.td`
  padding: 16px 24px;
  font-size: 14px;
  color: #1e293b;
  border-bottom: 1px solid #e2e8f0;
  vertical-align: middle;
`;

const PatientInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  
  .name { font-weight: 600; color: #0f172a; }
  .meta { font-size: 12px; color: #64748b; }
`;

const PatientId = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  
  .id { font-weight: 600; color: #334155; }
  .file { font-size: 11px; color: #94a3b8; text-transform: uppercase; }
`;

const StatusPill = styled.span`
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  
  ${props => {
    switch (props.type) {
      case 'In Consultation': return 'background: #e0e7ff; color: #4338ca;';
      case 'Waiting': return 'background: #fef08a; color: #854d0e;';
      case 'Completed': return 'background: #dcfce7; color: #166534;';
      case 'Paid': return 'background: #d1fae5; color: #059669;';
      case 'Pending': return 'background: #ffedd5; color: #c2410c;';
      default: return 'background: #f1f5f9; color: #475569;';
    }
  }}
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #009688;
  
  svg {
    cursor: pointer;
    transition: color 0.2s;
    &:hover { color: #00796b; }
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  color: #64748b;
  font-size: 13px;
`;

const PageControls = styled.div`
  display: flex;
  gap: 8px;
  
  button {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 6px 12px;
    font-size: 13px;
    font-weight: 500;
    color: #475569;
    cursor: pointer;
    
    &.active {
      background: #009688;
      color: white;
      border-color: #009688;
    }
    
    &:hover:not(.active) {
      background: #f1f5f9;
    }
  }
`;

const PatientManagement = ({ onViewDetails }) => {
  const [activeTab, setActiveTab] = useState('All Patients');
  const dispatch = useDispatch();
  const { data: patientsList, loading, error } = useSelector(state => state.patientManagement);

  useEffect(() => {
    dispatch(fetchPatientsRequest({}));
  }, [dispatch]);

  return (
    <Container>
      <Header>
        <TitleArea>
          <Title>Patient Management</Title>
          <Subtitle>Manage and view all patient records</Subtitle>
        </TitleArea>
        <AddButton>
          <Plus size={18} /> Add New Patient
        </AddButton>
      </Header>

      <MetricsGrid>
        <MetricCard>
          <MetricLabel>Total Patients</MetricLabel>
          <MetricValue>N/A</MetricValue>
        </MetricCard>
        <MetricCard>
          <MetricLabel>Active Today</MetricLabel>
          <MetricValue>N/A</MetricValue>
        </MetricCard>
        <MetricCard>
          <MetricLabel>New This Month</MetricLabel>
          <MetricValue>N/A</MetricValue>
        </MetricCard>
        <MetricCard>
          <MetricLabel>Critical Cases</MetricLabel>
          <MetricValue>N/A</MetricValue>
        </MetricCard>
      </MetricsGrid>

      <Toolbar>
        <SearchInput>
          <Search size={18} />
          <input type="text" placeholder="Search by name, ID, or phone..." />
        </SearchInput>
        <DateInput type="text" placeholder="dd-mm-yy" />
        <FilterButton>
          <Filter size={16} /> More Filters
        </FilterButton>
      </Toolbar>

      <TableContainer>
        <TabsContainer>
          {['All Patients', 'Upcoming', 'Completed', 'Follow-Ups', 'Archived'].map(tab => (
            <Tab 
              key={tab} 
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab} <span>({tab === 'All Patients' ? '6' : tab === 'Upcoming' || tab === 'Completed' || tab === 'Follow-Ups' ? '2' : '1'})</span>
            </Tab>
          ))}
        </TabsContainer>

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
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <Td colSpan="9" style={{ textAlign: 'center', padding: '40px' }}>Loading patients...</Td>
              </tr>
            ) : error ? (
              <tr>
                <Td colSpan="9" style={{ textAlign: 'center', padding: '40px', color: '#ef4444' }}>{error}</Td>
              </tr>
            ) : patientsList && patientsList.length > 0 ? (
              patientsList.map((patient) => (
                <tr key={patient.id || patient._id}>
                  <Td>
                    <PatientId>
                      <span className="id">{patient.id || patient.patientId || patient._id}</span>
                      <span className="file">{patient.fileNo || 'N/A'}</span>
                    </PatientId>
                  </Td>
                  <Td>
                    <PatientInfo>
                      <span className="name">{patient.name || patient.fullName || 'Unknown'}</span>
                      <span className="meta">{patient.age || 'N/A'}Y • {patient.gender || 'N/A'}</span>
                    </PatientInfo>
                  </Td>
                  <Td>{patient.phone || patient.contactNumber || 'N/A'}</Td>
                  <Td>{patient.doctor || patient.assignedDoctor || 'Unassigned'}</Td>
                  <Td>{patient.lastVisit || 'N/A'}</Td>
                  <Td><StatusPill type={patient.paymentStatus || 'Pending'}>{patient.paymentStatus || 'Pending'}</StatusPill></Td>
                  <Td>{patient.type || 'General'}</Td>
                  <Td><StatusPill type={patient.status || 'Waiting'}>{patient.status || 'Waiting'}</StatusPill></Td>
                  <Td>
                    <Actions>
                      <Eye size={18} onClick={() => onViewDetails(patient.id || patient._id)} />
                      <FileText size={18} color="#64748b" />
                    </Actions>
                  </Td>
                </tr>
              ))
            ) : (
              <tr>
                <Td colSpan="9" style={{ textAlign: 'center', padding: '40px' }}>No patients found.</Td>
              </tr>
            )}
          </tbody>
        </Table>
        
        <Pagination>
          <span>Showing 3 of 8 patients</span>
          <PageControls>
            <button>Previous</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>Next</button>
          </PageControls>
        </Pagination>
      </TableContainer>
    </Container>
  );
};

export default PatientManagement;
