import React from 'react';
import styled from 'styled-components';
import { LayoutDashboard, Users, Calendar, Activity, Settings, LogOut, X } from 'lucide-react';

const SidebarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: ${props => (props.isOpen ? '0' : '-260px')};
  width: 260px;
  height: 100vh;
  background-color: #0f172a;
  border-right: none;
  transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 100;
  box-shadow: 4px 0 15px rgba(0,0,0,0.15);
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
  color: #ffffff;
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
    background: #1e293b;
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
  font-weight: 500;
  color: ${props => props.active ? '#ffffff' : '#94a3b8'};
  background-color: ${props => props.active ? '#1e293b' : 'transparent'};
  transition: all 0.2s ease;
  margin-bottom: 8px;

  &:hover {
    background-color: ${props => props.active ? '#1e293b' : '#1e293b'};
    color: #ffffff;
  }
`;

const Spacer = styled.div`
  flex: 1;
`;

const Sidebar = ({ activeLabel, isOpen = true, onClose }) => {
  const navItems = [
    { label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'Patients', icon: <Users size={20} /> },
    { label: 'Appointments', icon: <Calendar size={20} /> },
    { label: 'Analytics', icon: <Activity size={20} /> },
  ];

  return (
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
          <NavItem key={item.label} active={item.label === activeLabel}>
            {item.icon}
            {item.label}
          </NavItem>
        ))}

        <Spacer />

        <NavItem>
          <Settings size={20} />
          Settings
        </NavItem>
        <NavItem style={{ color: '#ef4444' }}>
          <LogOut size={20} />
          Logout
        </NavItem>
      </SidebarContent>
    </SidebarWrapper>
  );
};

export default Sidebar;
