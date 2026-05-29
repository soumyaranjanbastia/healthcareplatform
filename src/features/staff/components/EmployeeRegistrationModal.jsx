import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { X, Search, ChevronDown, User, Mail, Phone, Calendar, MapPin, Briefcase, Globe } from 'lucide-react';
import { getBranchesRequest } from '../../doctors/redux/branchesSlice';
import { 
  getRolesRequest, 
  createStaffRequest, 
  resetCreateStaffState 
} from '../redux/staffSlice';

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
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #1e293b;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s;
  
  &:hover {
    background: #f1f5f9;
    color: #475569;
  }
`;

const ModalBody = styled.form`
  padding: 24px;
  max-height: 70vh;
  overflow-y: auto;
`;

const SectionTitle = styled.h4`
  font-size: 13px;
  font-weight: 700;
  color: #009688;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 16px 0;
  border-bottom: 1px dashed #e2e8f0;
  padding-bottom: 8px;
  grid-column: span 2;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 24px;
  margin-bottom: 24px;
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
  display: flex;
  align-items: center;
  gap: 6px;
  
  span {
    color: #ef4444; /* Red asterisk */
  }
  
  svg {
    color: #94a3b8;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  
  svg {
    position: absolute;
    left: 14px;
    color: #94a3b8;
  }
  
  input {
    width: 100%;
    padding: 12px 16px 12px 40px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
    color: #1e293b;
    background-color: #ffffff;
    transition: border-color 0.2s;
    
    &:focus {
      border-color: #009688;
    }
    
    &::placeholder {
      color: #94a3b8;
    }
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
  transition: border-color 0.2s;
  
  &:focus {
    border-color: #009688;
  }
`;

const ErrorMessage = styled.div`
  background: #fef2f2;
  border: 1px solid #fee2e2;
  color: #ef4444;
  padding: 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 16px;
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
  border: 1px solid ${props => props.$isOpen ? '#009688' : '#e2e8f0'};
  border-radius: 8px;
  font-size: 14px;
  background-color: #ffffff;
  color: ${props => props.$hasValue ? '#1e293b' : '#94a3b8'};
  cursor: pointer;
  transition: border-color 0.2s;
  
  &:hover {
    border-color: #009688;
  }
`;

const DropdownListContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
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
  
  ${props => props.$isSelected && `
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
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: #00796b;
  }
  
  &:disabled {
    background: #94a3b8;
    cursor: not-allowed;
  }
`;

const EmployeeRegistrationModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { branches, isLoading: branchesLoading } = useSelector(state => state.branches);
  const {
    roles,
    rolesLoading,
    rolesError,
    createLoading,
    createSuccess,
    createError
  } = useSelector(state => state.staffRegistration);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    roleId: '',
    gender: '',
    dob: '',
    country: 'India',
    state: '',
    address: '',
  });

  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const [branchSearchText, setBranchSearchText] = useState('');
  const [selectedBranch, setSelectedBranch] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      dispatch(getBranchesRequest());
      dispatch(getRolesRequest());
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    if (createSuccess) {
      alert('Staff registered successfully!');
      dispatch(resetCreateStaffState());
      // Reset local states
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        roleId: '',
        gender: '',
        dob: '',
        country: 'India',
        state: '',
        address: '',
      });
      setSelectedBranch(null);
      onClose();
    }
  }, [createSuccess, dispatch, onClose]);

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

  const filteredBranches = branches?.filter(branch => {
    const name = branch?.branchName || branch?.branchname || '';
    return name.toLowerCase().includes(branchSearchText.toLowerCase());
  }) || [];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phoneNumber || !formData.roleId) {
      alert('Please fill all required fields marked with *');
      return;
    }

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      roleId: Number(formData.roleId),
      gender: formData.gender || undefined,
      dob: formData.dob || undefined,
      country: formData.country || undefined,
      state: formData.state || undefined,
      address: formData.address || undefined,
      branchId: selectedBranch ? (selectedBranch.branchId || selectedBranch.id || selectedBranch._id) : undefined
    };

    dispatch(createStaffRequest(payload));
  };

  return (
    <Overlay>
      <ModalContainer>
        <ModalHeader>
          <h3>Employee Registration Form</h3>
          <CloseButton onClick={onClose} disabled={createLoading}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>
        
        <ModalBody onSubmit={handleFormSubmit}>
          {createError && <ErrorMessage>{createError}</ErrorMessage>}
          {rolesError && <ErrorMessage>{rolesError}</ErrorMessage>}

          <FormGrid>
            {/* --- SECTION 1: Personal Details --- */}
            <SectionTitle>Personal Details</SectionTitle>

            <FormGroup>
              <Label><User size={14} /> First Name<span>*</span></Label>
              <InputWrapper>
                <User size={14} />
                <input 
                  type="text" 
                  placeholder="Enter first name" 
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  required
                  disabled={createLoading}
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label><User size={14} /> Last Name<span>*</span></Label>
              <InputWrapper>
                <User size={14} />
                <input 
                  type="text" 
                  placeholder="Enter last name" 
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                  disabled={createLoading}
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label>Gender</Label>
              <Select 
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                disabled={createLoading}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label><Calendar size={14} /> Date of Birth</Label>
              <InputWrapper>
                <Calendar size={14} />
                <input 
                  type="date" 
                  value={formData.dob}
                  onChange={(e) => handleInputChange('dob', e.target.value)}
                  disabled={createLoading}
                />
              </InputWrapper>
            </FormGroup>

            {/* --- SECTION 2: Contact Details --- */}
            <SectionTitle>Contact Details</SectionTitle>

            <FormGroup>
              <Label><Phone size={14} /> Contact Number<span>*</span></Label>
              <InputWrapper>
                <Phone size={14} />
                <input 
                  type="tel" 
                  placeholder="e.g. 9876543210" 
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  required
                  disabled={createLoading}
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label><Mail size={14} /> Email<span>*</span></Label>
              <InputWrapper>
                <Mail size={14} />
                <input 
                  type="email" 
                  placeholder="johndoe@example.com" 
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  disabled={createLoading}
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup style={{ gridColumn: 'span 2' }}>
              <Label><MapPin size={14} /> Address</Label>
              <InputWrapper>
                <MapPin size={14} />
                <input 
                  type="text" 
                  placeholder="Enter flat, street, locality..." 
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  disabled={createLoading}
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label><MapPin size={14} /> State</Label>
              <InputWrapper>
                <MapPin size={14} />
                <input 
                  type="text" 
                  placeholder="e.g. Maharashtra" 
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  disabled={createLoading}
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label><Globe size={14} /> Country</Label>
              <InputWrapper>
                <Globe size={14} />
                <input 
                  type="text" 
                  placeholder="e.g. India" 
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  disabled={createLoading}
                />
              </InputWrapper>
            </FormGroup>

            {/* --- SECTION 3: Organization Assignment --- */}
            <SectionTitle>Work Assignment</SectionTitle>

            <FormGroup ref={dropdownRef}>
              <Label><MapPin size={14} /> Associated Branch</Label>
              <SearchableDropdownContainer>
                <DropdownHeader 
                  $isOpen={isBranchDropdownOpen} 
                  $hasValue={!!selectedBranch}
                  onClick={() => !createLoading && setIsBranchDropdownOpen(!isBranchDropdownOpen)}
                >
                  {selectedBranch ? (selectedBranch.branchName || selectedBranch.branchname) : 'Select Branch'}
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
                      {branchesLoading ? (
                        <EmptyMessage>Loading branches...</EmptyMessage>
                      ) : filteredBranches.length > 0 ? (
                        filteredBranches.map((branch) => {
                          const isSelected = selectedBranch 
                            ? (selectedBranch._id === branch._id && branch._id !== undefined) || (selectedBranch.id === branch.id && branch.id !== undefined)
                            : false;
                          const name = branch.branchName || branch.branchname;
                          return (
                            <ListItem 
                              key={branch._id || branch.id || name}
                              $isSelected={isSelected}
                              onClick={() => {
                                setSelectedBranch(branch);
                                setIsBranchDropdownOpen(false);
                                setBranchSearchText('');
                              }}
                            >
                              {name}
                            </ListItem>
                          );
                        })
                      ) : (
                        <EmptyMessage>No branches found</EmptyMessage>
                      )}
                    </ListOptions>
                  </DropdownListContainer>
                )}
              </SearchableDropdownContainer>
            </FormGroup>
            
            <FormGroup>
              <Label><Briefcase size={14} /> Role<span>*</span></Label>
              <Select 
                value={formData.roleId} 
                onChange={(e) => handleInputChange('roleId', e.target.value)}
                required
                disabled={createLoading}
              >
                <option value="">Select Role</option>
                {rolesLoading ? (
                  <option disabled>Loading roles...</option>
                ) : (
                  roles && roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.roleName}
                    </option>
                  ))
                )}
              </Select>
            </FormGroup>
          </FormGrid>
        </ModalBody>
        
        <ModalFooter>
          <CancelButton type="button" onClick={onClose} disabled={createLoading}>Cancel</CancelButton>
          <SubmitButton type="submit" onClick={handleFormSubmit} disabled={createLoading}>
            {createLoading ? 'Registering...' : 'Register Employee'}
          </SubmitButton>
        </ModalFooter>
      </ModalContainer>
    </Overlay>
  );
};

export default EmployeeRegistrationModal;
