import React, { useState } from 'react';
import styled from 'styled-components';
import { Upload, X, FileText, Eye } from 'lucide-react';

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

const AddDoctorDocuments = ({ uploadedFiles, setUploadedFiles, onContinue }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [activeField, setActiveField] = useState(null);

  const triggerUpload = (field) => {
    setActiveField(field);
    setTimeout(() => {
      const el = document.getElementById('doc-file-input');
      if (el) el.click();
    }, 50);
  };

  const handleFileChange = (field, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      // If it is an image, compress it via canvas
      if (file.type.startsWith('image/')) {
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const max_width = 800; // max size in px
            const max_height = 800;
            let width = img.width;
            let height = img.height;

            if (width > height) {
              if (width > max_width) {
                height *= max_width / width;
                width = max_width;
              }
            } else {
              if (height > max_height) {
                width *= max_height / height;
                height = max_height;
              }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            
            // compress to JPEG with 0.7 quality
            const base64 = canvas.toDataURL('image/jpeg', 0.7);
            setUploadedFiles(prev => ({
              ...prev,
              [field]: base64
            }));
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        // PDF or other files -> read as raw base64
        reader.onload = (event) => {
          setUploadedFiles(prev => ({
            ...prev,
            [field]: event.target.result
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleNext = () => {
    onContinue();
  };

  return (
    <FormSection>
      <FormTitle>Document Upload (Optional)</FormTitle>

      <input 
        type="file" 
        id="doc-file-input" 
        accept="image/*,application/pdf" 
        style={{ display: 'none' }} 
        onChange={(e) => {
          if (activeField) {
            handleFileChange(activeField, e);
          }
        }}
      />

      <UploadGrid>
        {/* CARD 1 */}
        <UploadCard>
          <Upload size={24} color="#94a3b8" />
          <span>Medical Registration Certificate</span>
          {uploadedFiles['Medical Registration Certificate'] ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px', width: '100%' }}>
              <p style={{ color: '#009688', fontWeight: 600 }}>Uploaded Successfully ✔</p>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <ActionBtn type="button" onClick={() => setPreviewUrl(uploadedFiles['Medical Registration Certificate'])}>
                  <Eye size={12} /> Preview
                </ActionBtn>
                <ActionBtn type="button" onClick={() => triggerUpload('Medical Registration Certificate')} style={{ backgroundColor: '#f1f5f9', color: '#475569' }}>
                  Change
                </ActionBtn>
              </div>
            </div>
          ) : (
            <p onClick={() => triggerUpload('Medical Registration Certificate')} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Click to upload
            </p>
          )}
        </UploadCard>

        {/* CARD 2 */}
        <UploadCard>
          <Upload size={24} color="#94a3b8" />
          <span>Degree Certificate</span>
          {uploadedFiles['Degree Certificate'] ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px', width: '100%' }}>
              <p style={{ color: '#009688', fontWeight: 600 }}>Uploaded Successfully ✔</p>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <ActionBtn type="button" onClick={() => setPreviewUrl(uploadedFiles['Degree Certificate'])}>
                  <Eye size={12} /> Preview
                </ActionBtn>
                <ActionBtn type="button" onClick={() => triggerUpload('Degree Certificate')} style={{ backgroundColor: '#f1f5f9', color: '#475569' }}>
                  Change
                </ActionBtn>
              </div>
            </div>
          ) : (
            <p onClick={() => triggerUpload('Degree Certificate')} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Click to upload
            </p>
          )}
        </UploadCard>

        {/* CARD 3 */}
        <UploadCard>
          <Upload size={24} color="#94a3b8" />
          <span>Government ID Proof</span>
          {uploadedFiles['Government ID Proof'] ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px', width: '100%' }}>
              <p style={{ color: '#009688', fontWeight: 600 }}>Uploaded Successfully ✔</p>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <ActionBtn type="button" onClick={() => setPreviewUrl(uploadedFiles['Government ID Proof'])}>
                  <Eye size={12} /> Preview
                </ActionBtn>
                <ActionBtn type="button" onClick={() => triggerUpload('Government ID Proof')} style={{ backgroundColor: '#f1f5f9', color: '#475569' }}>
                  Change
                </ActionBtn>
              </div>
            </div>
          ) : (
            <p onClick={() => triggerUpload('Government ID Proof')} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Click to upload
            </p>
          )}
        </UploadCard>

        {/* CARD 4 */}
        <UploadCard>
          <Upload size={24} color="#94a3b8" />
          <span>Digital Signature</span>
          {uploadedFiles['Digital Signature'] ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px', width: '100%' }}>
              <p style={{ color: '#009688', fontWeight: 600 }}>Uploaded Successfully ✔</p>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <ActionBtn type="button" onClick={() => setPreviewUrl(uploadedFiles['Digital Signature'])}>
                  <Eye size={12} /> Preview
                </ActionBtn>
                <ActionBtn type="button" onClick={() => triggerUpload('Digital Signature')} style={{ backgroundColor: '#f1f5f9', color: '#475569' }}>
                  Change
                </ActionBtn>
              </div>
            </div>
          ) : (
            <p onClick={() => triggerUpload('Digital Signature')} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              Click to upload
            </p>
          )}
        </UploadCard>
      </UploadGrid>

      <InfoBanner>
        Documents will be verified within 24-48 hours. File size limit: 5MB per document.
      </InfoBanner>

      <ContinueBtn onClick={handleNext}>
        Next
      </ContinueBtn>

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
    </FormSection>
  );
};

export default AddDoctorDocuments;
