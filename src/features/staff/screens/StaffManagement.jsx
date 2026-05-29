import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Search, Filter, Phone, Mail, Eye, Edit2, Plus, ChevronLeft, ChevronRight, Loader2, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getStaffRequest, deleteStaffRequest, resetDeleteStaffState } from '../redux/staffSlice';
import EmployeeRegistrationModal from '../components/EmployeeRegistrationModal';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
  background-color: ${props => props.role === 'Nurse' ? '#e6f9f3' : props.role === 'Admin' ? '#eff6ff' : '#f3e8ff'};
  color: ${props => props.role === 'Nurse' ? '#10b981' : props.role === 'Admin' ? '#3b82f6' : '#a855f7'};
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
  background-color: ${props => props.role === 'Nurse' ? '#e2fbf4' : props.role === 'Admin' ? '#e0f2fe' : '#f5f0ff'};
  color: ${props => props.role === 'Nurse' ? '#009688' : props.role === 'Admin' ? '#0284c7' : '#a855f7'};
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
  margin-top: auto;
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

const DeleteBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  background-color: #fff5f5;
  border: 1px solid #fee2e2;
  border-radius: 10px;
  color: #ef4444;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #fecaca;
    color: #dc2626;
  }
`;

const CustomModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(2px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ConfirmModal = styled.div`
  background: #ffffff;
  width: 420px;
  max-width: 90%;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.1);
  padding: 24px;
  text-align: center;
  font-family: 'Outfit', 'Inter', sans-serif;
  animation: ${fadeIn} 0.2s ease-out;
`;

const WarningIconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #fee2e2;
  color: #ef4444;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px auto;
`;

const ConfirmTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
`;

const ConfirmText = styled.p`
  font-size: 14px;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 24px;
`;

const ConfirmActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const CancelConfirmBtn = styled.button`
  flex: 1;
  padding: 10px 16px;
  background-color: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e2e8f0;
  }
`;

const ActionConfirmBtn = styled.button`
  flex: 1;
  padding: 10px 16px;
  background-color: #ef4444;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #dc2626;
  }
`;

const SuccessToast = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background-color: #0f172a;
  color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Outfit', 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  z-index: 2500;
  animation: ${fadeIn} 0.3s ease-out;
  border-left: 4px solid #10b981;
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

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  width: 100%;
  color: #009688;
  font-weight: 600;
  gap: 16px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 150, 136, 0.1);
  border-top: 4px solid #009688;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  width: 100%;
  color: #64748b;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  text-align: center;
  
  h4 {
    font-size: 16px;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 8px;
  }
  
  p {
    font-size: 13px;
  }
`;

const ErrorContainer = styled.div`
  background: #fef2f2;
  border: 1px solid #fee2e2;
  color: #ef4444;
  padding: 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 24px;
  width: 100%;
`;

const StaffManagement = () => {
  const dispatch = useDispatch();
  const { 
    staffList, 
    staffLoading, 
    staffError, 
    createSuccess,
    deleteSuccess,
    deleteError,
    deleteLoading
  } = useSelector(state => state.staffRegistration);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedDept, setSelectedDept] = useState('All');
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);

  // Custom Modal States
  const [deleteConfirmState, setDeleteConfirmState] = useState({
    isOpen: false,
    staffId: null,
    branchId: null,
    name: ''
  });
  
  const [successToastState, setSuccessToastState] = useState({
    isOpen: false,
    message: ''
  });

  useEffect(() => {
    dispatch(getStaffRequest({}));
  }, [dispatch]);

  useEffect(() => {
    if (createSuccess) {
      dispatch(getStaffRequest({}));
    }
  }, [createSuccess, dispatch]);

  useEffect(() => {
    if (deleteSuccess) {
      setSuccessToastState({
        isOpen: true,
        message: 'Staff member deleted successfully!'
      });
      dispatch(resetDeleteStaffState());
      dispatch(getStaffRequest({}));
      
      const timer = setTimeout(() => {
        setSuccessToastState({ isOpen: false, message: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [deleteSuccess, dispatch]);

  const handleDeleteStaff = (staffId, branchId, name) => {
    setDeleteConfirmState({
      isOpen: true,
      staffId,
      branchId,
      name
    });
  };

  const executeDelete = () => {
    if (deleteConfirmState.staffId) {
      dispatch(deleteStaffRequest({ 
        staffId: deleteConfirmState.staffId,
        branchId: deleteConfirmState.branchId
      }));
      setDeleteConfirmState({ isOpen: false, staffId: null, branchId: null, name: '' });
    }
  };

  // Normalize list from API, defaulting to an empty array
  const activeStaffList = staffList || [];

  const normalizedStaff = activeStaffList.map((member, index) => {
    const fName = member.firstName || '';
    const lName = member.lastName || '';
    const fullName = member.name || `${fName} ${lName}`.trim() || 'Staff Member';
    const initials = member.initials || (fName ? `${fName[0]}${lName ? lName[0] : ''}` : 'S').toUpperCase();
    const id = member.branchUserId || member.id || member._id || `ST-${1000 + index}`;
    
    let role = 'Staff';
    if (member.role) {
      role = typeof member.role === 'object' ? (member.role.roleName || member.role.name) : member.role;
    } else if (member.roleName) {
      role = member.roleName;
    } else if (member.roleId === 1) {
      role = 'Admin';
    } else if (member.roleId === 6) {
      role = 'Receptionist';
    }

    let dobFormatted = 'N/A';
    if (member.dob) {
      try {
        const dateObj = new Date(member.dob);
        if (!isNaN(dateObj.getTime())) {
          dobFormatted = dateObj.toLocaleDateString('en-GB'); // DD/MM/YYYY
        }
      } catch (e) {
        dobFormatted = member.dob;
      }
    }

    const locParts = [member.address, member.state, member.country].filter(Boolean);
    const location = locParts.length > 0 ? locParts.join(', ') : 'N/A';

    return {
      id,
      branchId: member.branchId,
      branchName: member.branchName || 'N/A',
      name: fullName,
      initials,
      role,
      gender: member.gender || 'N/A',
      dobFormatted,
      location,
      phone: member.phoneNumber || member.phone || 'N/A',
      email: member.email || 'N/A',
    };
  });

  // Filter Logic
  const filteredStaff = normalizedStaff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'All' || member.role === selectedRole;
    const matchesDept = selectedDept === 'All' || member.branchName === selectedDept;
    
    return matchesSearch && matchesRole && matchesDept;
  });

  // Dynamic Statistics
  const totalStaffCount = normalizedStaff.length;
  const adminStaffCount = normalizedStaff.filter(s => s.role === 'Admin').length;
  const receptionistStaffCount = normalizedStaff.filter(s => s.role === 'Receptionist').length;

  return (
    <Container>
      
      {/* HEADER SECTION */}
      <HeaderRow>
        <HeaderText>
          <h2>Staff Management</h2>
          <p>Manage hospital staff and personnel</p>
        </HeaderText>
        <AddDoctorBtn onClick={() => setIsAddStaffModalOpen(true)}>
          <Plus size={16} /> Add Staff
        </AddDoctorBtn>
      </HeaderRow>

      {staffError && <ErrorContainer>{staffError}</ErrorContainer>}
      {deleteError && <ErrorContainer>{deleteError}</ErrorContainer>}

      {/* STATS */}
      <StatsGrid>
        <StatCard>
          <StatLabel>Total staff</StatLabel>
          <StatValue>{totalStaffCount}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>receptionist</StatLabel>
          <StatValue>{receptionistStaffCount}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Admin Staff</StatLabel>
          <StatValue>{adminStaffCount}</StatValue>
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
            <option value="Receptionist">Receptionist</option>
            <option value="Admin">Admin</option>
          </DropdownSelect>
          <DropdownSelect 
            value={selectedDept} 
            onChange={e => setSelectedDept(e.target.value)}
          >
            <option value="All">All Branches</option>
            {[...new Set(normalizedStaff.map(s => s.branchName))].filter(b => b && b !== 'N/A').map(branch => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </DropdownSelect>
          <FilterBtn onClick={() => { setSearchTerm(''); setSelectedRole('All'); setSelectedDept('All'); }}>
            <Filter size={16} />
          </FilterBtn>
        </SelectGroup>
      </FilterRow>

      {/* STAFF GRID / LOADING / EMPTY STATES */}
      {staffLoading ? (
        <LoadingContainer>
          <Spinner />
          <span>Fetching staff members...</span>
        </LoadingContainer>
      ) : filteredStaff.length > 0 ? (
        <StaffGrid>
          {filteredStaff.map(member => (
            <StaffCard key={member.id}>
              <RoleBadge role={member.role}>{member.role}</RoleBadge>
              
              <CardHeader>
                <Avatar role={member.role}>{member.initials}</Avatar>
                <UserMeta>
                  <h4>{member.name}</h4>
                  <span>ID: {member.id}</span>
                </UserMeta>
              </CardHeader>

              <InfoList>
                <InfoRow>
                  <span>Branch:</span>
                  <span>{member.branchName}</span>
                </InfoRow>
                <InfoRow>
                  <span>Gender:</span>
                  <span>{member.gender}</span>
                </InfoRow>
                <InfoRow>
                  <span>DOB:</span>
                  <span>{member.dobFormatted}</span>
                </InfoRow>
                <InfoRow>
                  <span>Location:</span>
                  <span>{member.location}</span>
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
                <DeleteBtn 
                  onClick={() => handleDeleteStaff(member.id, member.branchId, member.name)}
                  disabled={deleteLoading}
                >
                  <Trash2 size={14} />
                </DeleteBtn>
              </CardActions>
            </StaffCard>
          ))}
        </StaffGrid>
      ) : (
        <EmptyContainer>
          <h4>No staff members found</h4>
          <p>Try refining your search or add a new staff member to get started.</p>
        </EmptyContainer>
      )}

      {/* FOOTER */}
      <FooterPagination>
        <ResultsText>Showing {filteredStaff.length} of {activeStaffList.length} staff members</ResultsText>
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

      <EmployeeRegistrationModal 
        isOpen={isAddStaffModalOpen} 
        onClose={() => setIsAddStaffModalOpen(false)} 
      />

      {/* CUSTOM CONFIRM DELETE MODAL */}
      {deleteConfirmState.isOpen && (
        <CustomModalOverlay>
          <ConfirmModal>
            <WarningIconWrapper>
              <Trash2 size={28} />
            </WarningIconWrapper>
            <ConfirmTitle>Delete Staff Member</ConfirmTitle>
            <ConfirmText>
              Are you sure you want to delete staff member <strong>"{deleteConfirmState.name}"</strong>? This action cannot be undone.
            </ConfirmText>
            <ConfirmActions>
              <CancelConfirmBtn 
                type="button" 
                onClick={() => setDeleteConfirmState({ isOpen: false, staffId: null, name: '' })}
              >
                Cancel
              </CancelConfirmBtn>
              <ActionConfirmBtn 
                type="button" 
                onClick={executeDelete}
              >
                Delete
              </ActionConfirmBtn>
            </ConfirmActions>
          </ConfirmModal>
        </CustomModalOverlay>
      )}

      {/* CUSTOM SUCCESS TOAST */}
      {successToastState.isOpen && (
        <SuccessToast>
          <span>{successToastState.message}</span>
        </SuccessToast>
      )}
    </Container>
  );
};

export default StaffManagement;
