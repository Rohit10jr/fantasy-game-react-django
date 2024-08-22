// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth'; // Adjust the import path as needed

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const location = useLocation();
  
  if (isAuthenticated()) {
    return element;
  } else {
    return <Navigate to="/login" state={{ from: location }} />;
  }
};

export default ProtectedRoute;
