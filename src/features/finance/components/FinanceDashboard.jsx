import React from 'react';
import styled from 'styled-components';
import { 
  DollarSign, TrendingDown, TrendingUp, Activity, 
  Eye, Download, MoreHorizontal 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend 
} from 'recharts';

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const MetricsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const MetricCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.bg};
  color: ${props => props.color};
`;

const MetricInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const MetricLabel = styled.span`
  font-size: 13px;
  color: #64748b;
  font-weight: 600;
`;

const MetricValue = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
  margin-top: 4px;
`;

const Trend = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  margin-top: 6px;
  color: ${props => props.isPositive ? '#10b981' : '#ef4444'};
`;

const MiddleRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h3 {
    font-size: 16px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }
`;

const ChartWrapper = styled.div`
  height: 300px;
  width: 100%;
`;

const PaymentMethodsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const PaymentMethodItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MethodHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MethodName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${props => props.color};
  }
`;

const MethodAmount = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 6px;
  background-color: #f1f5f9;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: ${props => props.color};
  width: ${props => props.percentage}%;
  border-radius: 4px;
`;

const MethodMeta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #64748b;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th {
    text-align: left;
    padding: 12px 16px;
    font-size: 12px;
    font-weight: 600;
    color: #64748b;
    border-bottom: 1px solid #e2e8f0;
    background-color: #f8fafc;
  }
  
  td {
    padding: 16px;
    font-size: 13px;
    color: #1e293b;
    border-bottom: 1px solid #f1f5f9;
    font-weight: 500;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

const DeptName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${props => props.color};
  }
`;

const ActionBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background-color: #009688;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #00796b;
  }
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

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  background-color: ${props => props.status === 'Completed' ? '#e6f4ea' : '#fef3c7'};
  color: ${props => props.status === 'Completed' ? '#137333' : '#b45309'};
`;

const FinanceDashboard = ({ onViewTransaction, onViewDoctor }) => {
  // Dummy Data
  const chartData = [
    { name: 'Jan', revenue: 140000, profit: 90000 },
    { name: 'Feb', revenue: 150000, profit: 100000 },
    { name: 'Mar', revenue: 145000, profit: 95000 },
    { name: 'Apr', revenue: 170000, profit: 110000 },
    { name: 'May', revenue: 190000, profit: 130000 },
    { name: 'Jun', revenue: 210000, profit: 145000 },
  ];

  const paymentMethods = [
    { name: 'Insurance', amount: '₹658K', transactions: 245, percentage: 42, color: '#3b82f6' },
    { name: 'Cash', amount: '₹385K', transactions: 542, percentage: 25, color: '#10b981' },
    { name: 'Credit Card', amount: '₹312K', transactions: 324, percentage: 20, color: '#f59e0b' },
    { name: 'Debit Card', amount: '₹195K', transactions: 216, percentage: 13, color: '#ef4444' },
  ];

  const departments = [
    { name: 'Cardiology', revenue: '₹450,000', expenses: '₹280,000', profit: '₹170,000', margin: '37.8%', contribution: 29, color: '#3b82f6' },
    { name: 'Neurology', revenue: '₹380,000', expenses: '₹245,000', profit: '₹135,000', margin: '35.5%', contribution: 24, color: '#10b981' },
    { name: 'Orthopedics', revenue: '₹320,000', expenses: '₹210,000', profit: '₹110,000', margin: '34.4%', contribution: 20, color: '#f59e0b' },
    { name: 'Pediatrics', revenue: '₹280,000', expenses: '₹195,000', profit: '₹85,000', margin: '30.4%', contribution: 17, color: '#ef4444' },
    { name: 'Emergency', revenue: '₹170,000', expenses: '₹125,000', profit: '₹45,000', margin: '26.5%', contribution: 11, color: '#8b5cf6' },
  ];

  const doctors = [
    { id: 'd1', name: 'Dr. Sarah Johnson', initial: 'J', dept: 'Cardiology', revenue: '₹4.8L', consults: 342, avgVal: '₹1,420', video: 47, share: '40%', payout: '₹1.92L' },
    { id: 'd2', name: 'Dr. Michael Chen', initial: 'C', dept: 'Neurology', revenue: '₹3.1L', consults: 218, avgVal: '₹1,580', video: 28, share: '38%', payout: '₹1.20L' },
    { id: 'd3', name: 'Dr. Emily Davis', initial: 'D', dept: 'Orthopedics', revenue: '₹2.6L', consults: 194, avgVal: '₹1,050', video: 12, share: '35%', payout: '₹0.92L' },
    { id: 'd4', name: 'Dr. James Wilson', initial: 'W', dept: 'Pediatrics', revenue: '₹2.0L', consults: 267, avgVal: '₹750', video: 31, share: '32%', payout: '₹0.63L' },
  ];

  const recentTxns = [
    { id: 'TXN-1234', date: '2024-05-27 10:30 AM', orderId: 'CLC-2026-XXXX', patientId: 'PT-2026-XXXX', dept: 'Cardiology', method: 'Credit Card', amount: '₹1,200', comm: '₹200', tax: '₹100', status: 'Completed' },
    { id: 'TXN-1237', date: '2024-05-27 10:40 AM', orderId: 'CLC-2026-XXXX', patientId: 'PT-2026-XXXX', dept: 'Cardiology', method: 'Credit Card', amount: '₹1,200', comm: '₹200', tax: '₹100', status: 'Completed' },
    { id: 'TXN-1239', date: '2024-05-27 10:50 AM', orderId: 'CLC-2026-XXXX', patientId: 'PT-2026-XXXX', dept: 'Cardiology', method: 'Credit Card', amount: '₹1,200', comm: '₹200', tax: '₹100', status: 'Completed' },
    { id: 'TXN-1233', date: '2024-05-27 11:30 AM', orderId: 'CLC-2026-XXXX', patientId: 'PT-2026-XXXX', dept: 'Cardiology', method: 'Credit Card', amount: '₹1,200', comm: '₹200', tax: '₹100', status: 'Completed' },
  ];

  return (
    <Grid>
      {/* METRICS ROW */}
      <MetricsRow>
        <MetricCard>
          <IconWrapper bg="#eff6ff" color="#3b82f6"><DollarSign size={24} /></IconWrapper>
          <MetricInfo>
            <MetricLabel>Total Revenue</MetricLabel>
            <MetricValue>₹1059K</MetricValue>
            <Trend isPositive={true}><TrendingUp size={12} /> +12.5%</Trend>
          </MetricInfo>
        </MetricCard>
        <MetricCard>
          <IconWrapper bg="#fef2f2" color="#ef4444"><TrendingDown size={24} /></IconWrapper>
          <MetricInfo>
            <MetricLabel>Pending payment</MetricLabel>
            <MetricValue>₹677K</MetricValue>
            <Trend isPositive={false}><TrendingDown size={12} /> -4.2%</Trend>
          </MetricInfo>
        </MetricCard>
        <MetricCard>
          <IconWrapper bg="#ecfdf5" color="#10b981"><DollarSign size={24} /></IconWrapper>
          <MetricInfo>
            <MetricLabel>Net Profit</MetricLabel>
            <MetricValue>₹382K</MetricValue>
            <Trend isPositive={true}><TrendingUp size={12} /> +18.7%</Trend>
          </MetricInfo>
        </MetricCard>
        <MetricCard>
          <IconWrapper bg="#faf5ff" color="#a855f7"><Activity size={24} /></IconWrapper>
          <MetricInfo>
            <MetricLabel>Profit Margin</MetricLabel>
            <MetricValue>36.1%</MetricValue>
            <Trend isPositive={true}><TrendingUp size={12} /> +5.1%</Trend>
          </MetricInfo>
        </MetricCard>
      </MetricsRow>

      {/* CHARTS ROW */}
      <MiddleRow>
        <Card>
          <CardHeader>
            <h3>Revenue vs Expenses Trend</h3>
            <select style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', outline: 'none' }}>
              <option>Monthly</option>
              <option>Weekly</option>
            </select>
          </CardHeader>
          <ChartWrapper>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} dx={-10} />
                <RechartsTooltip />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', marginTop: '10px' }} />
                <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="profit" name="Profit" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </Card>

        <Card>
          <CardHeader>
            <h3>Transactions by Payment Method</h3>
          </CardHeader>
          <PaymentMethodsList>
            {paymentMethods.map(pm => (
              <PaymentMethodItem key={pm.name}>
                <MethodHeader>
                  <MethodName color={pm.color}>{pm.name}</MethodName>
                  <MethodAmount>{pm.amount}</MethodAmount>
                </MethodHeader>
                <ProgressBarWrapper>
                  <ProgressFill color={pm.color} percentage={pm.percentage} />
                </ProgressBarWrapper>
                <MethodMeta>
                  <span>{pm.transactions} transactions</span>
                  <span>{pm.percentage}% of total</span>
                </MethodMeta>
              </PaymentMethodItem>
            ))}
          </PaymentMethodsList>
        </Card>
      </MiddleRow>

      {/* DEPARTMENT TABLE */}
      <Card>
        <CardHeader>
          <h3>Department-wise Financial Performance</h3>
        </CardHeader>
        <div style={{ overflowX: 'auto' }}>
          <Table>
            <thead>
              <tr>
                <th>Department</th>
                <th>Revenue</th>
                <th>Expenses</th>
                <th>Profit</th>
                <th>Margin</th>
                <th>Contribution</th>
              </tr>
            </thead>
            <tbody>
              {departments.map(dept => (
                <tr key={dept.name}>
                  <td><DeptName color={dept.color}>{dept.name}</DeptName></td>
                  <td>{dept.revenue}</td>
                  <td>{dept.expenses}</td>
                  <td style={{ color: '#10b981' }}>{dept.profit}</td>
                  <td>{dept.margin}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ProgressBarWrapper style={{ width: '60px', backgroundColor: '#e2e8f0' }}>
                        <ProgressFill color="#1e293b" percentage={dept.contribution} />
                      </ProgressBarWrapper>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>{dept.contribution}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>

      {/* DOCTOR PERFORMANCE */}
      <Card>
        <CardHeader>
          <h3>Doctor Financial Performance</h3>
        </CardHeader>
        <div style={{ overflowX: 'auto' }}>
          <Table>
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Department</th>
                <th>Revenue</th>
                <th>Consultations</th>
                <th>Avg Value</th>
                <th>Video</th>
                <th>Share %</th>
                <th>Payout</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doc, idx) => (
                <tr key={doc.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: ['#e0f2fe', '#dcfce7', '#fef3c7', '#f3e8ff'][idx % 4], color: ['#0369a1', '#166534', '#92400e', '#6b21a8'][idx % 4], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700' }}>
                        {doc.initial}
                      </div>
                      {doc.name}
                    </div>
                  </td>
                  <td>{doc.dept}</td>
                  <td style={{ color: '#10b981', fontWeight: '700' }}>{doc.revenue}</td>
                  <td>{doc.consults}</td>
                  <td>{doc.avgVal}</td>
                  <td>{doc.video}</td>
                  <td>{doc.share}</td>
                  <td style={{ fontWeight: '700' }}>{doc.payout}</td>
                  <td>
                    <ActionBtn onClick={() => onViewDoctor(doc)}>
                      <Eye size={14} /> Details
                    </ActionBtn>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>

      {/* RECENT TRANSACTIONS */}
      <Card>
        <CardHeader>
          <h3>Recent Transactions</h3>
        </CardHeader>
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
              {recentTxns.map((txn, idx) => (
                <tr key={txn.id}>
                  <td style={{ color: '#64748b' }}>0{idx + 1}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{txn.date.split(' ')[0]}<br/><span style={{ color: '#64748b', fontSize: '11px' }}>{txn.date.split(' ')[1]} {txn.date.split(' ')[2]}</span></td>
                  <td>{txn.id}</td>
                  <td style={{ color: '#3b82f6' }}>{txn.orderId}</td>
                  <td style={{ color: '#3b82f6' }}>{txn.patientId}</td>
                  <td>{txn.dept}</td>
                  <td>{txn.method}</td>
                  <td style={{ fontWeight: '700' }}>{txn.amount}</td>
                  <td>{txn.comm}</td>
                  <td>{txn.tax}</td>
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
      </Card>

    </Grid>
  );
};

export default FinanceDashboard;
