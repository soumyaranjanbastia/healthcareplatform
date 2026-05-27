import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Check } from 'lucide-react';

const scaleUp = keyframes`
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

const pulseGreen = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
  100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
`;

const StepTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  text-align: center;
`;

const SuccessCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
  animation: ${scaleUp} 0.4s cubic-bezier(0.16, 1, 0.3, 1);
`;

const BigTickCircle = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background-color: #10b981;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${pulseGreen} 2s infinite;
  margin-bottom: 24px;
`;

const ConfirmationDetailBox = styled.div`
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 20px 0;
  text-align: left;
  font-size: 13px;
`;

const ConfRow = styled.div`
  display: flex;
  justify-content: space-between;
  span:first-child {
    color: #64748b;
    font-weight: 600;
  }
  span:last-child {
    color: #1e293b;
    font-weight: 700;
  }
`;

const SendOtpBtn = styled.button`
  padding: 12px 20px;
  background-color: #009688;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;

  &:hover {
    background-color: #00796b;
  }
`;

const RegisterNewBtn = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  color: #475569;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8fafc;
    border-color: #cbd5e1;
    color: #0f172a;
  }
`;

const ConfirmationStep = ({ personalDetails, patientId, selectedDoctor, bookingDate, selectedSlot, paymentMethod, onComplete }) => {
  return (
    <SuccessCard>
      <BigTickCircle>
        <Check size={36} strokeWidth={3} />
      </BigTickCircle>

      <StepTitle style={{ color: '#065f46' }}>Appointment Booking Successful!</StepTitle>
      <p style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginTop: 4 }}>
        The appointment has been confirmed in the hospital roster.
      </p>

      <ConfirmationDetailBox>
        <ConfRow>
          <span>Patient Name</span>
          <span>{personalDetails.fullName || 'John Doe'}</span>
        </ConfRow>
        <ConfRow>
          <span>Patient ID</span>
          <span>{patientId}</span>
        </ConfRow>
        <ConfRow>
          <span>Assigned Doctor</span>
          <span>{selectedDoctor?.name} ({selectedDoctor?.specialty})</span>
        </ConfRow>
        <ConfRow>
          <span>Scheduled Slot</span>
          <span>{bookingDate} • {selectedSlot}</span>
        </ConfRow>
        <ConfRow>
          <span>OPD Consultation Room</span>
          <span style={{ color: '#2563eb' }}>{selectedDoctor?.room}</span>
        </ConfRow>
        <ConfRow>
          <span>Payment Status</span>
          <span style={{ color: '#0f5132', backgroundColor: '#d1fae5', padding: '2px 8px', borderRadius: 4, fontSize: 11 }}>
            Paid via {paymentMethod}
          </span>
        </ConfRow>
      </ConfirmationDetailBox>

      <div style={{ display: 'flex', gap: 12, width: '100%' }}>
        <RegisterNewBtn 
          style={{ flex: 1 }}
          onClick={() => { alert('Receipt sent to printer spooler.'); }}
        >
          Print Receipt
        </RegisterNewBtn>
        <SendOtpBtn 
          style={{ flex: 1 }}
          onClick={onComplete}
        >
          Go to Dashboard
        </SendOtpBtn>
      </div>
    </SuccessCard>
  );
};

export default ConfirmationStep;
