import React from 'react';
import styled from 'styled-components';
import { Phone, Mail, MapPin, AlertTriangle } from 'lucide-react';

const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 20px;
`;

const Avatar = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background-color: #e0f2fe;
  color: #0369a1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
`;

const ProfileName = styled.div`
  h3 {
    font-size: 18px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }
  p {
    font-size: 13px;
    color: #64748b;
    margin-top: 4px;
    font-weight: 500;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionTitle = styled.h4`
  font-size: 11px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
`;

const InfoLabel = styled.span`
  color: #64748b;
  font-weight: 500;
`;

const InfoValue = styled.span`
  color: #1e293b;
  font-weight: 600;
`;

const ContactRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #475569;
  font-weight: 500;
`;

const ContactText = styled.span`
  color: #1e293b;
  font-weight: 600;
`;

const AllergyBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #fef2f2;
  border: 1px solid #fee2e2;
  color: #ef4444;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 8px;
  width: fit-content;
`;

const BadgeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ConditionBadge = styled.span`
  background-color: #fff7ed;
  border: 1px solid #ffedd5;
  color: #f97316;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 8px;
`;

const PatientInfoCard = ({ patient }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card>
      <ProfileHeader>
        <Avatar>{getInitials(patient.name)}</Avatar>
        <ProfileName>
          <h3>{patient.name}</h3>
          <p>{patient.age}Y • {patient.gender}</p>
        </ProfileName>
      </ProfileHeader>

      <Section>
        <SectionTitle>Identifiers</SectionTitle>
        <InfoRow>
          <InfoLabel>Patient ID</InfoLabel>
          <InfoValue>{patient.id}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>File No.</InfoLabel>
          <InfoValue>{patient.fileNo}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Aadhaar</InfoLabel>
          <InfoValue>{patient.aadhaar || 'XXXX-XXXX-XXXX'}</InfoValue>
        </InfoRow>
      </Section>

      <Section>
        <SectionTitle>Contact</SectionTitle>
        <ContactRow>
          <Phone size={14} color="#64748b" />
          <ContactText>{patient.phone}</ContactText>
        </ContactRow>
        <ContactRow>
          <Mail size={14} color="#64748b" />
          <ContactText>{patient.email}</ContactText>
        </ContactRow>
        <ContactRow style={{ alignItems: 'flex-start' }}>
          <MapPin size={14} color="#64748b" style={{ marginTop: 2 }} />
          <ContactText style={{ lineHeight: 1.4 }}>{patient.address}</ContactText>
        </ContactRow>
      </Section>

      <Section>
        <SectionTitle>Vitals & Profile</SectionTitle>
        <InfoRow>
          <InfoLabel>Blood Group</InfoLabel>
          <InfoValue>{patient.bloodGroup || 'NA'}</InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>DOB</InfoLabel>
          <InfoValue>{patient.dob || 'NA'}</InfoValue>
        </InfoRow>
      </Section>

      <Section>
        <SectionTitle>Allergies</SectionTitle>
        {patient.allergies && patient.allergies.length > 0 ? (
          <BadgeList>
            {patient.allergies.map((allergy) => (
              <AllergyBadge key={allergy}>
                <AlertTriangle size={12} />
                {allergy}
              </AllergyBadge>
            ))}
          </BadgeList>
        ) : (
          <span style={{ fontSize: 13, color: '#94a3b8', fontStyle: 'italic' }}>No allergies recorded</span>
        )}
      </Section>

      <Section>
        <SectionTitle>Chronic Conditions</SectionTitle>
        {patient.chronicConditions && patient.chronicConditions.length > 0 ? (
          <BadgeList>
            {patient.chronicConditions.map((condition) => (
              <ConditionBadge key={condition}>{condition}</ConditionBadge>
            ))}
          </BadgeList>
        ) : (
          <span style={{ fontSize: 13, color: '#94a3b8', fontStyle: 'italic' }}>No chronic conditions recorded</span>
        )}
      </Section>
    </Card>
  );
};

export default PatientInfoCard;
