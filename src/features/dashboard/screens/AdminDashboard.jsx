import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { X, Bell, CreditCard } from 'lucide-react';
import { dashboardOverviewRequest } from '../redux/dashboardOverviewSlice';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import AdminHeader from '../components/AdminHeader';
import AdminMetrics from '../components/AdminMetrics';
import AdminCharts from '../components/AdminCharts';
import AdminDataTable from '../components/AdminDataTable';
import StaffManagement from '../../staff/screens/StaffManagement';
import PatientManagement from '../../patients/screens/PatientManagement';
import PatientDetails from '../../patients/screens/PatientDetails';
import ComingSoon from '../../../components/common/ComingSoon';

// Doctors feature
import DoctorList from '../../doctors/screens/DoctorList';
import DoctorDetails from '../../doctors/screens/DoctorDetails';
import AddDoctorFlow from '../../doctors/screens/AddDoctorFlow';
import AvailabilitySettings from '../../doctors/screens/AvailabilitySettings';
import BranchManagementView from '../../doctors/components/BranchManagementView';
import { getBranchesRequest, deleteBranchRequest, clearDeleteState } from '../../doctors/redux/branchesSlice';
import { getDoctorListRequest } from '../../doctors/redux/doctorListSlice';
import { mapDoctorRequest, resetMapDoctorState } from '../../doctors/redux/mapDoctorSlice';

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

const TabControl = styled.div`
  display: flex;
  background-color: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 4px;
  width: fit-content;
  gap: 4px;
  margin-bottom: 8px;
  font-family: 'Outfit', sans-serif;
`;

const TabButton = styled.button`
  border: none;
  background-color: ${props => props.active ? '#ffffff' : 'transparent'};
  color: ${props => props.active ? '#0f172a' : '#64748b'};
  font-weight: 750;
  font-size: 13px;
  padding: 8px 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${props => props.active ? '0 4px 6px -1px rgba(0, 0, 0, 0.05)' : 'none'};

  &:hover {
    color: #0f172a;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const ModalCard = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  width: 100%;
  max-width: 440px;
  padding: 28px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  text-align: left;
  font-family: 'Outfit', sans-serif;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 18px;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }
`;

const ModalCloseBtn = styled.button`
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f1f5f9;
    color: #475569;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 700;
  color: #334155;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  font-size: 13.5px;
  font-weight: 600;
  outline: none;
  background-color: #ffffff;
  color: #1e293b;
  cursor: pointer;
`;

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.sendLoginOtp);
  const [currentView, setCurrentView] = useState('Dashboard');
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  // Doctors view states
  const [doctorView, setDoctorView] = useState('LIST'); // 'LIST' | 'DETAILS' | 'ADD_NEW' | 'AVAILABILITY'
  const [doctorsTab, setDoctorsTab] = useState('DIRECTORY'); // 'DIRECTORY' | 'BRANCHES'
  const [activeDoctor, setActiveDoctor] = useState(null);
  const [activeDoctorForAvailability, setActiveDoctorForAvailability] = useState(null);

  // Redux selector for doctor list
  const { doctors: reduxDoctors = [] } = useSelector(state => state.doctorList);
  const [doctors, setDoctors] = useState([]);

  const getArrayData = (val) => {
    if (Array.isArray(val)) return val;
    if (val && typeof val === 'object') {
      if (val.serviceProviders && Array.isArray(val.serviceProviders.list)) {
        return val.serviceProviders.list;
      }
      if (Array.isArray(val.doctors)) return val.doctors;
      if (Array.isArray(val.list)) return val.list;
      if (Array.isArray(val.data)) return val.data;

      const firstArrayProp = Object.values(val).find(prop => Array.isArray(prop));
      if (firstArrayProp) return firstArrayProp;

      for (const key of Object.keys(val)) {
        if (val[key] && typeof val[key] === 'object' && Array.isArray(val[key].list)) {
          return val[key].list;
        }
      }
    }
    return [];
  };

  useEffect(() => {
    if (reduxDoctors) {
      setDoctors(getArrayData(reduxDoctors));
    }
  }, [reduxDoctors]);

  // Branches states from Redux
  const {
    branches = [],
    isLoading: branchesLoading,
    errorMessage: branchesError,
    deleteSuccess,
    deleteErrorMessage
  } = useSelector(state => state.branches);

  // Map doctor state from Redux
  const {
    loading: mapDoctorLoading,
    success: mapDoctorSuccess,
    error: mapDoctorError
  } = useSelector(state => state.mapDoctor || {});

  const [activeDoctorForMapping, setActiveDoctorForMapping] = useState(null);
  const [showMappingModal, setShowMappingModal] = useState(false);

  // Fetch branches via Redux Saga (using POST with empty object)
  const fetchBranches = () => {
    dispatch(getBranchesRequest({}));
  };

  // Delete branch via Redux Saga
  const handleDeleteBranch = (branchId) => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
      dispatch(deleteBranchRequest({ branchId }));
    }
  };

  // Map doctor to branch via Redux Saga
  const handleMapDoctorToBranch = (doctorId, branchId) => {
    const companyIdVal = currentUser?.companyId || localStorage.getItem('companyId');
    dispatch(mapDoctorRequest({
      doctorId,
      branchId,
      companyId: companyIdVal ? Number(companyIdVal) : undefined
    }));
  };

  useEffect(() => {
    if (mapDoctorSuccess) {
      alert("Doctor branch mapping updated successfully!");
      dispatch(resetMapDoctorState());
      dispatch(getDoctorListRequest({}));
      fetchBranches();
    }
  }, [mapDoctorSuccess, dispatch]);

  useEffect(() => {
    if (mapDoctorError) {
      alert(mapDoctorError);
      dispatch(resetMapDoctorState());
    }
  }, [mapDoctorError, dispatch]);

  useEffect(() => {
    // Fetch dashboard overview when on Dashboard view
    if (currentView === 'Dashboard') {
      const companyId = currentUser?.companyId;
      if (companyId) {
        dispatch(dashboardOverviewRequest({ companyId }));
      }
    }
    // Fetch branches and doctors when on Doctors view
    if (currentView === 'Doctors') {
      fetchBranches();
      dispatch(getDoctorListRequest({}));
    }
  }, [dispatch, currentUser, currentView]);

  useEffect(() => {
    if (deleteSuccess) {
      alert("Branch deleted successfully");
      dispatch(clearDeleteState());
      fetchBranches();
    }
  }, [deleteSuccess, dispatch, currentUser]);

  useEffect(() => {
    if (deleteErrorMessage) {
      alert(deleteErrorMessage);
      dispatch(clearDeleteState());
    }
  }, [deleteErrorMessage, dispatch]);

  const handleSidebarItemClick = (label) => {
    setCurrentView(label);
    if (label === 'Doctors') {
      setDoctorView('LIST');
      setActiveDoctor(null);
      setDoctorsTab('DIRECTORY');
      fetchBranches();
      dispatch(getDoctorListRequest({}));
    }
    if (label !== 'Patients') {
      setSelectedPatientId(null);
    }
  };

  const handleViewPatientDetails = (patientId) => {
    setSelectedPatientId(patientId);
  };

  const handleBackToPatients = () => {
    setSelectedPatientId(null);
  };

  const handleDoctorAdded = (newDoctor) => {
    setDoctors(prev => [newDoctor, ...prev]);
    dispatch(getDoctorListRequest({}));
    setDoctorView('LIST');
  };

  const renderContent = () => {
    switch (currentView) {
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
      case 'Doctors':
        if (doctorView === 'ADD_NEW') {
          return (
            <AddDoctorFlow
              onClose={() => setDoctorView('LIST')}
              onComplete={handleDoctorAdded}
            />
          );
        }

        if (doctorView === 'DETAILS' && activeDoctor) {
          return (
            <DoctorDetails
              doctor={activeDoctor}
              onBack={() => setDoctorView('LIST')}
            />
          );
        }

        if (doctorView === 'AVAILABILITY' && activeDoctorForAvailability) {
          return (
            <AvailabilitySettings
              doctor={activeDoctorForAvailability}
              onBack={() => setDoctorView('LIST')}
            />
          );
        }

        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <TabControl>
              <TabButton active={doctorsTab === 'DIRECTORY'} onClick={() => setDoctorsTab('DIRECTORY')}>
                Doctors Directory
              </TabButton>
              <TabButton active={doctorsTab === 'BRANCHES'} onClick={() => setDoctorsTab('BRANCHES')}>
                Hospital Branches
              </TabButton>
            </TabControl>

            {doctorsTab === 'DIRECTORY' ? (
              <DoctorList
                doctors={(Array.isArray(doctors) ? doctors : []).map(doc => {
                  const mappedBranch = branches.find(b => b.id === doc.branchId);
                  return {
                    ...doc,
                    branchName: mappedBranch ? mappedBranch.branchName : 'Not Mapped',
                  };
                })}
                onViewDoctor={(doctor) => {
                  setActiveDoctor(doctor);
                  setDoctorView('DETAILS');
                }}
                onAddNewDoctor={() => setDoctorView('ADD_NEW')}
                onMapBranch={(doctor) => {
                  setActiveDoctorForMapping(doctor);
                  setShowMappingModal(true);
                }}
                onManageAvailability={(doctor) => {
                  setActiveDoctorForAvailability(doctor);
                  setDoctorView('AVAILABILITY');
                }}
              />
            ) : (
              <BranchManagementView
                branches={branches}
                doctors={Array.isArray(doctors) ? doctors : []}
                isLoading={branchesLoading}
                error={branchesError}
                onDeleteBranch={handleDeleteBranch}
                onMapDoctor={(branchId, doctorId) => {
                  handleMapDoctorToBranch(doctorId, branchId);
                }}
              />
            )}
          </div>
        );
      case 'Patients':
        if (selectedPatientId) {
          return <PatientDetails patientId={selectedPatientId} onBack={handleBackToPatients} />;
        }
        return <PatientManagement onViewDetails={handleViewPatientDetails} />;
      case 'Appointments':
        return (
          <ComingSoon
            badgeText="Appointments"
            title="Hospital Appointments Calendar"
            gradientSpan="Coming Soon"
            description="We are currently building a modular scheduling interface. You'll be able to view, update, and manage doctor bookings in a centralized calendar workspace."
            onNotifySuccess={() => setCurrentView('Dashboard')}
          />
        );
      case 'Analytics':
        return (
          <ComingSoon
            badgeText="Analytics"
            title="Central Analytics & Operations Metrics"
            gradientSpan="Under Construction"
            description="A complete operations analytics panel displaying real-time clinical logs, staff distribution, and custom report builders is currently under development."
            onNotifySuccess={() => setCurrentView('Dashboard')}
          />
        );
      case 'Settings':
        return (
          <ComingSoon
            badgeText="Settings"
            title="Admin System Settings & Audit Logs"
            gradientSpan="Under Development"
            description="Configure hospital details, roles, permissions, operational bounds, and track clinical auditing summaries. This panel will go live in the upcoming iteration."
            onNotifySuccess={() => setCurrentView('Dashboard')}
          />
        );
      case 'Notifications':
        return (
          <ComingSoon
            badgeText="Notifications"
            title="Real-Time Alerts & Notification Center"
            gradientSpan="Coming Soon"
            description="We are building a robust live messaging and clinical notifications hub. Register your email below to get early updates!"
            icon={<Bell size={30} />}
            onNotifySuccess={() => setCurrentView('Dashboard')}
          />
        );
      case 'Billing':
        return (
          <ComingSoon
            badgeText="Earnings & Finance"
            title="Hospital Revenue & Earnings Panels"
            gradientSpan="Under Development"
            description="A complete financial panel displaying real-time patient fee earnings, transaction summaries, and digital payouts is currently under construction."
            icon={<CreditCard size={30} />}
            onNotifySuccess={() => setCurrentView('Dashboard')}
          />
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
      activeSidebarLabel={currentView}
      onSidebarItemClick={handleSidebarItemClick}
    >
      {renderContent()}

      {/* QUICK BRANCH MAPPING MODAL */}
      {showMappingModal && activeDoctorForMapping && (
        <ModalOverlay onClick={() => !mapDoctorLoading && setShowMappingModal(false)}>
          <ModalCard onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <h3>Map Doctor to Branch</h3>
              <ModalCloseBtn onClick={() => !mapDoctorLoading && setShowMappingModal(false)} disabled={mapDoctorLoading}>
                <X size={16} />
              </ModalCloseBtn>
            </ModalHeader>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
              Map <strong>{activeDoctorForMapping.fullName || activeDoctorForMapping.name || 'Unknown Doctor'}</strong> to a branch:
            </p>
            <FormGroup>
              <Label>Select Branch</Label>
              <Select
                value={activeDoctorForMapping.branchId || ''}
                disabled={mapDoctorLoading}
                onChange={e => {
                  handleMapDoctorToBranch(activeDoctorForMapping.id, e.target.value ? Number(e.target.value) : null);
                  setShowMappingModal(false);
                }}
              >
                <option value="">-- Unmapped / No Branch --</option>
                {branches.map(b => (
                  <option key={b.id} value={b.id}>{b.branchName}</option>
                ))}
              </Select>
            </FormGroup>
            {mapDoctorLoading && (
              <div style={{ fontSize: '12px', color: '#009688', fontWeight: 600, textAlign: 'center' }}>
                Mapping doctor... Please wait.
              </div>
            )}
          </ModalCard>
        </ModalOverlay>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboard;
