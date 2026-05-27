import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Bell, Phone } from 'lucide-react';

// --- ANIMATIONS ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

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

const CircularBtn = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: #eff6ff;
  color: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QueueItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background-color: #ffffff;
  gap: 20px;
  animation: ${fadeIn} 0.3s ease-out;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const QueueMetadata = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const QueueUserHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  h4 {
    font-size: 14px;
    font-weight: 700;
    color: #0f172a;
  }
`;

const DaysBadge = styled.span`
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  
  background-color: ${props => {
    if (props.type === 'tomorrow') return '#ffedd5';
    if (props.type === 'left') return '#e0f2fe';
    return '#fee2e2'; // today
  }};

  color: ${props => {
    if (props.type === 'tomorrow') return '#9a3412';
    if (props.type === 'left') return '#0284c7';
    return '#991b1b';
  }};
`;

const QueueDetailsRow = styled.div`
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
  flex-wrap: wrap;

  strong {
    color: #1e293b;
  }
`;

const QueueClinicsDetails = styled.p`
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
`;

const QueueSuggestedDate = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  color: #f97316;
  margin-top: 2px;
`;

const QueueActions = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

const CallBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background-color: #009688;
  color: #ffffff;
  border: none;
  font-size: 12px;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #00796b;
  }
`;

const BookBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background-color: #ffffff;
  color: #64748b;
  border: 1px solid #e2e8f0;
  font-size: 12px;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8fafc;
    color: #1e293b;
    border-color: #cbd5e1;
  }
`;

const FollowUpQueue = () => {
  return (
    <ContentCard>
      <SectionHeader>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <CircularBtn>
            <Bell size={16} />
          </CircularBtn>
          <div>
            <h3>Follow-Up Queue</h3>
            <p style={{ fontSize: 12, color: '#64748b', fontWeight: 500, marginTop: 2 }}>
              3 patients need follow-up coordination
            </p>
          </div>
        </div>
      </SectionHeader>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Item 1 */}
        <QueueItem>
          <QueueMetadata>
            <QueueUserHeader>
              <h4>John Doe</h4>
              <DaysBadge type="tomorrow">Due Tomorrow</DaysBadge>
            </QueueUserHeader>
            <QueueDetailsRow>
              <span><strong>PT-2028-00452</strong></span>
              <span>•</span>
              <span>+91 88765 43210</span>
              <span>•</span>
              <span>Last visit: 20 Apr 2026 • Dr. Sharma</span>
            </QueueDetailsRow>
            <QueueClinicsDetails>
              Review blood pressure medication
            </QueueClinicsDetails>
            <QueueSuggestedDate>
              Suggested: 27 May 2026
            </QueueSuggestedDate>
          </QueueMetadata>
          <QueueActions>
            <CallBtn onClick={() => alert('Calling John Doe (+91 88765 43210)...')}>
              <Phone size={14} /> Call Patient
            </CallBtn>
            <BookBtn onClick={() => alert('Booking follow-up slot for John Doe...')}>
              Book Now
            </BookBtn>
          </QueueActions>
        </QueueItem>

        {/* Item 2 */}
        <QueueItem>
          <QueueMetadata>
            <QueueUserHeader>
              <h4>Sarah Johnson</h4>
              <DaysBadge type="left">2 days left</DaysBadge>
            </QueueUserHeader>
            <QueueDetailsRow>
              <span><strong>PT-2028-00453</strong></span>
              <span>•</span>
              <span>+91 88765 43211</span>
              <span>•</span>
              <span>Last visit: 15 Apr 2026 • Dr. Patel</span>
            </QueueDetailsRow>
            <QueueClinicsDetails>
              4-week follow-up check
            </QueueClinicsDetails>
            <QueueSuggestedDate>
              Suggested: 28 May 2026
            </QueueSuggestedDate>
          </QueueMetadata>
          <QueueActions>
            <CallBtn onClick={() => alert('Calling Sarah Johnson (+91 88765 43211)...')}>
              <Phone size={14} /> Call Patient
            </CallBtn>
            <BookBtn onClick={() => alert('Booking follow-up slot for Sarah Johnson...')}>
              Book Now
            </BookBtn>
          </QueueActions>
        </QueueItem>

        {/* Item 3 */}
        <QueueItem>
          <QueueMetadata>
            <QueueUserHeader>
              <h4>Michael Chen</h4>
              <DaysBadge type="today">Due Today</DaysBadge>
            </QueueUserHeader>
            <QueueDetailsRow>
              <span><strong>PT-2028-00454</strong></span>
              <span>•</span>
              <span>+91 88765 43212</span>
              <span>•</span>
              <span>Last visit: 10 Apr 2026 • Dr. Kumar</span>
            </QueueDetailsRow>
            <QueueClinicsDetails>
              Post-surgery review
            </QueueClinicsDetails>
            <QueueSuggestedDate>
              Suggested: 28 May 2026
            </QueueSuggestedDate>
          </QueueMetadata>
          <QueueActions>
            <CallBtn onClick={() => alert('Calling Michael Chen (+91 88765 43212)...')}>
              <Phone size={14} /> Call Patient
            </CallBtn>
            <BookBtn onClick={() => alert('Booking follow-up slot for Michael Chen...')}>
              Book Now
            </BookBtn>
          </QueueActions>
        </QueueItem>
      </div>
    </ContentCard>
  );
};

export default FollowUpQueue;
