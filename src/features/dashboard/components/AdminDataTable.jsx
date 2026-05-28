import React, { useState } from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  border: 1px solid #f1f5f9;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h3`
  font-family: 'Outfit', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
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
  padding: 4px 12px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: ${props => props.active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${props => props.active ? '#ffffff' : '#334155'};
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const Th = styled.th`
  padding: 12px 16px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #64748b;
  border-bottom: 1px solid #f1f5f9;
  white-space: nowrap;
`;

const Td = styled.td`
  padding: 16px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #1e293b;
  border-bottom: 1px solid #f8fafc;
  vertical-align: middle;
`;

const DoctorCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  color: #475569;
`;

const Name = styled.span`
  font-weight: 500;
`;

const RatingWrapper = styled.div`
  font-weight: 600;
  color: #0f172a;
  span {
    color: #94a3b8;
    font-weight: 400;
    font-size: 11px;
  }
`;

const ProgressBarWrapper = styled.div`
  width: 100px;
  height: 6px;
  background: #f1f5f9;
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: #10b981;
  width: ${props => props.percent}%;
  border-radius: 3px;
`;

const tableData = [
  { initials: 'DSJ', name: 'Dr. Sarah Johnson', consultations: 158, revenue: '₹124.8K', rating: 4.9, duration: '18 min', performance: 95 },
  { initials: 'DMC', name: 'Dr. Michael Chen', consultations: 142, revenue: '₹113.5K', rating: 4.8, duration: '22 min', performance: 88 },
  { initials: 'DED', name: 'Dr. Emily Davis', consultations: 138, revenue: '₹110.4K', rating: 4.7, duration: '20 min', performance: 85 },
  { initials: 'DJW', name: 'Dr. James Wilson', consultations: 145, revenue: '₹116.0K', rating: 4.9, duration: '19 min', performance: 92 },
  { initials: 'DRA', name: 'Dr. Robert Anderson', consultations: 132, revenue: '₹105.6K', rating: 4.6, duration: '21 min', performance: 82 },
];

const AdminDataTable = () => {
  const [activeTab, setActiveTab] = useState('Daily');

  return (
    <TableContainer>
      <HeaderRow>
        <Title>Doctor Performance Analytics</Title>
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
      </HeaderRow>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>Doctor</Th>
              <Th>Consultations</Th>
              <Th>Revenue</Th>
              <Th>Rating</Th>
              <Th>Avg Duration</Th>
              <Th>Performance</Th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, idx) => (
              <tr key={idx}>
                <Td>
                  <DoctorCell>
                    <Avatar>{row.initials}</Avatar>
                    <Name>{row.name}</Name>
                  </DoctorCell>
                </Td>
                <Td>{row.consultations}</Td>
                <Td style={{ fontWeight: '500' }}>{row.revenue}</Td>
                <Td>
                  <RatingWrapper>{row.rating} <span>/ 5.0</span></RatingWrapper>
                </Td>
                <Td>{row.duration}</Td>
                <Td>
                  <ProgressBarWrapper>
                    <ProgressFill percent={row.performance} />
                  </ProgressBarWrapper>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </TableContainer>
  );
};

export default AdminDataTable;
