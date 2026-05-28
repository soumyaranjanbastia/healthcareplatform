import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Upload, X, Search, ChevronDown } from 'lucide-react';
import { getBranchesRequest } from '../../doctors/redux/branchesSlice';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(2px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  background: #ffffff;
  width: 900px;
  max-width: 95%;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  font-family: 'Inter', sans-serif;
`;

const ModalHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #e2e8f0;
  
  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #1e293b;
  }
`;

const ModalBody = styled.div`
  padding: 24px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #475569;
  
  span {
    color: #ef4444; /* Red asterisk */
  }
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  color: #1e293b;
  background-color: #ffffff;
  
  &:focus {
    border-color: #009688;
  }
  
  &::placeholder {
    color: #94a3b8;
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  color: #1e293b;
  background-color: white;
  cursor: pointer;
  
  &:focus {
    border-color: #009688;
  }
`;

const FileUploadWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px 16px;
  color: #94a3b8;
  font-size: 14px;
  cursor: pointer;
  background-color: #ffffff;
  
  svg {
    margin-right: 8px;
  }
`;

const FileInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const TagList = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  color: #475569;
  
  svg {
    cursor: pointer;
    color: #94a3b8;
    &:hover {
      color: #ef4444;
    }
  }
`;

const ModalFooter = styled.div`
  padding: 24px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background: #fafafa;
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #f1f5f9;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background: #009688;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #00796b;
  }
`;

const SearchableDropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid ${props => props.isOpen ? '#009688' : '#e2e8f0'};
  border-radius: 8px;
  font-size: 14px;
  background-color: #ffffff;
  color: ${props => props.hasValue ? '#1e293b' : '#94a3b8'};
  cursor: pointer;
  
  &:hover {
    border-color: #009688;
  }
`;

const DropdownListContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 250px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  z-index: 100;
  margin-top: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const SearchInputWrapper = styled.div`
  padding: 10px 12px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 8px;
  
  svg {
    color: #94a3b8;
  }
  
  input {
    border: none;
    outline: none;
    width: 100%;
    font-size: 14px;
    color: #1e293b;
    background-color: #ffffff;
    
    &::placeholder {
      color: #94a3b8;
    }
  }
`;

const ListOptions = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  flex: 1;
`;

const ListItem = styled.li`
  padding: 10px 16px;
  font-size: 14px;
  color: #1e293b;
  cursor: pointer;
  
  &:hover {
    background-color: #f8fafc;
  }
  
  ${props => props.isSelected && `
    background-color: #e6f9f3;
    color: #009688;
    font-weight: 600;
  `}
`;

const EmptyMessage = styled.div`
  padding: 12px 16px;
  font-size: 13px;
  color: #64748b;
  text-align: center;
`;

const EmployeeRegistrationModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { branches, isLoading } = useSelector(state => state.branches);
  
  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const [branchSearchText, setBranchSearchText] = useState('');
  const [selectedBranch, setSelectedBranch] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      dispatch(getBranchesRequest());
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsBranchDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const filteredBranches = branches?.filter(branch => 
    branch?.branchname?.toLowerCase().includes(branchSearchText.toLowerCase())
  ) || [];

  return (
    <Overlay>
      <ModalContainer>
        <ModalHeader>
          <h3>Employee Registration Form</h3>
        </ModalHeader>
        
        <ModalBody>
          <FormGrid>
            <FormGroup>
              <Label>Employee Name<span>*</span></Label>
              <Input type="text" placeholder="Enter doctor name" />
            </FormGroup>
            
            <FormGroup>
              <Label>Qualification<span>*</span></Label>
              <Input type="text" placeholder="e.g. MBBS, MD" />
            </FormGroup>

            <FormGroup>
              <Label>Specialization<span>*</span></Label>
              <Select>
                <option value="">Select Specialization</option>
                <option value="critical-care">Critical Care</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="cardiology">Cardiology</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>Council Reg. Number</Label>
              <Input type="text" placeholder="Enter registration number" />
            </FormGroup>

            <FormGroup>
              <Label>Experience (Years)</Label>
              <Input type="text" placeholder="e.g. 10" />
            </FormGroup>
            
            <FormGroup>
              <Label>Contact Number</Label>
              <Input type="text" placeholder="+91 XXXXX XXXXX" />
            </FormGroup>

            <FormGroup>
              <Label>Email</Label>
              <Input type="email" placeholder="doctor@email.com" />
            </FormGroup>
            
            <FormGroup>
              <Label>Upload Document</Label>
              <FileUploadWrapper>
                <Upload size={16} /> Choose file...
                <FileInput type="file" />
              </FileUploadWrapper>
              <TagList>
                <Tag>Aadhar <X size={14} /></Tag>
              </TagList>
            </FormGroup>

            <FormGroup ref={dropdownRef}>
              <Label>Associated Branch <span>*</span></Label>
              <SearchableDropdownContainer>
                <DropdownHeader 
                  isOpen={isBranchDropdownOpen} 
                  hasValue={!!selectedBranch}
                  onClick={() => setIsBranchDropdownOpen(!isBranchDropdownOpen)}
                >
                  {selectedBranch ? selectedBranch.branchname : 'Select Branch'}
                  <ChevronDown size={16} color="#94a3b8" />
                </DropdownHeader>
                
                {isBranchDropdownOpen && (
                  <DropdownListContainer>
                    <SearchInputWrapper>
                      <Search size={14} />
                      <input 
                        autoFocus
                        type="text" 
                        placeholder="Search branches..." 
                        value={branchSearchText}
                        onChange={(e) => setBranchSearchText(e.target.value)}
                      />
                    </SearchInputWrapper>
                    <ListOptions>
                      {isLoading ? (
                        <EmptyMessage>Loading branches...</EmptyMessage>
                      ) : filteredBranches.length > 0 ? (
                        filteredBranches.map((branch) => (
                          <ListItem 
                            key={branch._id || branch.id || branch.branchname}
                            isSelected={selectedBranch?._id === branch._id}
                            onClick={() => {
                              setSelectedBranch(branch);
                              setIsBranchDropdownOpen(false);
                              setBranchSearchText('');
                            }}
                          >
                            {branch.branchname}
                          </ListItem>
                        ))
                      ) : (
                        <EmptyMessage>No branches found</EmptyMessage>
                      )}
                    </ListOptions>
                  </DropdownListContainer>
                )}
              </SearchableDropdownContainer>
            </FormGroup>
            
            <FormGroup>
              <Label>Role</Label>
              <Select defaultValue="Nurse">
                <option value="Nurse">Nurse</option>
                <option value="Receptionist">Receptionist</option>
                <option value="Admin">Admin</option>
              </Select>
            </FormGroup>
          </FormGrid>
        </ModalBody>
        
        <ModalFooter>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <SubmitButton>Register Employee</SubmitButton>
        </ModalFooter>
      </ModalContainer>
    </Overlay>
  );
};

export default EmployeeRegistrationModal;
