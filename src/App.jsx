import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import {
  Activity,
  Users,
  Calendar,
  DollarSign,
  Heart,
  TrendingUp,
  Droplet,
  Thermometer,
  Plus,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertTriangle,
  ChevronRight,
  CreditCard,
  Layers,
  Database,
  Briefcase,
  Bell,
  Settings,
  Shield,
  FileText,
  UserCheck
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';

// --- KEYFRAMES FOR LIVE MICRO-ANIMATIONS ---
const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.08); opacity: 1; box-shadow: 0 0 12px rgba(16, 185, 129, 0.6); }
  100% { transform: scale(1); opacity: 0.9; }
`;

const ripple = keyframes`
  0% { transform: scale(0.95); opacity: 0.5; }
  50% { opacity: 0.3; }
  100% { transform: scale(1.4); opacity: 0; }
`;

const blink = keyframes`
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
`;

// --- STYLED COMPONENTS ---
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #0b0f19;
  color: #e2e8f0;
  font-family: 'Inter', sans-serif;
`;

const Sidebar = styled.aside`
  width: 280px;
  background: linear-gradient(180deg, #0d1321 0%, #070a12 100%);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  padding: 24px;
  position: fixed;
  height: 100vh;
  z-index: 100;
  @media (max-width: 1024px) {
    width: 80px;
    padding: 16px 12px;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
  padding-left: 8px;
  @media (max-width: 1024px) {
    justify-content: center;
    padding-left: 0;
  }
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
`;

const LogoText = styled.h1`
  font-family: 'Outfit', sans-serif;
  font-size: 20px;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #94a3b8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const NavLink = styled.button`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  background: ${props => props.active ? 'rgba(16, 185, 129, 0.1)' : 'transparent'};
  border: none;
  border-left: 3px solid ${props => props.active ? '#10b981' : 'transparent'};
  border-radius: 0 12px 12px 0;
  color: ${props => props.active ? '#10b981' : '#94a3b8'};
  font-size: 14px;
  font-weight: ${props => props.active ? '600' : '500'};
  text-align: left;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  width: 100%;

  &:hover {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.03);
  }

  @media (max-width: 1024px) {
    justify-content: center;
    border-radius: 12px;
    border-left: none;
    padding: 16px;
    span {
      display: none;
    }
  }
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 280px;
  padding: 32px 40px;
  background-color: #0b0f19;
  min-height: 100vh;
  @media (max-width: 1024px) {
    margin-left: 80px;
    padding: 24px 20px;
  }
`;

const TopHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 36px;
`;

const HeaderGreeting = styled.div`
  h2 {
    font-family: 'Outfit', sans-serif;
    font-size: 26px;
    color: #ffffff;
    font-weight: 700;
  }
  p {
    font-size: 14px;
    color: #64748b;
    margin-top: 4px;
  }
`;

const ProfileCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 8px 16px;
  border-radius: 16px;
`;

const Avatar = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.1);
`;

const ProfileInfo = styled.div`
  text-align: left;
  h4 {
    font-size: 14px;
    color: #ffffff;
    font-weight: 600;
  }
  span {
    font-size: 11px;
    color: #64748b;
    font-weight: 500;
  }
`;

// --- GRID LAYOUTS ---
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
    box-shadow: 0 12px 40px rgba(16, 185, 129, 0.05);
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

// --- CUSTOM INTERACTIVE TABLES ---
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

// --- VITALS TRACKING SCREEN ---
const VitalsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const VitalCard = styled(GlassCard)`
  border-top: 4px solid ${props => props.accent || '#10b981'};
`;

const VitalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const LivePulseContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LiveDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #10b981;
  animation: ${blink} 1.5s infinite;
`;

const LiveText = styled.span`
  font-size: 11px;
  color: #10b981;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const VitalValueSection = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
  h4 {
    font-size: 36px;
    font-weight: 700;
    color: #ffffff;
    font-family: 'Outfit', sans-serif;
  }
  span {
    font-size: 14px;
    color: #64748b;
  }
`;

const HeartbeatPulse = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(244, 63, 94, 0.1);
  color: #f43f5e;
  animation: ${pulse} 1.2s infinite ease-in-out;

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid rgba(244, 63, 94, 0.4);
    animation: ${ripple} 1.2s infinite ease-out;
  }
`;

// --- SEARCH FILTER SYSTEM ---
const FilterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 8px 16px;
  width: 320px;
  color: #94a3b8;
  gap: 10px;
  &:focus-within {
    border-color: #10b981;
  }
  input {
    background: transparent;
    border: none;
    outline: none;
    color: #ffffff;
    font-size: 14px;
    width: 100%;
  }
`;

const FilterButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${props => props.primary ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'rgba(30, 41, 59, 0.5)'};
  border: 1px solid ${props => props.primary ? 'transparent' : 'rgba(255, 255, 255, 0.05)'};
  padding: 10px 18px;
  border-radius: 12px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    background: ${props => props.primary ? 'linear-gradient(135deg, #059669 0%, #047857 100%)' : 'rgba(30, 41, 59, 0.8)'};
  }
`;

// --- HEALTH ALERTS PANEL ---
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

// --- DATA LISTS (MOCK MFE & APPS BINDING) ---
const INITIAL_PATIENTS = [
  { id: 'SWA-9921', name: 'Kabir Dev', age: 34, gender: 'Male', vitals: 'SpO2 98%, HR 72', status: 'normal', time: '10 mins ago', room: 'Consultation A' },
  { id: 'SWA-1244', name: 'Pooja Sen', age: 29, gender: 'Female', vitals: 'BP 142/91, HR 88', status: 'warning', time: '23 mins ago', room: 'Emergency-2' },
  { id: 'SWA-5633', name: 'Aarav Mehta', age: 62, gender: 'Male', vitals: 'Heart Rate 112 bpm', status: 'critical', time: '1 hr ago', room: 'ICU Bed 4' },
  { id: 'SWA-7890', name: 'Ananya Roy', age: 45, gender: 'Female', vitals: 'Temp 101.4 °F', status: 'warning', time: '2 hrs ago', room: 'Ward 3B' },
  { id: 'SWA-4412', name: 'Rajesh Nair', age: 52, gender: 'Male', vitals: 'SpO2 97%, HR 68', status: 'normal', time: '3 hrs ago', room: 'Consultation B' },
];

const ANALYTICS_DATA = [
  { name: 'Mon', PatientVolume: 24, CriticalAlerts: 2 },
  { name: 'Tue', PatientVolume: 42, CriticalAlerts: 4 },
  { name: 'Wed', PatientVolume: 35, CriticalAlerts: 1 },
  { name: 'Thu', PatientVolume: 51, CriticalAlerts: 5 },
  { name: 'Fri', PatientVolume: 44, CriticalAlerts: 3 },
  { name: 'Sat', PatientVolume: 18, CriticalAlerts: 2 },
  { name: 'Sun', PatientVolume: 12, CriticalAlerts: 0 },
];

const PATIENT_VOLUME_DATA = [
  { name: 'Cardiology', value: 40, color: '#10b981' },
  { name: 'Neurology', value: 25, color: '#0ea5e9' },
  { name: 'Pediatrics', value: 20, color: '#f59e0b' },
  { name: 'Orthopedics', value: 15, color: '#f43f5e' }
];

const App = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState(INITIAL_PATIENTS);

  // Filter patients on search
  const filteredPatients = useMemo(() => {
    return patients.filter(patient =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, patients]);

  // Live heart rate ticker simulation
  const [liveHeartRate, setLiveHeartRate] = useState(72);
  const [liveSpO2, setLiveSpO2] = useState(98);
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveHeartRate(prev => {
        const delta = Math.floor(Math.random() * 7) - 3; // -3 to 3
        const nextVal = prev + delta;
        return nextVal > 110 ? 98 : nextVal < 60 ? 68 : nextVal;
      });
      setLiveSpO2(prev => {
        const delta = Math.floor(Math.random() * 3) - 1; // -1 to 1
        const nextVal = prev + delta;
        return nextVal > 100 ? 100 : nextVal < 94 ? 96 : nextVal;
      });
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <DashboardContainer>
      {/* --- SIDE NAVIGATION --- */}
      <Sidebar>
        <LogoWrapper>
          <LogoIcon>
            <Heart size={22} color="#ffffff" />
          </LogoIcon>
          <LogoText>Swastyam</LogoText>
        </LogoWrapper>

        <SidebarNav>
          <NavLink active={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')}>
            <Activity size={18} />
            <span>Dashboard Overview</span>
          </NavLink>
          <NavLink active={activeTab === 'Vitals'} onClick={() => setActiveTab('Vitals')}>
            <TrendingUp size={18} />
            <span>Live Vitals Monitor</span>
          </NavLink>
          <NavLink active={activeTab === 'Patients'} onClick={() => setActiveTab('Patients')}>
            <Users size={18} />
            <span>Patient Database</span>
          </NavLink>
          <NavLink active={activeTab === 'Billing'} onClick={() => setActiveTab('Billing')}>
            <DollarSign size={18} />
            <span>Billing & Invoices</span>
          </NavLink>
        </SidebarNav>

        <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: 20 }}>
          <ProfileCard style={{ background: 'transparent', border: 'none', padding: 0 }}>
            <Avatar>AV</Avatar>
            <ProfileInfo>
              <h4>Dr. A. Vardhan</h4>
              <span>Cardiology Head</span>
            </ProfileInfo>
          </ProfileCard>
        </div>
      </Sidebar>

      {/* --- MAIN PAGE VIEW --- */}
      <MainContent>
        {/* --- PORTAL HEADER BAR --- */}
        <TopHeader>
          <HeaderGreeting>
            <h2>Swastyam Healthcare Platform</h2>
            <p>Welcome back, Administrator. Hospital operations are currently running optimally.</p>
          </HeaderGreeting>
          <ProfileCard>
            <Bell size={18} color="#64748b" style={{ cursor: 'pointer' }} />
            <Settings size={18} color="#64748b" style={{ cursor: 'pointer' }} />
            <div style={{ width: 1, height: 24, backgroundColor: 'rgba(255,255,255,0.08)' }} />
            <Avatar>AV</Avatar>
            <ProfileInfo style={{ display: 'block' }}>
              <h4>Dr. Aditya Vardhan</h4>
              <span>Swastyam Gen Hospital</span>
            </ProfileInfo>
          </ProfileCard>
        </TopHeader>

        {/* ======================================================== */}
        {/* --- TAB CONTENT: OVERVIEW DASHBOARD --- */}
        {/* ======================================================== */}
        {activeTab === 'Overview' && (
          <>
            {/* Quick Stat Blocks */}
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

            {/* Layout Charts & Patient List */}
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

            {/* Quick Consultation Table */}
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
        )}

        {/* ======================================================== */}
        {/* --- TAB CONTENT: LIVE VITALS MONITOR --- */}
        {/* ======================================================== */}
        {activeTab === 'Vitals' && (
          <>
            <div style={{ marginBottom: 30 }}>
              <SectionTitle>
                <HeartbeatPulse style={{ display: 'inline-flex', marginRight: 10 }}>
                  <Heart size={16} />
                </HeartbeatPulse>
                Live Biosensor Telemetry
              </SectionTitle>
              <p style={{ fontSize: 14, color: '#64748b' }}>
                Displaying real-time vital signs from wireless biosensors of critical care patients.
              </p>
            </div>

            <VitalsGrid>
              {/* Card 1: Heart Rate */}
              <VitalCard accent="#f43f5e">
                <VitalHeader>
                  <LivePulseContainer>
                    <LiveDot style={{ backgroundColor: '#f43f5e' }} />
                    <LiveText style={{ color: '#f43f5e' }}>Live Pulse</LiveText>
                  </LivePulseContainer>
                  <HeartbeatPulse>
                    <Heart size={16} />
                  </HeartbeatPulse>
                </VitalHeader>
                <VitalValueSection>
                  <h4>{liveHeartRate}</h4>
                  <span>bpm</span>
                </VitalValueSection>
                <StatLabel style={{ marginTop: 15 }}>Heart Rate Tracker</StatLabel>
                <p style={{ fontSize: 12, color: '#64748b', marginTop: 10 }}>
                  Current rhythm is stable with minor variance.
                </p>
              </VitalCard>

              {/* Card 2: SpO2 */}
              <VitalCard accent="#0ea5e9">
                <VitalHeader>
                  <LivePulseContainer>
                    <LiveDot style={{ backgroundColor: '#0ea5e9' }} />
                    <LiveText style={{ color: '#0ea5e9' }}>Live Pulse</LiveText>
                  </LivePulseContainer>
                  <IconContainer bg="rgba(14, 165, 233, 0.1)" color="#0ea5e9" style={{ marginBottom: 0 }}>
                    <Droplet size={18} />
                  </IconContainer>
                </VitalHeader>
                <VitalValueSection>
                  <h4>{liveSpO2}</h4>
                  <span>%</span>
                </VitalValueSection>
                <StatLabel style={{ marginTop: 15 }}>Oxygen Saturation (SpO2)</StatLabel>
                <p style={{ fontSize: 12, color: '#64748b', marginTop: 10 }}>
                  Oxygenation is safe within physiological limits.
                </p>
              </VitalCard>

              {/* Card 3: Temperature */}
              <VitalCard accent="#f59e0b">
                <VitalHeader>
                  <LivePulseContainer>
                    <LiveDot style={{ backgroundColor: '#f59e0b' }} />
                    <LiveText style={{ color: '#f59e0b' }}>Live Pulse</LiveText>
                  </LivePulseContainer>
                  <IconContainer bg="rgba(245, 158, 11, 0.1)" color="#f59e0b" style={{ marginBottom: 0 }}>
                    <Thermometer size={18} />
                  </IconContainer>
                </VitalHeader>
                <VitalValueSection>
                  <h4>98.6</h4>
                  <span>°F</span>
                </VitalValueSection>
                <StatLabel style={{ marginTop: 15 }}>Body Temperature</StatLabel>
                <p style={{ fontSize: 12, color: '#64748b', marginTop: 10 }}>
                  Perfect normothermia registered.
                </p>
              </VitalCard>
            </VitalsGrid>

            {/* Vitals Telemetry History Chart */}
            <div style={{ marginTop: 30 }}>
              <GlassCard>
                <SectionTitle>
                  <Activity size={16} color="#10b981" />
                  Multi-Series Telemetry Trends (24h)
                </SectionTitle>
                <ChartContainerWrapper>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={ANALYTICS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorPulse" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorO2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.15} />
                          <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: 'rgba(255,255,255,0.05)', color: '#ffffff' }} />
                      <Area type="monotone" dataKey="PatientVolume" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorPulse)" name="Heart Rate Avg" />
                      <Area type="monotone" dataKey="CriticalAlerts" stroke="#0ea5e9" strokeWidth={2} fillOpacity={1} fill="url(#colorO2)" name="Respiratory Rate" />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainerWrapper>
              </GlassCard>
            </div>
          </>
        )}

        {/* ======================================================== */}
        {/* --- TAB CONTENT: PATIENT DATABASE --- */}
        {/* ======================================================== */}
        {activeTab === 'Patients' && (
          <GlassCard>
            <SectionTitle>
              <Users size={16} color="#10b981" />
              Patient Records Directory
            </SectionTitle>

            <FilterBar>
              <SearchBox>
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Search by Patient Name or Swastyam ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </SearchBox>

              <FilterButtons>
                <ActionButton>
                  <Filter size={14} />
                  <span>Filters</span>
                </ActionButton>
                <ActionButton primary={true}>
                  <Plus size={14} />
                  <span>Admit Patient</span>
                </ActionButton>
              </FilterButtons>
            </FilterBar>

            <TableWrapper>
              <CustomTable>
                <thead>
                  <tr>
                    <Th>Patient ID</Th>
                    <Th>Patient Name</Th>
                    <Th>Age/Gender</Th>
                    <Th>Biosensor Vitals</Th>
                    <Th>Ward/Bed</Th>
                    <Th>Intake Time</Th>
                    <Th>Status Badge</Th>
                    <Th style={{ textAlign: 'center' }}>Details</Th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => (
                      <tr key={patient.id}>
                        <Td style={{ fontWeight: '600', color: '#10b981' }}>{patient.id}</Td>
                        <Td style={{ fontWeight: '600' }}>{patient.name}</Td>
                        <Td>{patient.age} Y / {patient.gender}</Td>
                        <Td>{patient.vitals}</Td>
                        <Td>{patient.room}</Td>
                        <Td>{patient.time}</Td>
                        <Td>
                          <StatusIndicator type={patient.status}>{patient.status}</StatusIndicator>
                        </Td>
                        <Td style={{ textAlign: 'center' }}>
                          <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748b', outline: 'none', padding: 0 }}>
                            <ChevronRight size={18} />
                          </button>
                        </Td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <Td colSpan="8" style={{ textAlign: 'center', padding: '30px 0', color: '#64748b' }}>
                        No patient records found matching '{searchTerm}'
                      </Td>
                    </tr>
                  )}
                </tbody>
              </CustomTable>
            </TableWrapper>
          </GlassCard>
        )}

        {/* ======================================================== */}
        {/* --- TAB CONTENT: BILLING & INVOICES --- */}
        {/* ======================================================== */}
        {activeTab === 'Billing' && (
          <>
            <StatsGrid>
              <GlassCard>
                <IconContainer bg="rgba(16, 185, 129, 0.1)" color="#10b981">
                  <DollarSign size={22} />
                </IconContainer>
                <StatValue>$42,490</StatValue>
                <StatLabel>Total Invoiced (This Month)</StatLabel>
              </GlassCard>

              <GlassCard>
                <IconContainer bg="rgba(14, 165, 233, 0.1)" color="#0ea5e9">
                  <CheckCircle size={22} />
                </IconContainer>
                <StatValue>$34,120</StatValue>
                <StatLabel>Recovered Invoices</StatLabel>
              </GlassCard>

              <GlassCard>
                <IconContainer bg="rgba(245, 158, 11, 0.1)" color="#f59e0b">
                  <Clock size={22} />
                </IconContainer>
                <StatValue>$8,370</StatValue>
                <StatLabel>Pending Hospital Receivables</StatLabel>
              </GlassCard>

              <GlassCard>
                <IconContainer bg="rgba(239, 68, 68, 0.1)" color="#ef4444">
                  <CreditCard size={22} />
                </IconContainer>
                <StatValue>$1,120</StatValue>
                <StatLabel>Disputed Invoices</StatLabel>
              </GlassCard>
            </StatsGrid>

            <GlassCard>
              <SectionTitle>
                <DollarSign size={16} color="#10b981" />
                Hospital Invoices Ledger
              </SectionTitle>

              <TableWrapper>
                <CustomTable>
                  <thead>
                    <tr>
                      <Th>Invoice No</Th>
                      <Th>Patient</Th>
                      <Th>Department Service</Th>
                      <Th>Invoiced Date</Th>
                      <Th>Amount</Th>
                      <Th>Status</Th>
                      <Th>Quick Action</Th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <Td style={{ fontWeight: '600', color: '#10b981' }}>INV-00921</Td>
                      <Td>Kabir Dev</Td>
                      <Td>Cardiology Telemetry Consult</Td>
                      <Td>24 May 2026</Td>
                      <Td style={{ fontWeight: '700' }}>$350.00</Td>
                      <Td>
                        <StatusIndicator type="active">Paid</StatusIndicator>
                      </Td>
                      <Td>
                        <ActionButton style={{ padding: '6px 12px', fontSize: 11 }}>View Invoice</ActionButton>
                      </Td>
                    </tr>
                    <tr>
                      <Td style={{ fontWeight: '600', color: '#10b981' }}>INV-01244</Td>
                      <Td>Pooja Sen</Td>
                      <Td>Emergency Ward Intake & ECG</Td>
                      <Td>25 May 2026</Td>
                      <Td style={{ fontWeight: '700' }}>$1,240.00</Td>
                      <Td>
                        <StatusIndicator type="pending">Pending</StatusIndicator>
                      </Td>
                      <Td>
                        <ActionButton style={{ padding: '6px 12px', fontSize: 11 }} primary={true}>Collect Now</ActionButton>
                      </Td>
                    </tr>
                    <tr>
                      <Td style={{ fontWeight: '600', color: '#10b981' }}>INV-05633</Td>
                      <Td>Aarav Mehta</Td>
                      <Td>ICU Care Biosensor Sync</Td>
                      <Td>26 May 2026</Td>
                      <Td style={{ fontWeight: '700' }}>$4,500.00</Td>
                      <Td>
                        <StatusIndicator type="critical">Overdue</StatusIndicator>
                      </Td>
                      <Td>
                        <ActionButton style={{ padding: '6px 12px', fontSize: 11 }} primary={true}>Send Reminder</ActionButton>
                      </Td>
                    </tr>
                  </tbody>
                </CustomTable>
              </TableWrapper>
            </GlassCard>
          </>
        )}
      </MainContent>
    </DashboardContainer>
  );
};

export default App;
