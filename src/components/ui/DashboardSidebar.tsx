import { FC, Fragment, useContext, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import GrainIcon from '@mui/icons-material/Grain';
import LogoutIcon from '@mui/icons-material/Logout';

import { AdminContext, AuthContext, UiContext } from '../../contexts';
import { collapsedLinks, links } from '../../constants';
import { isSuperAdminRole } from '../../helpers';

const DashboardSidebar: FC = () => {
  const { logout, user } = useContext(AuthContext);
  const { adminLogout } = useContext(AdminContext);
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
  const [isCollapse, setIsCollapse] = useState(false);
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

  const onLogoutRes = () => {
    logout();
  };

  const onCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  const memo = useMemo(
    () =>
      links.map((link) => (
        <Fragment key={link.route}>
          {link.check !== 'Variantes' ? (
            <>
              {link.validRoles.includes(user?.role_id!) ? (
                <ListItemButton
                  key={link.route}
                  onClick={() => navigateTo(link.route)}
                >
                  <ListItem>
                    <ListItemIcon>{link.icon}</ListItemIcon>
                    <ListItemText primary={link.name} />
                  </ListItem>
                </ListItemButton>
              ) : null}
            </>
          ) : (
            <>
              {isSuperAdminRole(user?.role_id) ? (
                <>
                  <ListItemButton onClick={onCollapse}>
                    <ListItem>
                      <ListItemIcon>
                        <GrainIcon />
                      </ListItemIcon>
                      <ListItemText primary="Variantes" />
                      {isCollapse ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                  </ListItemButton>

                  <Collapse in={isCollapse} timeout="auto" unmountOnExit>
                    {collapsedLinks.map((collapsedLink) => (
                      <List
                        key={collapsedLink.route}
                        component="div"
                        disablePadding
                      >
                        <ListItemButton
                          onClick={() => navigateTo(collapsedLink.route)}
                          sx={{ pl: 4 }}
                        >
                          <ListItemIcon>{collapsedLink.icon}</ListItemIcon>
                          <ListItemText primary={collapsedLink.name} />
                        </ListItemButton>
                      </List>
                    ))}
                  </Collapse>
                </>
              ) : null}
            </>
          )}
        </Fragment>
      )),
    [links, isCollapse]
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
    </>
  );
};

export default DashboardSidebar;
