import React from 'react';
import styled, { keyframes } from 'styled-components';

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

const SlotPickerWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 30px;
  width: 100%;
  max-width: 800px;
  animation: ${scaleUp} 0.3s ease-out;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 700;
  color: #1e293b;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  font-size: 13px;
  outline: none;
  font-weight: 600;
  background-color: #ffffff;
  color: #1e293b;
  transition: all 0.2s ease;

  &:focus {
    border-color: #009688;
  }
`;

const SlotOption = styled.button`
  padding: 12px;
  border: 1px solid ${props => props.selected ? '#009688' : '#e2e8f0'};
  background-color: ${props => props.selected ? '#e6f9f3' : '#ffffff'};
  color: ${props => props.selected ? '#009688' : '#475569'};
  font-weight: 600;
  font-size: 12px;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  transition: all 0.15s ease;

  &:hover {
    border-color: #009688;
  }
`;

const SlotAssignmentStep = ({ selectedDoctor, bookingDate, setBookingDate, selectedSlot, setSelectedSlot }) => {
  const slots = [
    '09:00 AM - 09:30 AM', 
    '09:30 AM - 10:00 AM', 
    '10:00 AM - 10:30 AM', 
    '10:30 AM - 11:00 AM', 
    '02:00 PM - 02:30 PM', 
    '03:00 PM - 03:30 PM'
  ];

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <StepTitle>Slot Assignment</StepTitle>
      <StepSubtitle>Select preferred consultation date and available timeslot</StepSubtitle>

      <SlotPickerWrapper>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <InputGroup>
            <Label>Select Appointment Date</Label>
            <Input 
              type="date" 
              value={bookingDate}
              onChange={e => setBookingDate(e.target.value)}
            />
          </InputGroup>

          <div style={{ padding: 14, backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, fontSize: 12 }}>
            <p style={{ fontWeight: 700, color: '#475569' }}>Doctor Selected:</p>
            <p style={{ color: '#0f172a', fontWeight: 600, marginTop: 4 }}>
              {selectedDoctor?.name} ({selectedDoctor?.specialty})
            </p>
          </div>
        </div>

        <div>
          <Label style={{ display: 'block', marginBottom: 12 }}>Available Slots (Today)</Label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {slots.map(slot => (
              <SlotOption 
                key={slot}
                selected={selectedSlot === slot}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </SlotOption>
            ))}
          </div>
        </div>
      </SlotPickerWrapper>
    </div>
  );
};

export default SlotAssignmentStep;
