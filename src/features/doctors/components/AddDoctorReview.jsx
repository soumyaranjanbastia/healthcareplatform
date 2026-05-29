import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ChevronDown, ChevronUp } from 'lucide-react';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

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

const AccordionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;
`;

const AccordionCard = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background-color: #ffffff;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.01);
  transition: all 0.2s ease;
`;

const AccordionHeader = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 700;
  color: #1e293b;
  cursor: pointer;
  text-align: left;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f8fafc;
  }
`;

const AccordionContent = styled.div`
  padding: 0 20px 20px 20px;
  border-top: 1px solid #f1f5f9;
  background-color: #ffffff;
`;

const DetailsTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 14px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
`;

const DetailLabel = styled.span`
  color: #64748b;
`;

const DetailValue = styled.span`
  color: #1e293b;
  text-align: right;
`;

const ConsentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  margin-top: 10px;
`;

const ConsentItem = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 12.5px;
  font-weight: 600;
  color: #334155;
  cursor: pointer;

  input {
    margin-top: 3px;
    accent-color: #009688;
    cursor: pointer;
    width: 16px;
    height: 16px;
  }
`;

const ErrorBanner = styled.div`
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
  border-radius: 10px;
  padding: 14px 18px;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 14px;
  background-color: ${props => props.disabled ? '#94a3b8' : '#009688'};
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  margin-top: 10px;

  &:hover:not(:disabled) {
    background-color: #00796b;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 150, 136, 0.15);
  }
`;

const Spinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;

const AddDoctorReview = ({ formData, onSubmit, isLoading = false, error = null }) => {
  const [expandedSection, setExpandedSection] = useState('profile');

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleSubmit = () => {
    onSubmit();
  };

  const {
    title = 'Dr.',
    firstName = '',
    lastName = '',
    email = '',
    phone = '',
    gender = 'Male',
    dob = '',
    location = '',
    regNo = '',
    council = '',
    qualification = '',
    degree = '',
    specialization = '',
    experience = 0,
    selectedLanguages = [],
    conditionsList = [],

    accHolderName = '',
    accNumber = '',
    bankName = '',
    ifscCode = '',
    panNumber = '',
    phonePrefix = '+91'
  } = formData;

  return (
    <FormSection>
      <div>
        <FormTitle>Review & Submit</FormTitle>
        <Subtitle style={{ marginTop: 4 }}>Please review all your information before submitting</Subtitle>
      </div>

      <AccordionList>
        {/* PROFILE SECTION */}
        <AccordionCard>
          <AccordionHeader onClick={() => toggleSection('profile')}>
            <span>Profile</span>
            {expandedSection === 'profile' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </AccordionHeader>
          {expandedSection === 'profile' && (
            <AccordionContent>
              <DetailsTable>
                <DetailRow>
                  <DetailLabel>Name</DetailLabel>
                  <DetailValue>{`${title} ${firstName} ${lastName}`.trim()}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Email</DetailLabel>
                  <DetailValue>{email}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Phone</DetailLabel>
                  <DetailValue>{phonePrefix} {phone}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Gender</DetailLabel>
                  <DetailValue>{gender}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Date of Birth</DetailLabel>
                  <DetailValue>{dob ? new Date(dob).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Location</DetailLabel>
                  <DetailValue>{location}</DetailValue>
                </DetailRow>
              </DetailsTable>
            </AccordionContent>
          )}
        </AccordionCard>

        {/* PROFESSIONAL INFO */}
        <AccordionCard>
          <AccordionHeader onClick={() => toggleSection('professional')}>
            <span>Professional Info</span>
            {expandedSection === 'professional' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </AccordionHeader>
          {expandedSection === 'professional' && (
            <AccordionContent>
              <DetailsTable>
                <DetailRow>
                  <DetailLabel>Registration No.</DetailLabel>
                  <DetailValue>{regNo}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Registration Council</DetailLabel>
                  <DetailValue>{council}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Highest Qualification</DetailLabel>
                  <DetailValue>{qualification}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Degree to Display</DetailLabel>
                  <DetailValue>{degree || 'N/A'}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Specialization</DetailLabel>
                  <DetailValue>{specialization}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Years of Experience</DetailLabel>
                  <DetailValue>{experience} Years</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Languages Spoken</DetailLabel>
                  <DetailValue>{selectedLanguages.join(', ')}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Conditions Treated</DetailLabel>
                  <DetailValue>{conditionsList.join(', ')}</DetailValue>
                </DetailRow>
              </DetailsTable>
            </AccordionContent>
          )}
        </AccordionCard>



        {/* BANK DETAILS */}
        <AccordionCard>
          <AccordionHeader onClick={() => toggleSection('bank')}>
            <span>Bank Details</span>
            {expandedSection === 'bank' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </AccordionHeader>
          {expandedSection === 'bank' && (
            <AccordionContent>
              <DetailsTable>
                <DetailRow>
                  <DetailLabel>Account Holder Name</DetailLabel>
                  <DetailValue>{accHolderName}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Account Number</DetailLabel>
                  <DetailValue>••••••••••••{accNumber.slice(-4)}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>IFSC Code</DetailLabel>
                  <DetailValue>{ifscCode.toUpperCase()}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Bank Name</DetailLabel>
                  <DetailValue>{bankName}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>PAN Number</DetailLabel>
                  <DetailValue>{panNumber.toUpperCase()}</DetailValue>
                </DetailRow>
              </DetailsTable>
            </AccordionContent>
          )}
        </AccordionCard>
      </AccordionList>

      {error && (
        <ErrorBanner>
          {error || 'Registration failed. Please try again.'}
        </ErrorBanner>
      )}

      <SubmitBtn onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? <><Spinner /> Submitting...</> : 'Submit Application'}
      </SubmitBtn>
    </FormSection>
  );
};

export default AddDoctorReview;
