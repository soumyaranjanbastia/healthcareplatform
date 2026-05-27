import React from 'react';
import styled from 'styled-components';

// --- STYLED COMPONENTS ---
const ContentCard = styled.section`
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionHeader = styled.div`
  h3 {
    font-size: 16px;
    font-weight: 700;
    color: #0f172a;
  }
`;

const DoctorCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const DoctorCard = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 16px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  transition: all 0.2s ease;

  &:hover {
    border-color: #cbd5e1;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.03);
  }
`;

const DocHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const DocInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DocAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #e0f2fe;
  color: #0284c7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
`;

const DocDetails = styled.div`
  h4 {
    font-size: 14px;
    font-weight: 700;
    color: #0f172a;
  }
  p {
    font-size: 11px;
    color: #64748b;
    font-weight: 500;
    margin-top: 2px;
  }
`;

const StatusBadge = styled.span`
  font-size: 10px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 50px;
  text-transform: uppercase;
  
  background-color: ${props => {
    if (props.type === 'available') return '#d1fae5';
    if (props.type === 'consulting') return '#ffedd5';
    return '#fee2e2'; // unavailable
  }};
  
  color: ${props => {
    if (props.type === 'available') return '#065f46';
    if (props.type === 'consulting') return '#9a3412';
    return '#991b1b';
  }};
`;

const DocMetadata = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 11px;
  color: #64748b;
  font-weight: 600;

  div {
    display: flex;
    justify-content: space-between;
  }

  span:last-child {
    color: #1e293b;
    font-weight: 700;
  }

  .opd-room {
    color: #2563eb;
    font-weight: 700;
  }
`;

const ViewQueueBtn = styled.button`
  border: none;
  background: none;
  font-size: 11px;
  font-weight: 700;
  color: #64748b;
  cursor: pointer;
  align-self: flex-end;
  margin-top: 4px;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &:hover {
    color: #009688;
    text-decoration: underline;
  }
`;

const DoctorAvailability = () => {
  return (
    <ContentCard>
      <SectionHeader>
        <h3>Doctor Availability & OPD Room Status</h3>
      </SectionHeader>

      <DoctorCardsGrid>
        {/* Dr. Sam Sharma */}
        <DoctorCard>
          <DocHeader>
            <DocInfo>
              <DocAvatar>DS</DocAvatar>
              <DocDetails>
                <h4>Dr. Sam Sharma</h4>
                <p>Cardiology</p>
              </DocDetails>
            </DocInfo>
            <StatusBadge type="available">Available</StatusBadge>
          </DocHeader>
          <DocMetadata>
            <div>
              <span>OPD ROOM :</span>
              <span className="opd-room">OPD-03</span>
            </div>
            <div>
              <span>AVAILABLE TIME:</span>
              <span>10:00 AM to 1:00 PM</span>
            </div>
            <div>
              <span>QUEUE COUNT:</span>
              <span>5 patients</span>
            </div>
          </DocMetadata>
          <ViewQueueBtn onClick={() => alert('Loading Dr. Sharma queue details...')}>
            View queue ➜
          </ViewQueueBtn>
        </DoctorCard>

        {/* Dr. Sam Rao */}
        <DoctorCard>
          <DocHeader>
            <DocInfo>
              <DocAvatar>DR</DocAvatar>
              <DocDetails>
                <h4>Dr. Sam Rao</h4>
                <p>Pediatrics</p>
              </DocDetails>
            </DocInfo>
            <StatusBadge type="consulting">In consultation</StatusBadge>
          </DocHeader>
          <DocMetadata>
            <div>
              <span>OPD ROOM :</span>
              <span className="opd-room">OPD-05</span>
            </div>
            <div>
              <span>AVAILABLE TIME:</span>
              <span>11:00 AM to 1:00 PM</span>
            </div>
            <div>
              <span>QUEUE COUNT:</span>
              <span>6 patients</span>
            </div>
          </DocMetadata>
          <ViewQueueBtn onClick={() => alert('Loading Dr. Rao queue details...')}>
            View queue ➜
          </ViewQueueBtn>
        </DoctorCard>

        {/* Dr. Sam Ram */}
        <DoctorCard>
          <DocHeader>
            <DocInfo>
              <DocAvatar>DM</DocAvatar>
              <DocDetails>
                <h4>Dr. Sam Ram</h4>
                <p>General medicine</p>
              </DocDetails>
            </DocInfo>
            <StatusBadge type="unavailable">Not available</StatusBadge>
          </DocHeader>
          <DocMetadata>
            <div>
              <span>OPD ROOM :</span>
              <span className="opd-room">OPD-07</span>
            </div>
            <div>
              <span>AVAILABLE TIME:</span>
              <span>2:00 PM to 4:00 PM</span>
            </div>
            <div>
              <span>QUEUE COUNT:</span>
              <span>12 patients</span>
            </div>
          </DocMetadata>
          <ViewQueueBtn onClick={() => alert('Loading Dr. Ram queue details...')}>
            View queue ➜
          </ViewQueueBtn>
        </DoctorCard>
      </DoctorCardsGrid>
    </ContentCard>
  );
};

export default DoctorAvailability;
