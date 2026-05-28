import React, { useState } from 'react';
import styled from 'styled-components';
import { MapPin, Phone, Mail, User, Trash2, Plus, UserPlus, Check, X } from 'lucide-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  font-family: 'Outfit', sans-serif;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const TitleBlock = styled.div`
  h2 {
    font-size: 22px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }
  p {
    font-size: 13px;
    color: #64748b;
    margin-top: 4px;
    font-weight: 500;
  }
`;

const MapBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #009688;
  color: #ffffff;
  border: none;
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 150, 136, 0.15);
  transition: all 0.2s ease;

  &:hover {
    background-color: #00796b;
    transform: translateY(-1px);
  }
`;

const BranchesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: 962px) {
    grid-template-columns: 1fr;
  }
`;

const BranchCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
  transition: all 0.25s ease;
  position: relative;

  &:hover {
    box-shadow: 0 12px 20px -3px rgba(0, 0, 0, 0.04);
    transform: translateY(-2px);
    border-color: #cbd5e1;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const BranchInfoBlock = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const IconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background-color: #e6f9f3;
  color: #009688;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const BranchNameBlock = styled.div`
  h3 {
    font-size: 16px;
    font-weight: 750;
    color: #0f172a;
    margin: 0;
  }
  span {
    font-size: 11px;
    color: #94a3b8;
    font-weight: 600;
    text-transform: uppercase;
    margin-top: 2px;
    display: inline-block;
  }
`;

const DeleteBtn = styled.button`
  background-color: #fef2f2;
  color: #ef4444;
  border: 1px solid #fecaca;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #ef4444;
    color: #ffffff;
    border-color: #ef4444;
    box-shadow: 0 4px 10px rgba(239, 68, 68, 0.15);
  }
`;

const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 12.5px;
  color: #475569;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 18px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  line-height: 1.4;

  svg {
    margin-top: 2px;
    flex-shrink: 0;
  }
`;

const MappedSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MappedTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
`;

const MappedList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const DoctorTag = styled.div`
  background-color: #f1f5f9;
  color: #334155;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s;

  &:hover {
    border-color: #cbd5e1;
    background-color: #e2e8f0;
  }
`;

const UnmapBtn = styled.button`
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #ef4444;
  }
`;

const EmptyStateCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 48px;
  text-align: center;
  color: #64748b;
  font-style: italic;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.01);
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalCard = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  width: 100%;
  max-width: 440px;
  padding: 28px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  text-align: left;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 18px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }
`;

const ModalCloseBtn = styled.button`
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f1f5f9;
    color: #475569;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 700;
  color: #334155;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  font-size: 13.5px;
  font-weight: 600;
  outline: none;
  background-color: #ffffff;
  color: #1e293b;
  cursor: pointer;

  &:focus {
    border-color: #009688;
  }
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #009688;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #00796b;
  }
`;

const BranchManagementView = ({ branches = [], doctors = [], isLoading = false, error = null, onDeleteBranch, onMapDoctor }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');

  const handleOpenModal = (branchId = '') => {
    setSelectedBranchId(branchId || (branches.length > 0 ? branches[0].id : ''));
    setSelectedDoctorId(doctors.length > 0 ? doctors[0].id : '');
    setShowModal(true);
  };

  const handleAssign = () => {
    if (!selectedBranchId || !selectedDoctorId) {
      alert("Please select both a Branch and a Doctor!");
      return;
    }
    onMapDoctor(Number(selectedBranchId), selectedDoctorId);
    setShowModal(false);
    alert("Doctor successfully assigned to branch!");
  };

  const handleUnmap = (doctorId) => {
    if (window.confirm("Are you sure you want to remove this doctor from this branch?")) {
      onMapDoctor(null, doctorId);
    }
  };

  return (
    <Container>
      <HeaderRow>
        <TitleBlock>
          <h2>Branch Management</h2>
          <p>Organize diagnostic centers and assign doctors</p>
        </TitleBlock>
        <MapBtn onClick={() => handleOpenModal()}>
          <UserPlus size={16} /> Assign Doctor to Branch
        </MapBtn>
      </HeaderRow>

      {isLoading ? (
        <EmptyStateCard style={{ fontStyle: 'normal' }}>
          Loading hospital branches...
        </EmptyStateCard>
      ) : error ? (
        <EmptyStateCard style={{ fontStyle: 'normal', color: '#ef4444' }}>
          Error: {error}
        </EmptyStateCard>
      ) : branches.length === 0 ? (
        <EmptyStateCard>
          No branches configured. Please register a branch first.
        </EmptyStateCard>
      ) : (
        <BranchesGrid>
          {branches.map((branch) => {
            const assignedDoctors = doctors.filter(d => d.branchId === branch.id);
            return (
              <BranchCard key={branch.id}>
                <CardHeader>
                  <BranchInfoBlock>
                    <IconBox>
                      <MapPin size={22} />
                    </IconBox>
                    <BranchNameBlock>
                      <h3>{branch.branchName}</h3>
                      <span>{branch.companyName || 'Hospital Network'}</span>
                    </BranchNameBlock>
                  </BranchInfoBlock>

                  <DeleteBtn title="Delete Branch" onClick={() => onDeleteBranch(branch.id)}>
                    <Trash2 size={16} />
                  </DeleteBtn>
                </CardHeader>

                <DetailsSection>
                  <DetailItem>
                    <MapPin size={14} color="#94a3b8" />
                    <span>{branch.address}</span>
                  </DetailItem>
                  <DetailItem>
                    <Phone size={14} color="#94a3b8" />
                    <span>+91 {branch.contactNumber}</span>
                  </DetailItem>
                  <DetailItem>
                    <Mail size={14} color="#94a3b8" />
                    <span>{branch.email}</span>
                  </DetailItem>
                  <DetailItem>
                    <User size={14} color="#94a3b8" />
                    <span>Nodal Officer: <strong>{branch.nodalOfficerName}</strong></span>
                  </DetailItem>
                  {branch.coordinates && (
                    <DetailItem style={{ fontSize: '11px', color: '#94a3b8' }}>
                      <span>GPS: {branch.coordinates.latitude}, {branch.coordinates.longitude}</span>
                    </DetailItem>
                  )}
                </DetailsSection>

                <MappedSection>
                  <MappedTitle>
                    <span>Assigned Doctors ({assignedDoctors.length})</span>
                    <UnmapBtn onClick={() => handleOpenModal(branch.id)}>
                      <Plus size={14} /> Add
                    </UnmapBtn>
                  </MappedTitle>

                  <MappedList>
                    {assignedDoctors.length > 0 ? (
                      assignedDoctors.map(doc => (
                        <DoctorTag key={doc.id}>
                          <span>{doc.name}</span>
                          <UnmapBtn title="Unassign Doctor" onClick={() => handleUnmap(doc.id)}>
                            <X size={12} />
                          </UnmapBtn>
                        </DoctorTag>
                      ))
                    ) : (
                      <span style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic', fontWeight: 500 }}>
                        No doctors assigned to this branch yet.
                      </span>
                    )}
                  </MappedList>
                </MappedSection>
              </BranchCard>
            );
          })}
        </BranchesGrid>
      )}

      {/* ASSIGNMENT MODAL */}
      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <ModalCard onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <h3>Assign Doctor to Branch</h3>
              <ModalCloseBtn onClick={() => setShowModal(false)}>
                <X size={16} />
              </ModalCloseBtn>
            </ModalHeader>

            <FormGroup>
              <Label>Select Branch</Label>
              <Select value={selectedBranchId} onChange={e => setSelectedBranchId(e.target.value)}>
                {branches.map(b => (
                  <option key={b.id} value={b.id}>{b.branchName}</option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Select Doctor</Label>
              <Select value={selectedDoctorId} onChange={e => setSelectedDoctorId(e.target.value)}>
                {doctors.map(d => (
                  <option key={d.id} value={d.id}>{d.name} ({d.specialization})</option>
                ))}
              </Select>
            </FormGroup>

            <SubmitBtn onClick={handleAssign}>
              Assign Doctor
            </SubmitBtn>
          </ModalCard>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default BranchManagementView;
