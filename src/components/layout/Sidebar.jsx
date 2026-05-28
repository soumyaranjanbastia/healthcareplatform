import React, { useState } from 'react';
import styled from 'styled-components';
import { LayoutDashboard, Users, Calendar, Activity, Settings, LogOut, X, UserCog, Stethoscope } from 'lucide-react';
import { useDispatch } from 'react-redux';
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

  const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'Doctors', icon: <Stethoscope size={20} /> },
    { label: 'Patients', icon: <Users size={20} /> },
    { label: 'Appointments', icon: <Calendar size={20} /> },
    { label: 'Analytics', icon: <Activity size={20} /> },
    { label: 'Staff', icon: <UserCog size={20} /> },
  ];

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
              key={item.label}
              active={item.label === activeLabel}
              onClick={() => {
                if (onNavItemClick) onNavItemClick(item.label);
              }}
            >
              {item.icon}
              {item.label}
            </NavItem>
          ))}

          <Spacer />

          <NavItem onClick={() => onNavItemClick && onNavItemClick('Settings')}>
            <Settings size={20} />
            Settings
          </NavItem>
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
