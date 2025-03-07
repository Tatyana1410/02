import React, {useContext} from 'react';
import { Outlet, useLocation } from 'react-router-dom';
function PrivateRouter(props) {
    const { isAuthenticated } = useContext(AuthContext); 
    const location = useLocation();
    return (
        isAuthenticated === true ?
      <Outlet />
      :
      <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default PrivateRouter;