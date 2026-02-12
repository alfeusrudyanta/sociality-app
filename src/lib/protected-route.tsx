import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = Cookies.get('token');

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  return <>{children}</>;
};
