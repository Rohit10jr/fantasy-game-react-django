// src/pages/LogoutPage.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear authentication token
    localStorage.removeItem('token');

    // Redirect to login page
    navigate('/login');
  }, [navigate]);

  return null; // This component doesn't need to render anything
};

export default LogoutPage;
