import React, { useState } from 'react';
import styled from 'styled-components';
import { UploadCloud, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import WizardCard from '../../components/WizardCard';
import WizardButton, { ButtonWrapper } from '../../components/WizardButton';

const DocRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background-color: ${props => props.uploaded ? '#f0fdf4' : '#ffffff'};
  border: 1px solid ${props => props.uploaded ? '#bbf7d0' : '#e2e8f0'};
  border-radius: 12px;
  margin-bottom: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;

  &:hover {
    border-color: ${props => props.uploaded ? '#86efac' : '#cbd5e1'};
    background-color: ${props => props.uploaded ? '#f0fdf4' : '#f8fafc'};
  }
`;

const DocInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const DocIcon = styled.div`
  color: ${props => props.uploaded ? '#15803d' : '#64748b'};
  background-color: ${props => props.uploaded ? '#dcfce7' : '#f1f5f9'};
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DocMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const DocTitle = styled.span`
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
`;

const DocStatus = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  color: ${props => props.uploaded ? '#166534' : '#64748b'};
`;

const UploadAction = styled.div`
  color: ${props => props.uploaded ? '#15803d' : '#64748b'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Step6Documents = ({ onNext, onPrev, data, updateData }) => {
  const [uploads, setUploads] = useState(data.uploads || {
    shopPhoto: false,
    hospitalReg: false,
    gstCert: false,
    panCard: false,
    clinicalEst: false
  });

  const handleFileChange = (e, key, label) => {
    const file = e.target.files[0];
    if (file) {
      // Simulate creating a URL or uploading to a server
      const fileUrl = `https://mock-storage.com/documents/${file.name}`;
      
      setUploads(prev => ({
        ...prev,
        [key]: fileUrl
      }));
      console.log(`Document selected: ${file.name}, Simulated URL: ${fileUrl}`);
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();
    updateData({ uploads });
    onNext();
  };

  const docList = [
    { key: 'shopPhoto', label: 'Shop Photo' },
    { key: 'hospitalReg', label: 'Hospital Registration Certificate' },
    { key: 'gstCert', label: 'GST Certificate' },
    { key: 'panCard', label: 'PAN Card' },
    { key: 'clinicalEst', label: 'Clinical Establishment Registration' }
  ];

  return (
    <form onSubmit={handleContinue}>
      <WizardCard title="Upload Documents" subtitle="Upload your KYC documents for verification.">
        <div style={{ marginTop: '10px' }}>
          {docList.map(doc => {
            const isUploaded = uploads[doc.key];
            return (
              <label key={doc.key} style={{ display: 'block', margin: 0, padding: 0 }}>
                <input 
                  type="file" 
                  accept="image/*,application/pdf" 
                  style={{ display: 'none' }} 
                  onChange={(e) => handleFileChange(e, doc.key, doc.label)} 
                />
                <DocRow uploaded={isUploaded}>
                  <DocInfo>
                    <DocIcon uploaded={isUploaded}>
                      <FileText size={18} />
                    </DocIcon>
                    <DocMeta>
                      <DocTitle>{doc.label}</DocTitle>
                      <DocStatus uploaded={isUploaded}>
                        {isUploaded ? 'Document verified' : 'Tap to upload or scan'}
                      </DocStatus>
                    </DocMeta>
                  </DocInfo>
                  <UploadAction uploaded={isUploaded}>
                    {isUploaded ? <CheckCircle2 size={18} /> : <UploadCloud size={18} />}
                  </UploadAction>
                </DocRow>
              </label>
            );
          })}
        </div>
      </WizardCard>

      <ButtonWrapper>
        <WizardButton variant="secondary" onClick={onPrev}>
          Previous
        </WizardButton>
        <WizardButton type="submit">
          Continue <ArrowRight size={16} />
        </WizardButton>
      </ButtonWrapper>
    </form>
  );
};

export default Step6Documents;
