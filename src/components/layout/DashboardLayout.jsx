import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import CommonHeader from './CommonHeader';
import { useSelector } from 'react-redux';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: #f8fafc;
  position: relative;
`;

const MainContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
`;

const ContentPadding = styled.div`
  padding: 32px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 40;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(2px);
  z-index: 90;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  pointer-events: ${props => (props.isOpen ? 'auto' : 'none')};
  transition: all 0.3s ease;
`;

const DashboardLayout = ({ children, activeSidebarLabel, onSidebarItemClick }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default to closed as per user preference
  const { currentUser } = useSelector(state => state.sendLoginOtp);

  return (
    <LayoutContainer>
      <Overlay isOpen={isSidebarOpen} onClick={() => setIsSidebarOpen(false)} />
      <Sidebar 
        activeLabel={activeSidebarLabel} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onNavItemClick={(label) => {
          setIsSidebarOpen(false);
          if (onSidebarItemClick) {
            onSidebarItemClick(label);
          }
        }}
      />
      
      <MainContentWrapper>
        <HeaderWrapper>
          <CommonHeader 
            userName={currentUser?.fullName || 'User'}
            userRole={currentUser?.role || 'Admin'}
            userEmail={currentUser?.email || 'user@example.com'}
            onMenuClick={() => setIsSidebarOpen(true)}
          />
        </HeaderWrapper>
        <ContentPadding>
          {children}
        </ContentPadding>
      </MainContentWrapper>
    </LayoutContainer>
  );
};

export default DashboardLayout;
