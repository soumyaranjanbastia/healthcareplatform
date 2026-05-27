import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Calendar, Clock, UserCheck, Plus, Check } from 'lucide-react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  padding: 28px;
  background: #0f1624;
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 20px;
  font-family: 'Outfit', sans-serif;
  color: #ffffff;
  animation: ${fadeIn} 0.4s ease-out;
`;

const HeaderTitle = styled.div`
  margin-bottom: 28px;
  h2 {
    font-size: 22px;
    font-weight: 700;
    color: #10b981;
    margin-bottom: 6px;
  }
  p {
    font-size: 13px;
    color: #64748b;
  }
`;

const BookingGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 2fr;
  gap: 32px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const FormBox = styled.form`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #cbd5e1;
  margin-bottom: 6px;
  display: block;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 11px 14px;
  background: #080c14;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  color: #ffffff;
  font-size: 13px;
  outline: none;
  &:focus {
    border-color: #10b981;
  }
`;

const SimpleSelect = styled.select`
  width: 100%;
  padding: 11px 14px;
  background: #080c14;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  color: #ffffff;
  font-size: 13px;
  outline: none;
  cursor: pointer;
  &:focus {
    border-color: #10b981;
  }
`;

const SlotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

const SlotButton = styled.button`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid ${props => props.active ? '#10b981' : 'rgba(255, 255, 255, 0.06)'};
  background: ${props => props.active ? 'rgba(16, 185, 129, 0.1)' : '#080c14'};
  color: ${props => props.active ? '#10b981' : '#cbd5e1'};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    border-color: #10b981;
  }
`;

const SubmitBtn = styled.button`
  padding: 12px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  &:hover {
    transform: translateY(-1px);
  }
`;

const AppointmentsCard = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 16px;
  padding: 24px;
`;

const TimelineList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
`;

const TimelineItem = styled.div`
  display: flex;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const TimeTag = styled.div`
  min-width: 80px;
  font-size: 12px;
  font-weight: 700;
  color: #10b981;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const AppointmentInfo = styled.div`
  flex: 1;
  h4 {
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 2px;
  }
  p {
    font-size: 12px;
    color: #64748b;
  }
`;

const MOCK_APPOINTMENTS = [
  { id: 'BK-1102', patientName: 'Priya Sharma', doctor: 'Dr. Aditya Vardhan', time: '10:00 AM', date: 'Today' },
  { id: 'BK-2291', patientName: 'Kabir Dev', doctor: 'Dr. Sarah Joseph', time: '02:30 PM', date: 'Today' },
];

const Booking = () => {
  const [patientName, setPatientName] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Aditya Vardhan');
  const [selectedDate, setSelectedDate] = useState('2026-05-27');
  const [activeSlot, setActiveSlot] = useState('10:00 AM');
  const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS);

  const slots = ['09:00 AM', '10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!patientName) return alert('Please enter patient name.');
    
    const newBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      patientName,
      doctor: selectedDoctor,
      time: activeSlot,
      date: selectedDate
    };

    setAppointments([newBooking, ...appointments]);
    setPatientName('');
    alert(`Appointment successfully scheduled for ${patientName}!`);
  };

  return (
    <Container>
      <HeaderTitle>
        <h2>Clinic Appointment Scheduler</h2>
        <p>Book open slots, assign clinical staff, and monitor triaged queue timeline.</p>
      </HeaderTitle>

      <BookingGrid>
        <FormBox onSubmit={handleBookingSubmit}>
          <div>
            <Label htmlFor="bk-patient">Patient Name</Label>
            <StyledInput 
              id="bk-patient"
              type="text" 
              placeholder="Full Patient Name" 
              value={patientName} 
              onChange={e => setPatientName(e.target.value)} 
              required 
            />
          </div>

          <div>
            <Label htmlFor="bk-doc">Assign Doctor</Label>
            <SimpleSelect id="bk-doc" value={selectedDoctor} onChange={e => setSelectedDoctor(e.target.value)}>
              <option value="Dr. Aditya Vardhan">Dr. Aditya Vardhan (Cardiology)</option>
              <option value="Dr. Sarah Joseph">Dr. Sarah Joseph (Pediatrics)</option>
            </SimpleSelect>
          </div>

          <div>
            <Label htmlFor="bk-date">Appointment Date</Label>
            <StyledInput 
              id="bk-date"
              type="date" 
              value={selectedDate} 
              onChange={e => setSelectedDate(e.target.value)} 
              required 
            />
          </div>

          <div>
            <Label>Select Time Slot</Label>
            <SlotsGrid>
              {slots.map(slot => (
                <SlotButton 
                  key={slot} 
                  type="button"
                  active={activeSlot === slot}
                  onClick={() => setActiveSlot(slot)}
                >
                  {slot}
                </SlotButton>
              ))}
            </SlotsGrid>
          </div>

          <SubmitBtn type="submit">
            Schedule Appointment <Plus size={16} />
          </SubmitBtn>
        </FormBox>

        <AppointmentsCard>
          <h3 style={{ fontSize: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={18} color="#10b981" /> Appointment Queue Timeline
          </h3>
          <TimelineList>
            {appointments.map(appt => (
              <TimelineItem key={appt.id}>
                <TimeTag>
                  <Clock size={14} /> {appt.time}
                </TimeTag>
                <AppointmentInfo>
                  <h4>{appt.patientName}</h4>
                  <p>Physician: {appt.doctor} | Date: {appt.date}</p>
                </AppointmentInfo>
              </TimelineItem>
            ))}
            {appointments.length === 0 && (
              <div style={{ textAlign: 'center', color: '#64748b', padding: '24px' }}>No active bookings scheduled today.</div>
            )}
          </TimelineList>
        </AppointmentsCard>
      </BookingGrid>
    </Container>
  );
};

export default Booking;
