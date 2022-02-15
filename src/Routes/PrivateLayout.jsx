import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateLayout = (props) => {
  return localStorage.getItem('authToken') ? (
    <Outlet />
  ) : (
    <Navigate to={'/login'} replace />
  );
};

export default PrivateLayout;
