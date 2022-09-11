import { FC, useContext } from 'react';
import NextLink from 'next/link';
import { AppBar, Box, Button, IconButton, Link, Toolbar } from '@mui/material';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { UiContext } from '../../contexts';

const AdminNavbar: FC = () => {
  const { toggleSideMenu } = useContext(UiContext);

  return (
    <AppBar>
      <Toolbar>
        <Box>
          <IconButton onClick={toggleSideMenu}>
            <MenuOutlinedIcon />
          </IconButton>
        </Box>

        <Box flex={1} />

        <Box>
          <NextLink href="/">
            <Link>
              <Button color="secondary">Inicio</Button>
            </Link>
          </NextLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavbar;
