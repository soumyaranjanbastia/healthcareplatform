import React, { useState } from 'react';
import styled from 'styled-components';
import { Plus } from 'lucide-react';
import { MOCK_PATIENTS } from '../data/mockPatients';
import PatientFilterBar from '../components/PatientFilterBar';
import PatientTable from '../components/PatientTable';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const HeaderTitle = styled.div`
  h2 {
    font-size: 24px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }
  p {
    font-size: 13px;
    color: #64748b;
    margin-top: 4px;
    font-weight: 500;
  }
`;

const NewBookingBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #009688;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 150, 136, 0.15);
  transition: all 0.2s ease;

  &:hover {
    background-color: #00796b;
    transform: translateY(-1px);
  }
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e2e8f0;
  overflow-x: auto;
  gap: 8px;
  padding-bottom: 2px;
  margin-top: 8px;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 4px;
  }
`;

const TabItem = styled.button`
  background: none;
  border: none;
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 600;
  color: ${props => props.active ? '#009688' : '#64748b'};
  border-bottom: 2px solid ${props => props.active ? '#009688' : 'transparent'};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    color: #009688;
    background-color: #f8fafc;
  }
`;

const PatientList = ({ onSelectPatient, onSelectConsultation, onNewBooking }) => {
  const [activeTab, setActiveTab] = useState('All Patients');
  const [search, setSearch] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [dateFilter, setDateFilter] = useState('');

  const doctorsList = ['All', 'Dr. Sharma', 'Dr. Kumar', 'Dr. Rao'];
  const deptsList = ['All', 'Cardiology', 'General Medicine'];

  const getTabCount = (tabName) => {
    if (tabName === 'All Patients') return MOCK_PATIENTS.length;
    if (tabName === 'Upcoming') return MOCK_PATIENTS.filter(p => p.status === 'Waiting' && p.payment === 'Paid').length;
    if (tabName === 'Completed') return MOCK_PATIENTS.filter(p => p.status === 'Completed').length;
    if (tabName === 'Follow-Ups') return MOCK_PATIENTS.filter(p => p.type === 'Follow-up').length;
    if (tabName === 'Pending Payment') return MOCK_PATIENTS.filter(p => p.payment === 'Pending').length;
    if (tabName === 'Incomplete Registration') return MOCK_PATIENTS.filter(p => p.id === 'PT-2026-00456').length;
    if (tabName === 'Archived') return MOCK_PATIENTS.filter(p => p.status === 'Archived').length;
    return 0;
  };

  const filteredPatients = MOCK_PATIENTS.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.id.toLowerCase().includes(search.toLowerCase()) ||
      patient.phone.includes(search);

    let matchesTab = true;
    if (activeTab === 'Upcoming') {
      matchesTab = patient.status === 'Waiting';
    } else if (activeTab === 'Completed') {
      matchesTab = patient.status === 'Completed';
    } else if (activeTab === 'Follow-Ups') {
      matchesTab = patient.type === 'Follow-up';
    } else if (activeTab === 'Pending Payment') {
      matchesTab = patient.payment === 'Pending';
    } else if (activeTab === 'Incomplete Registration') {
      matchesTab = patient.id === 'PT-2026-00456';
    } else if (activeTab === 'Archived') {
      matchesTab = patient.status === 'Archived';
    }

    const matchesDoctor = selectedDoctor === 'All' || patient.doctor === selectedDoctor;
    const matchesDept = selectedDepartment === 'All' || patient.department === selectedDepartment;

    return matchesSearch && matchesTab && matchesDoctor && matchesDept;
  });

  return (
    <Container>
      <HeaderRow>
        <HeaderTitle>
          <h2>Patients</h2>
          <p>Master patient registry — all records, all states.</p>
        </HeaderTitle>
        <NewBookingBtn onClick={onNewBooking}>
          <Plus size={16} /> New Booking
        </NewBookingBtn>
      </HeaderRow>

      <TabsContainer>
        {[
          'All Patients',
          'Upcoming',
          'Completed',
          'Follow-Ups',
          'Pending Payment',
          'Incomplete Registration',
          'Archived'
        ].map((tab) => (
          <TabItem
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab} ({getTabCount(tab)})
          </TabItem>
        ))}
      </TabsContainer>

      <PatientFilterBar
        search={search}
        setSearch={setSearch}
        selectedDoctor={selectedDoctor}
        setSelectedDoctor={setSelectedDoctor}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        doctorsList={doctorsList}
        deptsList={deptsList}
      />

      <PatientTable
        filteredPatients={filteredPatients}
        onSelectPatient={onSelectPatient}
        onSelectConsultation={onSelectConsultation}
      />
    </Container>
  );
};

export default PatientList;
