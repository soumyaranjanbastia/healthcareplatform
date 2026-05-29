import React from 'react';
import styled from 'styled-components';
import { Shield } from 'lucide-react';

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

  &::placeholder {
    color: #94a3b8;
  }
`;

const PricingModeCard = ({ serviceType, setServiceType, onlinePrice, setOnlinePrice, clinicPrice, setClinicPrice }) => {
  return (
    <Card>
      <CardTitle>
        <Shield size={18} color="#009688" /> Pricing & consultation Mode
      </CardTitle>
      
      <FormGroup>
        <Label>Service Type</Label>
        <Select value={serviceType} onChange={e => setServiceType(e.target.value)}>
          <option value="both">Both (Online & In-Person Clinic)</option>
          <option value="online">Online Consultations Only</option>
          <option value="offline">In-Person Clinic Visits Only</option>
        </Select>
      </FormGroup>

      {(serviceType === 'online' || serviceType === 'both') && (
        <FormGroup>
          <Label>Online Consultation Fee (INR)</Label>
          <div>
            <Input 
              type="number" 
              value={onlinePrice} 
              onChange={e => setOnlinePrice(e.target.value)} 
              placeholder="e.g. 500" 
            />
          </div>
        </FormGroup>
      )}

      {(serviceType === 'offline' || serviceType === 'both') && (
        <FormGroup>
          <Label>In-Person Clinic Fee (INR)</Label>
          <div>
            <Input 
              type="number" 
              value={clinicPrice} 
              onChange={e => setClinicPrice(e.target.value)} 
              placeholder="e.g. 600" 
            />
          </div>
        </FormGroup>
      )}
    </Card>
  );
};

export default PricingModeCard;
