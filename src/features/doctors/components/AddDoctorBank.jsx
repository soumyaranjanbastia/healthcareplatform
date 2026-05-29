import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ShieldCheck, Eye, EyeOff } from 'lucide-react';

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

const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const EyeButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:hover {
    color: #009688;
  }
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

const ErrorText = styled.span`
  font-size: 11px;
  color: #ef4444;
  font-weight: 600;
  margin-top: 4px;
  display: block;
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
  const [showAccNumber, setShowAccNumber] = useState(false);
  const [errors, setErrors] = useState({});
  // Auto-fill suggestion based on IFSC code if field is empty or holding default placeholder
  useEffect(() => {
    const code = ifscCode.toUpperCase().trim();
    if (!bankName || bankName === 'Auto-filled from IFSC') {
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
      }
    }
  }, [ifscCode]);

  const handleNext = () => {
    const newErrors = {};
    if (!accHolderName) newErrors.accHolderName = 'Account Holder Name is required.';
    if (!accNumber) newErrors.accNumber = 'Account Number is required.';
    if (!confirmAccNumber) {
      newErrors.confirmAccNumber = 'Confirm Account Number is required.';
    } else if (accNumber !== confirmAccNumber) {
      newErrors.confirmAccNumber = 'Account numbers do not match!';
    }
    if (!ifscCode) newErrors.ifscCode = 'IFSC Code is required.';
    if (!bankName) newErrors.bankName = 'Bank Name is required.';
    if (!panNumber) newErrors.panNumber = 'PAN Number is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
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
          style={errors.accHolderName ? { borderColor: '#ef4444', boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.08)' } : {}}
        />
        {errors.accHolderName && <ErrorText>{errors.accHolderName}</ErrorText>}
      </InputGroup>

      <Row>
        <InputGroup>
          <Label>Account Number*</Label>
          <PasswordWrapper>
            <Input 
              type={showAccNumber ? "text" : "password"} 
              placeholder="1234 5678 9012 3456" 
              value={accNumber}
              onChange={e => setAccNumber(e.target.value.replace(/\D/g, ''))}
              style={{ 
                paddingRight: '42px',
                ...(errors.accNumber ? { borderColor: '#ef4444', boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.08)' } : {})
              }}
            />
            <EyeButton 
              type="button" 
              onClick={() => setShowAccNumber(!showAccNumber)}
            >
              {showAccNumber ? <EyeOff size={18} /> : <Eye size={18} />}
            </EyeButton>
          </PasswordWrapper>
          {errors.accNumber && <ErrorText>{errors.accNumber}</ErrorText>}
        </InputGroup>

        <InputGroup>
          <Label>Confirm Account Number*</Label>
          <Input 
            type="text" 
            placeholder="Re-enter account number" 
            value={confirmAccNumber}
            onChange={e => setConfirmAccNumber(e.target.value.replace(/\D/g, ''))}
            style={errors.confirmAccNumber ? { borderColor: '#ef4444', boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.08)' } : {}}
          />
          {errors.confirmAccNumber && <ErrorText>{errors.confirmAccNumber}</ErrorText>}
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
            style={errors.ifscCode ? { borderColor: '#ef4444', boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.08)' } : {}}
          />
          {errors.ifscCode && <ErrorText>{errors.ifscCode}</ErrorText>}
        </InputGroup>

        <InputGroup>
          <Label>Bank Name*</Label>
          <Input 
            type="text" 
            placeholder="Enter bank name" 
            value={bankName === 'Auto-filled from IFSC' ? '' : bankName}
            onChange={e => setBankName(e.target.value)}
            style={errors.bankName ? { borderColor: '#ef4444', boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.08)' } : {}}
          />
          {errors.bankName && <ErrorText>{errors.bankName}</ErrorText>}
        </InputGroup>
      </Row>

      <InputGroup style={{ maxWidth: '49%' }}>
        <Label>PAN Number*</Label>
        <Input 
          type="text" 
          placeholder="ABCDE1234F" 
          value={panNumber}
          onChange={e => setPanNumber(e.target.value)}
          style={errors.panNumber ? { borderColor: '#ef4444', boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.08)' } : {}}
        />
        {errors.panNumber && <ErrorText>{errors.panNumber}</ErrorText>}
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
