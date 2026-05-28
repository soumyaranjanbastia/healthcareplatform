import React from 'react';
import styled from 'styled-components';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
  PieChart, Pie,
  LineChart, Line
} from 'recharts';

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  border: 1px solid #f1f5f9;
  height: 350px;
  display: flex;
  flex-direction: column;
`;

const ChartTitle = styled.h3`
  font-family: 'Outfit', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 24px 0;
`;

const ChartWrapper = styled.div`
  flex: 1;
  width: 100%;
  position: relative;
`;

const CustomTooltipContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 12px;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #1e293b;
`;

const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
`;

const LegendDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

const LegendLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #475569;
  font-weight: 500;
`;

const LegendValue = styled.div`
  text-align: right;
`;

const LegendAmount = styled.div`
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  color: #0f172a;
  font-size: 14px;
`;

const LegendTxn = styled.div`
  font-size: 11px;
  color: #94a3b8;
`;

// --- Data Definitions ---

const opdLoadData = [
  { time: '8AM', patients: 15 },
  { time: '10AM', patients: 45 },
  { time: '12PM', patients: 72 },
  { time: '2PM', patients: 48 },
  { time: '4PM', patients: 68 },
  { time: '6PM', patients: 35 },
  { time: '8PM', patients: 15 },
];

const docUtilizationData = [
  { dept: 'Cardiology', value: 24 },
  { dept: 'Neurology', value: 16 },
  { dept: 'Orthopedics', value: 18 },
  { dept: 'Pediatrics', value: 22 },
  { dept: 'Emergency', value: 12 },
];

const paymentData = [
  { name: 'UPI', value: 385, txns: 542, color: '#3b82f6' },
  { name: 'Cash', value: 295, txns: 324, color: '#10b981' },
  { name: 'Card', value: 195, txns: 256, color: '#f59e0b' },
  { name: 'Insurance', value: 45, txns: 45, color: '#ef4444' },
];

const hourlyTrendData = [
  { time: '8AM', revenue: 12000 },
  { time: '10AM', revenue: 25000 },
  { time: '12PM', revenue: 35000 },
  { time: '2PM', revenue: 42000 },
  { time: '4PM', revenue: 38000 },
  { time: '6PM', revenue: 28000 },
];

// --- Custom Components ---

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <CustomTooltipContainer>
        <strong>{label}</strong>
        <div style={{ marginTop: '4px' }}>
          Value: {payload[0].value}
        </div>
      </CustomTooltipContainer>
    );
  }
  return null;
};

const CustomDot = (props) => {
  const { cx, cy } = props;
  return (
    <circle cx={cx} cy={cy} r={4} stroke="#10b981" strokeWidth={2} fill="#ffffff" />
  );
};

const AdminCharts = () => {
  return (
    <ChartsGrid>

      {/* Chart 1: OPD Load Area Chart */}
      <ChartCard>
        <ChartTitle>Patient Ratio Analytics - OPD Load by Hour</ChartTitle>
        <ChartWrapper>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={opdLoadData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <RechartsTooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="patients" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorPatients)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </ChartCard>

      {/* Chart 2: Doctor Utilization Bar Chart */}
      <ChartCard>
        <ChartTitle>Doctor Utilization - Available vs Utilized</ChartTitle>
        <ChartWrapper>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={docUtilizationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="dept" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(241, 245, 249, 0.5)' }} />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </ChartCard>

      {/* Chart 3: Payment Breakdown Pie Chart + Legend */}
      <ChartCard>
        <ChartTitle>Payment Breakdown - Cash / UPI / Insurance</ChartTitle>
        <ChartWrapper style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: 1, height: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {paymentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ flex: 1 }}>
            <LegendContainer>
              {paymentData.map((item, idx) => (
                <LegendItem key={idx}>
                  <LegendLabel>
                    <LegendDot color={item.color} />
                    {item.name}
                  </LegendLabel>
                  <LegendValue>
                    <LegendAmount>₹{item.value}K</LegendAmount>
                    <LegendTxn>{item.txns} txns</LegendTxn>
                  </LegendValue>
                </LegendItem>
              ))}
            </LegendContainer>
          </div>
        </ChartWrapper>
      </ChartCard>

      {/* Chart 4: Revenue Trend Line Chart */}
      <ChartCard>
        <ChartTitle>Revenue Distribution - Hourly Trend</ChartTitle>
        <ChartWrapper>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={hourlyTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(val) => val === 0 ? '0' : val} />
              <RechartsTooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={2}
                dot={<CustomDot />}
                activeDot={{ r: 6, fill: '#10b981', stroke: '#ffffff', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </ChartCard>

    </ChartsGrid>
  );
};

export default AdminCharts;
