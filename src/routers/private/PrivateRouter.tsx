import { FC } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
  isLoggedIn: boolean;
}

const PrivateRouter: FC<Props> = ({ children, isLoggedIn }) => {
  return isLoggedIn ? children : <Navigate to="/auth/iniciar-sesion" />;
};
export default PrivateRouter;
