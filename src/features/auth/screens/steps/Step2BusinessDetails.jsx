import React, { useState } from 'react';
import styled from 'styled-components';
import { ArrowRight, Briefcase, Plus, Trash2, ChevronUp } from 'lucide-react';
import WizardCard from '../../components/WizardCard';
import WizardInput from '../../components/WizardInput';
import WizardSelect from '../../components/WizardSelect';
import WizardButton, { ButtonWrapper } from '../../components/WizardButton';

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
  border: 1px solid #feebc8;
  border-radius: 10px;
  padding: 14px 16px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #c05621;
  font-weight: 500;
  margin-bottom: 20px;
  line-height: 1.4;
`;

const RepresentativeCard = styled.div`
  background-color: #fafafa;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
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

const Step2BusinessDetails = ({ onNext, onPrev, data, updateData }) => {
  // Business fields
  const [businessName, setBusinessName] = useState(data.businessName || 'HealthFirst Pharmacy');
  const [gstin, setGstin] = useState(data.gstin || '22AAAAA0000A1Z5');
  const [pan, setPan] = useState(data.pan || 'ABCDE1234F');
  
  // Authorized rep fields
  const [repName, setRepName] = useState(data.repName || '');
  const [repPhone, setRepPhone] = useState(data.repPhone || '');
  const [repEmail, setRepEmail] = useState(data.repEmail || '');
  const [repDesignation, setRepDesignation] = useState(data.repDesignation || '');
  
  // Working hours
  const [workingHours, setWorkingHours] = useState(data.workingHours || 'Mon – Fri, 9:00 AM – 6:00 PM');

  // Branch details (State array)
  const [branches, setBranches] = useState(data.branches || [
    {
      name: '',
      type: 'Pharmacy',
      address: '',
      city: '',
      state: 'Maharashtra',
      pincode: '',
      radius: '10',
      hours: 'Mon – Fri, 9:00 AM – 6:00 PM'
    }
  ]);

  const handleAddBranch = () => {
    setBranches([...branches, {
      name: '',
      type: 'Clinic',
      address: '',
      city: '',
      state: 'Maharashtra',
      pincode: '',
      radius: '5',
      hours: 'Mon – Fri, 9:00 AM – 6:00 PM'
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

  const handleContinue = (e) => {
    e.preventDefault();
    if (!businessName || !pan || !repName || !repPhone || !repEmail || !repDesignation) {
      return alert('Please fill in all required Representative and Business fields.');
    }
    
    // Check branch validation
    for (let i = 0; i < branches.length; i++) {
      if (!branches[i].name || !branches[i].address || !branches[i].city || !branches[i].pincode) {
        return alert(`Please fill in all required fields for Branch #${i + 1}.`);
      }
    }

    updateData({
      businessName, gstin, pan,
      repName, repPhone, repEmail, repDesignation,
      workingHours, branches
    });
    onNext();
  };

  return (
    <form onSubmit={handleContinue}>
      {/* Business details */}
      <WizardCard title="Business Details" icon={<Briefcase size={20} />}>
        <WizardInput 
          label="Business Name" 
          required 
          placeholder="HealthFirst Pharmacy" 
          value={businessName}
          onChange={e => setBusinessName(e.target.value)}
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
            required 
            placeholder="e.g. ABCDE1234F" 
            value={pan}
            maxLength={10}
            onChange={e => setPan(e.target.value.toUpperCase())}
          />
        </FormRow>

        {/* Rep Subcard */}
        <RepresentativeCard>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b', marginBottom: '12px' }}>
            Authorized Representative
          </h3>
          <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '16px', marginTop: '-8px' }}>
            Legal contact for compliance and communications
          </p>
          
          <WarningBox>
            This person will be the primary legal contact for regulatory and compliance matters.
          </WarningBox>

          <FormRow>
            <WizardInput 
              label="Authorized User Name" 
              required 
              placeholder="Full legal name" 
              value={repName}
              onChange={e => setRepName(e.target.value)}
            />
            <WizardInput 
              label="Authorized Phone Number" 
              required 
              placeholder="+91 XXXXX XXXXX" 
              value={repPhone}
              onChange={e => setRepPhone(e.target.value)}
            />
          </FormRow>
          <FormRow>
            <WizardInput 
              label="Authorized Email ID" 
              required 
              type="email" 
              placeholder="auth@company.com" 
              value={repEmail}
              onChange={e => setRepEmail(e.target.value)}
            />
            <WizardInput 
              label="Designation" 
              required 
              placeholder="e.g. Director" 
              value={repDesignation}
              onChange={e => setRepDesignation(e.target.value)}
            />
          </FormRow>
        </RepresentativeCard>

        <WizardInput 
          label="Working Hours" 
          placeholder="Mon – Fri, 9:00 AM – 6:00 PM" 
          value={workingHours}
          onChange={e => setWorkingHours(e.target.value)}
        />
      </WizardCard>

      {/* Center / Branch card */}
      <WizardCard title="Center / Branch Details" subtitle="A diagnostic center may have multiple branches">
        <AddBranchBtn type="button" onClick={handleAddBranch}>
          <Plus size={16} /> Add Branch
        </AddBranchBtn>

        {branches.map((branch, index) => (
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

            <FormRow>
              <WizardInput 
                label="Branch Name" 
                required 
                placeholder="Enter branch name" 
                value={branch.name}
                onChange={e => handleBranchChange(index, 'name', e.target.value)}
              />
              <WizardSelect 
                label="Branch Type" 
                required 
                value={branch.type} 
                onChange={e => handleBranchChange(index, 'type', e.target.value)}
                options={[
                  { value: 'Pharmacy', label: 'Pharmacy' },
                  { value: 'Clinic', label: 'Clinic' },
                  { value: 'Diagnostic Center', label: 'Diagnostic Center' }
                ]}
              />
            </FormRow>

            <WizardInput 
              label="Address" 
              required 
              placeholder="Enter branch address" 
              value={branch.address}
              onChange={e => handleBranchChange(index, 'address', e.target.value)}
            />

            <FormRow>
              <WizardInput 
                label="City" 
                required 
                placeholder="Enter city" 
                value={branch.city}
                onChange={e => handleBranchChange(index, 'city', e.target.value)}
              />
              <WizardSelect 
                label="State" 
                required 
                value={branch.state} 
                onChange={e => handleBranchChange(index, 'state', e.target.value)}
                options={[
                  { value: 'Maharashtra', label: 'Maharashtra' },
                  { value: 'Delhi', label: 'Delhi' },
                  { value: 'Karnataka', label: 'Karnataka' }
                ]}
              />
            </FormRow>

            <FormRow>
              <WizardInput 
                label="Pincode" 
                required 
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
              label="Working Hours" 
              placeholder="Mon – Fri, 9:00 AM – 6:00 PM" 
              value={branch.hours}
              onChange={e => handleBranchChange(index, 'hours', e.target.value)}
            />
          </div>
        ))}
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

export default Step2BusinessDetails;
