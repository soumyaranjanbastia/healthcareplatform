import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import RightDrawer from '../../../components/common/RightDrawer';
import DoctorAvailability from '../components/DoctorAvailability';
import TodayAppointments from '../components/TodayAppointments';
import FollowUpQueue from '../components/FollowUpQueue';
import NewBookingFlow from '../../booking/screens/NewBookingFlow';
import PatientList from '../../patients/screens/PatientList';
import PatientDetails from '../../patients/screens/PatientDetails';
import PatientConsultationDetails from '../../patients/screens/PatientConsultationDetails';
import DoctorList from '../../doctors/screens/DoctorList';
import DoctorDetails from '../../doctors/screens/DoctorDetails';
import AddDoctorFlow from '../../doctors/screens/AddDoctorFlow';
import { getDoctorListRequest } from '../../doctors/redux/doctorListSlice';
import AlertModal from '../../../components/Alertmodal';
import StaffManagement from '../../staff/screens/StaffManagement';
import {
  Calendar, Users, Search, Bell, Settings, LogOut, Plus, ChevronDown,
  Phone, UserCheck, ShieldAlert, CalendarPlus, Menu, X, UserCog, Stethoscope
} from 'lucide-react';


// --- KEYFRAMES ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

// --- STYLED COMPONENTS ---
const DashboardLayout = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: #f3f4f6;
  font-family: 'Outfit', 'Inter', sans-serif;
  color: #1e293b;
`;

// SIDEBAR STYLE
const SidebarContainer = styled.aside`
  width: 260px;
  background-color: #ffffff;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  padding: 24px;
  position: fixed;
  height: 100vh;
  z-index: 1000;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 1024px) {
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    box-shadow: ${props => props.isOpen ? '4px 0 25px rgba(0, 0, 0, 0.15)' : 'none'};
  }
`;

const SidebarLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 24px;
  padding-left: 8px;
  width: 100%;
`;

const HeartLogoSvg = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill="url(#heartGradientDashboard)"
    />
    <defs>
      <linearGradient id="heartGradientDashboard" x1="2" y1="3" x2="22" y2="21.35" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ff4b5c" />
        <stop offset="35%" stopColor="#ff8f3d" />
        <stop offset="70%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#0ea5e9" />
      </linearGradient>
    </defs>
  </svg>
);

const LogoText = styled.h1`
  font-family: 'Outfit', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
`;

const HospitalTag = styled.div`
  background-color: #e6f9f3;
  padding: 10px 14px;
  border-radius: 10px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  span:first-child {
    font-size: 10px;
    font-weight: 600;
    color: #64748b;
    text-transform: uppercase;
  }

  span:last-child {
    font-size: 13px;
    font-weight: 700;
    color: #009688;
  }
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const NavLink = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: none;
  background-color: ${props => props.active ? '#009688' : 'transparent'};
  color: ${props => props.active ? '#ffffff' : '#64748b'};
  font-size: 14px;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  width: 100%;

  &:hover {
    background-color: ${props => props.active ? '#009688' : '#f1f5f9'};
    color: ${props => props.active ? '#ffffff' : '#1e293b'};
  }
`;

const SidebarFooter = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid #f1f5f9;
  padding-top: 16px;
`;

const OnlineBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #d1fae5;
  color: #065f46;
  font-size: 12px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 50px;
  width: fit-content;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #10b981;
  }
`;

const SignOutBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: none;
  border: none;
  color: #ef4444;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  border-radius: 12px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #fef2f2;
  }
`;

const SidebarBackdrop = styled.div`
  display: none;
  @media (max-width: 1024px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(15, 23, 42, 0.4);
    backdrop-filter: blur(4px);
    z-index: 998;
  }
`;

const CloseSidebarBtn = styled.button`
  display: none;
  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid #e2e8f0;
    background-color: #ffffff;
    color: #64748b;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;

    &:hover {
      background-color: #f8fafc;
      color: #ef4444;
      border-color: #fca5a5;
    }
  }
`;

const HeaderTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const MobileMenuBtn = styled.button`
  display: none;
  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    background-color: #ffffff;
    color: #1e293b;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: #f8fafc;
      color: #009688;
      border-color: #b2f5ea;
    }
  }
`;



// MAIN WORKSPACE LAYOUT
const MainWorkspace = styled.main`
  flex: 1;
  margin-left: 260px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: calc(100% - 260px);

  @media (max-width: 1024px) {
    margin-left: 0;
    max-width: 100%;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

// DYNAMIC HEADER
const HeaderBar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const HeaderTitleSection = styled.div`
  h2 {
    font-size: 24px;
    font-weight: 700;
    color: #0f172a;
  }
  p {
    font-size: 13px;
    color: #64748b;
    margin-top: 4px;
  }
`;

const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 50px;
  padding: 8px 16px;
  width: 280px;
  gap: 10px;

  input {
    border: none;
    outline: none;
    background: transparent;
    font-size: 13px;
    color: #1e293b;
    width: 100%;
  }

  input::placeholder {
    color: #94a3b8;
  }
`;

const DropdownSelect = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 8px 16px;
  border-radius: 50px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  color: #1e293b;
`;

const CircularBtn = styled.button`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748b;
  position: relative;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8fafc;
    color: #1e293b;
  }
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #ef4444;
`;

const UserProfileIcon = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: #3b82f6;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
  border: 2px solid #ffffff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

// ACTIONS ROW
const ActionsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px;
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    filter: brightness(0.95);
  }

  background: ${props => {
    if (props.type === 'calendar') return 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)';
    if (props.type === 'emergency') return '#ef4444';
    if (props.type === 'new') return '#10b981';
    if (props.type === 'slot') return '#0d9488';
    return '#f97316'; // follow up
  }};
`;

// STATS GRID
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const StatTitle = styled.span`
  font-size: 13px;
  color: #64748b;
  font-weight: 600;
`;

const StatValue = styled.h3`
  font-size: 36px;
  font-weight: 700;
  color: #0f172a;
  margin-top: 8px;
`;

const StatIconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.bg || '#e6f9f3'};
  color: ${props => props.color || '#009688'};
`;

const StatFooter = styled.div`
  background-color: #e6f9f3;
  color: #009688;
  font-size: 11px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 50px;
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: '▲';
    font-size: 8px;
  }
`;



const DrawerForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: ${fadeIn} 0.3s ease-out;
`;

const DrawerFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DrawerLabel = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #334155;
`;

const DrawerInput = styled.input`
  width: 100%;
  padding: 12px 14px;
  font-size: 14px;
  color: #0f172a;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: #009688;
    box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.08);
  }
`;

const DrawerSelect = styled.select`
  width: 100%;
  padding: 12px 14px;
  font-size: 14px;
  color: #0f172a;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  outline: none;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    border-color: #009688;
    box-shadow: 0 0 0 3px rgba(0, 150, 136, 0.08);
  }
`;

const DrawerSubmitBtn = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #009688;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 150, 136, 0.15);
  transition: all 0.2s ease;
  margin-top: 10px;

  &:hover {
    background-color: #00796b;
    transform: translateY(-1px);
  }
`;

const SlotOption = styled.button`
  padding: 12px;
  border: 1px solid ${props => props.active ? '#009688' : '#e2e8f0'};
  background-color: ${props => props.active ? '#e6f9f3' : '#ffffff'};
  color: ${props => props.active ? '#009688' : '#64748b'};
  font-weight: 600;
  font-size: 12px;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  transition: all 0.15s ease;

  &:hover {
    border-color: #009688;
    color: #009688;
  }
`;

const ReceptionistDashboard = () => {
  const dispatch = useDispatch();
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Multi-step Booking flow state
  const [showBookingFlow, setShowBookingFlow] = useState(false);

  // Patients navigation states managed directly
  const [patientView, setPatientView] = useState('LIST'); // 'LIST' | 'DETAILS' | 'CONSULTATION'
  const [activePatient, setActivePatient] = useState(null);
  const [activeVisit, setActiveVisit] = useState(null);

  // Doctors navigation states managed directly
  const [doctorView, setDoctorView] = useState('LIST'); // 'LIST' | 'DETAILS' | 'ADD_NEW'
  const [activeDoctor, setActiveDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);

  // Redux selector for doctor list
  const { doctors: reduxDoctors = [] } = useSelector(state => state.doctorList);

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

  useEffect(() => {
    if (activeNav === 'Doctors') {
      dispatch(getDoctorListRequest({}));
    }
  }, [dispatch, activeNav]);

  // Right Drawer states
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTitle, setDrawerTitle] = useState('');
  const [drawerType, setDrawerType] = useState(''); // 'new_booking' | 'slot_booking' | 'reschedule'
  const [selectedPatient, setSelectedPatient] = useState('');

  // Dynamic selector
  const { currentUser, clinicDetails } = useSelector(state => state.sendLoginOtp);

  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  const handleSignOut = () => {
    setShowSignOutConfirm(true);
  };

  const confirmSignOut = () => {
    setShowSignOutConfirm(false);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <DashboardLayout>
      <SidebarBackdrop isOpen={isSidebarOpen} onClick={() => setIsSidebarOpen(false)} />

      {/* LEFT COLLAPSIBLE SIDEBAR */}
      <SidebarContainer isOpen={isSidebarOpen}>
        <SidebarLogoWrapper>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <HeartLogoSvg />
            <LogoText>Swastyam connect</LogoText>
          </div>
          <CloseSidebarBtn onClick={() => setIsSidebarOpen(false)} aria-label="Close sidebar">
            <X size={18} />
          </CloseSidebarBtn>
        </SidebarLogoWrapper>

        <HospitalTag>
          <span>Active Hospital</span>
          <span>{clinicDetails?.name || 'Hospital name'}</span>
        </HospitalTag>

        <NavList>
          <NavLink active={activeNav === 'Dashboard'} onClick={() => { setActiveNav('Dashboard'); setIsSidebarOpen(false); }}>
            <Users size={16} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink active={activeNav === 'Patients'} onClick={() => { setActiveNav('Patients'); setPatientView('LIST'); setIsSidebarOpen(false); }}>
            <Users size={16} />
            <span>Patients</span>
          </NavLink>
          <NavLink active={activeNav === 'Doctors'} onClick={() => { setActiveNav('Doctors'); setDoctorView('LIST'); setIsSidebarOpen(false); }}>
            <Stethoscope size={16} />
            <span>Doctors</span>
          </NavLink>
          <NavLink active={activeNav === 'Billing'} onClick={() => { setActiveNav('Billing'); setIsSidebarOpen(false); }}>
            <Calendar size={16} />
            <span>Billing & Finance</span>
          </NavLink>
          <NavLink active={activeNav === 'Notifications'} onClick={() => { setActiveNav('Notifications'); setIsSidebarOpen(false); }}>
            <Bell size={16} />
            <span>Notifications</span>
          </NavLink>
          <NavLink active={activeNav === 'Staff'} onClick={() => { setActiveNav('Staff'); setIsSidebarOpen(false); }}>
            <UserCog size={16} />
            <span>Staff</span>
          </NavLink>
          <NavLink active={activeNav === 'Settings'} onClick={() => { setActiveNav('Settings'); setIsSidebarOpen(false); }}>
            <Settings size={16} />
            <span>Settings</span>
          </NavLink>
        </NavList>

        <SidebarFooter>
          <OnlineBadge>
            <span>System Online</span>
          </OnlineBadge>
          <SignOutBtn onClick={() => { setIsSidebarOpen(false); handleSignOut(); }}>
            <LogOut size={16} />
            <span>Sign Out</span>
          </SignOutBtn>
        </SidebarFooter>
      </SidebarContainer>

      {/* RIGHT MAIN WORKSPACE */}
      <MainWorkspace>

        {showBookingFlow ? (
          <NewBookingFlow
            onClose={() => setShowBookingFlow(false)}
            onComplete={() => setShowBookingFlow(false)}
          />
        ) : activeNav === 'Patients' ? (
          <>
            {patientView === 'LIST' && (
              <PatientList
                onSelectPatient={(patient) => {
                  setActivePatient(patient);
                  setPatientView('DETAILS');
                }}
                onSelectConsultation={(patient, visit) => {
                  setActivePatient(patient);
                  setActiveVisit(visit);
                  setPatientView('CONSULTATION');
                }}
                onNewBooking={() => setShowBookingFlow(true)}
              />
            )}

            {patientView === 'DETAILS' && activePatient && (
              <PatientDetails
                patient={activePatient}
                onBack={() => setPatientView('LIST')}
                onSelectConsultation={(patient, visit) => {
                  setActivePatient(patient);
                  setActiveVisit(visit);
                  setPatientView('CONSULTATION');
                }}
              />
            )}

            {patientView === 'CONSULTATION' && activePatient && activeVisit && (
              <PatientConsultationDetails
                patient={activePatient}
                visit={activeVisit}
                onBack={() => setPatientView('DETAILS')}
              />
            )}
          </>
        ) : activeNav === 'Doctors' ? (
          <>
            {doctorView === 'LIST' && (
              <DoctorList
                doctors={doctors}
                onViewDoctor={(doctor) => {
                  setActiveDoctor(doctor);
                  setDoctorView('DETAILS');
                }}
                onAddNewDoctor={() => setDoctorView('ADD_NEW')}
              />
            )}

            {doctorView === 'DETAILS' && activeDoctor && (
              <DoctorDetails
                doctor={activeDoctor}
                onBack={() => setDoctorView('LIST')}
              />
            )}

            {doctorView === 'ADD_NEW' && (
              <AddDoctorFlow
                onClose={() => setDoctorView('LIST')}
                onComplete={(newDoc) => {
                  setDoctors(prev => [...prev, newDoc]);
                  dispatch(getDoctorListRequest({}));
                  setDoctorView('LIST');
                }}
              />
            )}
          </>
        ) : activeNav === 'Staff' ? (
          <StaffManagement />
        ) : (
          <>
            {/* HEADER */}
            <HeaderBar>
              <HeaderTitleWrapper>
                <MobileMenuBtn onClick={() => setIsSidebarOpen(true)} aria-label="Open menu">
                  <Menu size={20} />
                </MobileMenuBtn>
                <HeaderTitleSection>
                  <h2>Front Desk Dashboard</h2>
                  <p>Operational command center for patient management.</p>
                </HeaderTitleSection>
              </HeaderTitleWrapper>

              <HeaderControls>
                <SearchBarContainer>
                  <Search size={16} color="#94a3b8" />
                  <input
                    type="text"
                    placeholder="Search patients, appointments, invoices..."
                  />
                </SearchBarContainer>

                <DropdownSelect>
                  <span>Clinic 1</span>
                  <ChevronDown size={14} color="#64748b" />
                </DropdownSelect>

                <CircularBtn>
                  <Bell size={18} />
                  <NotificationBadge />
                </CircularBtn>

                <UserProfileIcon>U</UserProfileIcon>
              </HeaderControls>
            </HeaderBar>

            {/* QUICK ACTIONS DOCK */}
            <ActionsRow>
              <ActionButton type="calendar" onClick={() => alert('Opening OPD Calendar...')}>
                <Calendar size={16} /> OPD Calendar
              </ActionButton>
              <ActionButton type="emergency" onClick={() => alert('Triggering Emergency Intake...')}>
                <ShieldAlert size={16} /> Emergency Intake
              </ActionButton>
              <ActionButton type="new" onClick={() => setShowBookingFlow(true)}>
                <Plus size={16} /> New Booking
              </ActionButton>
              <ActionButton type="slot" onClick={() => setShowBookingFlow(true)}>
                <CalendarPlus size={16} /> Slot Booking
              </ActionButton>
              <ActionButton type="follow" onClick={() => alert('Opening Follow-Up Records...')}>
                <Phone size={16} /> Follow-Up
              </ActionButton>
            </ActionsRow>

            {/* METRICS & QUICK COUNTERS */}
            <StatsGrid>
              <StatCard>
                <StatHeader>
                  <div>
                    <StatTitle>Total Patients Today</StatTitle>
                    <StatValue>47</StatValue>
                  </div>
                  <StatIconBox bg="#e6f4ea" color="#137333">
                    <Users size={20} />
                  </StatIconBox>
                </StatHeader>
                <StatFooter>12% vs Yesterday</StatFooter>
              </StatCard>

              <StatCard>
                <StatHeader>
                  <div>
                    <StatTitle>Follow-Ups</StatTitle>
                    <StatValue>8</StatValue>
                  </div>
                  <StatIconBox bg="#e0f2fe" color="#0369a1">
                    <UserCheck size={20} />
                  </StatIconBox>
                </StatHeader>
                <StatFooter>12% vs Yesterday</StatFooter>
              </StatCard>

              <StatCard>
                <StatHeader>
                  <div>
                    <StatTitle>Partial Booking</StatTitle>
                    <StatValue>8</StatValue>
                  </div>
                  <StatIconBox bg="#e2fbf4" color="#009688">
                    <Calendar size={20} />
                  </StatIconBox>
                </StatHeader>
                <StatFooter>12% vs Yesterday</StatFooter>
              </StatCard>
            </StatsGrid>

            {/* DOCTOR AVAILABILITY SECTOR */}
            <DoctorAvailability />

            {/* APPOINTMENTS LOGS */}
            <TodayAppointments
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onReschedule={(patientName) => {
                setDrawerTitle(`Reschedule Appointment - ${patientName}`);
                setDrawerType('reschedule');
                setSelectedPatient(patientName);
                setDrawerOpen(true);
              }}
            />

            {/* FOLLOW-UP COORDINATION QUEUE */}
            <FollowUpQueue />
          </>
        )}

      </MainWorkspace>

      {/* REUSABLE GLOBAL RIGHT DRAWER MOUNT */}
      <RightDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={drawerTitle}
      >
        {drawerType === 'new_booking' && (
          <DrawerForm>
            <DrawerFormGroup>
              <DrawerLabel>Patient Full Name</DrawerLabel>
              <DrawerInput type="text" placeholder="Enter patient name" />
            </DrawerFormGroup>
            <DrawerFormGroup>
              <DrawerLabel>Mobile Number</DrawerLabel>
              <DrawerInput type="tel" placeholder="Enter 10-digit number" />
            </DrawerFormGroup>
            <DrawerFormGroup>
              <DrawerLabel>Assign Doctor</DrawerLabel>
              <DrawerSelect>
                <option>Dr. Sam Sharma (Cardiology)</option>
                <option>Dr. Sam Rao (Pediatrics)</option>
                <option>Dr. Sam Ram (General Medicine)</option>
              </DrawerSelect>
            </DrawerFormGroup>
            <DrawerFormGroup>
              <DrawerLabel>Appointment Date & Time</DrawerLabel>
              <DrawerInput type="datetime-local" />
            </DrawerFormGroup>
            <DrawerSubmitBtn onClick={() => { alert('Booking successfully created!'); setDrawerOpen(false); }}>
              Confirm Appointment
            </DrawerSubmitBtn>
          </DrawerForm>
        )}

        {drawerType === 'slot_booking' && (
          <DrawerForm>
            <DrawerFormGroup>
              <DrawerLabel>Select Specialty</DrawerLabel>
              <DrawerSelect>
                <option>Cardiology</option>
                <option>Pediatrics</option>
                <option>General Medicine</option>
              </DrawerSelect>
            </DrawerFormGroup>
            <DrawerFormGroup>
              <DrawerLabel>Assign Doctor</DrawerLabel>
              <DrawerSelect>
                <option>Dr. Sam Sharma</option>
                <option>Dr. Sam Rao</option>
                <option>Dr. Sam Ram</option>
              </DrawerSelect>
            </DrawerFormGroup>
            <DrawerFormGroup>
              <DrawerLabel>Preferred Slots</DrawerLabel>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 8 }}>
                <SlotOption active={true} type="button">10:00 AM - 10:30 AM</SlotOption>
                <SlotOption type="button">10:30 AM - 11:00 AM</SlotOption>
                <SlotOption type="button">11:00 AM - 11:30 AM</SlotOption>
                <SlotOption type="button">11:30 AM - 12:00 PM</SlotOption>
              </div>
            </DrawerFormGroup>
            <DrawerSubmitBtn onClick={() => { alert('Slot booked successfully!'); setDrawerOpen(false); }}>
              Book Selected Slot
            </DrawerSubmitBtn>
          </DrawerForm>
        )}

        {drawerType === 'reschedule' && (
          <DrawerForm>
            <p style={{ fontSize: 13, color: '#64748b', marginBottom: 20 }}>
              Rescheduling existing slot for <strong>{selectedPatient}</strong>.
            </p>
            <DrawerFormGroup>
              <DrawerLabel>New Appointment Date</DrawerLabel>
              <DrawerInput type="date" />
            </DrawerFormGroup>
            <DrawerFormGroup>
              <DrawerLabel>New Time Slot</DrawerLabel>
              <DrawerSelect>
                <option>09:30 AM - 10:00 AM</option>
                <option>10:00 AM - 10:30 AM</option>
                <option>12:00 PM - 12:30 PM</option>
              </DrawerSelect>
            </DrawerFormGroup>
            <DrawerSubmitBtn onClick={() => { alert(`Appointment rescheduled for ${selectedPatient}!`); setDrawerOpen(false); }}>
              Save New Schedule
            </DrawerSubmitBtn>
          </DrawerForm>
        )}
      </RightDrawer>

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

export default ReceptionistDashboard;
