import React from 'react';
import { useDispatch } from 'react-redux';
import Auth from './features/auth/Auth';
import { MOCK_LOGIN_PAYLOAD } from './data/authData';

const App = () => {
  const dispatch = useDispatch();

  const handleLogin = (payload) => {
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: payload || MOCK_LOGIN_PAYLOAD
    });
  };

  return <Auth onLogin={handleLogin} />;
};

export default App;
