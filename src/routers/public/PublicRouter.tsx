import { FC } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
  children: JSX.Element;
  isLoggedIn: boolean;
}

const PublicRouter: FC<Props> = ({ children, isLoggedIn }) => {
  return !isLoggedIn ? children : <Navigate to="/" />;
};

export default PublicRouter;
