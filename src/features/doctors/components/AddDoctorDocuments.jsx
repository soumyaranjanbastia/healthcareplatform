import React from 'react';
import styled from 'styled-components';
import { Upload } from 'lucide-react';

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
`;

const FormTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
`;

const UploadGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const UploadCard = styled.div`
  border: 1.5px dashed #cbd5e1;
  border-radius: 14px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background-color: #f8fafc;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #009688;
    background-color: #e6f9f3;
  }

  span {
    font-size: 12px;
    font-weight: 700;
    color: #475569;
    text-align: center;
  }

  p {
    font-size: 10px;
    color: #94a3b8;
    margin: 0;
    font-weight: 500;
    text-align: center;
  }
`;

const InfoBanner = styled.div`
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #1e40af;
  border-radius: 10px;
  padding: 14px 18px;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
`;

const ContinueBtn = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #009688;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  margin-top: 10px;

  &:hover {
    background-color: #00796b;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 150, 136, 0.15);
  }
`;

const AddDoctorDocuments = ({ uploadedFiles, setUploadedFiles, onContinue }) => {
  const handleSimulateUpload = (field) => {
    setUploadedFiles(prev => ({
      ...prev,
      [field]: 'Uploaded_File.pdf'
    }));
  };

  const handleNext = () => {
    const required = [
      'Medical Registration Certificate', 
      'Degree Certificate', 
      'Government ID Proof', 
      'Digital Signature'
    ];
    const missing = required.filter(field => !uploadedFiles[field]);

    if (missing.length > 0) {
      alert(`Please upload the following required documents:\n- ${missing.join('\n- ')}`);
      return;
    }
    onContinue();
  };

  return (
    <FormSection>
      <FormTitle>Document Upload</FormTitle>

      <UploadGrid>
        <UploadCard onClick={() => handleSimulateUpload('Medical Registration Certificate')}>
          <Upload size={24} color="#94a3b8" />
          <span>Medical Registration Certificate*</span>
          <p>{uploadedFiles['Medical Registration Certificate'] || 'Click to upload'}</p>
        </UploadCard>

        <UploadCard onClick={() => handleSimulateUpload('Degree Certificate')}>
          <Upload size={24} color="#94a3b8" />
          <span>Degree Certificate*</span>
          <p>{uploadedFiles['Degree Certificate'] || 'Click to upload'}</p>
        </UploadCard>

        <UploadCard onClick={() => handleSimulateUpload('Government ID Proof')}>
          <Upload size={24} color="#94a3b8" />
          <span>Government ID Proof*</span>
          <p>{uploadedFiles['Government ID Proof'] || 'Click to upload'}</p>
        </UploadCard>

        <UploadCard onClick={() => handleSimulateUpload('Digital Signature')}>
          <Upload size={24} color="#94a3b8" />
          <span>Digital Signature*</span>
          <p>{uploadedFiles['Digital Signature'] || 'Click to upload'}</p>
        </UploadCard>
      </UploadGrid>

      <InfoBanner>
        Documents will be verified within 24-48 hours. File size limit: 5MB per document.
      </InfoBanner>

      <ContinueBtn onClick={handleNext}>
        Next
      </ContinueBtn>
    </FormSection>
  );
};

export default AddDoctorDocuments;
