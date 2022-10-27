import { FC, useContext } from 'react';
import NextLink from 'next/link';
import { AppBar, Box, Button, IconButton, Link, Toolbar } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { AuthContext, UiContext } from '../../contexts';
import { isValidRole } from '../../helpers';

const Navbar: FC = () => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const { toggleSideMenu } = useContext(UiContext);

  return (
    <AppBar>
      <Toolbar>
        <Box flex={1} />
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <NextLink href="/">
            <Link>
              <Button color="secondary">Inicio</Button>
            </Link>
          </NextLink>

          {isLoggedIn && isValidRole(user?.role_id) ? (
            <NextLink href="/admin">
              <Link>
                <Button color="secondary">Panel de administración</Button>
              </Link>
            </NextLink>
          ) : null}

          {isLoggedIn ? (
            <NextLink href="/perfil">
              <Link>
                <Button color="secondary">Perfil</Button>
              </Link>
            </NextLink>
          ) : null}

          {!isLoggedIn ? (
            <NextLink href="/auth/inicia-sesion">
              <Link>
                <Button color="secondary">Iniciar sesión</Button>
              </Link>
            </NextLink>
          ) : null}

          {!isLoggedIn ? (
            <NextLink href="/auth/registro">
              <Link>
                <Button color="secondary">Registro</Button>
              </Link>
            </NextLink>
          ) : null}

          <NextLink href="/productos">
            <Link>
              <Button color="secondary">Productos</Button>
            </Link>
          </NextLink>
        </Box>
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <IconButton onClick={toggleSideMenu}>
            <MenuOutlinedIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
