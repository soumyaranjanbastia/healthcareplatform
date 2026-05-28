import React, { useState } from 'react';
import styled from 'styled-components';
import { Search, Plus, Filter } from 'lucide-react';
import { MOCK_DOCTORS } from '../data/mockDoctors';
import DoctorCard from '../components/DoctorCard';

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

const AddDoctorBtn = styled.button`
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

const FilterBar = styled.div`
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 16px;
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.01);
`;

const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f1f5f9;
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 10px 16px;
  flex: 1;
  min-width: 260px;
  gap: 10px;
  transition: all 0.2s;

  &:focus-within {
    border-color: #009688;
    background-color: #ffffff;
    box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.08);
  }

  input {
    border: none;
    outline: none;
    background: transparent;
    font-size: 13px;
    color: #1e293b;
    width: 100%;
    font-weight: 600;
  }

  input::placeholder {
    color: #94a3b8;
  }
`;

const FilterSelect = styled.select`
  background-color: #f1f5f9;
  border: 1px solid transparent;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  outline: none;
  min-width: 150px;
  transition: all 0.2s;

  &:focus {
    border-color: #009688;
    background-color: #ffffff;
  }
`;

const FilterIconBtn = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background-color: #f1f5f9;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #475569;
  transition: all 0.2s;

  &:hover {
    background-color: #e2e8f0;
    color: #0f172a;
  }
`;

const DoctorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const DoctorList = ({ doctors = MOCK_DOCTORS, onViewDoctor, onAddNewDoctor, onMapBranch }) => {
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('All');
  const [dept, setDept] = useState('All');

  const deptsList = ['All', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics'];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.id.toLowerCase().includes(search.toLowerCase()) ||
      doctor.email.toLowerCase().includes(search.toLowerCase());

    const matchesDept = dept === 'All' || doctor.department === dept;

    return matchesSearch && matchesDept;
  });

  return (
    <Container>
      <HeaderRow>
        <HeaderTitle>
          <h2>Doctor Management</h2>
          <p>Manage hospital Doctor</p>
        </HeaderTitle>
        <AddDoctorBtn onClick={onAddNewDoctor}>
          <Plus size={16} /> Add New Doctor
        </AddDoctorBtn>
      </HeaderRow>

      <FilterBar>
        <SearchInputWrapper>
          <Search size={16} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search by name, ID, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchInputWrapper>

        <FilterSelect value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="All">All Role</option>
          <option value="Doctor">Doctor</option>
        </FilterSelect>

        <FilterSelect value={dept} onChange={(e) => setDept(e.target.value)}>
          {deptsList.map(d => (
            <option key={d} value={d}>{d === 'All' ? 'All Department' : d}</option>
          ))}
        </FilterSelect>

        <FilterIconBtn onClick={() => alert('Advanced filtering options...')}>
          <Filter size={16} />
        </FilterIconBtn>
      </FilterBar>

      <DoctorsGrid>
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} onView={onViewDoctor} onMapBranch={onMapBranch} />
          ))
        ) : (
          <div style={{ gridColumn: 'span 3', textAlign: 'center', padding: '40px', color: '#64748b', fontStyle: 'italic' }}>
            No doctors found matching the filters.
          </div>
        )}
      </DoctorsGrid>
    </Container>
  );
};

export default DoctorList;
