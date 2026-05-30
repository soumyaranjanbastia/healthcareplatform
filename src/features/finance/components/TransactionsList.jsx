import React, { useState } from 'react';
import styled from 'styled-components';
import { Search, Eye, Download, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FilterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 8px 16px;
  flex: 1;
  min-width: 300px;

  input {
    border: none;
    outline: none;
    font-size: 13px;
    width: 100%;
    color: #1e293b;
    background: transparent;

    &::placeholder {
      color: #94a3b8;
    }
  }
`;

const FiltersGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #ffffff;
  font-size: 13px;
  color: #1e293b;
  outline: none;
  cursor: pointer;

  &:hover {
    border-color: #cbd5e1;
  }
`;

const TableCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
`;

const TableHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;

  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    color: #0f172a;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th {
    text-align: left;
    padding: 12px 20px;
    font-size: 12px;
    font-weight: 600;
    color: #64748b;
    background-color: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
  }
  
  td {
    padding: 16px 20px;
    font-size: 13px;
    color: #1e293b;
    border-bottom: 1px solid #f1f5f9;
    font-weight: 500;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  
  ${props => props.status === 'Completed' ? `
    background-color: #e6f4ea;
    color: #137333;
  ` : props.status === 'Pending' ? `
    background-color: #fef3c7;
    color: #b45309;
  ` : props.status === 'Approved' ? `
    background-color: #dcfce7;
    color: #166534;
  ` : `
    background-color: #f1f5f9;
    color: #475569;
  `}
`;

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background-color: transparent;
  color: #64748b;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #f1f5f9;
    color: #1e293b;
  }
`;

const PaginationRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-top: 1px solid #e2e8f0;
  background-color: #ffffff;
`;

const ShowingText = styled.span`
  font-size: 13px;
  color: #64748b;
`;

const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const PageBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 6px;
  border: 1px solid ${props => props.active ? '#009688' : '#e2e8f0'};
  background-color: ${props => props.active ? '#009688' : '#ffffff'};
  color: ${props => props.active ? '#ffffff' : '#475569'};
  cursor: pointer;

  &:hover {
    background-color: ${props => props.active ? '#009688' : '#f8fafc'};
  }
`;

const TransactionsList = ({ type, onViewTransaction }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data based on type
  const txns = [
    { id: 'TXN-1234', date: '2024-05-27 10:30 AM', orderId: 'CLC-2026-XXXX', patientId: 'PT-2026-XXXX', dept: 'Cardiology', method: 'Credit Card', amount: '₹1,200', comm: '₹200', tax: '₹100', status: type === 'Refunds' ? 'Refunded' : 'Completed', reason: 'Booking cancelled by patient', isRefund: type === 'Refunds' },
    { id: 'TXN-1237', date: '2024-05-27 10:40 AM', orderId: 'CLC-2026-XXXX', patientId: 'PT-2026-XXXX', dept: 'Cardiology', method: 'Credit Card', amount: '₹1,200', comm: '₹200', tax: '₹100', status: type === 'Refunds' ? 'Pending' : 'Completed', reason: 'Duplicate payment', isRefund: type === 'Refunds' },
    { id: 'TXN-1239', date: '2024-05-27 10:50 AM', orderId: 'CLC-2026-XXXX', patientId: 'PT-2026-XXXX', dept: 'Cardiology', method: 'Credit Card', amount: '₹1,200', comm: '₹200', tax: '₹100', status: type === 'Refunds' ? 'Approved' : 'Completed', reason: 'Booking cancelled by patient', isRefund: type === 'Refunds' },
    { id: 'TXN-1233', date: '2024-05-27 11:30 AM', orderId: 'CLC-2026-XXXX', patientId: 'PT-2026-XXXX', dept: 'Cardiology', method: 'Credit Card', amount: '₹1,200', comm: '₹200', tax: '₹100', status: type === 'Refunds' ? 'Refunded' : 'Completed', reason: 'Booking cancelled by patient', isRefund: type === 'Refunds' },
  ];

  return (
    <Container>
      <FilterRow>
        <SearchBox>
          <Search size={16} color="#94a3b8" />
          <input 
            type="text" 
            placeholder="Search by patient ID, invoice ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBox>

        <FiltersGroup>
          <Select><option>Date selection</option></Select>
          <Select><option>Department</option><option>Cardiology</option></Select>
          <Select><option>Method</option><option>Credit Card</option></Select>
          <Select><option>Status</option><option>Completed</option></Select>
        </FiltersGroup>
      </FilterRow>

      <TableCard>
        <TableHeader>
          <h3>{type === 'Refunds' ? 'Refund Transactions' : type === 'Payouts' ? 'Payouts & Settlements' : 'All Transactions'}</h3>
        </TableHeader>
        <div style={{ overflowX: 'auto' }}>
          <Table>
            <thead>
              <tr>
                <th>Sl.No</th>
                <th>Date</th>
                <th>Transaction ID</th>
                <th>OrderID/Clinic ID</th>
                <th>Patient Id</th>
                <th>Department</th>
                <th>Method</th>
                <th>Amount</th>
                {type === 'Refunds' ? <th>Reason</th> : <th>Commission</th>}
                {type === 'Refunds' ? null : <th>Taxes</th>}
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {txns.map((txn, idx) => (
                <tr key={txn.id}>
                  <td style={{ color: '#64748b' }}>0{idx + 1}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {txn.date.split(' ')[0]}<br/>
                    <span style={{ color: '#64748b', fontSize: '11px' }}>{txn.date.split(' ')[1]} {txn.date.split(' ')[2]}</span>
                  </td>
                  <td>{txn.id}</td>
                  <td style={{ color: '#3b82f6' }}>{txn.orderId}</td>
                  <td style={{ color: '#3b82f6' }}>{txn.patientId}</td>
                  <td>{txn.dept}</td>
                  <td>{txn.method}</td>
                  <td style={{ fontWeight: '700' }}>{txn.amount}</td>
                  {type === 'Refunds' ? <td style={{ color: '#64748b', fontSize: '12px' }}>{txn.reason}</td> : <td>{txn.comm}</td>}
                  {type === 'Refunds' ? null : <td>{txn.tax}</td>}
                  <td><StatusBadge status={txn.status}>{txn.status}</StatusBadge></td>
                  <td>
                    <ActionGroup>
                      <IconButton onClick={() => onViewTransaction(txn)}><Eye size={16} /></IconButton>
                      <IconButton><Download size={16} /></IconButton>
                    </ActionGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <PaginationRow>
          <ShowingText>Showing 4 of 4 Transactions</ShowingText>
          <PaginationControls>
            <PageBtn>Previous</PageBtn>
            <PageBtn active>1</PageBtn>
            <PageBtn>2</PageBtn>
            <PageBtn>3</PageBtn>
            <PageBtn>Next</PageBtn>
          </PaginationControls>
        </PaginationRow>
      </TableCard>
    </Container>
  );
};

export default TransactionsList;
