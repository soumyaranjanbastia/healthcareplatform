import React, { useState } from 'react';
import styled from 'styled-components';
import { ArrowRight, Building2, Stethoscope, CheckCircle2 } from 'lucide-react';
import WizardCard from '../../components/WizardCard';
import WizardButton, { ButtonWrapper } from '../../components/WizardButton';

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
  margin-top: 10px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const SelectCard = styled.div`
  border: 2px solid ${props => props.active ? '#009688' : '#e2e8f0'};
  background-color: ${props => props.active ? '#f0fdf4' : '#ffffff'};
  border-radius: 16px;
  padding: 30px 24px;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  box-shadow: ${props => props.active ? '0 10px 25px rgba(0, 150, 136, 0.08)' : '0 4px 12px rgba(0, 0, 0, 0.01)'};

  &:hover {
    transform: translateY(-4px);
    border-color: ${props => props.active ? '#009688' : '#cbd5e1'};
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  }
`;

const IconContainer = styled.div`
  color: ${props => props.active ? '#009688' : '#64748b'};
  background-color: ${props => props.active ? '#dcfce7' : '#f1f5f9'};
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  transition: all 0.25s ease;
`;

const CardTitle = styled.h3`
  font-family: 'Outfit', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
`;

const CardDesc = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #64748b;
  line-height: 1.5;
  margin: 0;
`;

const CheckBadge = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  color: #009688;
  display: ${props => props.active ? 'block' : 'none'};
`;

const Step2PartnerType = ({ onNext, onPrev, data, updateData }) => {
  const [partnerType, setPartnerType] = useState(data.partnerType || '');

  const handleSelect = (type) => {
    setPartnerType(type);
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (!partnerType) {
      return alert('Please select a Partner Type to continue.');
    }

    updateData({ partnerType });
    onNext();
  };

  return (
    <form onSubmit={handleContinue}>
      <WizardCard title="Select Partner Type" subtitle="Choose whether you are registering as a Hospital or a Clinic to continue.">
        <CardGrid>
          <SelectCard 
            active={partnerType === 'hospital'} 
            onClick={() => handleSelect('hospital')}
          >
            <CheckBadge active={partnerType === 'hospital'}>
              <CheckCircle2 size={20} />
            </CheckBadge>
            <IconContainer active={partnerType === 'hospital'}>
              <Building2 size={28} />
            </IconContainer>
            <CardTitle>Hospital</CardTitle>
            <CardDesc>
              Multi-specialty centers, diagnostic hubs, inpatient wards, and complex hospital operations.
            </CardDesc>
          </SelectCard>

          <SelectCard 
            active={partnerType === 'clinic'} 
            onClick={() => handleSelect('clinic')}
          >
            <CheckBadge active={partnerType === 'clinic'}>
              <CheckCircle2 size={20} />
            </CheckBadge>
            <IconContainer active={partnerType === 'clinic'}>
              <Stethoscope size={28} />
            </IconContainer>
            <CardTitle>Clinic / Doctor</CardTitle>
            <CardDesc>
              Private practice cabins, single doctor clinics, outpatient consultations, and independent physicians.
            </CardDesc>
          </SelectCard>
        </CardGrid>
      </WizardCard>

      <ButtonWrapper>
        <WizardButton variant="secondary" onClick={onPrev}>
          Previous
        </WizardButton>
        <WizardButton type="submit" disabled={!partnerType}>
          Continue <ArrowRight size={16} />
        </WizardButton>
      </ButtonWrapper>
    </form>
  );
};

export default Step2PartnerType;
