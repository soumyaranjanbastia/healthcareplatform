import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Search, ChevronDown, MoreVertical } from 'lucide-react';

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

const TableFiltersRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const TableSearch = styled.div`
  display: flex;
  align-items: center;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 8px 12px;
  width: 240px;
  gap: 8px;

  input {
    border: none;
    outline: none;
    background: transparent;
    font-size: 12px;
    width: 100%;
    color: #1e293b;
  }

  input::placeholder {
    color: #94a3b8;
  }
`;

const DateRangeBadge = styled.div`
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 12px;
  color: #64748b;
  font-weight: 600;
`;

const DropdownSelect = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  color: #1e293b;
`;

const TableContainerWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
`;

const CustomTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const Th = styled.th`
  background-color: #f8fafc;
  padding: 14px 16px;
  border-bottom: 1px solid #e2e8f0;
  font-size: 10px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Td = styled.td`
  padding: 16px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 13px;
  color: #1e293b;
  font-weight: 500;
`;

const TokenText = styled.span`
  color: #2563eb;
  font-weight: 700;
`;

const PatientCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  span:first-child {
    font-weight: 700;
    color: #0f172a;
  }
  span:last-child {
    font-size: 11px;
    color: #64748b;
    font-weight: 500;
  }
`;

const RoomLink = styled.span`
  color: #2563eb;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const PaymentBadge = styled.span`
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 50px;
  
  background-color: ${props => props.paid ? '#d1fae5' : '#ffedd5'};
  color: ${props => props.paid ? '#065f46' : '#9a3412'};
`;

const StatusIndicator = styled.span`
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 50px;
  
  background-color: ${props => {
    if (props.type === 'Completed') return '#d1fae5';
    if (props.type === 'Waiting') return '#fee2e2';
    return '#e0f2fe'; // consultation
  }};
  
  color: ${props => {
    if (props.type === 'Completed') return '#065f46';
    if (props.type === 'Waiting') return '#991b1b';
    return '#0284c7';
  }};
`;

const ActionMenuWrapper = styled.div`
  position: relative;
`;

const CircularBtn = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748b;
  margin: 0 auto;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8fafc;
    color: #1e293b;
  }
`;

const PopupOverlay = styled.div`
  position: absolute;
  right: 0;
  top: 24px;
  width: 140px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 150;
  animation: ${fadeIn} 0.2s ease-out;
`;

const PopupItem = styled.button`
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
  text-align: center;
  transition: all 0.15s ease;

  background-color: ${props => {
    if (props.mode === 'view') return '#009688';
    if (props.mode === 'reschedule') return '#f97316';
    if (props.mode === 'prescription') return '#64748b';
    return '#ef4444'; // cancel
  }};

  &:hover {
    filter: brightness(0.9);
    transform: translateY(-0.5px);
  }
`;

const MOCK_APPOINTMENTS = [
  { token: 'T-001', name: 'John Doe', id: 'PT-2028-00452', doctor: 'Dr. Sharma', room: 'OPD-03', time: '09:00 AM', type: 'New', booking: 'Online', paid: true, status: 'Completed' },
  { token: 'T-001', name: 'John Doe', id: 'PT-2028-00452', doctor: 'Dr. Sharma', room: 'OPD-05', time: '09:00 AM', type: 'Follow up', booking: 'Walk-in', paid: false, status: 'Waiting' },
  { token: 'T-001', name: 'John Doe', id: 'PT-2028-00452', doctor: 'Dr. Sharma', room: 'OPD-07', time: '09:00 AM', type: 'Walk-in', booking: 'Walk-in', paid: true, status: 'In Consultation' }
];

const TodayAppointments = ({ searchTerm, setSearchTerm, onReschedule }) => {
  const [showPopupRow, setShowPopupRow] = useState(null);

  const togglePopup = (index) => {
    if (showPopupRow === index) {
      setShowPopupRow(null);
    } else {
      setShowPopupRow(index);
    }
  };

  const handleDropdownAction = (action, patientName) => {
    alert(`${action} triggered for ${patientName}`);
    setShowPopupRow(null);
  };

  const filteredAppointments = MOCK_APPOINTMENTS.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ContentCard>
      <SectionHeader>
        <h3>Today's Appointments</h3>
      </SectionHeader>

      {/* TABLE FILTERS BAR */}
      <TableFiltersRow>
        <TableSearch>
          <Search size={14} color="#94a3b8" />
          <input 
            type="text" 
            placeholder="Search by name, ID, phone..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </TableSearch>

        <DateRangeBadge>
          dd-mm-yy to dd-mm-yy
        </DateRangeBadge>

        <DropdownSelect>
          <span>Doctor</span>
          <ChevronDown size={14} color="#64748b" />
        </DropdownSelect>

        <DropdownSelect>
          <span>Department</span>
          <ChevronDown size={14} color="#64748b" />
        </DropdownSelect>
      </TableFiltersRow>

      {/* TABLE */}
      <TableContainerWrapper>
        <CustomTable>
          <thead>
            <tr>
              <Th>Token</Th>
              <Th>Patient Name</Th>
              <Th>Doctor</Th>
              <Th>OPD Room</Th>
              <Th>Time</Th>
              <Th>Type</Th>
              <Th>Booking Type</Th>
              <Th>Payment</Th>
              <Th>Status</Th>
              <Th style={{ textAlign: 'center' }}>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((app, index) => (
                <tr key={index}>
                  <Td><TokenText>{app.token}</TokenText></Td>
                  <Td>
                    <PatientCell>
                      <span>{app.name}</span>
                      <span>{app.id}</span>
                    </PatientCell>
                  </Td>
                  <Td>{app.doctor}</Td>
                  <Td><RoomLink>{app.room}</RoomLink></Td>
                  <Td>{app.time}</Td>
                  <Td>{app.type}</Td>
                  <Td>{app.booking}</Td>
                  <Td>
                    <PaymentBadge paid={app.paid}>
                      {app.paid ? 'Paid' : 'Pending'}
                    </PaymentBadge>
                  </Td>
                  <Td>
                    <StatusIndicator type={app.status}>
                      {app.status}
                    </StatusIndicator>
                  </Td>
                  <Td style={{ textAlign: 'center', position: 'relative' }}>
                    <ActionMenuWrapper>
                      <CircularBtn onClick={() => togglePopup(index)}>
                        <MoreVertical size={14} />
                      </CircularBtn>

                      {/* INTERACTIVE ACTIONS POPUP MENU */}
                      {showPopupRow === index && (
                        <PopupOverlay>
                          <PopupItem mode="view" onClick={() => handleDropdownAction('View Details', app.name)}>
                            View Details
                          </PopupItem>
                          <PopupItem mode="reschedule" onClick={() => {
                            onReschedule(app.name);
                            setShowPopupRow(null);
                          }}>
                            Reschedule
                          </PopupItem>
                          <PopupItem mode="prescription" onClick={() => handleDropdownAction('Prescription', app.name)}>
                            Prescriptions
                          </PopupItem>
                          <PopupItem mode="cancel" onClick={() => handleDropdownAction('Cancel Booking', app.name)}>
                            Cancel
                          </PopupItem>
                        </PopupOverlay>
                      )}
                    </ActionMenuWrapper>
                  </Td>
                </tr>
              ))
            ) : (
              <tr>
                <Td colSpan={10} style={{ textAlign: 'center', padding: '24px', color: '#64748b' }}>
                  No appointments matching your query.
                </Td>
              </tr>
            )}
          </tbody>
        </CustomTable>
      </TableContainerWrapper>
    </ContentCard>
  );
};

export default TodayAppointments;
