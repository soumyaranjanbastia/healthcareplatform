import React from 'react';
import styled from 'styled-components';
import { Bell, Settings, LogOut } from 'lucide-react';

const TopHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 36px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const HeaderGreeting = styled.div`
  h2 {
    font-family: 'Outfit', sans-serif;
    font-size: 26px;
    color: #ffffff;
    font-weight: 700;
  }
  p {
    font-size: 14px;
    color: #64748b;
    margin-top: 4px;
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
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
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
  h4 {
    font-size: 14px;
    color: #ffffff;
    font-weight: 600;
  }
  span {
    font-size: 11px;
    color: #64748b;
    font-weight: 500;
    display: block;
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Header = ({ currentUser, clinicDetails, onLogout }) => {
  const adminName = currentUser?.name || "Dr. Aditya Vardhan";
  const clinicName = clinicDetails?.name || "Swastyam General Hospital";
  const initials = adminName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || "AV";

  return (
    <TopHeader>
      <HeaderGreeting>
        <h2>Swastyam Healthcare Platform</h2>
        <p>Welcome back, {adminName}. Clinic operations are running optimally.</p>
      </HeaderGreeting>
      <ProfileCard>
        <IconGroup>
          <Bell size={18} color="#64748b" style={{ cursor: 'pointer' }} title="Alert Center" />
          <Settings size={18} color="#64748b" style={{ cursor: 'pointer' }} title="Clinic Settings" />
          <LogOut size={18} color="#64748b" style={{ cursor: 'pointer' }} title="Sign Out" onClick={onLogout} />
        </IconGroup>
        <div style={{ width: 1, height: 24, backgroundColor: 'rgba(255,255,255,0.08)' }} />
        <Avatar>{initials}</Avatar>
        <ProfileInfo>
          <h4>{adminName}</h4>
          <span title={clinicName}>{clinicName}</span>
        </ProfileInfo>
      </ProfileCard>
    </TopHeader>
  );
};

export default Header;
