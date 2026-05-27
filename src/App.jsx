import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

// Modular Component Imports
import LoginScreen from './components/auth/LoginScreen';
import SignUpScreen from './components/auth/SignUpScreen';
import Sidebar from './components/dashboard/Sidebar';
import Header from './components/dashboard/Header';
import OverviewTab from './components/dashboard/OverviewTab';
import VitalsTab from './components/dashboard/VitalsTab';
import PatientsTab from './components/dashboard/PatientsTab';
import BillingTab from './components/dashboard/BillingTab';
import StaffManagement from './components/staff/StaffManagement';

// --- STYLED COMPONENTS ---
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #0b0f19;
  color: #e2e8f0;
  font-family: 'Inter', sans-serif;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 280px;
  padding: 32px 40px;
  background-color: #0b0f19;
  min-height: 100vh;
  @media (max-width: 1024px) {
    margin-left: 80px;
    padding: 24px 20px;
  }
`;

// --- DATA LISTS (MOCK MFE & APPS BINDING) ---
const INITIAL_PATIENTS = [
  { id: 'SWA-9921', name: 'Kabir Dev', age: 34, gender: 'Male', vitals: 'SpO2 98%, HR 72', status: 'normal', time: '10 mins ago', room: 'Consultation A' },
  { id: 'SWA-1244', name: 'Pooja Sen', age: 29, gender: 'Female', vitals: 'BP 142/91, HR 88', status: 'warning', time: '23 mins ago', room: 'Emergency-2' },
  { id: 'SWA-5633', name: 'Aarav Mehta', age: 62, gender: 'Male', vitals: 'Heart Rate 112 bpm', status: 'critical', time: '1 hr ago', room: 'ICU Bed 4' },
  { id: 'SWA-7890', name: 'Ananya Roy', age: 45, gender: 'Female', vitals: 'Temp 101.4 °F', status: 'warning', time: '2 hrs ago', room: 'Ward 3B' },
  { id: 'SWA-4412', name: 'Rajesh Nair', age: 52, gender: 'Male', vitals: 'SpO2 97%, HR 68', status: 'normal', time: '3 hrs ago', room: 'Consultation B' },
];

const App = () => {
  const dispatch = useDispatch();
  
  // Select Redux States
  const { isAuthenticated, currentUser, clinicDetails } = useSelector(state => state.auth);

  // Layout states
  const [authMode, setAuthMode] = useState('login'); // login | signup
  const [activeTab, setActiveTab] = useState('Overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState(INITIAL_PATIENTS);

  // Filter patients on search
  const filteredPatients = useMemo(() => {
    return patients.filter(patient =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, patients]);

  // Live heart rate ticker simulation
  const [liveHeartRate, setLiveHeartRate] = useState(72);
  const [liveSpO2, setLiveSpO2] = useState(98);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveHeartRate(prev => {
        const delta = Math.floor(Math.random() * 7) - 3; // -3 to 3
        const nextVal = prev + delta;
        return nextVal > 110 ? 98 : nextVal < 60 ? 68 : nextVal;
      });
      setLiveSpO2(prev => {
        const delta = Math.floor(Math.random() * 3) - 1; // -1 to 1
        const nextVal = prev + delta;
        return nextVal > 100 ? 100 : nextVal < 94 ? 96 : nextVal;
      });
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    if (confirm("Are you sure you want to sign out of Swastyam Portal?")) {
      dispatch({ type: 'LOGOUT' });
      setActiveTab('Overview');
      setSearchTerm('');
    }
  };

  // --- RENDER AUTH SCREENS IF NOT LOGGED IN ---
  if (!isAuthenticated) {
    if (authMode === 'signup') {
      return <SignUpScreen onNavigateToLogin={() => setAuthMode('login')} />;
    }
    return <LoginScreen onNavigateToSignUp={() => setAuthMode('signup')} />;
  }

  // --- RENDER DASHBOARD LAYOUT IF LOGGED IN ---
  return (
    <DashboardContainer>
      {/* Side Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        currentUser={currentUser}
        clinicDetails={clinicDetails}
      />

      {/* Main Content Area */}
      <MainContent>
        {/* Dynamic Header */}
        <Header
          currentUser={currentUser}
          clinicDetails={clinicDetails}
          onLogout={handleLogout}
        />

        {/* Tab Switching Render blocks */}
        {activeTab === 'Overview' && (
          <OverviewTab patients={patients} />
        )}

        {activeTab === 'Vitals' && (
          <VitalsTab liveHeartRate={liveHeartRate} liveSpO2={liveSpO2} />
        )}

        {activeTab === 'Patients' && (
          <PatientsTab
            filteredPatients={filteredPatients}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}

        {activeTab === 'Staff' && (
          <StaffManagement />
        )}

        {activeTab === 'Billing' && (
          <BillingTab />
        )}
      </MainContent>
    </DashboardContainer>
  );
};

export default App;
