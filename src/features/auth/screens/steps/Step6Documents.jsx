import React, { useState } from 'react';
import styled from 'styled-components';
import { UploadCloud, FileText, CheckCircle2, ArrowRight, X, Eye } from 'lucide-react';
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(15, 23, 42, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background: white;
  padding: 32px;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  text-align: center;
  position: relative;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: #64748b;
  
  &:hover {
    color: #ef4444;
  }
`;

const ActionBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  background-color: #e6f9f3;
  color: #009688;
  transition: all 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    opacity: 0.9;
  }
`;


// Compress image and convert to Base64 helper
const compressImageAndConvertToBase64 = (file, callback) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (event) => {
    // If it's not an image (e.g. PDF), callback with raw base64 directly
    if (!file.type.startsWith('image/')) {
      callback(event.target.result);
      return;
    }

    const imgElement = document.createElement("img");
    imgElement.src = event.target.result;
    imgElement.onload = () => {
      const canvas = document.createElement("canvas");
      const MAX_WIDTH = 1000;
      const MAX_HEIGHT = 1000;
      let width = imgElement.width;
      let height = imgElement.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width = Math.round((width * MAX_HEIGHT) / height);
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(imgElement, 0, 0, width, height);

      // Compress to high quality JPEG
      const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
      callback(compressedBase64);
    };
    imgElement.onerror = () => {
      callback(event.target.result);
    };
  };
  reader.onerror = (error) => {
    console.error("FileReader error:", error);
  };
};

const Step6Documents = ({ onNext, onPrev, data, updateData }) => {
  const [uploads, setUploads] = useState(data.uploads || {
    hospitalPhoto: false,
    hospitalReg: false,
    gstCert: false,
    panCard: false,
    clinicalEst: false
  });
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e, key, label) => {
    const file = e.target.files[0];
    if (file) {
      compressImageAndConvertToBase64(file, (base64Data) => {
        setUploads(prev => ({
          ...prev,
          [key]: base64Data
        }));
        console.log(`Document select successful. File "${file.name}" compressed and converted to Base64.`);
      });
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();
    updateData({ uploads });
    onNext();
  };

  const docList = [
    { key: 'hospitalPhoto', label: 'Hospital Photo' },
    { key: 'hospitalReg', label: 'Hospital Registration Certificate' },
    { key: 'gstCert', label: 'GST Certificate' },
    { key: 'panCard', label: 'PAN Card' },
    { key: 'clinicalEst', label: 'Clinical Establishment Registration' }
  ];

  return (
    <form onSubmit={handleContinue} noValidate>
      <WizardCard title="Upload Documents" subtitle="Upload your KYC documents for verification.">
        <div style={{ marginTop: '10px' }}>
          {docList.map(doc => {
            const isUploaded = uploads[doc.key];
            return (
              <div key={doc.key} style={{ display: 'block', margin: 0, padding: 0 }}>
                <input 
                  id={`file-input-${doc.key}`}
                  type="file" 
                  accept="image/*,application/pdf" 
                  style={{ display: 'none' }} 
                  onChange={(e) => handleFileChange(e, doc.key, doc.label)} 
                />
                <DocRow 
                  uploaded={isUploaded}
                  onClick={(e) => {
                    if (isUploaded) {
                      e.preventDefault();
                      setPreviewUrl(uploads[doc.key]);
                    } else {
                      document.getElementById(`file-input-${doc.key}`).click();
                    }
                  }}
                >
                  <DocInfo>
                    <DocIcon uploaded={isUploaded}>
                      <FileText size={18} />
                    </DocIcon>
                    <DocMeta>
                      <DocTitle>{doc.label}</DocTitle>
                      <DocStatus uploaded={isUploaded}>
                        {isUploaded ? 'Document added successfully - Tap to preview' : 'Tap to upload or scan'}
                      </DocStatus>
                    </DocMeta>
                  </DocInfo>
                  <UploadAction uploaded={isUploaded} onClick={e => e.stopPropagation()}>
                    {isUploaded ? (
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <ActionBtn 
                          type="button" 
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewUrl(uploads[doc.key]);
                          }}
                        >
                          <Eye size={12} /> Preview
                        </ActionBtn>
                        <ActionBtn 
                          type="button" 
                          onClick={(e) => {
                            e.stopPropagation();
                            document.getElementById(`file-input-${doc.key}`).click();
                          }}
                          style={{ backgroundColor: '#f1f5f9', color: '#475569' }}
                        >
                          Change
                        </ActionBtn>
                      </div>
                    ) : (
                      <UploadCloud size={18} onClick={() => document.getElementById(`file-input-${doc.key}`).click()} style={{ cursor: 'pointer' }} />
                    )}
                  </UploadAction>
                </DocRow>
              </div>
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

      {/* PREVIEW MODAL */}
      {previewUrl && (
        <ModalOverlay onClick={() => setPreviewUrl(null)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <CloseBtn onClick={() => setPreviewUrl(null)}><X size={20} /></CloseBtn>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#1e293b', fontWeight: 700 }}>Document Preview</h4>
            {previewUrl.startsWith('data:image/') ? (
              <img src={previewUrl} alt="Document Preview" style={{ maxWidth: '100%', maxHeight: '60vh', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '24px 0' }}>
                <FileText size={56} color="#009688" />
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>PDF Document Uploaded Successfully</span>
                <a href={previewUrl} download="Uploaded_Document.pdf" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: '#009688', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '12px', transition: 'all 0.2s' }}>
                  Download PDF File
                </a>
              </div>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </form>
  );
};

export default Step6Documents;
