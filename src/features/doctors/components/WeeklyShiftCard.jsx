import React from 'react';
import styled from 'styled-components';
import { Calendar } from 'lucide-react';

const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 750;
  color: #1e293b;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 12px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 700;
  color: #475569;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  font-size: 13.5px;
  font-weight: 600;
  outline: none;
  background-color: #ffffff;
  color: #1e293b;
  box-sizing: border-box;
  
  &:focus {
    border-color: #009688;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const DaySelectorGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
`;

const DayChip = styled.button`
  padding: 10px 16px;
  border-radius: 20px;
  font-size: 12.5px;
  font-weight: 700;
  border: 1.5px solid ${props => props.active ? '#009688' : '#e2e8f0'};
  background-color: ${props => props.active ? '#e6f9f3' : '#ffffff'};
  color: ${props => props.active ? '#009688' : '#475569'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #009688;
    background-color: #e6f9f3;
  }
`;

const DAY_NAMES_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const WeeklyShiftCard = ({ availableDays, handleDayToggle, startTime, setStartTime, endTime, setEndTime }) => {
  return (
    <Card>
      <CardTitle>
        <Calendar size={18} color="#009688" /> Weekly Operating Shift
      </CardTitle>
      <FormGroup>
        <Label>Shift Active Days</Label>
        <DaySelectorGrid>
          {DAY_NAMES_ORDER.map(day => (
            <DayChip 
              key={day} 
              type="button"
              active={availableDays.includes(day)}
              onClick={() => handleDayToggle(day)}
            >
              {day}
            </DayChip>
          ))}
        </DaySelectorGrid>
      </FormGroup>

      <Row style={{ marginTop: '10px' }}>
        <FormGroup>
          <Label>Shift Start Time</Label>
          <Input 
            type="time" 
            value={startTime} 
            onChange={e => setStartTime(e.target.value)} 
          />
        </FormGroup>

        <FormGroup>
          <Label>Shift End Time</Label>
          <Input 
            type="time" 
            value={endTime} 
            onChange={e => setEndTime(e.target.value)} 
          />
        </FormGroup>
      </Row>
    </Card>
  );
};

export default WeeklyShiftCard;
