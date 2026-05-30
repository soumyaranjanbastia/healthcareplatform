import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowRight, Briefcase, Plus, Trash2, ChevronUp, Clock } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import WizardCard from '../../components/WizardCard';
import WizardInput from '../../components/WizardInput';
import WizardSelect from '../../components/WizardSelect';
import WizardButton, { ButtonWrapper } from '../../components/WizardButton';
import SearchableSelect from '../../components/SearchableSelect';
import { getGeoDataRequest } from '../../redux/geoDataSlice';

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LocationGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TimeRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
  width: 100%;
`;

const TimeInputWrap = styled.div`
  flex: 1;
`;

const AmPmWrap = styled.div`
  width: 80px;
  margin-top: 6px; /* Offsets the 6px empty LabelRow gap inside WizardInput for pixel-perfect alignment */
`;

const TimeSelect = styled.select`
  width: 100%;
  padding: 12px 14px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #0f172a;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;
  height: 46px; /* Matches the exact height of the WizardInput text field */

  &:focus {
    border-color: #009688;
    box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.08);
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #334155;
`;

const RequiredStar = styled.span`
  color: #ef4444;
  margin-left: 2px;
`;

const TimeGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  margin-bottom: 16px;
`;

const BranchCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  padding: 12px 16px;
  border-radius: 10px;
  margin-bottom: 16px;
`;

const BranchTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Outfit', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #166534;
`;

const BranchBadge = styled.span`
  background-color: #dcfce7;
  color: #15803d;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 500;
`;

const TrashBtn = styled.button`
  background: none;
  border: none;
  color: #dc2626;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 6px;
  &:hover {
    background-color: #fee2e2;
  }
`;

const AddBranchBtn = styled.button`
  align-self: flex-end;
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #009688;
  color: #ffffff;
  border: none;
  padding: 10px 18px;
  border-radius: 10px;
  font-family: 'Outfit', sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 18px;

  &:hover {
    background-color: #00796b;
  }
`;

const SearchableSelectGroup = ({ label, required = false, error, ...props }) => {
  return (
    <FormGroup>
      {label && (
        <Label>
          {label}
          {required && <RequiredStar>*</RequiredStar>}
        </Label>
      )}
      <SearchableSelect error={error} {...props} />
    </FormGroup>
  );
};

const Step4BusinessDetails = ({ onNext, onPrev, data, updateData }) => {
  const dispatch = useDispatch();
  const { geoData } = useSelector((state) => state.geoData);

  // Business fields
  const [companyName, setCompanyName] = useState(data.companyName || 'HealthFirst Pharmacy');
  const [gstin, setGstin] = useState(data.gstin || '22AAAAA0000A1Z5');
  const [pan, setPan] = useState(data.pan || 'ABCDE1234F');
  
  // Location fields
  const [country, setCountry] = useState(data.country || 'India');
  const [state, setState] = useState(data.state || 'Maharashtra');
  const [city, setCity] = useState(data.city || '');
  
  // Working hours
  const [startTime, setStartTime] = useState(data.startTime || '09:00');
  const [startAmPm, setStartAmPm] = useState(data.startAmPm || 'AM');
  const [endTime, setEndTime] = useState(data.endTime || '06:00');
  const [endAmPm, setEndAmPm] = useState(data.endAmPm || 'PM');

  // Branch details (State array)
  const [branches, setBranches] = useState(data.branches || [
    {
      name: '',
      country: 'India',
      city: '',
      state: 'Maharashtra',
      pincode: '',
      radius: '10',
      startTime: '09:00',
      startAmPm: 'AM',
      endTime: '06:00',
      endAmPm: 'PM',
      nodalOfficerName: '',
      nodalOfficerEmail: '',
      nodalOfficerPhone: ''
    }
  ]);

  const [errors, setErrors] = useState({});

  const handleAddBranch = () => {
    setBranches([...branches, {
      name: '',
      country: 'India',
      city: '',
      state: 'Maharashtra',
      pincode: '',
      radius: '5',
      startTime: '09:00',
      startAmPm: 'AM',
      endTime: '06:00',
      endAmPm: 'PM',
      nodalOfficerName: '',
      nodalOfficerEmail: '',
      nodalOfficerPhone: ''
    }]);
  };

  const handleRemoveBranch = (index) => {
    setBranches(branches.filter((_, i) => i !== index));
    
    // Clean errors list for removed branch if any
    if (errors.branches) {
      const updatedBranchErrors = errors.branches.filter((_, i) => i !== index);
      setErrors({ ...errors, branches: updatedBranchErrors });
    }
  };

  const handleBranchChange = (index, field, value) => {
    const updated = [...branches];
    updated[index][field] = value;
    setBranches(updated);

    // Clear specific field error on change
    if (errors.branches && errors.branches[index] && errors.branches[index][field]) {
      const updatedBranchErrors = [...errors.branches];
      delete updatedBranchErrors[index][field];
      setErrors({ ...errors, branches: updatedBranchErrors });
    }
  };

  const handleBranchCountryChange = (index, value) => {
    const updated = [...branches];
    updated[index] = { ...updated[index], country: value, state: '', city: '' };
    setBranches(updated);

    // Clear specific country/state/city errors on change
    if (errors.branches && errors.branches[index]) {
      const updatedBranchErrors = [...errors.branches];
      delete updatedBranchErrors[index].country;
      delete updatedBranchErrors[index].state;
      delete updatedBranchErrors[index].city;
      setErrors({ ...errors, branches: updatedBranchErrors });
    }
  };

  const handleBranchStateChange = (index, value) => {
    const updated = [...branches];
    updated[index] = { ...updated[index], state: value, city: '' };
    setBranches(updated);

    // Clear specific state/city errors on change
    if (errors.branches && errors.branches[index]) {
      const updatedBranchErrors = [...errors.branches];
      delete updatedBranchErrors[index].state;
      delete updatedBranchErrors[index].city;
      setErrors({ ...errors, branches: updatedBranchErrors });
    }
  };

  useEffect(() => {
    if (!geoData) {
      dispatch(getGeoDataRequest());
    }
  }, [dispatch, geoData]);

  const validateForm = () => {
    const newErrors = {};

    // 1. Company Name - completely optional

    // 2. GSTIN - optional (format check only if filled)
    if (gstin && gstin.trim()) {
      const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      if (!gstinRegex.test(gstin.trim())) {
        newErrors.gstin = 'Invalid GSTIN format (e.g. 22AAAAA0000A1Z5)';
      }
    }

    // 3. PAN - optional (format check only if filled)
    if (pan && pan.trim()) {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!panRegex.test(pan.trim())) {
        newErrors.pan = 'Invalid PAN format (e.g. ABCDE1234F)';
      }
    }

    // 4. Country, State, City - completely optional

    // 5. Working Hours - completely optional

    // 6. Branches Validation
    const branchErrors = [];
    branches.forEach((branch, index) => {
      const bErr = {};

      if (branch.pincode && branch.pincode.trim()) {
        if (branch.pincode.length !== 6) {
          bErr.pincode = 'Pincode must be exactly 6 digits';
        }
      }

      if (branch.nodalOfficerName && branch.nodalOfficerName.trim()) {
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(branch.nodalOfficerName.trim())) {
          bErr.nodalOfficerName = 'Nodal officer name must contain letters only';
        }
      }

      if (branch.nodalOfficerEmail && branch.nodalOfficerEmail.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(branch.nodalOfficerEmail.trim())) {
          bErr.nodalOfficerEmail = 'Invalid email address';
        }
      }

      if (branch.nodalOfficerPhone && branch.nodalOfficerPhone.trim()) {
        if (branch.nodalOfficerPhone.length !== 10) {
          bErr.nodalOfficerPhone = 'Phone number must be exactly 10 digits';
        }
      }

      if (Object.keys(bErr).length > 0) {
        branchErrors[index] = bErr;
      }
    });

    if (branchErrors.some(err => err && Object.keys(err).length > 0)) {
      newErrors.branches = branchErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Smooth scroll to first field with custom error styling
      setTimeout(() => {
        const firstErrorEl = document.querySelector('[style*="border-color: rgb(239, 68, 68)"], [style*="border-color: #ef4444"]');
        if (firstErrorEl) {
          firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 50);
      return;
    }

    updateData({
      companyName, gstin, pan,
      country, state, city,
      startTime, startAmPm, endTime, endAmPm, branches
    });
    onNext();
  };

  // Derive dropdown options from geoData
  let countryOptions = [{ value: 'India', label: 'India' }];
  let stateOptions = [{ value: 'Maharashtra', label: 'Maharashtra' }];
  let cityOptions = [{ value: '', label: 'Select City' }];

  if (geoData && Array.isArray(geoData)) {
    countryOptions = geoData.map((c) => ({ value: c.name, label: c.name }));

    const selectedCountry = geoData.find((c) => c.name === country);
    if (selectedCountry && selectedCountry.states) {
      stateOptions = selectedCountry.states.map((s) => ({ value: s.name, label: s.name }));

      const selectedState = selectedCountry.states.find((s) => s.name === state);
      if (selectedState && selectedState.cities) {
        cityOptions = [
          { value: '', label: 'Select City' },
          ...selectedState.cities.map((ct) => ({ value: ct.name, label: ct.name }))
        ];
      }
    }
  }

  return (
    <form onSubmit={handleContinue} noValidate>
      {/* Company details */}
      <WizardCard title="Company Details" icon={<Briefcase size={20} />}>
        <WizardInput 
          label="Company Name" 
          placeholder="HealthFirst Pharmacy" 
          value={companyName}
          onChange={e => {
            setCompanyName(e.target.value);
            if (errors.companyName) setErrors({ ...errors, companyName: null });
          }}
          error={errors.companyName}
        />
        <FormRow>
          <WizardInput 
            label="GSTIN" 
            placeholder="e.g. 22AAAAA0000A1Z5" 
            value={gstin}
            maxLength={15}
            onChange={e => {
              setGstin(e.target.value.toUpperCase());
              if (errors.gstin) setErrors({ ...errors, gstin: null });
            }}
            error={errors.gstin}
          />
          <WizardInput 
            label="PAN" 
            placeholder="e.g. ABCDE1234F" 
            value={pan}
            maxLength={10}
            onChange={e => {
              setPan(e.target.value.toUpperCase());
              if (errors.pan) setErrors({ ...errors, pan: null });
            }}
            error={errors.pan}
          />
        </FormRow>

        <WizardCard title="Primary Office Location" subtitle="Primary operating location" style={{ padding: 0, border: 'none', boxShadow: 'none', marginBottom: '0' }}>
          <LocationGrid>
            <SearchableSelectGroup 
              label="Country" 
              value={country} 
              onChange={e => {
                setCountry(e.target.value);
                setState(''); // Reset state when country changes
                setCity(''); // Reset city when country changes
                if (errors.country) setErrors({ ...errors, country: null });
              }}
              options={countryOptions}
              placeholder="Select Country"
              error={errors.country}
            />
            <SearchableSelectGroup 
              label="State" 
              value={state} 
              onChange={e => {
                setState(e.target.value);
                setCity(''); // Reset city when state changes
                if (errors.state) setErrors({ ...errors, state: null });
              }}
              options={stateOptions}
              placeholder="Select State"
              error={errors.state}
            />
            <SearchableSelectGroup 
              label="City" 
              value={city} 
              onChange={e => {
                setCity(e.target.value);
                if (errors.city) setErrors({ ...errors, city: null });
              }}
              options={cityOptions}
              placeholder="Select City"
              error={errors.city}
            />
          </LocationGrid>
        </WizardCard>

        <FormRow>
          <TimeGroup>
            <Label>Start Time</Label>
            <TimeRow>
              <TimeInputWrap>
                <WizardInput 
                  type="time"
                  placeholder="HH:MM"
                  value={startTime}
                  onChange={e => {
                    setStartTime(e.target.value);
                    if (errors.startTime) setErrors({ ...errors, startTime: null });
                  }}
                  icon={<Clock size={18} />}
                  error={errors.startTime}
                />
              </TimeInputWrap>
              <AmPmWrap>
                <TimeSelect 
                  value={startAmPm} 
                  onChange={e => setStartAmPm(e.target.value)}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </TimeSelect>
              </AmPmWrap>
            </TimeRow>
          </TimeGroup>
          <div />
        </FormRow>
        
        <FormRow>
          <TimeGroup>
            <Label>End Time</Label>
            <TimeRow>
              <TimeInputWrap>
                <WizardInput 
                  type="time"
                  placeholder="HH:MM"
                  value={endTime}
                  onChange={e => {
                    setEndTime(e.target.value);
                    if (errors.endTime) setErrors({ ...errors, endTime: null });
                  }}
                  icon={<Clock size={18} />}
                  error={errors.endTime}
                />
              </TimeInputWrap>
              <AmPmWrap>
                <TimeSelect 
                  value={endAmPm} 
                  onChange={e => setEndAmPm(e.target.value)}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </TimeSelect>
              </AmPmWrap>
            </TimeRow>
          </TimeGroup>
          <div />
        </FormRow>
      </WizardCard>

      {/* Center / Branch card */}
      <WizardCard title="Center / Branch Details" subtitle="A diagnostic center may have multiple branches">
        <AddBranchBtn type="button" onClick={handleAddBranch}>
          <Plus size={16} /> Add Branch
        </AddBranchBtn>

        {branches.map((branch, index) => {
          let bCountryOptions = [{ value: 'India', label: 'India' }];
          let bStateOptions = [{ value: 'Maharashtra', label: 'Maharashtra' }];
          let bCityOptions = [{ value: '', label: 'Select City' }];

          if (geoData && Array.isArray(geoData)) {
            bCountryOptions = geoData.map((c) => ({ value: c.name, label: c.name }));

            const selectedCountry = geoData.find((c) => c.name === branch.country);
            if (selectedCountry && selectedCountry.states) {
              bStateOptions = selectedCountry.states.map((s) => ({ value: s.name, label: s.name }));

              const selectedState = selectedCountry.states.find((s) => s.name === branch.state);
              if (selectedState && selectedState.cities) {
                bCityOptions = [
                  { value: '', label: 'Select City' },
                  ...selectedState.cities.map((ct) => ({ value: ct.name, label: ct.name }))
                ];
              }
            }
          }

          return (
            <div key={index} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', marginBottom: '20px', backgroundColor: '#ffffff' }}>
            <BranchCardHeader>
              <BranchTitle>
                <span style={{ backgroundColor: '#009688', color: '#ffffff', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}>
                  {index + 1}
                </span>
                {branch.name ? branch.name : 'Untitled Branch'}
                {index === 0 && <BranchBadge>Main Branch</BranchBadge>}
              </BranchTitle>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <TrashBtn type="button" onClick={() => handleRemoveBranch(index)}>
                  <Trash2 size={16} />
                </TrashBtn>
                <ChevronUp size={16} color="#64748b" />
              </div>
            </BranchCardHeader>

            <WizardInput 
              label="Branch Name" 
              placeholder="Enter branch name" 
              value={branch.name}
              onChange={e => handleBranchChange(index, 'name', e.target.value)}
              error={errors.branches && errors.branches[index] && errors.branches[index].name}
            />

            <LocationGrid>
              <SearchableSelectGroup 
                label="Country" 
                value={branch.country || ''} 
                onChange={e => handleBranchCountryChange(index, e.target.value)}
                options={bCountryOptions}
                placeholder="Select Country"
                error={errors.branches && errors.branches[index] && errors.branches[index].country}
              />
              <SearchableSelectGroup 
                label="State" 
                value={branch.state || ''} 
                onChange={e => handleBranchStateChange(index, e.target.value)}
                options={bStateOptions}
                placeholder="Select State"
                error={errors.branches && errors.branches[index] && errors.branches[index].state}
              />
              <SearchableSelectGroup 
                label="City" 
                value={branch.city || ''} 
                onChange={e => handleBranchChange(index, 'city', e.target.value)}
                options={bCityOptions}
                placeholder="Select City"
                error={errors.branches && errors.branches[index] && errors.branches[index].city}
              />
            </LocationGrid>

            <FormRow>
              <WizardInput 
                label="Pincode" 
                placeholder="Enter pincode" 
                value={branch.pincode}
                maxLength={6}
                onChange={e => handleBranchChange(index, 'pincode', e.target.value.replace(/\D/g, ''))}
                error={errors.branches && errors.branches[index] && errors.branches[index].pincode}
              />
              <WizardInput 
                label="Service Radius (km)" 
                placeholder="e.g. 10" 
                value={branch.radius}
                onChange={e => handleBranchChange(index, 'radius', e.target.value.replace(/\D/g, ''))}
                error={errors.branches && errors.branches[index] && errors.branches[index].radius}
              />
            </FormRow>

            <WizardInput 
              label="Nodal Officer Name" 
              placeholder="Enter nodal officer full name" 
              value={branch.nodalOfficerName || ''}
              onChange={e => handleBranchChange(index, 'nodalOfficerName', e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
              error={errors.branches && errors.branches[index] && errors.branches[index].nodalOfficerName}
            />
            
            <FormRow>
              <WizardInput 
                label="Nodal Officer Email" 
                placeholder="officer@branch.com" 
                value={branch.nodalOfficerEmail || ''}
                onChange={e => handleBranchChange(index, 'nodalOfficerEmail', e.target.value)}
                error={errors.branches && errors.branches[index] && errors.branches[index].nodalOfficerEmail}
              />
              <WizardInput 
                label="Nodal Officer Phone" 
                placeholder="9876543210" 
                value={branch.nodalOfficerPhone || ''}
                maxLength={10}
                onChange={e => handleBranchChange(index, 'nodalOfficerPhone', e.target.value.replace(/\D/g, ''))}
                error={errors.branches && errors.branches[index] && errors.branches[index].nodalOfficerPhone}
              />
            </FormRow>

            <FormRow>
              <TimeGroup>
                <Label>Start Time</Label>
                <TimeRow>
                  <TimeInputWrap>
                    <WizardInput 
                      type="time"
                      placeholder="HH:MM"
                      value={branch.startTime}
                      onChange={e => handleBranchChange(index, 'startTime', e.target.value)}
                      icon={<Clock size={18} />}
                      error={errors.branches && errors.branches[index] && errors.branches[index].startTime}
                    />
                  </TimeInputWrap>
                  <AmPmWrap>
                    <TimeSelect 
                      value={branch.startAmPm} 
                      onChange={e => handleBranchChange(index, 'startAmPm', e.target.value)}
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </TimeSelect>
                  </AmPmWrap>
                </TimeRow>
              </TimeGroup>
              <div />
            </FormRow>
            
            <FormRow>
              <TimeGroup>
                <Label>End Time</Label>
                <TimeRow>
                  <TimeInputWrap>
                    <WizardInput 
                      type="time"
                      placeholder="HH:MM"
                      value={branch.endTime}
                      onChange={e => handleBranchChange(index, 'endTime', e.target.value)}
                      icon={<Clock size={18} />}
                      error={errors.branches && errors.branches[index] && errors.branches[index].endTime}
                    />
                  </TimeInputWrap>
                  <AmPmWrap>
                    <TimeSelect 
                      value={branch.endAmPm} 
                      onChange={e => handleBranchChange(index, 'endAmPm', e.target.value)}
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </TimeSelect>
                  </AmPmWrap>
                </TimeRow>
              </TimeGroup>
              <div />
            </FormRow>
          </div>
          );
        })}
      </WizardCard>

      <ButtonWrapper>
        <WizardButton variant="secondary" onClick={onPrev}>
          Previous
        </WizardButton>
        <WizardButton type="submit">
          Continue <ArrowRight size={16} />
        </WizardButton>
      </ButtonWrapper>
    </form>
  );
};

export default Step4BusinessDetails;
