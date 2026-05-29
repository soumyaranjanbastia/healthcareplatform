import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowRight, Briefcase, Plus, Trash2, ChevronUp, Clock } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import WizardCard from '../../components/WizardCard';
import WizardInput from '../../components/WizardInput';
import WizardSelect from '../../components/WizardSelect';
import WizardButton, { ButtonWrapper } from '../../components/WizardButton';
import { getGeoDataRequest } from '../../redux/geoDataSlice';

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const WarningBox = styled.div`
  background-color: #fffaf0;
  border-radius: 10px;
  padding: 14px 16px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #c05621;
  font-weight: 500;
  margin-bottom: 20px;
  line-height: 1.4;
`;

const LocationGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1.2fr 1.6fr;
  gap: 16px;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const TimeRow = styled.div`
  display: flex;
  gap: 8px;
`;

const TimeInputWrap = styled.div`
  flex: 1;
`;

const AmPmWrap = styled.div`
  width: 80px;
  padding-top: 25px; /* Aligns the select with the input below the label */
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
    if (branches.length === 1) return alert('At least one main branch is required.');
    setBranches(branches.filter((_, i) => i !== index));
  };

  const handleBranchChange = (index, field, value) => {
    const updated = [...branches];
    updated[index][field] = value;
    setBranches(updated);
  };

  const handleBranchCountryChange = (index, value) => {
    const updated = [...branches];
    updated[index] = { ...updated[index], country: value, state: '', city: '' };
    setBranches(updated);
  };

  const handleBranchStateChange = (index, value) => {
    const updated = [...branches];
    updated[index] = { ...updated[index], state: value, city: '' };
    setBranches(updated);
  };

  useEffect(() => {
    if (!geoData) {
      dispatch(getGeoDataRequest());
    }
  }, [dispatch, geoData]);

  const handleContinue = (e) => {
    e.preventDefault();

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
    <form onSubmit={handleContinue}>
      {/* Company details */}
      <WizardCard title="Company Details" icon={<Briefcase size={20} />}>
        <WizardInput 
          label="Company Name" 
          placeholder="HealthFirst Pharmacy" 
          value={companyName}
          onChange={e => setCompanyName(e.target.value)}
        />
        <FormRow>
          <WizardInput 
            label="GSTIN" 
            placeholder="e.g. 22AAAAA0000A1Z5" 
            value={gstin}
            onChange={e => setGstin(e.target.value)}
          />
          <WizardInput 
            label="PAN" 
            placeholder="e.g. ABCDE1234F" 
            value={pan}
            maxLength={10}
            onChange={e => setPan(e.target.value.toUpperCase())}
          />
        </FormRow>

        <WizardCard title="Primary Office Location" subtitle="Primary operating location" style={{ padding: 0, border: 'none', boxShadow: 'none', marginBottom: '0' }}>
          <LocationGrid>
            <WizardSelect 
              label="Country" 
              value={country} 
              onChange={e => {
                setCountry(e.target.value);
                setState(''); // Reset state when country changes
                setCity(''); // Reset city when country changes
              }}
              options={countryOptions}
            />
            <WizardSelect 
              label="State" 
              value={state} 
              onChange={e => {
                setState(e.target.value);
                setCity(''); // Reset city when state changes
              }}
              options={stateOptions}
            />
            <WizardSelect 
              label="City" 
              value={city} 
              onChange={e => setCity(e.target.value)}
              options={cityOptions}
            />
          </LocationGrid>
        </WizardCard>

        <FormRow>
          <TimeRow>
            <TimeInputWrap>
              <WizardInput 
                label="Start Time" 
                type="time"
                placeholder="HH:MM"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                icon={<Clock size={18} />}
              />
            </TimeInputWrap>
            <AmPmWrap>
              <WizardSelect 
                value={startAmPm} 
                onChange={e => setStartAmPm(e.target.value)}
                options={[{value:'AM', label:'AM'}, {value:'PM', label:'PM'}]} 
              />
            </AmPmWrap>
          </TimeRow>
          <TimeRow>
            <TimeInputWrap>
              <WizardInput 
                label="End Time" 
                type="time"
                placeholder="HH:MM"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                icon={<Clock size={18} />}
              />
            </TimeInputWrap>
            <AmPmWrap>
              <WizardSelect 
                value={endAmPm} 
                onChange={e => setEndAmPm(e.target.value)}
                options={[{value:'AM', label:'AM'}, {value:'PM', label:'PM'}]} 
              />
            </AmPmWrap>
          </TimeRow>
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
            />

            <LocationGrid>
              <WizardSelect 
                label="Country" 
                value={branch.country || ''} 
                onChange={e => handleBranchCountryChange(index, e.target.value)}
                options={bCountryOptions}
              />
              <WizardSelect 
                label="State" 
                value={branch.state || ''} 
                onChange={e => handleBranchStateChange(index, e.target.value)}
                options={bStateOptions}
              />
              <WizardSelect 
                label="City" 
                value={branch.city || ''} 
                onChange={e => handleBranchChange(index, 'city', e.target.value)}
                options={bCityOptions}
              />
            </LocationGrid>

            <FormRow>
              <WizardInput 
                label="Pincode" 
                placeholder="Enter pincode" 
                value={branch.pincode}
                maxLength={6}
                onChange={e => handleBranchChange(index, 'pincode', e.target.value.replace(/\D/g, ''))}
              />
              <WizardInput 
                label="Service Radius (km)" 
                placeholder="e.g. 10" 
                value={branch.radius}
                onChange={e => handleBranchChange(index, 'radius', e.target.value.replace(/\D/g, ''))}
              />
            </FormRow>

            <WizardInput 
              label="Nodal Officer Name" 
              placeholder="Enter nodal officer full name" 
              value={branch.nodalOfficerName || ''}
              onChange={e => handleBranchChange(index, 'nodalOfficerName', e.target.value)}
            />
            
            <FormRow>
              <WizardInput 
                label="Nodal Officer Email" 
                placeholder="officer@branch.com" 
                value={branch.nodalOfficerEmail || ''}
                onChange={e => handleBranchChange(index, 'nodalOfficerEmail', e.target.value)}
              />
              <WizardInput 
                label="Nodal Officer Phone" 
                placeholder="9876543210" 
                value={branch.nodalOfficerPhone || ''}
                maxLength={10}
                onChange={e => handleBranchChange(index, 'nodalOfficerPhone', e.target.value.replace(/\D/g, ''))}
              />
            </FormRow>

            <FormRow>
              <TimeRow>
                <TimeInputWrap>
                  <WizardInput 
                    label="Start Time" 
                    type="time"
                    placeholder="HH:MM"
                    value={branch.startTime}
                    onChange={e => handleBranchChange(index, 'startTime', e.target.value)}
                    icon={<Clock size={18} />}
                  />
                </TimeInputWrap>
                <AmPmWrap>
                  <WizardSelect 
                    value={branch.startAmPm} 
                    onChange={e => handleBranchChange(index, 'startAmPm', e.target.value)}
                    options={[{value:'AM', label:'AM'}, {value:'PM', label:'PM'}]} 
                  />
                </AmPmWrap>
              </TimeRow>
              <TimeRow>
                <TimeInputWrap>
                  <WizardInput 
                    label="End Time" 
                    type="time"
                    placeholder="HH:MM"
                    value={branch.endTime}
                    onChange={e => handleBranchChange(index, 'endTime', e.target.value)}
                    icon={<Clock size={18} />}
                  />
                </TimeInputWrap>
                <AmPmWrap>
                  <WizardSelect 
                    value={branch.endAmPm} 
                    onChange={e => handleBranchChange(index, 'endAmPm', e.target.value)}
                    options={[{value:'AM', label:'AM'}, {value:'PM', label:'PM'}]} 
                  />
                </AmPmWrap>
              </TimeRow>
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
