import React, { useState } from 'react';
import styled from 'styled-components';
import { Clock, RefreshCcw } from 'lucide-react';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.h1`
  font-family: 'Outfit', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
`;

const Subtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #64748b;
  margin: 0;
`;

const ActionsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const LastUpdated = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #94a3b8;
  font-weight: 500;
`;

const RefreshButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 8px 12px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #334155;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #e2e8f0;
  }
`;

const SegmentedControl = styled.div`
  display: flex;
  background: #f1f5f9;
  border-radius: 8px;
  padding: 4px;
`;

const Segment = styled.button`
  background: ${props => props.active ? '#0f172a' : 'transparent'};
  color: ${props => props.active ? '#ffffff' : '#64748b'};
  border: none;
  border-radius: 6px;
  padding: 6px 16px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: ${props => props.active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${props => props.active ? '#ffffff' : '#334155'};
  }
`;

const AdminHeader = () => {
  const [activeTab, setActiveTab] = useState('Daily');

  return (
    <HeaderContainer>
      <TitleSection>
        <Title>Hospital Overview Dashboard</Title>
        <Subtitle>Comprehensive analytics and performance metrics</Subtitle>
      </TitleSection>

      <ActionsSection>
        <LastUpdated>
          <Clock size={14} />
          Last Updated: 2 mins ago
        </LastUpdated>
        <RefreshButton>
          <RefreshCcw size={14} />
          Refresh
        </RefreshButton>
        <SegmentedControl>
          {['Daily', 'Weekly', 'Monthly'].map(tab => (
            <Segment
              key={tab}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Segment>
          ))}
        </SegmentedControl>
      </ActionsSection>
    </HeaderContainer>
  );
};

export default AdminHeader;
