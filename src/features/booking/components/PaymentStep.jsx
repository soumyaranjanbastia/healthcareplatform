import React from 'react';
import styled, { keyframes } from 'styled-components';
import { CreditCard, Sparkles } from 'lucide-react';

const scaleUp = keyframes`
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const StepTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  text-align: center;
`;

const StepSubtitle = styled.p`
  font-size: 13px;
  color: #64748b;
  margin-top: 6px;
  margin-bottom: 30px;
  text-align: center;
  font-weight: 500;
`;

const PaymentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 40px;
  width: 100%;
  max-width: 800px;
  animation: ${scaleUp} 0.3s ease-out;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 700;
  color: #1e293b;
`;

const PaymentMethodBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border: 2px solid ${props => props.active ? '#009688' : '#e2e8f0'};
  background-color: ${props => props.active ? '#e6f9f3' : '#ffffff'};
  color: ${props => props.active ? '#009688' : '#1e293b'};
  border-radius: 12px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    border-color: #009688;
  }
`;

const InvoiceCard = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background-color: #ffffff;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: fit-content;
`;

const PaymentStep = ({ selectedDoctor, paymentMethod, setPaymentMethod, totalFee }) => {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <StepTitle>Payment Processing</StepTitle>
      <StepSubtitle>Review billing summary and choose standard settlement option</StepSubtitle>

      <PaymentWrapper>
        {/* Method Selectors */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Label>Choose Payment Mode</Label>
          <PaymentMethodBtn 
            active={paymentMethod === 'Cash'}
            onClick={() => setPaymentMethod('Cash')}
          >
            <CreditCard size={16} /> Cash / Walk-in Payment
          </PaymentMethodBtn>

          <PaymentMethodBtn 
            active={paymentMethod === 'Card'}
            onClick={() => setPaymentMethod('Card')}
          >
            <CreditCard size={16} /> Credit / Debit Card Terminal
          </PaymentMethodBtn>

          <PaymentMethodBtn 
            active={paymentMethod === 'UPI'}
            onClick={() => setPaymentMethod('UPI')}
          >
            <Sparkles size={16} /> Dynamic UPI QR Code
          </PaymentMethodBtn>
        </div>

        {/* Invoice Receipt */}
        <InvoiceCard>
          <Label style={{ fontSize: 13, borderBottom: '1px solid #f1f5f9', paddingBottom: 8 }}>
            Billing Breakdown
          </Label>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13, color: '#475569' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Consultation Fee ({selectedDoctor?.name})</span>
              <span>₹{selectedDoctor?.fee}.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>New Patient Registration fee</span>
              <span>₹50.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Central CGST & SGST (18%)</span>
              <span>₹18.00</span>
            </div>
            
            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 800, color: '#0f172a' }}>
              <span>Total Amount</span>
              <span style={{ color: '#009688' }}>₹{totalFee}.00</span>
            </div>
          </div>
        </InvoiceCard>
      </PaymentWrapper>
    </div>
  );
};

export default PaymentStep;
