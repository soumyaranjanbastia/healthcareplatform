import React from 'react';
import styled from 'styled-components';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import AdminHeader from '../components/AdminHeader';
import AdminMetrics from '../components/AdminMetrics';
import AdminCharts from '../components/AdminCharts';
import AdminDataTable from '../components/AdminDataTable';

const ContentWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const AdminDashboard = () => {
  return (
    <DashboardLayout 
      activeSidebarLabel="Dashboard"
      userName="Admin User"
      userRole="Super Admin"
    >
      <ContentWrapper>
        <AdminHeader />
        <AdminMetrics />
        <AdminCharts />
        <AdminDataTable />
      </ContentWrapper>
    </DashboardLayout>
  );
};

export default AdminDashboard;
