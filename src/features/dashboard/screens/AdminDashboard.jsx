import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { dashboardOverviewRequest } from '../redux/dashboardOverviewSlice';
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
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.auth);

  useEffect(() => {
    const companyId = currentUser?.companyId;
    if (companyId) {
      dispatch(dashboardOverviewRequest({ companyId }));
    }
  }, [dispatch, currentUser]);

  return (
    <DashboardLayout 
      activeSidebarLabel="Dashboard"
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
