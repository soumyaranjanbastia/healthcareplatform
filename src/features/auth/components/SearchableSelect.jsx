import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Search, ChevronDown } from 'lucide-react';

const SearchableDropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border: 1px solid ${props => props.$isOpen ? '#009688' : '#e2e8f0'};
  border-radius: 10px;
  font-size: 13.5px;
  font-weight: 600;
  background-color: #ffffff;
  color: ${props => props.$hasValue ? '#1e293b' : '#94a3b8'};
  cursor: pointer;
  box-sizing: border-box;
  
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
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  z-index: 1000;
  margin-top: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const SearchInputWrapper = styled.div`
  padding: 8px 12px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #f8fafc;
  
  svg {
    color: #94a3b8;
  }
  
  input {
    border: none;
    outline: none;
    width: 100%;
    font-size: 13.5px;
    font-weight: 600;
    color: #1e293b;
    background-color: transparent;
    
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
  padding: 10px 14px;
  font-size: 13.5px;
  font-weight: 600;
  color: #1e293b;
  cursor: pointer;
  
  &:hover {
    background-color: #f8fafc;
  }
  
  ${props => props.$isSelected && `
    background-color: #e6f9f3;
    color: #009688;
    font-weight: 700;
  `}
`;

const EmptyMessage = styled.div`
  padding: 12px 16px;
  font-size: 13px;
  color: #64748b;
  text-align: center;
`;

const SearchableSelect = ({ value, onChange, options = [], placeholder = 'Select option', disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value || opt === value);
  const selectedLabel = selectedOption ? (selectedOption.label || selectedOption.value || selectedOption) : value;

  const filteredOptions = options.filter(opt => {
    const label = String(opt.label || opt.value || opt).toLowerCase();
    return label.includes(searchText.toLowerCase());
  });

  return (
    <SearchableDropdownContainer ref={dropdownRef}>
      <DropdownHeader 
        $isOpen={isOpen} 
        $hasValue={!!value}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        style={{ opacity: disabled ? 0.6 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
      >
        <span>{selectedLabel || placeholder}</span>
        <ChevronDown size={16} color="#94a3b8" />
      </DropdownHeader>
      
      {isOpen && !disabled && (
        <DropdownListContainer>
          <SearchInputWrapper>
            <Search size={14} />
            <input 
              autoFocus
              type="text" 
              placeholder="Search..." 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </SearchInputWrapper>
          <ListOptions>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt, index) => {
                const optVal = opt.value !== undefined ? opt.value : opt;
                const optLabel = opt.label !== undefined ? opt.label : opt;
                const isSelected = optVal === value;

                return (
                  <ListItem 
                    key={index}
                    $isSelected={isSelected}
                    onClick={() => {
                      onChange({ target: { value: optVal } });
                      setIsOpen(false);
                      setSearchText('');
                    }}
                  >
                    {optLabel}
                  </ListItem>
                );
              })
            ) : (
              <EmptyMessage>No options found</EmptyMessage>
            )}
          </ListOptions>
        </DropdownListContainer>
      )}
    </SearchableDropdownContainer>
  );
};

export default SearchableSelect;
