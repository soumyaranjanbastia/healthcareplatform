import React from 'react';
import styled from 'styled-components';
import { Heart, Activity, TrendingUp, Users, DollarSign, LogOut } from 'lucide-react';

const SidebarContainer = styled.aside`
  width: 280px;
  background: linear-gradient(180deg, #0d1321 0%, #070a12 100%);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  padding: 24px;
  position: fixed;
  height: 100vh;
  z-index: 100;
  @media (max-width: 1024px) {
    width: 80px;
    padding: 16px 12px;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
  padding-left: 8px;
  @media (max-width: 1024px) {
    justify-content: center;
    padding-left: 0;
  }
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
`;

const LogoText = styled.h1`
  font-family: 'Outfit', sans-serif;
  font-size: 20px;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #94a3b8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const NavLink = styled.button`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  background: ${props => props.active ? 'rgba(16, 185, 129, 0.1)' : 'transparent'};
  border: none;
  border-left: 3px solid ${props => props.active ? '#10b981' : 'transparent'};
  border-radius: 0 12px 12px 0;
  color: ${props => props.active ? '#10b981' : '#94a3b8'};
  font-size: 14px;
  font-weight: ${props => props.active ? '600' : '500'};
  text-align: left;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  width: 100%;

  &:hover {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.03);
  }

  @media (max-width: 1024px) {
    justify-content: center;
    border-radius: 12px;
    border-left: none;
    padding: 16px;
    span {
      display: none;
    }
  }
`;

const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 8px 16px;
  border-radius: 16px;
  width: 100%;
`;

const Avatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
`;

const ProfileInfo = styled.div`
  text-align: left;
  flex: 1;
  min-width: 0;
  h4 {
    font-size: 14px;
    color: #ffffff;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  span {
    font-size: 11px;
    color: #64748b;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }
`;

const LogoutButton = styled.button`
  background: transparent;
  border: none;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 8px;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    color: #ef4444;
    background: rgba(239, 68, 68, 0.08);
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const Sidebar = ({ activeTab, setActiveTab, onLogout, currentUser, clinicDetails }) => {
  const adminName = currentUser?.name || "Dr. Aditya Vardhan";
  const initials = adminName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || "AV";
  const clinicRole = currentUser?.designation || "Administrator";

  return (
    <SidebarContainer>
      <LogoWrapper>
        <LogoIcon>
          <Heart size={22} color="#ffffff" />
        </LogoIcon>
        <LogoText>Swastyam</LogoText>
      </LogoWrapper>

      <SidebarNav>
        <NavLink active={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')}>
          <Activity size={18} />
          <span>Dashboard Overview</span>
        </NavLink>
        <NavLink active={activeTab === 'Vitals'} onClick={() => setActiveTab('Vitals')}>
          <TrendingUp size={18} />
          <span>Live Vitals Monitor</span>
        </NavLink>
        <NavLink active={activeTab === 'Patients'} onClick={() => setActiveTab('Patients')}>
          <Users size={18} />
          <span>Patient Database</span>
        </NavLink>
        <NavLink active={activeTab === 'Staff'} onClick={() => setActiveTab('Staff')}>
          <Users size={18} />
          <span>Staff Management</span>
        </NavLink>
        <NavLink active={activeTab === 'Billing'} onClick={() => setActiveTab('Billing')}>
          <DollarSign size={18} />
          <span>Billing & Invoices</span>
        </NavLink>
      </SidebarNav>

      <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: 20 }}>
        <ProfileCard style={{ background: 'transparent', border: 'none', padding: 0 }}>
          <Avatar>{initials}</Avatar>
          <ProfileInfo>
            <h4>{adminName}</h4>
            <span>{clinicRole}</span>
          </ProfileInfo>
          <LogoutButton onClick={onLogout} title="Sign Out Clinic">
            <LogOut size={16} />
          </LogoutButton>
        </ProfileCard>
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
