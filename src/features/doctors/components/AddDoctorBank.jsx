import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ShieldCheck } from 'lucide-react';

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
`;

const FormTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 13px;
  color: #64748b;
  margin: 0;
  font-weight: 500;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 700;
  color: #1e293b;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  font-size: 13.5px;
  outline: none;
  font-weight: 600;
  background-color: #ffffff;
  color: #1e293b;
  box-sizing: border-box;
  transition: all 0.2s ease;

  &:focus {
    border-color: #009688;
    box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.08);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const SecureBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  color: #475569;
  font-size: 12px;
  font-weight: 600;
`;

const ContinueBtn = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #009688;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  margin-top: 10px;

  &:hover {
    background-color: #00796b;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 150, 136, 0.15);
  }
`;

const AddDoctorBank = ({
  accHolderName, setAccHolderName,
  accNumber, setAccNumber,
  confirmAccNumber, setConfirmAccNumber,
  ifscCode, setIfscCode,
  bankName, setBankName,
  panNumber, setPanNumber,
  onContinue
}) => {
  // Premium auto-fill based on IFSC code
  useEffect(() => {
    const code = ifscCode.toUpperCase().trim();
    if (code.startsWith('SBIN')) {
      setBankName('State Bank of India');
    } else if (code.startsWith('HDFC')) {
      setBankName('HDFC Bank');
    } else if (code.startsWith('ICIC')) {
      setBankName('ICICI Bank');
    } else if (code.startsWith('BARB')) {
      setBankName('Bank of Baroda');
    } else if (code.startsWith('PUNB')) {
      setBankName('Punjab National Bank');
    } else if (code.length >= 4 && bankName === 'Auto-filled from IFSC') {
      setBankName('Cooperative/Commercial Bank');
    } else if (code.length === 0) {
      setBankName('Auto-filled from IFSC');
    }
  }, [ifscCode]);

  const handleNext = () => {
    if (!accHolderName || !accNumber || !confirmAccNumber || !ifscCode || !panNumber) {
      alert("Please fill in all required bank details!");
      return;
    }
    if (accNumber !== confirmAccNumber) {
      alert("Account numbers do not match!");
      return;
    }
    onContinue();
  };

  return (
    <FormSection>
      <div>
        <FormTitle>Bank Details</FormTitle>
        <Subtitle style={{ marginTop: 4 }}>Add your bank details for receiving consultation payments</Subtitle>
      </div>

      <InputGroup>
        <Label>Account Holder Name*</Label>
        <Input 
          type="text" 
          placeholder="Enter account holder name" 
          value={accHolderName}
          onChange={e => setAccHolderName(e.target.value)}
        />
      </InputGroup>

      <Row>
        <InputGroup>
          <Label>Account Number*</Label>
          <Input 
            type="password" 
            placeholder="1234 5678 9012 3456" 
            value={accNumber}
            onChange={e => setAccNumber(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <Label>Confirm Account Number*</Label>
          <Input 
            type="text" 
            placeholder="Re-enter account number" 
            value={confirmAccNumber}
            onChange={e => setConfirmAccNumber(e.target.value)}
          />
        </InputGroup>
      </Row>

      <Row>
        <InputGroup>
          <Label>IFSC Code*</Label>
          <Input 
            type="text" 
            placeholder="SBIN0001234" 
            value={ifscCode}
            onChange={e => setIfscCode(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <Label>Bank Name*</Label>
          <Input 
            type="text" 
            placeholder="Auto-filled from IFSC" 
            value={bankName}
            readOnly
            style={{ backgroundColor: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0' }}
          />
        </InputGroup>
      </Row>

      <InputGroup style={{ maxWidth: '49%' }}>
        <Label>PAN Number*</Label>
        <Input 
          type="text" 
          placeholder="ABCDE1234F" 
          value={panNumber}
          onChange={e => setPanNumber(e.target.value)}
        />
      </InputGroup>

      <SecureBadge>
        <ShieldCheck size={18} color="#009688" />
        <span>Your information is encrypted and secure</span>
      </SecureBadge>

      <ContinueBtn onClick={handleNext}>
        Next
      </ContinueBtn>
    </FormSection>
  );
};

export default AddDoctorBank;
