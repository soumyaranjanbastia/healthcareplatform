import React, { useState } from 'react';
import styled from 'styled-components';

// Import Wizard UI Elements
import WizardHeader from '../components/WizardHeader';
import WizardProgressBar from '../components/WizardProgressBar';

// Import Wizard Steps
import Step1BasicDetails from './steps/Step1BasicDetails';
import Step2BusinessDetails from './steps/Step2BusinessDetails';
import Step3BankDetails from './steps/Step3BankDetails';
import Step4Documents from './steps/Step4Documents';
import StepSuccess from './steps/StepSuccess';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Registration = ({ onSignup, onSwitchToLogin }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: 'partner@example.com',
    phone: '9876543210',
    agreed: true, // Auto-verified/agreed since verification screen is removed
    fullName: '',
    profileName: '',
    dob: '',
    companyName: '',
    contactEmail: '',
    alternateEmail: '',
    phonePrefix: '+91',
    contactPhone: '',
    country: 'India',
    state: 'Maharashtra',
    city: '',
    businessName: 'HealthFirst Pharmacy',
    gstin: '22AAAAA0000A1Z5',
    pan: 'ABCDE1234F',
    repName: '',
    repPhone: '',
    repEmail: '',
    repDesignation: '',
    workingHours: 'Mon – Fri, 9:00 AM – 6:00 PM',
    branches: [],
    bankHolderName: '',
    bankAccountNumber: '',
    bankIfsc: '',
    bankUpi: '',
    uploads: null
  });

  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    if (step === 1) {
      onSwitchToLogin();
    } else {
      setStep(prev => prev - 1);
    }
  };

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleFinish = () => {
    // Dispatch Redux signup success payload trigger!
    onSignup({
      user: {
        name: formData.fullName || 'Dr. Abhinav Kumar',
        email: formData.contactEmail || 'partner@example.com',
        role: 'Admin',
        designation: formData.repDesignation || 'Chief Pharmacist'
      },
      clinic: {
        name: formData.businessName || 'HealthFirst Pharmacy',
        specialties: ['Pharmacy'],
        address: formData.branches[0]?.address || 'Primary Operating Location',
        license: formData.gstin || 'GST-88192'
      }
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1BasicDetails 
            onNext={handleNextStep} 
            onPrev={handlePrevStep}
            data={formData} 
            updateData={updateFormData} 
          />
        );
      case 2:
        return (
          <Step2BusinessDetails 
            onNext={handleNextStep} 
            onPrev={handlePrevStep} 
            data={formData} 
            updateData={updateFormData} 
          />
        );
      case 3:
        return (
          <Step3BankDetails 
            onNext={handleNextStep} 
            onPrev={handlePrevStep} 
            data={formData} 
            updateData={updateFormData} 
          />
        );
      case 4:
        return (
          <Step4Documents 
            onNext={handleNextStep} 
            onPrev={handlePrevStep} 
            data={formData} 
            updateData={updateFormData} 
          />
        );
      case 5:
        return (
          <StepSuccess 
            onFinish={handleFinish} 
            data={formData} 
          />
        );
      default:
        return (
          <Step1BasicDetails 
            onNext={handleNextStep} 
            onPrev={handlePrevStep}
            data={formData} 
            updateData={updateFormData} 
          />
        );
    }
  };

  return (
    <Container>
      <WizardHeader 
        onBack={handlePrevStep} 
        title="Registration" 
        subtitle={step === 5 ? "Your profile has been created" : "Complete your profile to get started"}
      />
      {step <= 4 && (
        <WizardProgressBar currentStep={step} totalSteps={7} />
      )}
      <FormContainer>
        {renderStep()}
      </FormContainer>
    </Container>
  );
};

export default Registration;
