import React from 'react';
import styled from 'styled-components';
import { ArrowLeft } from 'lucide-react';
import DoctorHeaderCard from '../components/DoctorHeaderCard';
import PersonalInfoCard from '../components/PersonalInfoCard';
import ProfessionalDetailsCard from '../components/ProfessionalDetailsCard';
import VerificationDocsCard from '../components/VerificationDocsCard';
import MedicalLicenseCard from '../components/MedicalLicenseCard';
import EducationCard from '../components/EducationCard';
import CertificationsCard from '../components/CertificationsCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const BackRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const BackBtn = styled.button`
  background: none;
  border: none;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 700;
  color: #475569;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  transition: all 0.2s ease;

  &:hover {
    color: #009688;
    transform: translateX(-2px);
  }
`;

const TitleBlock = styled.div`
  h2 {
    font-size: 20px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }
  p {
    font-size: 12px;
    color: #64748b;
    margin-top: 4px;
    font-weight: 500;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const OutlineBtn = styled.button`
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  color: #475569;
  font-size: 13px;
  font-weight: 700;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f8fafc;
    border-color: #cbd5e1;
    color: #0f172a;
  }
`;

const SolidBtn = styled.button`
  background-color: #009688;
  color: #ffffff;
  border: none;
  font-size: 13px;
  font-weight: 700;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 150, 136, 0.15);
  transition: all 0.2s;

  &:hover {
    background-color: #00796b;
  }
`;

const LayoutGrid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 962px) {
    grid-template-columns: 1fr;
  }
`;

const DoctorDetails = ({ doctor, onBack }) => {
  return (
    <Container>
      <BackRow>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <BackBtn onClick={onBack}>
            <ArrowLeft size={16} /> Back to Staff
          </BackBtn>
          <TitleBlock>
            <h2>Doctor Details</h2>
            <p>Complete staff profile and credentials.</p>
          </TitleBlock>
        </div>

        <ButtonGroup>
          <OutlineBtn onClick={() => alert('Opening Edit Profile form...')}>
            Edit Profile
          </OutlineBtn>
          <SolidBtn onClick={() => alert('Opening Manage Availability scheduler...')}>
            Manage availability
          </SolidBtn>
        </ButtonGroup>
      </BackRow>

      {/* Top Blue Header Card */}
      <DoctorHeaderCard doctor={doctor} />

      {/* Two Column Grid: Personal & Professional */}
      <LayoutGrid2>
        <PersonalInfoCard doctor={doctor} />
        <ProfessionalDetailsCard doctor={doctor} />
      </LayoutGrid2>

      {/* Verification Docs */}
      <VerificationDocsCard doctor={doctor} />

      {/* Medical License Card */}
      <MedicalLicenseCard doctor={doctor} />

      {/* Two Column Grid: Education & Certifications */}
      <LayoutGrid2>
        <EducationCard education={doctor.education} />
        <CertificationsCard certifications={doctor.certifications} />
      </LayoutGrid2>
    </Container>
  );
};

export default DoctorDetails;
