import React from 'react';
import styled from 'styled-components';
import { Sparkles } from 'lucide-react';

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

const SlotsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SlotCategoryBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 4px 0;
  border-bottom: 1px dashed #e2e8f0;
`;

const SlotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SlotChip = styled.button`
  padding: 10px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: all 0.15s ease;
  box-sizing: border-box;
  
  border: 1.5px solid ${props => {
    if (props.selected) return '#009688';
    if (props.conflict) return '#cbd5e1';
    return '#f1f5f9';
  }};

  background-color: ${props => {
    if (props.selected) return '#009688';
    if (props.conflict) return '#f8fafc';
    return '#ffffff';
  }};

  color: ${props => {
    if (props.selected) return '#ffffff';
    if (props.conflict) return '#94a3b8';
    return '#334155';
  }};

  &:hover {
    border-color: #009688;
    color: ${props => props.selected ? '#ffffff' : '#009688'};
  }
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

const SlotsGridCard = ({ slotsByCategory, serviceType, handleCategoryBulkSelect, handleSlotToggle, isSlotChecked }) => {
  return (
    <Card>
      <CardTitle>
        <Sparkles size={18} color="#009688" /> Consultation Sessions Grid Preview
      </CardTitle>
      <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 10px 0', lineHeight: 1.4 }}>
        Below are the preview session slots generated dynamically. You can click to select custom slots for Online or Clinic modes.
      </p>
      
      <SlotsContainer>
        {Object.keys(slotsByCategory).length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', color: '#94a3b8', fontStyle: 'italic', fontSize: '13px' }}>
            Configure active hours and session durations to preview time slots.
          </div>
        ) : (
          Object.keys(slotsByCategory).map(catName => (
            <SlotCategoryBlock key={catName}>
              <CategoryHeader>
                <span>{catName}</span>
                <div style={{ display: 'flex', gap: 10 }}>
                  {(serviceType === 'online' || serviceType === 'both') && (
                    <PresetBtn type="button" onClick={() => handleCategoryBulkSelect(slotsByCategory[catName], 'online')}>
                      Toggle All Online
                    </PresetBtn>
                  )}
                  {(serviceType === 'offline' || serviceType === 'both') && (
                    <PresetBtn type="button" onClick={() => handleCategoryBulkSelect(slotsByCategory[catName], 'offline')}>
                      Toggle All Clinic
                    </PresetBtn>
                  )}
                </div>
              </CategoryHeader>

              <SlotsGrid>
                {slotsByCategory[catName].map(slot => {
                  const slotKey = `${slot.start}-${slot.end}`;
                  const isOnline = isSlotChecked(slot, 'online');
                  const isClinic = isSlotChecked(slot, 'offline');

                  return (
                    <div key={slotKey} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#334155', textAlign: 'center' }}>
                        {slot.start}
                      </span>
                      {(serviceType === 'online' || serviceType === 'both') && (
                        <SlotChip 
                          type="button"
                          selected={isOnline}
                          onClick={() => handleSlotToggle(slot, 'online')}
                        >
                          Online
                        </SlotChip>
                      )}
                      {(serviceType === 'offline' || serviceType === 'both') && (
                        <SlotChip 
                          type="button"
                          selected={isClinic}
                          onClick={() => handleSlotToggle(slot, 'offline')}
                        >
                          Clinic
                        </SlotChip>
                      )}
                    </div>
                  );
                })}
              </SlotsGrid>
            </SlotCategoryBlock>
          ))
        )}
      </SlotsContainer>
    </Card>
  );
};

export default SlotsGridCard;
