import React from 'react';
import styled from 'styled-components';
import { HelpCircle, Trash2 } from 'lucide-react';

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

const AddBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #009688;
  color: #ffffff;
  border: none;
  padding: 12px 18px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 150, 136, 0.2);
  transition: all 0.2s ease;

  &:hover {
    background-color: #00796b;
    transform: translateY(-1px);
  }
`;

const HolidayBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #ef4444;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 8px;

  button {
    background: none;
    border: none;
    color: #ef4444;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0;

    &:hover {
      color: #b91c1c;
    }
  }
`;

const HolidaysCard = ({ holidays, newHoliday, setNewHoliday, handleAddHoliday, handleRemoveHoliday }) => {
  return (
    <Card>
      <CardTitle>
        <HelpCircle size={18} color="#009688" /> Holidays & Leave dates
      </CardTitle>
      <p style={{ fontSize: '11px', color: '#64748b', margin: '0 0 4px 0', lineHeight: 1.4 }}>
        Add dates on which the doctor will be unavailable.
      </p>
      
      <div style={{ display: 'flex', gap: 10 }}>
        <Input 
          type="date" 
          value={newHoliday} 
          onChange={e => setNewHoliday(e.target.value)} 
        />
        <AddBtn 
          type="button" 
          onClick={handleAddHoliday}
        >
          Add
        </AddBtn>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: '10px' }}>
        {holidays.length === 0 ? (
          <span style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }}>
            No holidays configured yet.
          </span>
        ) : (
          holidays.map(hDate => {
            const [y, m, d] = hDate.split('-');
            return (
              <HolidayBadge key={hDate}>
                <span>{d}/{m}/{y}</span>
                <button type="button" onClick={() => handleRemoveHoliday(hDate)}>
                  <Trash2 size={12} />
                </button>
              </HolidayBadge>
            );
          })
        )}
      </div>
    </Card>
  );
};

export default HolidaysCard;
