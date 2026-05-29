import React, { useState } from 'react';
import { ArrowRight, CreditCard } from 'lucide-react';
import WizardCard from '../../components/WizardCard';
import WizardInput from '../../components/WizardInput';
import WizardButton, { ButtonWrapper } from '../../components/WizardButton';

const Step5BankDetails = ({ onNext, onPrev, data, updateData }) => {
  const [bankHolderName, setBankHolderName] = useState(data.bankHolderName || '');
  const [bankAccountNumber, setBankAccountNumber] = useState(data.bankAccountNumber || '');
  const [bankIfsc, setBankIfsc] = useState(data.bankIfsc || '');
  const [bankUpi, setBankUpi] = useState(data.bankUpi || '');

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // 1. Account Holder Name
    if (!bankHolderName.trim()) {
      newErrors.bankHolderName = 'Account holder name is required';
    } else {
      const nameRegex = /^[a-zA-Z\s]+$/;
      if (!nameRegex.test(bankHolderName.trim())) {
        newErrors.bankHolderName = 'Account holder name must contain letters only';
      }
    }

    // 2. Account Number
    if (!bankAccountNumber.trim()) {
      newErrors.bankAccountNumber = 'Account number is required';
    }

    // 3. IFSC Code
    if (!bankIfsc.trim()) {
      newErrors.bankIfsc = 'IFSC code is required';
    } else {
      const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
      if (!ifscRegex.test(bankIfsc.trim())) {
        newErrors.bankIfsc = 'Invalid IFSC code format (e.g. SBIN0001234)';
      }
    }

    // 4. UPI ID (Optional)
    if (bankUpi.trim()) {
      const upiRegex = /^[a-zA-Z0-9.\-_]+@[a-zA-Z0-9]+$/;
      if (!upiRegex.test(bankUpi.trim())) {
        newErrors.bankUpi = 'Invalid UPI ID format (e.g. name@upi)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    updateData({
      bankHolderName, bankAccountNumber, bankIfsc, bankUpi
    });
    onNext();
  };

  return (
    <form onSubmit={handleContinue} noValidate>
      <WizardCard title="Bank Details" icon={<CreditCard size={20} />}>
        <WizardInput 
          label="Account Holder Name" 
          required={true}
          placeholder="As per bank account" 
          value={bankHolderName}
          onChange={e => {
            setBankHolderName(e.target.value.replace(/[^a-zA-Z\s]/g, ''));
            if (errors.bankHolderName) setErrors({ ...errors, bankHolderName: null });
          }}
          error={errors.bankHolderName}
        />
        <WizardInput 
          label="Account Number" 
          required={true}
          placeholder="Enter account number" 
          value={bankAccountNumber}
          onChange={e => {
            setBankAccountNumber(e.target.value.replace(/\D/g, ''));
            if (errors.bankAccountNumber) setErrors({ ...errors, bankAccountNumber: null });
          }}
          error={errors.bankAccountNumber}
        />
        <WizardInput 
          label="IFSC Code" 
          required={true}
          placeholder="Enter IFSC code" 
          value={bankIfsc}
          maxLength={11}
          onChange={e => {
            setBankIfsc(e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase());
            if (errors.bankIfsc) setErrors({ ...errors, bankIfsc: null });
          }}
          error={errors.bankIfsc}
        />
        <WizardInput 
          label="UPI ID (Optional)" 
          placeholder="yourname@upi" 
          value={bankUpi}
          onChange={e => {
            setBankUpi(e.target.value);
            if (errors.bankUpi) setErrors({ ...errors, bankUpi: null });
          }}
          error={errors.bankUpi}
        />
      </WizardCard>

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

export default Step5BankDetails;
