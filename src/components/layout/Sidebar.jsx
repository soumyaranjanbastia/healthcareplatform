import React, { useState } from 'react';
import styled from 'styled-components';
import { LayoutDashboard, Users, Calendar, Activity, Settings, LogOut, X, UserCog, Stethoscope, Bell } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequest } from '../../features/auth/redux/logoutSlice';
import ConfirmModal from '../ConfirmModal';

const SidebarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: ${props => (props.isOpen ? '0' : '-260px')};
  width: 260px;
  height: 100vh;
  background-color: #ffffff;
  border-right: 1px solid #e2e8f0;
  transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 100;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.02);
`;

const SidebarContent = styled.div`
  width: 260px;
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  height: 100vh;
  box-sizing: border-box;
`;

const HeaderArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const LogoSection = styled.div`
  font-family: 'Outfit', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 6px;
  transition: all 0.2s;
  
  &:hover {
    background: #f1f5f9;
    color: #ef4444;
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: ${props => props.active ? '#ffffff' : '#64748b'};
  background-color: ${props => props.active ? '#009688' : 'transparent'};
  transition: all 0.2s ease;
  margin-bottom: 8px;

  &:hover {
    background-color: ${props => props.active ? '#009688' : '#f1f5f9'};
    color: ${props => props.active ? '#ffffff' : '#1e293b'};
  }
`;

const LogoutItem = styled(NavItem)`
  color: #ef4444;
  
  &:hover {
    background-color: #fef2f2;
    color: #ef4444;
  }
`;

const Spacer = styled.div`
  flex: 1;
`;

const Sidebar = ({ activeLabel, isOpen = true, onClose, onNavItemClick }) => {
  const dispatch = useDispatch();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const { currentUser } = useSelector(state => state.sendLoginOtp);
  const userRole = currentUser?.role || 'Admin';

  const adminNavItems = [
    { id: 'Dashboard', label: 'Admin Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'Patients', label: 'Patients Management', icon: <Users size={20} /> },
    { id: 'Doctors', label: 'Doctors Management', icon: <Stethoscope size={20} /> },
    { id: 'Appointments', label: 'Booking Management', icon: <Calendar size={20} /> },
    { id: 'Staff', label: 'Staff', icon: <UserCog size={20} /> },
    { id: 'Analytics', label: 'Analytics', icon: <Activity size={20} /> },
  ];

  const receptionistNavItems = [
    { id: 'Dashboard', label: 'Receptionist Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'Patients', label: 'Patients Management', icon: <Users size={20} /> },
    { id: 'Doctors', label: 'Doctors Management', icon: <Stethoscope size={20} /> },
    { id: 'Appointments', label: 'Booking Management', icon: <Calendar size={20} /> },
  ];

  const navItems = userRole === 'Receptionist' ? receptionistNavItems : adminNavItems;

  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    dispatch(logoutRequest());
  };

  return (
    <>
      <SidebarWrapper isOpen={isOpen}>
        <SidebarContent>
          <HeaderArea>
            <LogoSection>
              <Activity size={24} color="#009688" />
              HealthAdmin
            </LogoSection>
            <CloseButton onClick={onClose}>
              <X size={20} />
            </CloseButton>
          </HeaderArea>

          {navItems.map(item => (
            <NavItem
              key={item.id}
              active={item.id === activeLabel}
              onClick={() => {
                if (onNavItemClick) onNavItemClick(item.id);
              }}
            >
              {item.icon}
              {item.label}
            </NavItem>
          ))}

          <Spacer />

          <LogoutItem onClick={() => setIsLogoutModalOpen(true)}>
            <LogOut size={20} />
            Logout
          </LogoutItem>
        </SidebarContent>
      </SidebarWrapper>

      <ConfirmModal 
        isOpen={isLogoutModalOpen}
        title="Logout"
        message="Are you sure you want to logout?"
        onConfirm={handleLogoutConfirm}
        onCancel={() => setIsLogoutModalOpen(false)}
        confirmText="Yes, Logout"
        cancelText="Cancel"
      />
    </>
  );
};

export default Sidebar;
