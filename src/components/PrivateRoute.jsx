import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({children}) {
  const token = localStorage.getItem('your_access_token');
  const loginTime = localStorage.getItem('login_time');
  const currentTime = Date.now();
  const oneHour = 60 * 60 * 1000; // Один час в миллисекундах

  if (!token || !loginTime || currentTime - parseInt(loginTime, 10) > oneHour) {
    localStorage.removeItem('your_access_token');
    localStorage.removeItem('login_time'); 

    return <Navigate to="/login" replace />;
  }
  return children;
}


export default PrivateRoute;