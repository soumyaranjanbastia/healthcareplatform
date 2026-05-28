import React from 'react';
import styled from 'styled-components';
import { Bell, User, Search } from 'lucide-react';

const DrawerContainer = styled.div`
  width: 280px;
  background-color: #ffffff;
  border-left: 1px solid #e2e8f0;
  padding: 24px 20px;
  height: 100vh;
  box-sizing: border-box;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #0f172a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #1e293b;
`;

const UserRole = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #64748b;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: #f1f5f9;
  border-radius: 10px;
  padding: 10px 14px;
  gap: 10px;
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  outline: none;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  width: 100%;
  color: #334155;

  &::placeholder {
    color: #94a3b8;
  }
`;

const NotificationsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Badge = styled.span`
  background: #ef4444;
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
`;

const NotificationItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
  border-left: 3px solid ${props => props.type === 'alert' ? '#ef4444' : '#0ea5e9'};
`;

const NotifText = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #334155;
`;

const NotifTime = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: #94a3b8;
`;

const RightDrawer = () => {
  return (
    <DrawerContainer>
      <ProfileSection>
        <Avatar><User size={20} /></Avatar>
        <UserInfo>
          <UserName>Admin User</UserName>
          <UserRole>Super Admin</UserRole>
        </UserInfo>
      </ProfileSection>

      <SearchContainer>
        <Search size={18} color="#94a3b8" />
        <SearchInput placeholder="Search..." />
      </SearchContainer>

      <NotificationsSection>
        <SectionTitle>
          Notifications
          <Badge>2</Badge>
        </SectionTitle>
        <NotificationItem type="alert">
          <NotifText>Emergency ward reaching capacity</NotifText>
          <NotifTime>5 mins ago</NotifTime>
        </NotificationItem>
        <NotificationItem type="info">
          <NotifText>New doctor Dr. Smith registered</NotifText>
          <NotifTime>1 hour ago</NotifTime>
        </NotificationItem>
      </NotificationsSection>
    </DrawerContainer>
  );
};

export default RightDrawer;
