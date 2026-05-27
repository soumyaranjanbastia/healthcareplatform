import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Mail, Lock, Building, Users, Award } from 'lucide-react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const FormContainer = styled.div`
  animation: ${fadeIn} 0.5s ease-out;
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 24px;
  h2 {
    font-family: 'Outfit', sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 6px;
  }
  p {
    font-size: 13px;
    color: #64748b;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #334155;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 14px;
  color: #94a3b8;
  display: flex;
  align-items: center;
  pointer-events: none;
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px 14px 12px 42px;
  font-size: 14px;
  color: #0f172a;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    border-color: #009688;
    box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.08);
  }
`;

const SimpleSelect = styled.select`
  width: 100%;
  padding: 12px 14px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  color: #0f172a;
  font-size: 14px;
  outline: none;
  cursor: pointer;
  transition: all 0.2s;
  &:focus {
    border-color: #009688;
  }
`;

const ErrorMsg = styled.span`
  font-size: 12px;
  color: #ef4444;
  font-weight: 500;
  margin-top: 4px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #009688;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 6px;
  box-shadow: 0 4px 10px rgba(0, 150, 136, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: #00796b;
    transform: translateY(-1px);
  }
`;

const FooterText = styled.p`
  text-align: center;
  font-size: 13px;
  color: #64748b;
  margin-top: 24px;
`;

const SwitchLink = styled.span`
  color: #009688;
  font-weight: 600;
  cursor: pointer;
  margin-left: 4px;
  &:hover {
    text-decoration: underline;
  }
`;

const Registration = ({ onSignup, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [specialty, setSpecialty] = useState('Cardiology');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !clinicName || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }

    onSignup();
  };

  return (
    <FormContainer>
      <FormHeader>
        <h2>Onboard Clinic</h2>
        <p>Set up your hospital core database</p>
      </FormHeader>

      <form onSubmit={handleSignup}>
        <FormGroup>
          <Label htmlFor="reg-admin-name">Administrator Name</Label>
          <InputWrapper>
            <InputIcon><Users size={15} /></InputIcon>
            <InputField 
              id="reg-admin-name" 
              type="text" 
              placeholder="Dr. Abhinav Kumar" 
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </InputWrapper>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="reg-email">Email Address</Label>
          <InputWrapper>
            <InputIcon><Mail size={15} /></InputIcon>
            <InputField 
              id="reg-email" 
              type="email" 
              placeholder="you@hospital.com" 
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </InputWrapper>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="reg-clinic-name">Clinic Name</Label>
          <InputWrapper>
            <InputIcon><Building size={15} /></InputIcon>
            <InputField 
              id="reg-clinic-name" 
              type="text" 
              placeholder="Swastyam Multi-specialty Clinic" 
              value={clinicName}
              onChange={e => setClinicName(e.target.value)}
            />
          </InputWrapper>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="reg-specialty">Core Specialty</Label>
          <SimpleSelect id="reg-specialty" value={specialty} onChange={e => setSpecialty(e.target.value)}>
            <option value="Cardiology">Cardiology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Neurology">Neurology</option>
            <option value="Orthopedics">Orthopedics</option>
          </SimpleSelect>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="reg-password">Password</Label>
          <InputWrapper>
            <InputIcon><Lock size={15} /></InputIcon>
            <InputField 
              id="reg-password" 
              type="password" 
              placeholder="Create security password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </InputWrapper>
          {error && <ErrorMsg>{error}</ErrorMsg>}
        </FormGroup>

        <SubmitButton type="submit">
          Initialize Swastyam Portal <Award size={15} />
        </SubmitButton>
      </form>

      <FooterText>
        Already onboarded? 
        <SwitchLink onClick={onSwitchToLogin}>Sign In Now</SwitchLink>
      </FooterText>
    </FormContainer>
  );
};

export default Registration;
