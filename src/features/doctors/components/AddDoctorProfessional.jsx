import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Plus, Minus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfessionRequest } from '../redux/getProfessionSlice';
import SearchableSelect from '../../auth/components/SearchableSelect';

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
`;

const FormTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 700;
  color: #1e293b;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  font-size: 13.5px;
  outline: none;
  font-weight: 600;
  background-color: #ffffff;
  color: #1e293b;
  box-sizing: border-box;
  transition: all 0.2s ease;

  &:focus {
    border-color: #009688;
    box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.08);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  font-size: 13.5px;
  outline: none;
  font-weight: 600;
  background-color: #ffffff;
  color: #1e293b;
  cursor: pointer;
  box-sizing: border-box;

  &:focus {
    border-color: #009688;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  font-size: 13.5px;
  outline: none;
  font-weight: 600;
  background-color: #ffffff;
  color: #1e293b;
  min-height: 100px;
  font-family: inherit;
  box-sizing: border-box;
  resize: vertical;

  &:focus {
    border-color: #009688;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const PhoneInputContainer = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`;

const CounterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 6px;
  width: fit-content;
`;

const CounterBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background-color: #f1f5f9;
  color: #475569;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background-color: #e2e8f0;
  }
`;

const CounterValue = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #1e293b;
  min-width: 30px;
  text-align: center;
`;

const TagsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid ${props => props.selected ? '#009688' : '#e2e8f0'};
  background-color: ${props => props.selected ? '#e6f9f3' : '#ffffff'};
  color: ${props => props.selected ? '#009688' : '#64748b'};
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: #009688;
    color: #009688;
  }
`;

const ContinueBtn = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #009688;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  margin-top: 10px;

  &:hover {
    background-color: #00796b;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 150, 136, 0.15);
  }
`;

const ErrorText = styled.span`
  font-size: 11px;
  color: #ef4444;
  font-weight: 600;
  margin-top: 4px;
  display: block;
`;

const AddDoctorProfessional = ({
  regNo, setRegNo,
  council, setCouncil,
  qualification, setQualification,
  degree, setDegree,
  specialization, setSpecialization,
  experience, setExperience,
  selectedLanguages, setSelectedLanguages,
  condition, setCondition,
  conditionsList, setConditionsList,
  about, setAbout,
  onContinue
}) => {
  const [errors, setErrors] = useState({});
  const languages = [
    'English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 
    'Marathi', 'Bengali', 'Gujarati', 'Punjabi', 'Urdu', 'Odia'
  ];

  const dispatch = useDispatch();
  const { professions, isLoading: isSpecsLoading } = useSelector(state => state.getProfession);

  const [specializationsList, setSpecializationsList] = useState([
    'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics'
  ]);

  useEffect(() => {
    if (!professions) {
      dispatch(getProfessionRequest());
    }
  }, [dispatch, professions]);

  useEffect(() => {
    if (professions && professions.success && Array.isArray(professions.services)) {
      const healthService = professions.services.find(s => s.name === 'health' || s.id === 1);
      if (healthService && Array.isArray(healthService.specializations)) {
        setSpecializationsList(healthService.specializations);
        
        // If the current specialization state is empty or not in the fetched list, select the first option
        if (healthService.specializations.length > 0 && !healthService.specializations.includes(specialization)) {
          setSpecialization(healthService.specializations[0]);
        }
      }
    }
  }, [professions, specialization, setSpecialization]);

  const handleToggleLanguage = (lang) => {
    if (selectedLanguages.includes(lang)) {
      setSelectedLanguages(selectedLanguages.filter(l => l !== lang));
    } else {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
  };

  const handleAddCondition = () => {
    if (condition.trim()) {
      setConditionsList([...conditionsList, condition.trim()]);
      setCondition('');
    }
  };

  const handleNext = () => {
    const newErrors = {};
    if (!regNo) newErrors.regNo = 'Medical Registration Number is required.';
    if (!council) newErrors.council = 'Registration Council is required.';
    if (!qualification) newErrors.qualification = 'Highest Qualification is required.';
    if (!specialization) newErrors.specialization = 'Specialization is required.';
    if (!about) newErrors.about = 'About description is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    onContinue();
  };

  return (
    <FormSection>
      <FormTitle>Professional Details</FormTitle>

      <InputGroup>
        <Label>Medical Registration Number*</Label>
        <Input 
          type="text" 
          placeholder="Enter registration number" 
          value={regNo}
          onChange={e => setRegNo(e.target.value)}
          style={errors.regNo ? { borderColor: '#ef4444', boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.08)' } : {}}
        />
        {errors.regNo && <ErrorText>{errors.regNo}</ErrorText>}
      </InputGroup>

      <Row>
        <InputGroup>
          <Label>Registration Council*</Label>
          <SearchableSelect 
            value={council} 
            onChange={e => setCouncil(e.target.value)}
            placeholder="Select Council"
            options={[
              { value: 'Medical Council of India', label: 'Medical Council of India' },
              { value: 'State Medical Council', label: 'State Medical Council' },
              { value: 'Dental Council of India', label: 'Dental Council of India' },
              { value: 'Indian Nursing Council', label: 'Indian Nursing Council' }
            ]}
            error={errors.council}
          />
        </InputGroup>

        <InputGroup>
          <Label>Highest Qualification*</Label>
          <SearchableSelect 
            value={qualification} 
            onChange={e => setQualification(e.target.value)}
            placeholder="Select Qualification"
            options={[
              { value: 'MBBS', label: 'MBBS' },
              { value: 'MD', label: 'MD' },
              { value: 'MS', label: 'MS' },
              { value: 'DNB', label: 'DNB' },
              { value: 'DM', label: 'DM' },
              { value: 'MCh', label: 'MCh' },
              { value: 'BDS', label: 'BDS' },
              { value: 'MDS', label: 'MDS' }
            ]}
            error={errors.qualification}
          />
        </InputGroup>
      </Row>

      <Row>
        <InputGroup>
          <Label>Degree to display</Label>
          <Input 
            type="text" 
            placeholder="eg: MBBS, BMS etc." 
            value={degree}
            onChange={e => setDegree(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <Label>Specialization*</Label>
          <SearchableSelect 
            value={specialization} 
            onChange={e => setSpecialization(e.target.value)}
            placeholder={isSpecsLoading ? 'Loading specializations...' : 'Select Specialization'}
            disabled={isSpecsLoading}
            options={specializationsList.map(spec => ({ value: spec, label: spec }))}
            error={errors.specialization}
          />
        </InputGroup>
      </Row>

      <InputGroup>
        <Label>Years of Experience</Label>
        <CounterWrapper>
          <CounterBtn 
            type="button" 
            onClick={() => setExperience(prev => Math.max(1, prev - 1))}
          >
            <Minus size={14} />
          </CounterBtn>
          <CounterValue>{experience}</CounterValue>
          <CounterBtn 
            type="button" 
            onClick={() => setExperience(prev => prev + 1)}
          >
            <Plus size={14} />
          </CounterBtn>
        </CounterWrapper>
      </InputGroup>

      <InputGroup>
        <Label>Languages Spoken</Label>
        <TagsList>
          {languages.map(lang => (
            <Tag 
              key={lang}
              type="button"
              selected={selectedLanguages.includes(lang)}
              onClick={() => handleToggleLanguage(lang)}
            >
              {lang}
            </Tag>
          ))}
        </TagsList>
      </InputGroup>

      <InputGroup>
        <Label>Condition we treat</Label>
        <PhoneInputContainer>
          <Input 
            type="text" 
            placeholder="Add a condition..." 
            value={condition}
            onChange={e => setCondition(e.target.value)}
          />
          <CounterBtn type="button" onClick={handleAddCondition} style={{ width: '44px', height: '44px', borderRadius: '10px' }}>
            <Plus size={18} />
          </CounterBtn>
        </PhoneInputContainer>
        <TagsList style={{ marginTop: 8 }}>
          {conditionsList.map(cond => (
            <span 
              key={cond} 
              style={{
                backgroundColor: '#f1f5f9',
                padding: '4px 12px',
                borderRadius: '50px',
                fontSize: '11px',
                fontWeight: 600,
                color: '#475569'
              }}
            >
              {cond}
            </span>
          ))}
        </TagsList>
      </InputGroup>

      <InputGroup>
        <Label>About*</Label>
        <TextArea 
          placeholder="Write about Yourself"
          value={about}
          onChange={e => setAbout(e.target.value)}
          style={errors.about ? { borderColor: '#ef4444', boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.08)' } : {}}
        />
        {errors.about && <ErrorText>{errors.about}</ErrorText>}
      </InputGroup>

      <ContinueBtn onClick={handleNext}>
        Next
      </ContinueBtn>
    </FormSection>
  );
};

export default AddDoctorProfessional;
