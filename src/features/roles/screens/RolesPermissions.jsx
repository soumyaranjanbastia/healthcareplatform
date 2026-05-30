import React, { useState } from 'react';
import styled from 'styled-components';
import { Check } from 'lucide-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: 'Inter', sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0;
`;

const OverviewCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e2e8f0;
`;

const RoleInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #0f172a;
  }

  p {
    margin: 0;
    font-size: 13px;
    color: #64748b;
  }
`;

const AccessBadge = styled.div`
  background: #f3e8ff;
  color: #9333ea;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid #e9d5ff;
`;

const MatrixCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
`;

const MatrixHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const MatrixTitle = styled.h4`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    padding: 12px 16px;
    font-size: 12px;
    font-weight: 600;
    color: #64748b;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
  }

  td {
    padding: 16px;
    font-size: 13px;
    color: #1e293b;
    border-bottom: 1px solid #f1f5f9;
    font-weight: 500;
  }

  tr:last-child td {
    border-bottom: none;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 10px;
`;

const CustomCheckbox = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${props => props.checked ? '#00b5d8' : '#f1f5f9'};
  border: 1px solid ${props => props.checked ? '#00b5d8' : '#cbd5e1'};
  color: white;

  &:hover {
    border-color: ${props => props.checked ? '#00b5d8' : '#94a3b8'};
  }
`;

const FooterActions = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
  margin-top: 10px;
`;

const SaveBtn = styled.button`
  background: #00b5d8;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 24px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #009ebf;
  }
`;

const RolesPermissions = () => {
  // Initial state mimicking the screenshot
  const [permissions, setPermissions] = useState({
    'Dashboard': { superAdmin: true, finance: true, doctor: true, receptionist: true },
    'Patient Management': { superAdmin: true, finance: false, doctor: false, receptionist: true },
    'Doctor Management': { superAdmin: true, finance: false, doctor: false, receptionist: true },
    'Staff Management': { superAdmin: true, finance: false, doctor: false, receptionist: false },
    'Branch Management': { superAdmin: true, finance: false, doctor: true, receptionist: false },
    'Appointments': { superAdmin: true, finance: false, doctor: true, receptionist: true },
    'Finance & Transection': { superAdmin: true, finance: true, doctor: false, receptionist: false },
    'Billing': { superAdmin: true, finance: true, doctor: true, receptionist: true },
    'Analytics': { superAdmin: true, finance: true, doctor: true, receptionist: false },
  });

  const togglePermission = (module, role) => {
    setPermissions(prev => ({
      ...prev,
      [module]: {
        ...prev[module],
        [role]: !prev[module][role]
      }
    }));
  };

  const modules = Object.keys(permissions);

  return (
    <Container>
      <Header>
        <TitleArea>
          <Title>Role & Module Access Control</Title>
          <Subtitle>Manage permissions and access levels by staff role</Subtitle>
        </TitleArea>
      </Header>

      <OverviewCard>
        <RoleInfo>
          <h3>Role Overview — Admin</h3>
          <p>All Branches</p>
        </RoleInfo>
        <AccessBadge>Full Access</AccessBadge>
      </OverviewCard>

      <MatrixCard>
        <MatrixHeader>
          <MatrixTitle>Permission Matrix</MatrixTitle>
          <SaveBtn>Save Permissions</SaveBtn>
        </MatrixHeader>
        
        <div style={{ overflowX: 'auto' }}>
          <Table>
            <thead>
              <tr>
                <th style={{ width: '25%' }}>Module</th>
                <th>Super Admin</th>
                <th>Finance</th>
                <th>Doctor</th>
                <th>Receptionist</th>
              </tr>
            </thead>
            <tbody>
              {modules.map(module => (
                <tr key={module}>
                  <td>{module}</td>
                  <td>
                    <CheckboxWrapper>
                      <CustomCheckbox 
                        checked={permissions[module].superAdmin}
                        onClick={() => togglePermission(module, 'superAdmin')}
                      >
                        {permissions[module].superAdmin && <Check size={12} strokeWidth={3} />}
                      </CustomCheckbox>
                    </CheckboxWrapper>
                  </td>
                  <td>
                    <CheckboxWrapper>
                      <CustomCheckbox 
                        checked={permissions[module].finance}
                        onClick={() => togglePermission(module, 'finance')}
                      >
                        {permissions[module].finance && <Check size={12} strokeWidth={3} />}
                      </CustomCheckbox>
                    </CheckboxWrapper>
                  </td>
                  <td>
                    <CheckboxWrapper>
                      <CustomCheckbox 
                        checked={permissions[module].doctor}
                        onClick={() => togglePermission(module, 'doctor')}
                      >
                        {permissions[module].doctor && <Check size={12} strokeWidth={3} />}
                      </CustomCheckbox>
                    </CheckboxWrapper>
                  </td>
                  <td>
                    <CheckboxWrapper>
                      <CustomCheckbox 
                        checked={permissions[module].receptionist}
                        onClick={() => togglePermission(module, 'receptionist')}
                      >
                        {permissions[module].receptionist && <Check size={12} strokeWidth={3} />}
                      </CustomCheckbox>
                    </CheckboxWrapper>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </MatrixCard>

    </Container>
  );
};

export default RolesPermissions;
