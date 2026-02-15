import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

export const PublicRoute = () => {
  const token = !!Cookies.get('token');

  if (token) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
};
