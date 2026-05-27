import React from 'react';
import styled from 'styled-components';
import { Users, Calendar, AlertTriangle, DollarSign, TrendingUp, Bell } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// --- STYLED COMPONENTS ---
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const GlassCard = styled.div`
  background: linear-gradient(135deg, rgba(17, 24, 39, 0.7) 0%, rgba(9, 13, 22, 0.8) 100%);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(16, 185, 129, 0.2);
  }
`;

const IconContainer = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: ${props => props.bg || 'rgba(16, 185, 129, 0.1)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color || '#10b981'};
  margin-bottom: 16px;
`;

const StatValue = styled.h3`
  font-family: 'Outfit', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
`;

const StatLabel = styled.span`
  font-size: 13px;
  color: #64748b;
  font-weight: 500;
  margin-top: 4px;
  display: block;
`;

const StatTrend = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.positive ? '#10b981' : '#f43f5e'};
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 30px;
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const SectionTitle = styled.h3`
  font-family: 'Outfit', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ChartContainerWrapper = styled.div`
  height: 320px;
  width: 100%;
`;

const AlertItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  background-color: rgba(239, 68, 68, 0.06);
  border-left: 3px solid #ef4444;
  border-radius: 0 10px 10px 0;
  margin-bottom: 12px;
  p {
    font-size: 13px;
    color: #f8fafc;
    font-weight: 500;
  }
  span {
    font-size: 11px;
    color: #ef4444;
    display: block;
    margin-top: 4px;
    font-weight: 600;
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 10px;
`;

const CustomTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const Th = styled.th`
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 12px;
  text-transform: uppercase;
  color: #64748b;
  font-weight: 600;
`;

const Td = styled.td`
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  font-size: 14px;
  color: #e2e8f0;
`;

const StatusIndicator = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  background-color: ${props => {
    if (props.type === 'normal' || props.type === 'active') return 'rgba(16, 185, 129, 0.1)';
    if (props.type === 'warning' || props.type === 'pending') return 'rgba(245, 158, 11, 0.1)';
    return 'rgba(239, 68, 68, 0.1)';
  }};
  color: ${props => {
    if (props.type === 'normal' || props.type === 'active') return '#10b981';
    if (props.type === 'warning' || props.type === 'pending') return '#f59e0b';
    return '#ef4444';
  }};
`;

const ANALYTICS_DATA = [
  { name: 'Mon', PatientVolume: 24, CriticalAlerts: 2 },
  { name: 'Tue', PatientVolume: 42, CriticalAlerts: 4 },
  { name: 'Wed', PatientVolume: 35, CriticalAlerts: 1 },
  { name: 'Thu', PatientVolume: 51, CriticalAlerts: 5 },
  { name: 'Fri', PatientVolume: 44, CriticalAlerts: 3 },
  { name: 'Sat', PatientVolume: 18, CriticalAlerts: 2 },
  { name: 'Sun', PatientVolume: 12, CriticalAlerts: 0 },
];

const OverviewTab = ({ patients }) => {
  return (
    <>
      <StatsGrid>
        <GlassCard>
          <IconContainer bg="rgba(16, 185, 129, 0.1)" color="#10b981">
            <Users size={22} />
          </IconContainer>
          <StatValue>1,244</StatValue>
          <StatLabel>Total Admitted Patients</StatLabel>
          <StatTrend positive={true}>
            <TrendingUp size={12} />
            <span>+12.4% vs last week</span>
          </StatTrend>
        </GlassCard>

        <GlassCard>
          <IconContainer bg="rgba(14, 165, 233, 0.1)" color="#0ea5e9">
            <Calendar size={22} />
          </IconContainer>
          <StatValue>86</StatValue>
          <StatLabel>Scheduled Consultations</StatLabel>
          <StatTrend positive={true}>
            <TrendingUp size={12} />
            <span>+4.8% vs yesterday</span>
          </StatTrend>
        </GlassCard>

        <GlassCard>
          <IconContainer bg="rgba(239, 68, 68, 0.1)" color="#ef4444">
            <AlertTriangle size={22} />
          </IconContainer>
          <StatValue>3</StatValue>
          <StatLabel>Active Critical Warnings</StatLabel>
          <StatTrend positive={false}>
            <TrendingUp size={12} />
            <span>Requires urgent review</span>
          </StatTrend>
        </GlassCard>

        <GlassCard>
          <IconContainer bg="rgba(245, 158, 11, 0.1)" color="#f59e0b">
            <DollarSign size={22} />
          </IconContainer>
          <StatValue>$14,890</StatValue>
          <StatLabel>Billing Revenue Today</StatLabel>
          <StatTrend positive={true}>
            <TrendingUp size={12} />
            <span>+18.2% vs yesterday</span>
          </StatTrend>
        </GlassCard>
      </StatsGrid>

      <DashboardGrid>
        <GlassCard>
          <SectionTitle>
            <TrendingUp size={16} color="#10b981" />
            Weekly Hospital Patient Intake
          </SectionTitle>
          <ChartContainerWrapper>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ANALYTICS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIntake" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: 'rgba(255,255,255,0.05)', color: '#ffffff' }} />
                <Area type="monotone" dataKey="PatientVolume" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorIntake)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainerWrapper>
        </GlassCard>

        <GlassCard>
          <SectionTitle>
            <Bell size={16} color="#ef4444" />
            Live Vital Alerts
          </SectionTitle>
          <div style={{ marginTop: 10 }}>
            <AlertItem>
              <div>
                <p>Patient Aarav Mehta (ICU Room 4)</p>
                <span>Tachycardia Detected - HR 112 bpm</span>
              </div>
            </AlertItem>
            <AlertItem>
              <div>
                <p>Patient Pooja Sen (Room Emergency-2)</p>
                <span>Stage 2 Hypertension - BP 142/91</span>
              </div>
            </AlertItem>
            <AlertItem>
              <div>
                <p>Patient Ananya Roy (Ward 3B)</p>
                <span>High Pyrexia (Fever) Alert - Temp 101.4 °F</span>
              </div>
            </AlertItem>
          </div>
        </GlassCard>
      </DashboardGrid>

      <GlassCard>
        <SectionTitle>
          <Users size={16} color="#0ea5e9" />
          Active Consultation Log
        </SectionTitle>
        <TableWrapper>
          <CustomTable>
            <thead>
              <tr>
                <Th>Patient ID</Th>
                <Th>Name</Th>
                <Th>Age/Gender</Th>
                <Th>Recent Vitals</Th>
                <Th>Location</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {patients.slice(0, 3).map((patient) => (
                <tr key={patient.id}>
                  <Td style={{ fontWeight: '600', color: '#10b981' }}>{patient.id}</Td>
                  <Td>{patient.name}</Td>
                  <Td>{patient.age} Y / {patient.gender}</Td>
                  <Td>{patient.vitals}</Td>
                  <Td>{patient.room}</Td>
                  <Td>
                    <StatusIndicator type={patient.status}>{patient.status}</StatusIndicator>
                  </Td>
                </tr>
              ))}
            </tbody>
          </CustomTable>
        </TableWrapper>
      </GlassCard>
    </>
  );
};

export default OverviewTab;
