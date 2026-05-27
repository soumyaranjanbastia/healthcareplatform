import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled, { keyframes, css } from 'styled-components';
import { X, User, Mail, Phone, Briefcase, Clock, ShieldAlert } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const DrawerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(7, 10, 19, 0.7);
  backdrop-filter: blur(8px);
  z-index: 500;
  display: flex;
  justify-content: flex-end;
  animation: ${fadeIn} 0.3s ease-out;
`;

const DrawerContent = styled.div`
  width: 100%;
  max-width: 460px;
  background: #0d1321;
  border-left: 1px solid rgba(255, 255, 255, 0.05);
  height: 100%;
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.5);
  animation: ${slideIn} 0.35s cubic-bezier(0.16, 1, 0.3, 1);
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  h3 {
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
    font-family: 'Outfit', sans-serif;
  }
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.08);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const AddStaffDrawer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('Doctor');
  const [specialty, setSpecialty] = useState('General Medicine');
  const [shift, setShift] = useState('General Shift (9 AM - 5 PM)');
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Full name is required';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Valid work email is required';
    if (!phone.trim() || phone.length < 10) newErrors.phone = 'Valid 10-digit phone number is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newStaff = {
      id: `STF-${Math.floor(100 + Math.random() * 900)}`,
      name,
      email,
      phone: `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`,
      role,
      specialty: role === 'Doctor' ? specialty : (role === 'Receptionist' ? 'Front Desk' : 'Billing & Audits'),
      status: 'Active',
      shift,
      dateAdded: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };

    dispatch({
      type: 'ADD_STAFF',
      payload: newStaff
    });

    onClose();
  };

  return (
    <DrawerOverlay onClick={onClose}>
      <DrawerContent onClick={(e) => e.stopPropagation()}>
        <DrawerHeader>
          <h3>Add New Staff Member</h3>
          <CloseButton onClick={onClose}>
            <X size={18} />
          </CloseButton>
        </DrawerHeader>

        <Form onSubmit={handleSubmit}>
          <Input
            label="Staff Full Name"
            placeholder="e.g. Dr. Rohan Roy"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={User}
            error={errors.name}
          />

          <Input
            label="Work Email Address"
            placeholder="e.g. rohan.roy@swastyam.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            error={errors.email}
          />

          <Input
            label="Contact Mobile"
            placeholder="10-digit number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
            icon={Phone}
            error={errors.phone}
            maxLength={10}
          />

          <Input
            label="Administrative Role"
            options={[
              { value: 'Doctor', label: 'Doctor' },
              { value: 'Receptionist', label: 'Receptionist' },
              { value: 'Finance Manager', label: 'Finance Manager' }
            ]}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            icon={Briefcase}
          />

          {role === 'Doctor' && (
            <Input
              label="Doctor Speciality"
              options={[
                { value: 'General Medicine', label: 'General Medicine' },
                { value: 'Cardiology', label: 'Cardiology' },
                { value: 'Pediatrics', label: 'Pediatrics' },
                { value: 'Orthopedics', label: 'Orthopedics' },
                { value: 'Neurology', label: 'Neurology' }
              ]}
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              icon={Briefcase}
            />
          )}

          <Input
            label="Assigned Duty Shift"
            options={[
              { value: 'General Shift (9 AM - 5 PM)', label: 'General Shift (9 AM - 5 PM)' },
              { value: 'Morning Shift (7 AM - 3 PM)', label: 'Morning Shift (7 AM - 3 PM)' },
              { value: 'Evening Shift (3 PM - 11 PM)', label: 'Evening Shift (3 PM - 11 PM)' },
              { value: 'Night Shift (11 PM - 7 AM)', label: 'Night Shift (11 PM - 7 AM)' }
            ]}
            value={shift}
            onChange={(e) => setShift(e.target.value)}
            icon={Clock}
          />

          <div style={{ marginTop: 'auto', display: 'flex', gap: '14px', paddingTop: '24px' }}>
            <Button secondary={true} fullWidth={true} onClick={onClose} type="button">
              Cancel
            </Button>
            <Button primary={true} fullWidth={true} type="submit">
              Register Staff
            </Button>
          </div>
        </Form>
      </DrawerContent>
    </DrawerOverlay>
  );
};

export default AddStaffDrawer;
