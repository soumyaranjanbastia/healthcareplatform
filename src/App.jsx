import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Auth from './features/auth/Auth';
import { MOCK_LOGIN_PAYLOAD } from './data/authData';

// Role-based Dashboards
import AdminDashboard from './features/dashboard/screens/AdminDashboard';
import DoctorDashboard from './features/dashboard/screens/DoctorDashboard';
import FinanceDashboard from './features/dashboard/screens/FinanceDashboard';
import ReceptionistDashboard from './features/dashboard/screens/ReceptionistDashboard';

// Alert Modal
import AlertModal from './components/Alertmodal';

const App = () => {
  const dispatch = useDispatch();

  // Select global auth states
  const { isAuthenticated, currentUser } = useSelector(state => state.auth);

  // Global alert state
  const [alertInfo, setAlertInfo] = useState({ isOpen: false, message: '' });

  useEffect(() => {
    // Override browser default window.alert globally!
    window.alert = (message) => {
      setAlertInfo({ isOpen: true, message });
    };
  }, []);

  const handleLogin = (payload) => {
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: payload || {
        ...MOCK_LOGIN_PAYLOAD,
        user: {
          ...MOCK_LOGIN_PAYLOAD.user,
          role: 'Admin' // Set to Receptionist so the new dashboard mounts automatically
        }
      }
    });
  };

  const renderContent = () => {
    if (isAuthenticated) {
      const role = currentUser?.role || 'Receptionist';

      if (role === 'Admin') return <AdminDashboard />;
      if (role === 'Doctor') return <DoctorDashboard />;
      if (role === 'Finance') return <FinanceDashboard />;

      // Default to receptionist front desk
      return <ReceptionistDashboard />;
    }

    return <Auth onLogin={handleLogin} />;
  };

  return (
    <>
      {renderContent()}
      <AlertModal
        isOpen={alertInfo.isOpen}
        message={alertInfo.message}
        onClose={() => setAlertInfo({ isOpen: false, message: '' })}
      />
    </>
  );
};

export default App;
