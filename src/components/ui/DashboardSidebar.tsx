import { FC, useContext, useMemo } from 'react';
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
import { AuthContext, UiContext } from '../../contexts';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import StorefrontIcon from '@mui/icons-material/Storefront';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import CommentIcon from '@mui/icons-material/Comment';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import StyleIcon from '@mui/icons-material/Style';
import SellIcon from '@mui/icons-material/Sell';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import GrainIcon from '@mui/icons-material/Grain';
import LogoutIcon from '@mui/icons-material/Logout';

const links = [
  { icon: <HomeOutlinedIcon />, name: 'Inicio', route: '/admin' },
  {
    icon: <StorefrontIcon />,
    name: 'Categorías',
    route: '/admin/categorias',
  },
  { icon: <WysiwygIcon />, name: 'Códigos', route: '/admin/codigos' },
  {
    icon: <CommentIcon />,
    name: 'Comentarios',
    route: '/admin/comentarios',
  },
  {
    icon: <MapsHomeWorkIcon />,
    name: 'Direcciones',
    route: '/admin/direcciones',
  },
  { icon: <StyleIcon />, name: 'Etiquetas', route: '/admin/etiquetas' },
  { icon: <SellIcon />, name: 'Productos', route: '/admin/productos' },
  { icon: <FavoriteIcon />, name: 'Ratings', route: '/admin/ratings' },
  {
    icon: <StorefrontIcon />,
    name: 'Subcategorías',
    route: '/admin/subcategorias',
  },
  { icon: <PeopleAltIcon />, name: 'Usuarios', route: '/admin/usuarios' },
  { icon: <GrainIcon />, name: 'Variantes', route: '/admin/variantes' },
];

const DashboardSidebar: FC = () => {
  const { logout } = useContext(AuthContext);
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
  const router = useRouter();

  const navigateTo = (url: string) => {
    toggleSideMenu();
    router.push(url);
  };

  const onLogout = () => {
    logout();
    toggleSideMenu();
  };

  const onLogoutRes = () => {
    logout();
  };

  const memo = useMemo(
    () =>
      links.map((link) => (
        <ListItemButton key={link.route} onClick={() => navigateTo(link.route)}>
          <ListItem>
            <ListItemIcon>{link.icon}</ListItemIcon>
            <ListItemText primary={link.name} />
          </ListItem>
        </ListItemButton>
      )),
    [links]
  );

  return (
    <>
      <Drawer
        open={isMenuOpen}
        anchor="left"
        sx={{
          backdropFilter: 'blur(4px)',
          transition: 'all 0.5s ease-out',
        }}
        onClose={toggleSideMenu}
      >
        <Box sx={{ width: 250, paddingTop: 5 }}>
          <List>{memo}</List>

          <Divider />

          <ListItemButton onClick={onLogout}>
            <ListItem>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Cerrar sesión" />
            </ListItem>
          </ListItemButton>
        </Box>
      </Drawer>
      {/* <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: 240,
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Box sx={{ width: 250, paddingTop: 5 }}>
          <List>{memo}</List>

          <Divider />

          <ListItemButton onClick={onLogoutRes}>
            <ListItem>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Cerrar sesión" />
            </ListItem>
          </ListItemButton>
        </Box>
      </Drawer>
         */}
    </>
  );
};

export default DashboardSidebar;
