import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Search, Filter, Phone, Mail, Eye, Edit2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  animation: ${fadeIn} 0.4s ease-out;
  font-family: 'Outfit', 'Inter', sans-serif;
`;

// HEADER
const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const HeaderText = styled.div`
  h2 {
    font-size: 24px;
    font-weight: 700;
    color: #0f172a;
  }
  p {
    font-size: 13px;
    color: #64748b;
    margin-top: 4px;
  }
`;

const AddDoctorBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background-color: #009688;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 150, 136, 0.15);

  &:hover {
    background-color: #00796b;
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 150, 136, 0.25);
  }
`;

// STATS CARDS
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.01);
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const StatLabel = styled.span`
  font-size: 12px;
  color: #64748b;
  font-weight: 600;
  text-transform: capitalize;
`;

const StatValue = styled.h3`
  font-size: 28px;
  font-weight: 700;
  color: #0f172a;
`;

// FILTERS ROW
const FilterRow = styled.div`
  display: flex;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 14px 20px;
  border-radius: 16px;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 8px 16px;
  flex: 1;
  max-width: 480px;
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

const SelectGroup = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const DropdownSelect = styled.select`
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f1f5f9;
  }
`;

const FilterBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f1f5f9;
    color: #009688;
  }
`;

// CARDS GRID
const StaffGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StaffCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.01);
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.03);
  }
`;

const RoleBadge = styled.span`
  position: absolute;
  top: 24px;
  right: 24px;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  background-color: ${props => props.role === 'Nurse' ? '#e6f9f3' : '#f3e8ff'};
  color: ${props => props.role === 'Nurse' ? '#10b981' : '#a855f7'};
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

const Avatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: ${props => props.role === 'Nurse' ? '#e2fbf4' : '#f5f0ff'};
  color: ${props => props.role === 'Nurse' ? '#009688' : '#a855f7'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
`;

const UserMeta = styled.div`
  h4 {
    font-size: 15px;
    font-weight: 700;
    color: #0f172a;
  }
  span {
    font-size: 11px;
    color: #94a3b8;
    font-weight: 600;
    margin-top: 2px;
    display: inline-block;
  }
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 16px;
  margin-bottom: 16px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;

  span:first-child {
    color: #94a3b8;
    font-weight: 500;
  }

  span:last-child {
    color: #1e293b;
    font-weight: 600;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
`;

const ContactRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #475569;
  font-weight: 500;

  svg {
    color: #94a3b8;
  }
`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
`;

const ViewBtn = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px;
  background-color: #009688;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #00796b;
  }
`;

const EditBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f1f5f9;
    color: #1e293b;
  }
`;

// FOOTER PAGINATION
const FooterPagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  flex-wrap: wrap;
  gap: 16px;
`;

const ResultsText = styled.span`
  font-size: 12px;
  color: #64748b;
  font-weight: 600;
`;

const PaginationGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const PaginationBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  color: #475569;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: #f8fafc;
    color: #1e293b;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageBadge = styled.span`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #009688;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  border-radius: 8px;
`;

const MOCK_STAFF = [
  {
    id: 'N001',
    name: 'Jennifer Martinez',
    initials: 'JM',
    role: 'Nurse',
    department: 'Emergency',
    specialization: 'Critical Care',
    experience: '8 years',
    shift: 'Night',
    phone: '(555) 555-6666',
    email: 'jennifer.martinez@hospital.co'
  },
  {
    id: 'N002',
    name: 'Robert Taylor',
    initials: 'RT',
    role: 'Nurse',
    department: 'ICU',
    specialization: 'Intensive Care',
    experience: '6 years',
    shift: 'Evening',
    phone: '(555) 666-7777',
    email: 'robert.taylor@hospital.co'
  },
  {
    id: 'N003',
    name: 'Amanda White',
    initials: 'AW',
    role: 'Nurse',
    department: 'Pediatrics',
    specialization: 'Pediatric Care',
    experience: '5 years',
    shift: 'Morning',
    phone: '(555) 777-8888',
    email: 'amanda.white@hospital.co'
  },
  {
    id: 'A001',
    name: 'David Anderson',
    initials: 'DA',
    role: 'Admin',
    department: 'Administration',
    specialization: 'Hospital Management',
    experience: '10 years',
    shift: 'Morning',
    phone: '(555) 888-9999',
    email: 'david.anderson@hospital.co'
  }
];

const StaffManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedDept, setSelectedDept] = useState('All');

  // Filter Logic
  const filteredStaff = MOCK_STAFF.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'All' || member.role === selectedRole;
    const matchesDept = selectedDept === 'All' || member.department === selectedDept;
    
    return matchesSearch && matchesRole && matchesDept;
  });

  return (
    <Container>
      
      {/* HEADER SECTION */}
      <HeaderRow>
        <HeaderText>
          <h2>Staff Management</h2>
          <p>Manage hospital staff and personnel</p>
        </HeaderText>
        <AddDoctorBtn onClick={() => alert('Add New Staff window coming soon!')}>
          <Plus size={16} /> Add New Doctor
        </AddDoctorBtn>
      </HeaderRow>

      {/* STATS */}
      <StatsGrid>
        <StatCard>
          <StatLabel>Total staff</StatLabel>
          <StatValue>8</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>receptionist</StatLabel>
          <StatValue>4</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Nurses</StatLabel>
          <StatValue>3</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Admin Staff</StatLabel>
          <StatValue>1</StatValue>
        </StatCard>
      </StatsGrid>

      {/* FILTER ROW */}
      <FilterRow>
        <SearchBox>
          <Search size={16} color="#94a3b8" />
          <input 
            type="text" 
            placeholder="Search by name, ID, or email..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </SearchBox>
        <SelectGroup>
          <DropdownSelect 
            value={selectedRole} 
            onChange={e => setSelectedRole(e.target.value)}
          >
            <option value="All">All Role</option>
            <option value="Nurse">Nurse</option>
            <option value="Admin">Admin</option>
          </DropdownSelect>
          <DropdownSelect 
            value={selectedDept} 
            onChange={e => setSelectedDept(e.target.value)}
          >
            <option value="All">All Department</option>
            <option value="Emergency">Emergency</option>
            <option value="ICU">ICU</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Administration">Administration</option>
          </DropdownSelect>
          <FilterBtn onClick={() => { setSearchTerm(''); setSelectedRole('All'); setSelectedDept('All'); }}>
            <Filter size={16} />
          </FilterBtn>
        </SelectGroup>
      </FilterRow>

      {/* STAFF GRID */}
      <StaffGrid>
        {filteredStaff.map(member => (
          <StaffCard key={member.id}>
            <RoleBadge role={member.role}>{member.role}</RoleBadge>
            
            <CardHeader>
              <Avatar role={member.role}>{member.initials}</Avatar>
              <UserMeta>
                <h4>{member.name}</h4>
                <span>{member.id}</span>
              </UserMeta>
            </CardHeader>

            <InfoList>
              <InfoRow>
                <span>Department:</span>
                <span>{member.department}</span>
              </InfoRow>
              <InfoRow>
                <span>Specialization:</span>
                <span>{member.specialization}</span>
              </InfoRow>
              <InfoRow>
                <span>Experience:</span>
                <span>{member.experience}</span>
              </InfoRow>
              <InfoRow>
                <span>Shift:</span>
                <span>{member.shift}</span>
              </InfoRow>
            </InfoList>

            <ContactInfo>
              <ContactRow>
                <Phone size={13} /> {member.phone}
              </ContactRow>
              <ContactRow>
                <Mail size={13} /> {member.email}
              </ContactRow>
            </ContactInfo>

            <CardActions>
              <ViewBtn onClick={() => alert(`Viewing details of ${member.name}`)}>
                <Eye size={14} /> View
              </ViewBtn>
              <EditBtn onClick={() => alert(`Editing details of ${member.name}`)}>
                <Edit2 size={14} />
              </EditBtn>
            </CardActions>
          </StaffCard>
        ))}
      </StaffGrid>

      {/* FOOTER */}
      <FooterPagination>
        <ResultsText>Showing {filteredStaff.length} of {MOCK_STAFF.length} staff members</ResultsText>
        <PaginationGroup>
          <PaginationBtn disabled={true}>
            <ChevronLeft size={14} /> Previous
          </PaginationBtn>
          <PageBadge>1</PageBadge>
          <PaginationBtn disabled={true}>
            Next <ChevronRight size={14} />
          </PaginationBtn>
        </PaginationGroup>
      </FooterPagination>

    </Container>
  );
};

export default StaffManagement;
