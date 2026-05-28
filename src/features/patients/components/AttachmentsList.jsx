import React from 'react';
import styled from 'styled-components';
import { Paperclip, File } from 'lucide-react';

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

const AttachmentGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const AttachmentCard = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px 16px;
  background-color: #f8fafc;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #009688;
    background-color: #e6f9f3;
  }

  span {
    font-size: 12px;
    font-weight: 600;
    color: #334155;
  }
`;

const AttachmentsList = ({ attachments }) => {
  if (!attachments || attachments.length === 0) return null;

  return (
    <DocSection>
      <SectionHeader>
        <Paperclip size={16} />
        <h3>Attachments</h3>
      </SectionHeader>
      <AttachmentGrid>
        {attachments.map((file, idx) => (
          <AttachmentCard key={idx} onClick={() => alert(`Opening file: ${file}`)}>
            <File size={14} color="#009688" />
            <span>{file}</span>
          </AttachmentCard>
        ))}
      </AttachmentGrid>
    </DocSection>
  );
};

export default AttachmentsList;
