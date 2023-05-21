import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import { LoginPage, RenewPassword } from '../../pages';

const AuthRouter: FC = () => {
  return (
    <Routes>
      <Route path="/iniciar-sesion" element={<LoginPage />} />
      <Route path="/recuperar-contrasena" element={<RenewPassword />} />
      <Route path="/*" element={<LoginPage />} />
    </Routes>
  );
};

export default AuthRouter;
