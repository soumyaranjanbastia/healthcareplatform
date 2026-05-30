import React from 'react';
import styled from 'styled-components';
import { ArrowLeft, Download, Printer, CheckCircle, RefreshCcw, XCircle } from 'lucide-react';

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

const TxnHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 20px;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
  padding: 16px 20px;
  border-radius: 8px;
`;

const TxnIdBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const TxnIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
  font-weight: 700;
`;

const TxnTitle = styled.div`
  h4 {
    margin: 0;
    font-size: 16px;
    color: #0f172a;
  }
  p {
    margin: 4px 0 0 0;
    font-size: 12px;
    color: #64748b;
  }
`;

const Badges = styled.div`
  display: flex;
  gap: 8px;
`;

const Badge = styled.span`
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  border: 1px solid ${props => props.color};
  color: ${props => props.color};
  background: ${props => props.bg || 'transparent'};
`;

const SectionBox = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
`;

const SectionTitle = styled.h5`
  margin: 0 0 16px 0;
  font-size: 14px;
  font-weight: 700;
  color: #3b82f6;
`;

const GridInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  span:first-child {
    font-size: 11px;
    color: #94a3b8;
    text-transform: uppercase;
  }
  span:last-child {
    font-size: 13px;
    color: #1e293b;
    font-weight: 600;
  }
`;

const BreakdownRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px dashed #e2e8f0;
  font-size: 13px;

  &:last-child {
    border-bottom: none;
    font-weight: 700;
    font-size: 14px;
    color: ${props => props.isTotal ? '#10b981' : '#0f172a'};
  }
`;

const ValueSpan = styled.span`
  color: ${props => props.color || '#0f172a'};
  font-weight: ${props => props.bold ? '700' : '500'};
`;

const HealthAlert = styled.div`
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #065f46;
  font-size: 13px;
  font-weight: 600;
`;

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TimelineTitle = styled.h5`
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: #3b82f6;
`;

const TimelineItem = styled.div`
  display: flex;
  gap: 16px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 11px;
    top: 24px;
    bottom: -16px;
    width: 2px;
    background: #e2e8f0;
  }

  &:last-child::before {
    display: none;
  }
`;

const TimelineIconWrapper = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid ${props => props.color || '#3b82f6'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color || '#3b82f6'};
  z-index: 1;
`;

const TimelineContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-bottom: 16px;

  h6 {
    margin: 0;
    font-size: 13px;
    color: #0f172a;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  p {
    margin: 0;
    font-size: 12px;
    color: #64748b;
  }

  span {
    font-size: 11px;
    color: #94a3b8;
  }
`;

const Tag = styled.span`
  background: #f1f5f9;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  color: #64748b;
`;

const BottomActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 10px;
`;

const TransactionDetails = ({ transaction, onBack }) => {
  if (!transaction) return null;

  return (
    <Container>
      <HeaderContainer>
        <TitleWrapper>
          <BackBtn onClick={onBack}><ArrowLeft size={18} /></BackBtn>
          <TitleText>
            <h3>{transaction.isRefund ? 'Refund Transaction Details' : 'Transaction Details'}</h3>
            <p>Aarav Sharma • {transaction.id || 'TXN-88920'}</p>
          </TitleText>
        </TitleWrapper>
        <ActionButtons>
          <OutlinedBtn><Download size={16} /> Download PDF</OutlinedBtn>
          <PrimaryBtn><Printer size={16} /> Print</PrimaryBtn>
        </ActionButtons>
      </HeaderContainer>

      <MainCard>
        <TxnHeader>
          <TxnIdBox>
            <TxnIcon>$</TxnIcon>
            <TxnTitle>
              <h4>{transaction.id || 'TXN-88920'}</h4>
              <p>Mar 11, 2026 at 08:55 AM</p>
            </TxnTitle>
          </TxnIdBox>
          <Badges>
            <Badge color="#10b981" bg="#ecfdf5">Completed</Badge>
            <Badge color="#8b5cf6" bg="#f5f3ff">UPI</Badge>
            {transaction.isRefund && (
              <Badge color="#ef4444" bg="#fef2f2">Refunded</Badge>
            )}
          </Badges>
        </TxnHeader>

        <SectionBox>
          <SectionTitle>Transaction Details</SectionTitle>
          <GridInfo>
            <InfoItem>
              <span>Order ID/Clinic ID</span>
              <span>{transaction.orderId || 'CLC-1020'}</span>
            </InfoItem>
            <InfoItem>
              <span>Patient ID</span>
              <span>{transaction.patientId || 'PT-2026-XXXX'}</span>
            </InfoItem>
            <InfoItem>
              <span>Patient</span>
              <span>Aarav Sharma</span>
            </InfoItem>
            <InfoItem>
              <span>Doctor</span>
              <span>DR. Sharma</span>
            </InfoItem>
            <InfoItem>
              <span>Hospital</span>
              <span>Swastyam hospital</span>
            </InfoItem>
            <InfoItem>
              <span>Amount</span>
              <span style={{ color: '#3b82f6' }}>{transaction.amount || '₹650'}</span>
            </InfoItem>
          </GridInfo>
        </SectionBox>

        <SectionBox>
          <SectionTitle>Payment Breakdown</SectionTitle>
          <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 16px 0' }}>Consultation</p>
          
          <BreakdownRow>
            <span>Total Amount</span>
            <ValueSpan>₹650</ValueSpan>
          </BreakdownRow>
          <BreakdownRow>
            <span style={{ color: '#f59e0b' }}>Commission</span>
            <ValueSpan color="#f59e0b">-₹65</ValueSpan>
          </BreakdownRow>
          <BreakdownRow>
            <span>Taxes Payment</span>
            <ValueSpan color="#64748b">-₹100</ValueSpan>
          </BreakdownRow>
          <BreakdownRow isTotal={!transaction.isRefund}>
            <span style={{ color: '#3b82f6', fontWeight: transaction.isRefund ? '500' : '700' }}>Total amount</span>
            <ValueSpan color="#10b981" bold>₹485</ValueSpan>
          </BreakdownRow>
          {transaction.isRefund && (
            <BreakdownRow isTotal>
              <span style={{ color: '#ef4444' }}>Refund amount</span>
              <ValueSpan color="#ef4444" bold>₹450</ValueSpan>
            </BreakdownRow>
          )}
        </SectionBox>

        <HealthAlert>
          <CheckCircle size={18} color="#10b981" />
          Transaction Status: Healthy — No financial issues detected.
        </HealthAlert>

        <TimelineContainer>
          <TimelineTitle>Financial Timeline</TimelineTitle>
          
          <TimelineItem>
            <TimelineIconWrapper color="#64748b"><CheckCircle size={14} /></TimelineIconWrapper>
            <TimelineContent>
              <h6>Consultation payment <Tag>System</Tag></h6>
              <p>Patient Aarav Sharma booked Doctor consultation with Dr. sharma.</p>
              <span>08:50 AM By: System <a href="#" style={{ color: '#3b82f6', textDecoration: 'none' }}>CLC-2026-1020</a></span>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineIconWrapper color="#10b981"><CheckCircle size={14} /></TimelineIconWrapper>
            <TimelineContent>
              <h6>Payment Received <Tag style={{ background: '#ecfdf5', color: '#10b981' }}>Payment</Tag></h6>
              <p>₹650 payment received via UPI.</p>
              <span>08:55 AM By: Payment Gateway <a href="#" style={{ color: '#3b82f6', textDecoration: 'none' }}>TXN-88920</a></span>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineIconWrapper color="#3b82f6"><RefreshCcw size={14} /></TimelineIconWrapper>
            <TimelineContent>
              <h6>Commission Calculated <Tag style={{ background: '#eff6ff', color: '#3b82f6' }}>Platform</Tag></h6>
              <p>Platform commission ₹65 (10%) deducted.</p>
              <span>08:55 AM By: System</span>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineIconWrapper color="#64748b"><CheckCircle size={14} /></TimelineIconWrapper>
            <TimelineContent>
              <h6>Taxes Calculated <Tag>Platform</Tag></h6>
              <p>Taxes collected for consultation ₹65 (10%) deducted.</p>
              <span>08:55 AM By: System</span>
            </TimelineContent>
          </TimelineItem>

          {transaction.isRefund && (
            <TimelineItem>
              <TimelineIconWrapper color="#ef4444"><XCircle size={14} /></TimelineIconWrapper>
              <TimelineContent>
                <h6>Refund <Tag style={{ background: '#fef2f2', color: '#ef4444' }}>Refund</Tag></h6>
                <p>₹450 refunded to Source account.</p>
                <span>08:55 AM By: Payment Gateway <a href="#" style={{ color: '#3b82f6', textDecoration: 'none' }}>{transaction.id}</a></span>
              </TimelineContent>
            </TimelineItem>
          )}
        </TimelineContainer>

        <BottomActions>
          <OutlinedBtn><Download size={14} /> Download Invoice</OutlinedBtn>
          <OutlinedBtn><RefreshCcw size={14} /> Process Refund</OutlinedBtn>
          <OutlinedBtn><Eye size={14} /> View Consultation details</OutlinedBtn>
        </BottomActions>

      </MainCard>
    </Container>
  );
};

export default TransactionDetails;
