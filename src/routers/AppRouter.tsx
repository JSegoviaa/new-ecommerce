import { FC, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthRouter, PublicRouter } from './public';
import { PrivateRouter, AdminRouter } from './private';
import { AuthContext } from '../contexts';
import { Loading } from '../components';

const AppRouter: FC = () => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loading msg="Cargando información" />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth/*"
          element={
            <PublicRouter isLoggedIn={isLoggedIn}>
              <AuthRouter />
            </PublicRouter>
          }
        />

        <Route
          path="/*"
          element={
            <PrivateRouter isLoggedIn={isLoggedIn}>
              <AdminRouter />
            </PrivateRouter>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
