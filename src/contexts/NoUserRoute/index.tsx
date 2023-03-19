import {
    Navigate,
  } from 'react-router-dom';
import { useUserContext } from '../UserProvider';
  
export const NoUserRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useUserContext();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};