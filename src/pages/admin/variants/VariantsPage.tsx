import { FC, useEffect, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { title } from '../../../constants';
import { AdminContext } from '../../../contexts';
import { AlertMsg } from '../../../components';

const VariantsPage: FC = () => {
  const { error } = useContext(AdminContext);

  useEffect(() => {
    document.title = `${title} | Variantes`;
  }, []);

  return (
    <>
      {error ? (
        error.message.map((err) => (
          <AlertMsg msg={err} title={error.error} type="warning" />
        ))
      ) : (
        <>
          <Link to="colores">Colores</Link>
          <br />
          <br />
          <Link to="tamanos">Tamaños</Link>
          <Outlet />
        </>
      )}
    </>
  );
};

export default VariantsPage;
