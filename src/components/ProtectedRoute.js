import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children}) => {
  const { auth } = useAuth();
  console.log(auth, 'auth')
  if (!auth.user) {
    // User is not authenticated, redirect to login page
    return <Navigate to="/" replace />;
  }

  return <Navigate to="/users" replace />;
};

export default ProtectedRoute;