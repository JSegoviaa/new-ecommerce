import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Box, Button, Toolbar } from '@mui/material';

import { AdminContext, AuthContext } from '../../contexts';
import { isAdminRole } from '../../helpers/validRoles';

const Navbar: FC = () => {
  const { isLoggedIn, logout, user } = useContext(AuthContext);
  const { adminLogout } = useContext(AdminContext);

  const isValidAdmin = isAdminRole(user?.role.id);

  const handleLogout = (): void => {
    logout();
    adminLogout();
  };

  return (
    <AppBar>
      <Toolbar>
        <Link to="/">
          <Button>Inicio</Button>
        </Link>
        <Link to="/categorias">
          <Button>Categorías</Button>
        </Link>

        <Link to="/subcategorias">
          <Button>Subcategorías</Button>
        </Link>

        {isValidAdmin ? (
          <Link to="/usuarios">
            <Button>Usuarios</Button>
          </Link>
        ) : null}

        <Link to="/productos">
          <Button>Productos</Button>
        </Link>

        <Link to="/etiquetas">
          <Button>Etiquetas</Button>
        </Link>

        {isValidAdmin ? (
          <Link to="/roles">
            <Button>Roles</Button>
          </Link>
        ) : null}

        <Link to="/variantes">
          <Button>Variantes</Button>
        </Link>

        <Box flex={1} />
        {isLoggedIn ? (
          <Button onClick={handleLogout}>Cerrar sesión</Button>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
