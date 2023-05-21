import { FC, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { title } from '../../../constants';

const VariantsPage: FC = () => {
  useEffect(() => {
    document.title = `${title} | Variantes`;
  }, []);

  return (
    <div>
      <Link to="colores">Colores</Link>
      <br />
      <br />
      <Link to="tamanos">Tamaños</Link>
      <Outlet />
    </div>
  );
};

export default VariantsPage;
