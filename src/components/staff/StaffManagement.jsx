import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { Users, UserPlus, Search, Filter, Trash2, Calendar, Shield, DollarSign, Activity } from 'lucide-react';
import Button from '../common/Button';
import AddStaffDrawer from './AddStaffDrawer';

// --- KEYFRAMES ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

// --- STYLED COMPONENTS ---
const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 16px;
  animation: ${fadeIn} 0.4s ease-out;

  h3 {
    font-family: 'Outfit', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #ffffff;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  p {
    font-size: 14px;
    color: #64748b;
    margin-top: 4px;
  }
`;

const KPIContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
  animation: ${fadeIn} 0.45s ease-out;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const KPICard = styled.div`
  background: linear-gradient(135deg, rgba(17, 24, 39, 0.7) 0%, rgba(9, 13, 22, 0.8) 100%);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(16, 185, 129, 0.2);
  }
`;

const KPIIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: ${props => props.bg || 'rgba(16, 185, 129, 0.1)'};
  color: ${props => props.color || '#10b981'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const KPIValue = styled.h4`
  font-family: 'Outfit', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
`;

const KPILabel = styled.span`
  font-size: 13px;
  color: #64748b;
  font-weight: 500;
  margin-top: 4px;
  display: block;
`;

const PanelCard = styled.div`
  background: linear-gradient(135deg, rgba(17, 24, 39, 0.7) 0%, rgba(9, 13, 22, 0.8) 100%);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.5s ease-out;
`;

const ControlBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const SearchInputBox = styled.div`
  display: flex;
  align-items: center;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 0 16px;
  width: 320px;
  color: #94a3b8;
  gap: 10px;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: #10b981;
    background: rgba(15, 23, 42, 0.8);
  }

  input {
    background: transparent;
    border: none;
    outline: none;
    color: #ffffff;
    font-size: 14px;
    padding: 12px 0;
    width: 100%;

    &::placeholder {
      color: #475569;
    }
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  select {
    background: rgba(30, 41, 59, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 10px 16px;
    color: #ffffff;
    font-size: 13px;
    outline: none;
    cursor: pointer;
    font-family: inherit;

    option {
      background-color: #0b0f19;
    }
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
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
  letter-spacing: 0.05em;
`;

const Td = styled.td`
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  font-size: 14px;
  color: #e2e8f0;
  vertical-align: middle;
`;

const ProfileCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StaffAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: ${props => props.bg || 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)'};
  color: #ffffff;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const StaffInfo = styled.div`
  display: flex;
  flex-direction: column;

  span.name {
    font-weight: 600;
    color: #ffffff;
  }
  span.email {
    font-size: 12px;
    color: #64748b;
    margin-top: 2px;
  }
`;

const RoleBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
  
  background-color: ${props => {
    if (props.role === 'Doctor') return 'rgba(16, 185, 129, 0.08)';
    if (props.role === 'Receptionist') return 'rgba(139, 92, 246, 0.08)';
    return 'rgba(245, 158, 11, 0.08)';
  }};
  
  color: ${props => {
    if (props.role === 'Doctor') return '#10b981';
    if (props.role === 'Receptionist') return '#a78bfa';
    return '#f59e0b';
  }};

  border: 1px solid ${props => {
    if (props.role === 'Doctor') return 'rgba(16, 185, 129, 0.15)';
    if (props.role === 'Receptionist') return 'rgba(139, 92, 246, 0.15)';
    return 'rgba(245, 158, 11, 0.15)';
  }};
`;

/* --- STATUS TOGGLE SWITCH --- */
const ToggleLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  cursor: pointer;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: .3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 24px;

  &::before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 3px;
    bottom: 3px;
    background-color: #64748b;
    transition: .3s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 50%;
  }

  input:checked + & {
    background-color: rgba(16, 185, 129, 0.15);
    border-color: rgba(16, 185, 129, 0.3);
  }

  input:checked + &::before {
    transform: translateX(20px);
    background-color: #10b981;
    box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
  }
`;

const StatusIndicator = styled.span`
  font-size: 11px;
  font-weight: 600;
  margin-left: 8px;
  vertical-align: middle;
  color: ${props => props.active ? '#10b981' : '#64748b'};
`;

const ActionBtn = styled.button`
  background: transparent;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #ef4444;
    background: rgba(239, 68, 68, 0.05);
  }
`;

const StaffManagement = () => {
  const dispatch = useDispatch();
  const members = useSelector(state => state.staff.members);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Compute Metrics
  const metrics = useMemo(() => {
    const counts = {
      total: members.length,
      doctors: 0,
      receptionists: 0,
      finance: 0
    };
    members.forEach(m => {
      if (m.status === 'Active') {
        if (m.role === 'Doctor') counts.doctors++;
        if (m.role === 'Receptionist') counts.receptionists++;
        if (m.role === 'Finance Manager') counts.finance++;
      }
    });
    return counts;
  }, [members]);

  // Handle Action Dispatches
  const handleToggleStatus = (id) => {
    dispatch({
      type: 'TOGGLE_STAFF_STATUS',
      payload: id
    });
  };

  const handleDeleteStaff = (id) => {
    if (confirm("Are you sure you want to remove this staff member from your clinic directory?")) {
      dispatch({
        type: 'DELETE_STAFF',
        payload: id
      });
    }
  };

  // Filtered Roster
  const filteredRoster = useMemo(() => {
    return members.filter(m => {
      const matchesSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.email.toLowerCase().includes(search.toLowerCase()) ||
        m.id.toLowerCase().includes(search.toLowerCase());
      
      const matchesRole = roleFilter === 'All' || m.role === roleFilter;
      const matchesStatus = statusFilter === 'All' || m.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [members, search, roleFilter, statusFilter]);

  const getAvatarBg = (role) => {
    if (role === 'Doctor') return 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    if (role === 'Receptionist') return 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)';
    return 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
  };

  const getInitials = (name) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <>
      <PageHeader>
        <div>
          <h3>
            <Users size={22} color="#10b981" />
            Clinic Staff Management
          </h3>
          <p>Create credentials and monitor shifts for doctors, receptionists, and finance leads.</p>
        </div>
        <Button primary={true} onClick={() => setIsDrawerOpen(true)}>
          <UserPlus size={16} /> Register New Staff
        </Button>
      </PageHeader>

      <KPIContainer>
        <KPICard>
          <KPIIcon bg="rgba(16, 185, 129, 0.08)" color="#10b981">
            <Users size={20} />
          </KPIIcon>
          <KPIValue>{metrics.total}</KPIValue>
          <KPILabel>Total Registered Roster</KPILabel>
        </KPICard>

        <KPICard>
          <KPIIcon bg="rgba(16, 185, 129, 0.08)" color="#10b981">
            <Activity size={20} />
          </KPIIcon>
          <KPIValue>{metrics.doctors}</KPIValue>
          <KPILabel>Active Medical Doctors</KPILabel>
        </KPICard>

        <KPICard>
          <KPIIcon bg="rgba(139, 92, 246, 0.08)" color="#8b5cf6">
            <Shield size={20} />
          </KPIIcon>
          <KPIValue>{metrics.receptionists}</KPIValue>
          <KPILabel>Active Receptionists</KPILabel>
        </KPICard>

        <KPICard>
          <KPIIcon bg="rgba(245, 158, 11, 0.08)" color="#f59e0b">
            <DollarSign size={20} />
          </KPIIcon>
          <KPIValue>{metrics.finance}</KPIValue>
          <KPILabel>Active Finance Managers</KPILabel>
        </KPICard>
      </KPIContainer>

      <PanelCard>
        <ControlBar>
          <SearchInputBox>
            <Search size={16} />
            <input
              type="text"
              placeholder="Search by name, email or employee ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </SearchInputBox>

          <FilterWrapper>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748b' }}>
              <Filter size={14} /> Filter:
            </div>
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
              <option value="All">All Roles</option>
              <option value="Doctor">Doctors</option>
              <option value="Receptionist">Receptionists</option>
              <option value="Finance Manager">Finance Managers</option>
            </select>

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </FilterWrapper>
        </ControlBar>

        <TableWrapper>
          <CustomTable>
            <thead>
              <tr>
                <Th>Staff Profile</Th>
                <Th>Employee ID</Th>
                <Th>Role Badge</Th>
                <Th>Assigned Specialty</Th>
                <Th>Duty Shift</Th>
                <Th>Status Toggle</Th>
                <Th style={{ textAlign: 'center' }}>Remove</Th>
              </tr>
            </thead>
            <tbody>
              {filteredRoster.length > 0 ? (
                filteredRoster.map((member) => (
                  <tr key={member.id}>
                    <Td>
                      <ProfileCell>
                        <StaffAvatar bg={getAvatarBg(member.role)}>
                          {getInitials(member.name)}
                        </StaffAvatar>
                        <StaffInfo>
                          <span className="name">{member.name}</span>
                          <span className="email">{member.email} • {member.phone}</span>
                        </StaffInfo>
                      </ProfileCell>
                    </Td>
                    <Td style={{ fontWeight: '600', color: '#10b981' }}>{member.id}</Td>
                    <Td>
                      <RoleBadge role={member.role}>{member.role}</RoleBadge>
                    </Td>
                    <Td>{member.specialty}</Td>
                    <Td>{member.shift}</Td>
                    <Td>
                      <ToggleLabel>
                        <input
                          type="checkbox"
                          checked={member.status === 'Active'}
                          onChange={() => handleToggleStatus(member.id)}
                        />
                        <ToggleSlider />
                      </ToggleLabel>
                      <StatusIndicator active={member.status === 'Active'}>
                        {member.status}
                      </StatusIndicator>
                    </Td>
                    <Td style={{ textAlign: 'center' }}>
                      <ActionBtn onClick={() => handleDeleteStaff(member.id)}>
                        <Trash2 size={16} />
                      </ActionBtn>
                    </Td>
                  </tr>
                ))
              ) : (
                <tr>
                  <Td colSpan="7" style={{ textAlign: 'center', padding: '40px 0', color: '#64748b' }}>
                    No staff members found matching search filters.
                  </Td>
                </tr>
              )}
            </tbody>
          </CustomTable>
        </TableWrapper>
      </PanelCard>

      <AddStaffDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
};

export default StaffManagement;
