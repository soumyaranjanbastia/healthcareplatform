import React from 'react';
import styled from 'styled-components';
import { GraduationCap } from 'lucide-react';

const Card = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.01);
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 12px;
  color: #009688;

  h3 {
    font-size: 15px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const EduItem = styled.div`
  border: 1px solid #e2e8f0;
  background-color: #f8fafc;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: left;

  h4 {
    font-size: 13px;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
  }

  p {
    font-size: 12px;
    color: #64748b;
    font-weight: 600;
    margin: 0;
  }

  span {
    font-size: 11px;
    color: #94a3b8;
    font-weight: 500;
  }
`;

const EducationCard = ({ education }) => {
  return (
    <Card>
      <SectionHeader>
        <GraduationCap size={16} />
        <h3>Education</h3>
      </SectionHeader>

      <List>
        {education && education.length > 0 ? (
          education.map((edu, idx) => (
            <EduItem key={idx}>
              <h4>{edu.degree}</h4>
              <p>{edu.institute}</p>
              <span>Year: {edu.year}</span>
            </EduItem>
          ))
        ) : (
          <span style={{ fontSize: 13, color: '#64748b', fontStyle: 'italic' }}>No education details recorded</span>
        )}
      </List>
    </Card>
  );
};

export default EducationCard;
