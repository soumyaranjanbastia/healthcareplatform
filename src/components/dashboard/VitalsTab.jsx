import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Heart, Droplet, Thermometer, Activity } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// --- KEYFRAMES ---
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

const GlassCard = styled.div`
  background: linear-gradient(135deg, rgba(17, 24, 39, 0.7) 0%, rgba(9, 13, 22, 0.8) 100%);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
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

const StatLabel = styled.span`
  font-size: 13px;
  color: #64748b;
  font-weight: 500;
  margin-top: 4px;
  display: block;
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

const ChartContainerWrapper = styled.div`
  height: 320px;
  width: 100%;
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

const VitalsTab = ({ liveHeartRate, liveSpO2 }) => {
  return (
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
  );
};

export default VitalsTab;
