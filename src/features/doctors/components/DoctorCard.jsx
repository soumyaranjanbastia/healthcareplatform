import React from 'react';
import styled from 'styled-components';
import { Phone, Mail, Eye, Edit, MapPin, Clock } from 'lucide-react';

const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.04);
    transform: translateY(-2px);
    border-color: #cbd5e1;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #e6f9f3;
  color: #009688;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
`;

const InfoMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  h3 {
    font-size: 15px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }

  span {
    font-size: 11px;
    color: #94a3b8;
    font-weight: 600;
  }
`;

const RoleBadge = styled.span`
  background-color: #eff6ff;
  color: #3b82f6;
  font-size: 10px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 6px;
  text-transform: capitalize;
`;

const DetailsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 16px;
  margin-top: 4px;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 500;
`;

const DetailLabel = styled.span`
  color: #94a3b8;
`;

const DetailValue = styled.span`
  color: #1e293b;
  font-weight: 700;
`;

const ContactSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 12px;
  color: #475569;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 4px;
`;

const ViewBtn = styled.button`
  flex: 1;
  background-color: #009688;
  color: #ffffff;
  border: none;
  padding: 10px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s;

  &:hover {
    background-color: #00796b;
  }
`;

const EditBtn = styled.button`
  width: 36px;
  height: 36px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #475569;
  transition: all 0.2s;

  &:hover {
    background-color: #f8fafc;
    border-color: #cbd5e1;
    color: #0f172a;
  }
`;

const getInitials = (name) => {
  if (!name) return 'DR';
  const parts = name.replace(/^Dr\.\s+/i, '').split(' ');
  return parts.map(p => p[0]).join('').substring(0, 2).toUpperCase();
};

const DoctorCard = ({ doctor, onView, onMapBranch, onManageAvailability }) => {
  const doctorName = doctor.fullName || doctor.name || 'Unknown Doctor';
  const displayAvatar = doctor.avatar || getInitials(doctorName);
  const displayShift = typeof doctor.shift === 'string' && doctor.shift.trim() 
    ? doctor.shift.split(' ')[0] 
    : 'N/A';
  const displayDepartment = doctor.department || doctor.currentPosition || 'General';
  const displaySpecialization = doctor.specialization || (Array.isArray(doctor.qualification) ? doctor.qualification.join(', ') : doctor.qualification) || 'N/A';
  const displayExperience = doctor.experience ? `${doctor.experience} years` : 'N/A';

  return (
    <Card>
      <CardHeader>
        <ProfileSection>
          <Avatar>{displayAvatar}</Avatar>
          <InfoMeta>
            <h3>{doctorName}</h3>
            <span>ID: {doctor.id}</span>
          </InfoMeta>
        </ProfileSection>
        <RoleBadge>Doctor</RoleBadge>
      </CardHeader>

      <DetailsGrid>
        <DetailRow>
          <DetailLabel>Department:</DetailLabel>
          <DetailValue>{displayDepartment}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Specialization:</DetailLabel>
          <DetailValue>{displaySpecialization}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Experience:</DetailLabel>
          <DetailValue>{displayExperience}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Shift:</DetailLabel>
          <DetailValue>{displayShift}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Mapped Branch:</DetailLabel>
          <DetailValue style={{ color: doctor.branchName === 'Not Mapped' ? '#ef4444' : '#009688' }}>
            {doctor.branchName || 'Not Mapped'}
          </DetailValue>
        </DetailRow>
      </DetailsGrid>

      <ContactSection>
        <ContactItem>
          <Phone size={13} color="#94a3b8" />
          <span>{doctor.phone}</span>
        </ContactItem>
        <ContactItem>
          <Mail size={13} color="#94a3b8" />
          <span>{doctor.email}</span>
        </ContactItem>
      </ContactSection>

      <ActionRow>
        <ViewBtn onClick={() => onView(doctor)}>
          <Eye size={14} /> View
        </ViewBtn>
        {onMapBranch && (
          <EditBtn title="Map to Branch" onClick={() => onMapBranch(doctor)}>
            <MapPin size={14} />
          </EditBtn>
        )}
        {onManageAvailability && (
          <EditBtn title="Manage Availability" onClick={() => onManageAvailability(doctor)}>
            <Clock size={14} />
          </EditBtn>
        )}
      </ActionRow>
    </Card>
  );
};

export default DoctorCard;
