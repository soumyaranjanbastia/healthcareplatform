import React from 'react';
import styled from 'styled-components';
import { User, Menu } from 'lucide-react';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  padding: 0 32px;
  box-sizing: border-box;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const MenuButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.2s;
  margin-left: -8px;

  &:hover {
    background-color: #f1f5f9;
    color: #1e293b;
  }
`;

const TopRightSection = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
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
  align-items: flex-end;
`;

const UserNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserName = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #1e293b;
`;

const RoleBadge = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  font-weight: 700;
  background-color: #f1f5f9;
  color: #475569;
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const UserEmail = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #64748b;
  margin-top: 2px;
`;

const CommonHeader = ({ userName, userRole, userEmail, onMenuClick }) => {
  return (
    <HeaderContainer>
      <HeaderLeft>
        <MenuButton onClick={onMenuClick}>
          <Menu size={24} />
        </MenuButton>
      </HeaderLeft>

      <TopRightSection>
        {userName && (
          <ProfileSection>
            <UserInfo>
              <UserNameWrapper>
                <UserName>{userName}</UserName>
                {userRole && <RoleBadge>{userRole}</RoleBadge>}
              </UserNameWrapper>
              {userEmail && <UserEmail>{userEmail}</UserEmail>}
            </UserInfo>
            <Avatar><User size={18} /></Avatar>
          </ProfileSection>
        )}
      </TopRightSection>
    </HeaderContainer>
  );
};

export default CommonHeader;
