import React from 'react';
import styled from 'styled-components';
import { DollarSign, CheckCircle, Clock, CreditCard } from 'lucide-react';

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

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${props => props.primary ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'rgba(30, 41, 59, 0.5)'};
  border: 1px solid ${props => props.primary ? 'transparent' : 'rgba(255, 255, 255, 0.05)'};
  padding: 8px 14px;
  border-radius: 10px;
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    background: ${props => props.primary ? 'linear-gradient(135deg, #059669 0%, #047857 100%)' : 'rgba(30, 41, 59, 0.8)'};
  }
`;

const BillingTab = () => {
  return (
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
                  <ActionButton>View Invoice</ActionButton>
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
                  <ActionButton primary={true}>Collect Now</ActionButton>
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
                  <ActionButton primary={true}>Send Reminder</ActionButton>
                </Td>
              </tr>
            </tbody>
          </CustomTable>
        </TableWrapper>
      </GlassCard>
    </>
  );
};

export default BillingTab;
