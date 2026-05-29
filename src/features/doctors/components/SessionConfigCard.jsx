import React from 'react';
import styled from 'styled-components';
import { Clock } from 'lucide-react';

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

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  font-size: 13.5px;
  font-weight: 600;
  outline: none;
  background-color: #ffffff;
  color: #1e293b;
  cursor: pointer;
  
  &:focus {
    border-color: #009688;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const SessionConfigCard = ({ duration, setDuration, bufferTime, setBufferTime }) => {
  return (
    <Card>
      <CardTitle>
        <Clock size={18} color="#009688" /> Session Configuration
      </CardTitle>
      <Row>
        <FormGroup>
          <Label>Session Duration</Label>
          <Select value={duration} onChange={e => setDuration(e.target.value)}>
            <option value="15">15 Minutes</option>
            <option value="20">20 Minutes</option>
            <option value="30">30 Minutes</option>
            <option value="45">45 Minutes</option>
            <option value="60">60 Minutes</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Buffer Break Time</Label>
          <Select value={bufferTime} onChange={e => setBufferTime(e.target.value)}>
            <option value="0">No Buffer</option>
            <option value="5">5 Minutes</option>
            <option value="10">10 Minutes</option>
            <option value="15">15 Minutes</option>
            <option value="20">20 Minutes</option>
          </Select>
        </FormGroup>
      </Row>
    </Card>
  );
};

export default SessionConfigCard;
