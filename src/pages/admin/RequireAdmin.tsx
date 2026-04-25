import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const token = typeof window !== 'undefined'
    ? localStorage.getItem('maxout-admin-token')
    : null;

  if (token !== 'authenticated') {
    return <Navigate to="/admin" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default RequireAdmin;
