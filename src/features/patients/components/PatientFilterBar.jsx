import React from 'react';
import styled from 'styled-components';
import { Search, ChevronDown, Sliders } from 'lucide-react';

const FilterBarWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
`;

const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px 16px;
  flex: 1;
  min-width: 260px;
  gap: 10px;

  input {
    border: none;
    outline: none;
    background: transparent;
    font-size: 13px;
    color: #1e293b;
    width: 100%;
  }

  input::placeholder {
    color: #94a3b8;
  }
`;

const DateInput = styled.input`
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #1e293b;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: #009688;
  }
`;

const FilterSelect = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  color: #1e293b;
  position: relative;
`;

const MoreBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8fafc;
    border-color: #cbd5e1;
  }
`;

const PatientFilterBar = ({
  search,
  setSearch,
  selectedDoctor,
  setSelectedDoctor,
  selectedDepartment,
  setSelectedDepartment,
  dateFilter,
  setDateFilter,
  doctorsList,
  deptsList
}) => {
  return (
    <FilterBarWrapper>
      <SearchInputWrapper>
        <Search size={16} color="#94a3b8" />
        <input
          type="text"
          placeholder="Search by name, ID, phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </SearchInputWrapper>

      <DateInput
        type="date"
        placeholder="dd-mm-yy"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
      />

      <FilterSelect>
        <select
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
          style={{
            border: 'none',
            outline: 'none',
            fontSize: 'inherit',
            fontWeight: 'inherit',
            color: 'inherit',
            cursor: 'pointer',
            appearance: 'none',
            paddingRight: '20px',
            background: 'transparent'
          }}
        >
          {doctorsList.map(doc => (
            <option key={doc} value={doc}>{doc === 'All' ? 'Doctor' : doc}</option>
          ))}
        </select>
        <ChevronDown size={14} color="#64748b" style={{ position: 'absolute', right: '12px', pointerEvents: 'none' }} />
      </FilterSelect>

      <FilterSelect>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          style={{
            border: 'none',
            outline: 'none',
            fontSize: 'inherit',
            fontWeight: 'inherit',
            color: 'inherit',
            cursor: 'pointer',
            appearance: 'none',
            paddingRight: '20px',
            background: 'transparent'
          }}
        >
          {deptsList.map(dept => (
            <option key={dept} value={dept}>{dept === 'All' ? 'Department' : dept}</option>
          ))}
        </select>
        <ChevronDown size={14} color="#64748b" style={{ position: 'absolute', right: '12px', pointerEvents: 'none' }} />
      </FilterSelect>

      <MoreBtn onClick={() => alert('Opening advanced filters...')}>
        <Sliders size={14} />
        More
      </MoreBtn>
    </FilterBarWrapper>
  );
};

export default PatientFilterBar;
