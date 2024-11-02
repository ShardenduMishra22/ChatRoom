import { Navigate } from 'react-router-dom';
import useUserStore from './zustand/store';
import { FC } from 'react';

const AuthGuard: FC<{ children: JSX.Element }> = ({ children }) => {
  const user = useUserStore((state) => state.user); 
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

export default AuthGuard;
