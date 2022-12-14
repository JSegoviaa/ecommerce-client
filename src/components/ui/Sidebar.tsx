import { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { AdminContext, AuthContext, UiContext } from '../../contexts';
import { isValidRole } from '../../helpers';

const Sidebar: FC = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const { adminLogout } = useContext(AdminContext);
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
  const router = useRouter();

  const navigateTo = (url: string) => {
    toggleSideMenu();
    router.push(url);
  };

  const onLogout = () => {
    logout();
    toggleSideMenu();
    adminLogout();
  };

  return (
    <Drawer
      open={isMenuOpen}
      anchor="right"
      sx={{
        backdropFilter: 'blur(4px)',
        transition: 'all 0.5s ease-out',
        display: { xs: 'block', sm: 'block' },
      }}
      onClose={toggleSideMenu}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItemButton onClick={() => navigateTo('/')}>
            <ListItem>
              <ListItemIcon>
                <HomeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={'Inicio'} />
            </ListItem>
          </ListItemButton>

          <ListItemButton onClick={() => navigateTo('/productos')}>
            <ListItem>
              <ListItemIcon>
                <SellOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={'Productos'} />
            </ListItem>
          </ListItemButton>

          <Divider />

          {isLoggedIn ? (
            <ListItemButton onClick={() => navigateTo('/perfil')}>
              <ListItem>
                <ListItemIcon>
                  <AccountCircleOutlined />
                </ListItemIcon>
                <ListItemText primary={'Perfil'} />
              </ListItem>
            </ListItemButton>
          ) : null}

          {isLoggedIn && isValidRole(user?.role_id) ? (
            <ListItemButton onClick={() => navigateTo('/admin')}>
              <ListItem>
                <ListItemIcon>
                  <GridViewOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={'Panel de administraci??n'} />
              </ListItem>
            </ListItemButton>
          ) : null}

          <Divider />

          {!isLoggedIn ? (
            <ListItemButton onClick={() => navigateTo('/auth/registro')}>
              <ListItem>
                <ListItemIcon>
                  <PersonAddAltOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={'Registrarse'} />
              </ListItem>
            </ListItemButton>
          ) : null}

          {!isLoggedIn ? (
            <ListItemButton onClick={() => navigateTo('/auth/inicia-sesion')}>
              <ListItem>
                <ListItemIcon>
                  <VpnKeyOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={'Iniciar sesi??n'} />
              </ListItem>
            </ListItemButton>
          ) : null}

          {isLoggedIn ? (
            <ListItemButton onClick={onLogout}>
              <ListItem>
                <ListItemIcon>
                  <ExitToAppOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={'Cerrar sesi??n'} />
              </ListItem>
            </ListItemButton>
          ) : null}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
