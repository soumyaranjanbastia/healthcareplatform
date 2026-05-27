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

  const handleContinue = (e) => {
    e.preventDefault();
    if (!bankHolderName || !bankAccountNumber || !bankIfsc) {
      return alert('Please fill in all required bank fields.');
    }

    updateData({
      bankHolderName, bankAccountNumber, bankIfsc, bankUpi
    });
    onNext();
  };

  return (
    <form onSubmit={handleContinue}>
      <WizardCard title="Bank Details" icon={<CreditCard size={20} />}>
        <WizardInput 
          label="Account Holder Name" 
          required 
          placeholder="As per bank account" 
          value={bankHolderName}
          onChange={e => setBankHolderName(e.target.value)}
        />
        <WizardInput 
          label="Account Number" 
          required 
          placeholder="Enter account number" 
          value={bankAccountNumber}
          onChange={e => setBankAccountNumber(e.target.value.replace(/\D/g, ''))}
        />
        <WizardInput 
          label="IFSC Code" 
          required 
          placeholder="Enter IFSC code" 
          value={bankIfsc}
          onChange={e => setBankIfsc(e.target.value.toUpperCase())}
        />
        <WizardInput 
          label="UPI ID (Optional)" 
          placeholder="yourname@upi" 
          value={bankUpi}
          onChange={e => setBankUpi(e.target.value)}
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
