import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

export const ProtectedRoute = () => {
  const token = !!Cookies.get('token');
  const location = useLocation();

  if (!token) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  return <Outlet />;
};
