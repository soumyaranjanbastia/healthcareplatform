import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { dashboardOverviewRequest } from '../redux/dashboardOverviewSlice';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import AdminHeader from '../components/AdminHeader';
import AdminMetrics from '../components/AdminMetrics';
import AdminCharts from '../components/AdminCharts';
import AdminDataTable from '../components/AdminDataTable';
import StaffManagement from '../../staff/screens/StaffManagement';
import PatientList from '../../patients/screens/PatientList';
import AlertModal from '../../../components/Alertmodal';

const ContentWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const PlaceholderCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.01);
  font-family: 'Outfit', sans-serif;

  h3 {
    font-size: 20px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: #64748b;
  }
`;

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.auth);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  useEffect(() => {
    const companyId = currentUser?.companyId;
    if (companyId) {
      dispatch(dashboardOverviewRequest({ companyId }));
    }
  }, [dispatch, currentUser]);

  const handleNavClick = (label) => {
    if (label === 'Logout') {
      setShowSignOutConfirm(true);
    } else {
      setActiveTab(label);
    }
  };

  const confirmSignOut = () => {
    setShowSignOutConfirm(false);
    dispatch({ type: 'LOGOUT' });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <ContentWrapper>
            <AdminHeader />
            <AdminMetrics />
            <AdminCharts />
            <AdminDataTable />
          </ContentWrapper>
        );
      case 'Staff':
        return <StaffManagement />;
      case 'Patients':
        return (
          <PatientList 
            onSelectPatient={(patient) => alert(`Selected Patient: ${patient.name}`)}
            onNewBooking={() => alert('New Booking flow coming soon!')}
          />
        );
      case 'Appointments':
        return (
          <PlaceholderCard>
            <h3>Appointments Calendar</h3>
            <p>Operational hospital calendar schedule interface coming soon.</p>
          </PlaceholderCard>
        );
      case 'Analytics':
        return (
          <ContentWrapper>
            <AdminHeader />
            <AdminCharts />
          </ContentWrapper>
        );
      case 'Settings':
        return (
          <PlaceholderCard>
            <h3>Admin System Settings</h3>
            <p>Configure hospital details, roles, permissions, and audit logs.</p>
          </PlaceholderCard>
        );
      default:
        return (
          <ContentWrapper>
            <AdminHeader />
            <AdminMetrics />
            <AdminCharts />
            <AdminDataTable />
          </ContentWrapper>
        );
    }
  };

  return (
    <DashboardLayout 
      activeSidebarLabel={activeTab}
      onNavClick={handleNavClick}
    >
      {renderContent()}

      <AlertModal
        isOpen={showSignOutConfirm}
        message="Are you sure you want to sign out of Swastyam connect?"
        title="Sign Out"
        confirmText="Yes, Sign Out"
        cancelText="Cancel"
        onClose={() => setShowSignOutConfirm(false)}
        onConfirm={confirmSignOut}
      />
    </DashboardLayout>
  );
};

export default AdminDashboard;
