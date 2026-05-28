import React from 'react';
import styled from 'styled-components';
import { ArrowLeft, FileText, Download, Printer } from 'lucide-react';
import { MOCK_PATIENTS } from '../../../data/mockPatients';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: 'Inter', sans-serif;
  max-width: 1000px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
  
  svg {
    cursor: pointer;
    color: #64748b;
    padding: 8px;
    border-radius: 8px;
    transition: background 0.2s;
    &:hover { background: #f1f5f9; color: #1e293b; }
  }
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  
  h2 { margin: 0; font-size: 20px; font-weight: 600; color: #0f172a; }
  p { margin: 0; font-size: 12px; color: #64748b; text-transform: uppercase; }
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CardTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  
  svg { color: #64748b; }
`;

const GridInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  
  .label { font-size: 12px; color: #64748b; }
  .value { font-size: 14px; color: #0f172a; font-weight: 500; line-height: 1.4; }
  .highlight { color: #009688; font-weight: 600; }
`;

const TagsRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  
  ${props => {
    switch (props.type) {
      case 'allergy': return 'background: #fef2f2; color: #ef4444;';
      case 'condition': return 'background: #fef9c3; color: #ca8a04;';
      default: return 'background: #f1f5f9; color: #475569;';
    }
  }}
`;

const StatusPill = styled.span`
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: #d1fae5; 
  color: #059669;
`;

const ViewButton = styled.button`
  background: #009688;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
  margin-top: 10px;
  
  &:hover { background: #00796b; }
`;

const VisitItem = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const VisitHeader = styled.div`
  display: flex;
  justify-content: space-between;
  
  .date { font-weight: 600; color: #1e293b; font-size: 14px; }
  .doc { font-size: 12px; color: #64748b; }
  .link { color: #009688; font-size: 12px; font-weight: 600; cursor: pointer; }
`;

const VisitDetail = styled.div`
  font-size: 13px;
  color: #334155;
  
  span { color: #64748b; width: 80px; display: inline-block; }
`;

const UploadBox = styled.div`
  border: 1px dashed #cbd5e1;
  border-radius: 12px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  background: #f8fafc;
  
  &:hover { background: #f1f5f9; border-color: #94a3b8; }
  
  svg { color: #94a3b8; }
  span { font-size: 14px; font-weight: 500; color: #475569; }
`;

const FooterActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.02);
`;

const BtnOutline = styled.button`
  background: white;
  border: 1px solid #cbd5e1;
  color: #475569;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  
  &:hover { background: #f8fafc; }
`;

const BtnSolid = styled.button`
  background: #009688;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  
  &:hover { background: #00796b; }
`;

const PatientDetails = ({ patientId, onBack }) => {
  const patient = MOCK_PATIENTS.find(p => p.id === patientId) || MOCK_PATIENTS[0];

  return (
    <Container>
      <Header>
        <ArrowLeft size={24} onClick={onBack} />
        <TitleBox>
          <h2>Patient Details</h2>
          <p>{patient.id} | {patient.fileNo}</p>
        </TitleBox>
      </Header>

      <Card>
        <CardTitle><FileText size={18} /> Basic Information</CardTitle>
        <GridInfo>
          <InfoBox><span className="label">Full Name</span><span className="value">{patient.name}</span></InfoBox>
          <InfoBox><span className="label">Phone</span><span className="value">{patient.phone}</span></InfoBox>
          <InfoBox><span className="label">Email</span><span className="value">{patient.email}</span></InfoBox>
          <InfoBox></InfoBox>
          <InfoBox><span className="label">Gender</span><span className="value">{patient.gender}</span></InfoBox>
          <InfoBox><span className="label">DOB / Age</span><span className="value">{patient.dob}</span></InfoBox>
          <InfoBox><span className="label">Blood Group</span><span className="value">{patient.bloodGroup}</span></InfoBox>
          <InfoBox></InfoBox>
          <InfoBox style={{ gridColumn: 'span 2' }}><span className="label">Address</span><span className="value">{patient.address}</span></InfoBox>
          <InfoBox style={{ gridColumn: 'span 2' }}><span className="label">Aadhaar Number</span><span className="value">{patient.aadhaar}</span></InfoBox>
        </GridInfo>
      </Card>

      <Card>
        <CardTitle>Medical Information</CardTitle>
        <InfoBox>
          <span className="label">Current Symptoms</span>
          <span className="value">{patient.symptoms}</span>
        </InfoBox>
        <InfoBox>
          <span className="label">Allergies</span>
          <TagsRow>
            {patient.allergies?.length > 0 ? patient.allergies.map(a => <Tag key={a} type="allergy">{a}</Tag>) : <span className="value">None</span>}
          </TagsRow>
        </InfoBox>
        <InfoBox>
          <span className="label">Existing Conditions</span>
          <TagsRow>
            {patient.conditions?.length > 0 ? patient.conditions.map(c => <Tag key={c} type="condition">{c}</Tag>) : <span className="value">None</span>}
          </TagsRow>
        </InfoBox>
        <InfoBox>
          <span className="label">Medical History</span>
          <span className="value">{patient.medicalHistory}</span>
        </InfoBox>
        <InfoBox>
          <span className="label">Current Medication</span>
          <span className="value">{patient.medication}</span>
        </InfoBox>
      </Card>

      <Card>
        <CardTitle>Appointment Information</CardTitle>
        <GridInfo>
          <InfoBox><span className="label">Assigned Doctor</span><span className="value">{patient.doctor}</span></InfoBox>
          <InfoBox><span className="label">OPD Room</span><span className="value highlight">{patient.room}</span></InfoBox>
          <InfoBox><span className="label">Appointment Time</span><span className="value">-</span></InfoBox>
          <InfoBox></InfoBox>
          <InfoBox><span className="label">Consultation Type</span><span className="value">{patient.consultationType}</span></InfoBox>
          <InfoBox><span className="label">Queue Number</span><span className="value">-</span></InfoBox>
          <InfoBox><span className="label">Token Number</span><span className="value highlight">{patient.tokenNumber}</span></InfoBox>
        </GridInfo>
      </Card>

      <Card style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
          <CardTitle>Payment Information</CardTitle>
          <div style={{ display: 'flex', gap: '60px' }}>
            <InfoBox><span className="label">Consultation Fee</span><span className="value">{patient.consultationFee}</span></InfoBox>
            <InfoBox><span className="label">Payment Method</span><span className="value">{patient.paymentMethod}</span></InfoBox>
            <InfoBox><span className="label">Payment Status</span><StatusPill>{patient.paymentStatus}</StatusPill></InfoBox>
            <InfoBox><span className="label">Invoice ID</span><span className="value">{patient.invoiceId}</span></InfoBox>
          </div>
        </div>
        <ViewButton>View</ViewButton>
      </Card>

      <Card>
        <CardTitle>Previous Visit Summary</CardTitle>
        {patient.previousVisits?.length > 0 ? patient.previousVisits.map((v, i) => (
          <VisitItem key={i}>
            <VisitHeader>
              <div><div className="date">{v.date}</div><div className="doc">{v.doctor}</div></div>
              <div className="link">View Full Details</div>
            </VisitHeader>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <VisitDetail><span>Symptoms:</span> {v.symptoms}</VisitDetail>
              <VisitDetail><span>Diagnosis:</span> {v.diagnosis}</VisitDetail>
              <VisitDetail><span>Medicines:</span> {v.medicines}</VisitDetail>
            </div>
          </VisitItem>
        )) : (
          <p style={{ fontSize: '14px', color: '#64748b' }}>No previous visits recorded.</p>
        )}
      </Card>

      <Card>
        <CardTitle>Upload</CardTitle>
        <p style={{ fontSize: '13px', color: '#64748b', margin: '-8px 0 8px 0' }}>Upload any prescriptions, lab reports, or medical documents</p>
        <UploadBox>
          <FileText size={32} />
          <span>PDF</span>
        </UploadBox>
      </Card>

      <FooterActions>
        <BtnOutline onClick={onBack}>Close</BtnOutline>
        <div style={{ display: 'flex', gap: '12px' }}>
          <BtnOutline>Print Summary</BtnOutline>
          <BtnSolid>Print Prescription</BtnSolid>
        </div>
      </FooterActions>
    </Container>
  );
};

export default PatientDetails;
