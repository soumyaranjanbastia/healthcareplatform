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

const QuickPresetRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 4px;
  flex-wrap: wrap;
`;

const PresetBtn = styled.button`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  background-color: #f1f5f9;
  border: 1px solid #cbd5e1;
  color: #475569;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background-color: #009688;
    color: #ffffff;
    border-color: #009688;
  }
`;

const ApplicabilityPeriodCard = ({ startDate, setStartDate, endDate, setEndDate, handlePeriodPreset }) => {
  return (
    <Card>
      <CardTitle>
        <Calendar size={18} color="#009688" /> Schedule Applicability Period
      </CardTitle>
      
      <FormGroup>
        <Label>Start Date</Label>
        <Input 
          type="date" 
          value={startDate} 
          onChange={e => setStartDate(e.target.value)} 
        />
      </FormGroup>

      <FormGroup>
        <Label>End Date</Label>
        <Input 
          type="date" 
          value={endDate} 
          onChange={e => setEndDate(e.target.value)} 
        />
      </FormGroup>

      <QuickPresetRow>
        <PresetBtn type="button" onClick={() => handlePeriodPreset(1)}>1 Month Preset</PresetBtn>
        <PresetBtn type="button" onClick={() => handlePeriodPreset(3)}>3 Months Preset</PresetBtn>
        <PresetBtn type="button" onClick={() => handlePeriodPreset(6)}>6 Months Preset</PresetBtn>
        <PresetBtn type="button" onClick={() => handlePeriodPreset(12)}>1 Year Preset</PresetBtn>
      </QuickPresetRow>
    </Card>
  );
};

export default ApplicabilityPeriodCard;
