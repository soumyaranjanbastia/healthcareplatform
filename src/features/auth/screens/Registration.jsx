import React, { useState } from 'react';
import styled from 'styled-components';

// Import Wizard UI Elements
import WizardHeader from '../components/WizardHeader';
import WizardProgressBar from '../components/WizardProgressBar';

// Import Wizard Steps
import Step1Verification from './steps/Step1Verification';
import Step2PartnerType from './steps/Step2PartnerType';
import Step3BasicDetails from './steps/Step3BasicDetails';
import Step4BusinessDetails from './steps/Step4BusinessDetails';
import Step5BankDetails from './steps/Step5BankDetails';
import Step6Documents from './steps/Step6Documents';
import Step7ScreenConfig from './steps/Step7ScreenConfig';
import Step8ReviewSubmit from './steps/Step8ReviewSubmit';
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
    partnerType: '', // 'hospital' | 'clinic'
    email: 'partner@example.com',
    phone: '9876543210',
    agreed: false,
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
    companyName: 'HealthFirst Pharmacy',
    gstin: '22AAAAA0000A1Z5',
    pan: 'ABCDE1234F',
    startTime: '09:00',
    startAmPm: 'AM',
    endTime: '06:00',
    endAmPm: 'PM',
    branches: [],
    bankHolderName: '',
    bankAccountNumber: '',
    bankIfsc: '',
    bankUpi: '',
    uploads: null,
    opdRooms: 1,
    screens: 1
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
        designation: 'Admin'
      },
      clinic: {
        name: formData.companyName || 'HealthFirst Pharmacy',
        specialties: [formData.partnerType === 'hospital' ? 'Hospital Care' : 'Cardiology'],
        address: formData.city || 'Primary Operating Location',
        license: formData.gstin || 'GST-88192',
        opdRooms: formData.opdRooms,
        screens: formData.screens
      }
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1Verification
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            data={formData}
            updateData={updateFormData}
          />
        );
      case 2:
        return (
          <Step2PartnerType
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            data={formData}
            updateData={updateFormData}
          />
        );
      case 3:
        return (
          <Step3BasicDetails
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            data={formData}
            updateData={updateFormData}
          />
        );
      case 4:
        return (
          <Step4BusinessDetails
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            data={formData}
            updateData={updateFormData}
          />
        );
      case 5:
        return (
          <Step5BankDetails
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            data={formData}
            updateData={updateFormData}
          />
        );
      case 6:
        return (
          <Step6Documents
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            data={formData}
            updateData={updateFormData}
          />
        );
      case 7:
        return (
          <Step7ScreenConfig
            onNext={handleNextStep}
            onPrev={handlePrevStep}
            data={formData}
            updateData={updateFormData}
          />
        );
      case 8:
        return (
          <Step8ReviewSubmit
            onNext={handleFinish}
            onPrev={handlePrevStep}
            data={formData}
          />
        );
      case 9:
        return (
          <StepSuccess
            onFinish={handleFinish}
            data={formData}
          />
        );
      default:
        return (
          <Step1Verification
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
        subtitle={step === 9 ? "Your profile has been created" : "Complete your profile to get started"}
      />
      {step <= 8 && (
        <WizardProgressBar currentStep={step} totalSteps={8} />
      )}
      <FormContainer>
        {renderStep()}
      </FormContainer>
    </Container>
  );
};

export default Registration;
