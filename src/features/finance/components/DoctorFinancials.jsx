import React from 'react';
import styled from 'styled-components';
import { ArrowLeft, Download, Printer, Eye, TrendingUp } from 'lucide-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const BackBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  color: #475569;
  transition: all 0.2s;

  &:hover {
    background: #f1f5f9;
  }
`;

const TitleText = styled.div`
  h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    color: #0f172a;
  }
  p {
    margin: 4px 0 0 0;
    font-size: 13px;
    color: #64748b;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const OutlinedBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #1e293b;
  cursor: pointer;

  &:hover {
    background: #f8fafc;
  }
`;

const PrimaryBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #009688;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;

  &:hover {
    background: #00796b;
  }
`;

const MainCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const RevenueBanner = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  span {
    font-size: 13px;
    color: #64748b;
    font-weight: 600;
  }
  h2 {
    margin: 0;
    font-size: 32px;
    font-weight: 700;
    color: #0f172a;
  }
  div {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #10b981;
    font-size: 12px;
    font-weight: 600;
  }
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const MetricBox = styled.div`
  background: ${props => props.bg || '#f8fafc'};
  border: 1px solid ${props => props.borderColor || 'transparent'};
  padding: 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  span:first-child {
    font-size: 12px;
    color: ${props => props.labelColor || '#64748b'};
    font-weight: 600;
  }
  span:last-child {
    font-size: 20px;
    color: ${props => props.valueColor || '#0f172a'};
    font-weight: 700;
  }
`;

const TableContainer = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
`;

const TableHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #e2e8f0;
  background: #ffffff;

  h4 {
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
  background-color: #e6f4ea;
  color: #137333;
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

const DoctorFinancials = ({ doctor, onBack }) => {
  if (!doctor) return null;

  const txns = [
    { id: 'TXN-1234', date: '2024-05-27 10:30 AM', orderId: 'CLC-2026-XXXX', patientId: 'PT-2026-XXXX', dept: doctor.dept, method: 'Credit Card', amount: '₹1,200', comm: '₹200', tax: '₹100', status: 'Completed' },
    { id: 'TXN-1237', date: '2024-05-27 10:40 AM', orderId: 'CLC-2026-XXXX', patientId: 'PT-2026-XXXX', dept: doctor.dept, method: 'Credit Card', amount: '₹1,200', comm: '₹200', tax: '₹100', status: 'Completed' },
    { id: 'TXN-1239', date: '2024-05-27 10:50 AM', orderId: 'CLC-2026-XXXX', patientId: 'PT-2026-XXXX', dept: doctor.dept, method: 'Credit Card', amount: '₹1,200', comm: '₹200', tax: '₹100', status: 'Completed' },
    { id: 'TXN-1233', date: '2024-05-27 11:30 AM', orderId: 'CLC-2026-XXXX', patientId: 'PT-2026-XXXX', dept: doctor.dept, method: 'Credit Card', amount: '₹1,200', comm: '₹200', tax: '₹100', status: 'Completed' },
  ];

  return (
    <Container>
      <HeaderContainer>
        <TitleWrapper>
          <BackBtn onClick={onBack}><ArrowLeft size={18} /></BackBtn>
          <TitleText>
            <h3>Doctor Financial Performance</h3>
            <p>{doctor.name} — {doctor.dept}</p>
          </TitleText>
        </TitleWrapper>
        <ActionButtons>
          <OutlinedBtn><Download size={16} /> Download PDF</OutlinedBtn>
          <PrimaryBtn><Printer size={16} /> Print</PrimaryBtn>
        </ActionButtons>
      </HeaderContainer>

      <MainCard>
        <RevenueBanner>
          <span>Revenue Generated This Month</span>
          <h2>{doctor.revenue || '₹4.8L'}</h2>
          <div><TrendingUp size={14} /> +18% vs last month</div>
        </RevenueBanner>

        <h5 style={{ margin: '0', fontSize: '13px', color: '#1e293b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>PERFORMANCE SUMMARY</h5>
        
        <SummaryGrid>
          <MetricBox bg="#f0f9ff">
            <span>Total Consultations</span>
            <span>{doctor.consults || '342'}</span>
          </MetricBox>
          <MetricBox bg="#ecfdf5">
            <span>Avg Consult Value</span>
            <span>{doctor.avgVal || '₹1,420'}</span>
          </MetricBox>
          <MetricBox bg="#faf5ff">
            <span>Follow-Ups</span>
            <span>118</span>
          </MetricBox>
          <MetricBox bg="#fff7ed">
            <span>Video Consults</span>
            <span>{doctor.video || '47'}</span>
          </MetricBox>
          <MetricBox bg="#fef2f2" borderColor="#fecaca" style={{ gridColumn: 'span 2' }}>
            <span style={{ color: '#ef4444' }}>Total Refunds</span>
            <span style={{ color: '#ef4444' }}>-₹12,000</span>
          </MetricBox>
        </SummaryGrid>

        <TableContainer>
          <TableHeader>
            <h4>Transactions</h4>
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
                  <th>Commission</th>
                  <th>Taxes</th>
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
                    <td>{txn.comm}</td>
                    <td>{txn.tax}</td>
                    <td><StatusBadge>{txn.status}</StatusBadge></td>
                    <td>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <IconButton><Eye size={16} /></IconButton>
                        <IconButton><Download size={16} /></IconButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </TableContainer>

      </MainCard>
    </Container>
  );
};

export default DoctorFinancials;
