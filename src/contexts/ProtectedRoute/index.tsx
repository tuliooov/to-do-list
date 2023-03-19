import {
    Navigate,
  } from 'react-router-dom';
import { useUserContext } from '../UserProvider';
  
export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useUserContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};