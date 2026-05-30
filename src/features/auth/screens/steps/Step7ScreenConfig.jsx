import React, { useState } from 'react';
import styled from 'styled-components';
import { ArrowRight, DoorOpen, Monitor } from 'lucide-react';
import WizardButton, { ButtonWrapper } from '../../components/WizardButton';

const ConfigGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
  margin-top: 10px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ConfigCard = styled.div`
  background: #ffffff;
  border: 1px solid #f1f5f9;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);
  padding: 28px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const IconWrapper = styled.div`
  color: ${props => props.color || '#009688'};
  background-color: ${props => props.bgColor || '#e2fbf4'};
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const CardTitle = styled.h2`
  font-family: 'Outfit', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 12px;
`;

const QueryLabel = styled.label`
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #475569;
  font-weight: 500;
  margin-bottom: 16px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 12px 16px;
  width: 100%;
  background-color: #ffffff;
  margin-bottom: 20px;

  &:focus-within {
    border-color: #009688;
    box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.08);
  }
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  width: 50px;
  text-align: center;
`;

const SuffixText = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
  margin-left: 8px;
`;

const SpinnerBtn = styled.button`
  background: none;
  border: none;
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  padding: 0 8px;
  user-select: none;
  &:hover {
    color: #0f172a;
  }
`;

const InfoBox = styled.div`
  background-color: #f0fdf4;
  border: 1px solid #dcfce7;
  border-radius: 8px;
  padding: 10px 14px;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: #166534;
  line-height: 1.4;
  width: 100%;
`;

const Step7ScreenConfig = ({ onNext, onPrev, data, updateData }) => {
  const [rooms, setRooms] = useState(data.opdRooms || 1);
  const [screens, setScreens] = useState(data.screens || 1);

  const adjustVal = (setter, val, delta) => {
    const newVal = Math.max(1, val + delta);
    setter(newVal);
  };

  const handleContinue = (e) => {
    e.preventDefault();
    updateData({ opdRooms: rooms, screens: screens });
    onNext();
  };

  return (
    <form onSubmit={handleContinue}>
      <ConfigGrid>
        {/* Card 1: OPD Config */}
        <ConfigCard>
          <IconWrapper color="#009688" bgColor="#e2fbf4">
            <DoorOpen size={22} />
          </IconWrapper>
          <CardTitle>OPD Configuration</CardTitle>
          <QueryLabel>How many OPD Rooms available ?</QueryLabel>
          <InputWrapper>
            <SpinnerBtn type="button" onClick={() => adjustVal(setRooms, rooms, -1)}>-</SpinnerBtn>
            <StyledInput
              type="text"
              value={rooms}
              readOnly
            />
            <SuffixText>Rooms</SuffixText>
            <SpinnerBtn type="button" onClick={() => adjustVal(setRooms, rooms, 1)} style={{ marginLeft: 'auto' }}>+</SpinnerBtn>
          </InputWrapper>
          <InfoBox>
            You can add or modify EMR screens later from your dashboard settings
          </InfoBox>
        </ConfigCard>

        {/* Card 2: Screen Config */}
        <ConfigCard>
          <IconWrapper color="#0ea5e9" bgColor="#e0f2fe">
            <Monitor size={22} />
          </IconWrapper>
          <CardTitle>Screen Configuration</CardTitle>
          <QueryLabel>How many consultation screens will you have?</QueryLabel>
          <InputWrapper>
            <SpinnerBtn type="button" onClick={() => adjustVal(setScreens, screens, -1)}>-</SpinnerBtn>
            <StyledInput
              type="text"
              value={screens}
              readOnly
            />
            <SuffixText>screen</SuffixText>
            <SpinnerBtn type="button" onClick={() => adjustVal(setScreens, screens, 1)} style={{ marginLeft: 'auto' }}>+</SpinnerBtn>
          </InputWrapper>
          <InfoBox>
            You can add or modify EMR screens later from your dashboard settings
          </InfoBox>
        </ConfigCard>
      </ConfigGrid>

      <ButtonWrapper>
        <WizardButton variant="secondary" onClick={onPrev}>
          Previous
        </WizardButton>
        <WizardButton type="submit">
          Continue <ArrowRight size={16} />
        </WizardButton>
      </ButtonWrapper>
    </form>
  );
};

export default Step7ScreenConfig;
