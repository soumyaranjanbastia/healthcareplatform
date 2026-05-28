import React from 'react';
import styled from 'styled-components';
import { Users, Activity, DollarSign, Calendar, AlertTriangle, TrendingUp } from 'lucide-react';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  border: 1px solid #f1f5f9;
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  background: ${props => props.bg};
  color: ${props => props.color};
`;

const CardTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #64748b;
  margin: 0 0 8px 0;
`;

const CardValue = styled.div`
  font-family: 'Outfit', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
`;

const TrendContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.isNegative ? '#ef4444' : (props.isNeutral ? '#64748b' : '#10b981')};
`;

const AdminMetrics = () => {
  return (
    <Grid>
      <Card>
        <IconWrapper bg="#dbeafe" color="#3b82f6">
          <Users size={20} />
        </IconWrapper>
        <CardTitle>Patients Today</CardTitle>
        <CardValue>247</CardValue>
        <TrendContainer>
          <TrendingUp size={14} />
          +14% from yesterday
        </TrendContainer>
      </Card>

      <Card>
        <IconWrapper bg="#dcfce7" color="#10b981">
          <Activity size={20} />
        </IconWrapper>
        <CardTitle>Doctors Active</CardTitle>
        <CardValue>18/24</CardValue>
        <TrendContainer isNeutral>
          75% Utilization
        </TrendContainer>
      </Card>

      <Card>
        <IconWrapper bg="#f3e8ff" color="#a855f7">
          <DollarSign size={20} />
        </IconWrapper>
        <CardTitle>Revenue Today</CardTitle>
        <CardValue>₹1.84L</CardValue>
        <TrendContainer>
          <TrendingUp size={14} />
          +23% increase
        </TrendContainer>
      </Card>

      <Card>
        <IconWrapper bg="#ffedd5" color="#f97316">
          <Calendar size={20} />
        </IconWrapper>
        <CardTitle>Appointments</CardTitle>
        <CardValue>124</CardValue>
        <TrendContainer isNeutral>
          32 Online bookings
        </TrendContainer>
      </Card>

      <Card>
        <IconWrapper bg="#fee2e2" color="#ef4444">
          <AlertTriangle size={20} />
        </IconWrapper>
        <CardTitle>Emergency Cases</CardTitle>
        <CardValue>18</CardValue>
        <TrendContainer isNegative>
          <AlertTriangle size={12} />
          4 Critical
        </TrendContainer>
      </Card>
    </Grid>
  );
};

export default AdminMetrics;
