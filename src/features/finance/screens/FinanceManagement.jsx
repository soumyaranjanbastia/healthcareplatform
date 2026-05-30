import React, { useState } from 'react';
import styled from 'styled-components';
import { RefreshCw, Download, Calendar } from 'lucide-react';
import FinanceDashboard from '../components/FinanceDashboard';
import TransactionsList from '../components/TransactionsList';
import TransactionDetails from '../components/TransactionDetails';
import DoctorFinancials from '../components/DoctorFinancials';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
`;

const TitleSection = styled.div`
  h2 {
    font-size: 24px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }
  p {
    font-size: 13px;
    color: #64748b;
    margin: 4px 0 0 0;
  }
`;

const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const LastUpdated = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #94a3b8;
  
  button {
    display: flex;
    align-items: center;
    gap: 4px;
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    padding: 6px 10px;
    border-radius: 6px;
    color: #475569;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: #e2e8f0;
      color: #0f172a;
    }
  }
`;

const TimeFilterGroup = styled.div`
  display: flex;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
`;

const TimeFilterBtn = styled.button`
  background: ${props => props.active ? '#009688' : 'transparent'};
  color: ${props => props.active ? '#ffffff' : '#64748b'};
  border: none;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#009688' : '#f8fafc'};
  }
`;

const DatePickerBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 8px 16px;
  border-radius: 8px;
  color: #475569;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #f8fafc;
  }
`;

const ExportBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #009688;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(0, 150, 136, 0.2);

  &:hover {
    background: #00796b;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 6px;
  gap: 4px;
`;

const TabBtn = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  background: ${props => props.active ? '#009688' : 'transparent'};
  color: ${props => props.active ? '#ffffff' : '#64748b'};
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#009688' : '#f8fafc'};
    color: ${props => props.active ? '#ffffff' : '#1e293b'};
  }
`;

const FinanceManagement = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [timeFilter, setTimeFilter] = useState('Daily');
  const [activeTransaction, setActiveTransaction] = useState(null);
  const [activeDoctor, setActiveDoctor] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setActiveTransaction(null);
    setActiveDoctor(null);
  };

  const renderContent = () => {
    if (activeTransaction) {
      return (
        <TransactionDetails 
          transaction={activeTransaction} 
          onBack={() => setActiveTransaction(null)} 
        />
      );
    }

    if (activeDoctor) {
      return (
        <DoctorFinancials 
          doctor={activeDoctor} 
          onBack={() => setActiveDoctor(null)} 
        />
      );
    }

    switch (activeTab) {
      case 'Dashboard':
        return (
          <FinanceDashboard 
            onViewTransaction={(txn) => setActiveTransaction(txn)}
            onViewDoctor={(doc) => setActiveDoctor(doc)}
          />
        );
      case 'All Transactions':
        return <TransactionsList type="All" onViewTransaction={(txn) => setActiveTransaction(txn)} />;
      case 'Refunds':
        return <TransactionsList type="Refunds" onViewTransaction={(txn) => setActiveTransaction(txn)} />;
      case 'Payouts & Settlements':
        return <TransactionsList type="Payouts" onViewTransaction={(txn) => setActiveTransaction(txn)} />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <HeaderRow>
        <TitleSection>
          <h2>Finance Management</h2>
          <p>Complete financial overview and transactions</p>
        </TitleSection>
        
        <HeaderControls>
          <LastUpdated>
            Last Updated: 2 mins ago
            <button><RefreshCw size={12} /> Refresh</button>
          </LastUpdated>
          
          <TimeFilterGroup>
            {['Daily', 'Weekly', 'Monthly'].map(f => (
              <TimeFilterBtn 
                key={f} 
                active={timeFilter === f}
                onClick={() => setTimeFilter(f)}
              >
                {f}
              </TimeFilterBtn>
            ))}
          </TimeFilterGroup>
          
          <DatePickerBtn>
            Date selection <Calendar size={14} />
          </DatePickerBtn>
          
          <ExportBtn>
            <Download size={14} /> Export Report
          </ExportBtn>
        </HeaderControls>
      </HeaderRow>

      <TabsContainer>
        {['Dashboard', 'All Transactions', 'Refunds', 'Payouts & Settlements'].map(tab => (
          <TabBtn 
            key={tab} 
            active={activeTab === tab && !activeTransaction && !activeDoctor}
            onClick={() => handleTabChange(tab)}
          >
            {/* Optional: Add icons based on tab name if needed */}
            {tab}
          </TabBtn>
        ))}
      </TabsContainer>

      {renderContent()}

    </Container>
  );
};

export default FinanceManagement;
