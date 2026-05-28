import React from 'react';
import styled from 'styled-components';
import { ArrowLeft, Download, Printer, Activity, Shield } from 'lucide-react';
import VisitDetailsCard from '../components/VisitDetailsCard';
import PrescriptionTable from '../components/PrescriptionTable';
import LabOrdersTable from '../components/LabOrdersTable';
import AttachmentsList from '../components/AttachmentsList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const BackBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #1e293b;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8fafc;
    color: #009688;
    transform: translateX(-2px);
  }
`;

const HeaderText = styled.div`
  h2 {
    font-size: 20px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }
  p {
    font-size: 13px;
    color: #64748b;
    font-weight: 500;
    margin-top: 2px;
  }
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const OutlineBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8fafc;
    border-color: #cbd5e1;
    color: #0f172a;
  }
`;

const SolidBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #009688;
  color: #ffffff;
  border: none;
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 150, 136, 0.15);
  transition: all 0.2s ease;

  &:hover {
    background-color: #00796b;
    transform: translateY(-1px);
  }
`;

const DocumentCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const DocSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  padding: 20px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #009688;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 12px;

  h3 {
    font-size: 14px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;

  h4 {
    font-weight: 600;
    color: #64748b;
    margin: 0;
  }

  p {
    font-weight: 500;
    color: #1e293b;
    line-height: 1.5;
    margin: 0;
  }
`;

const FooterText = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  
  &::before {
    content: 'Follow-up recommended: ';
    color: #94a3b8;
    font-weight: 500;
  }
`;

const PatientConsultationDetails = ({ patient, visit, onBack }) => {
  const handleDownload = () => {
    alert(`Downloading PDF for consultation visit dated ${visit.date}...`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <BackBtn onClick={onBack}>
            <ArrowLeft size={18} />
          </BackBtn>
          <HeaderText>
            <h2>Consultation Details</h2>
            <p>{patient.name} • {patient.id} • Visit dated {visit.date}</p>
          </HeaderText>
        </HeaderLeft>
        <ActionGroup>
          <OutlineBtn onClick={handleDownload}>
            <Download size={14} />
            Download PDF
          </OutlineBtn>
          <SolidBtn onClick={handlePrint}>
            <Printer size={14} />
            Print
          </SolidBtn>
        </ActionGroup>
      </Header>

      <DocumentCard>
        {/* Visit Details Section */}
        <VisitDetailsCard visit={visit} />

        {/* Symptoms Section */}
        <DocSection>
          <SectionHeader>
            <Activity size={16} />
            <h3>Symptoms</h3>
          </SectionHeader>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <TextBlock>
              <h4>Chief Complaint</h4>
              <p>{visit.chiefComplaint || 'None'}</p>
            </TextBlock>
            <TextBlock>
              <h4>Symptoms</h4>
              <p>{visit.symptoms}</p>
            </TextBlock>
            <TextBlock>
              <h4>Examination Findings</h4>
              <p>{visit.examinationFindings || 'Not recorded'}</p>
            </TextBlock>
          </div>
        </DocSection>

        {/* Diagnosis Section */}
        <DocSection>
          <SectionHeader>
            <Shield size={16} />
            <h3>Diagnosis</h3>
          </SectionHeader>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <TextBlock>
              <h4>Assessment</h4>
              <p>{visit.assessment || 'No specific assessment recorded'}</p>
            </TextBlock>
            <TextBlock>
              <h4>Diagnosis</h4>
              <p>{visit.diagnosis}</p>
            </TextBlock>
            <TextBlock>
              <h4>Treatment Plan</h4>
              <p>{visit.treatmentPlan || 'None'}</p>
            </TextBlock>
          </div>
        </DocSection>

        {/* Prescription Section */}
        <PrescriptionTable prescription={visit.prescription} />

        {/* Lab Orders Section */}
        <LabOrdersTable labOrders={visit.labOrders} />

        {/* Attachments Section */}
        <AttachmentsList attachments={visit.attachments} />

        {/* Footer info */}
        <FooterText>{visit.followUp || 'None'}</FooterText>
      </DocumentCard>
    </Container>
  );
};

export default PatientConsultationDetails;
