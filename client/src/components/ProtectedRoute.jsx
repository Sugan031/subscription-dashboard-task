import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    toast.error('Please login to access this page');
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user?.role !== 'admin') {
    toast.error('You do not have permission to access this page');
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;