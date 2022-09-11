import { NextPage } from 'next';
import { Container, Typography } from '@mui/material';

import { AdminLayout, CategoryForm } from '../../../components';

const Crear: NextPage = () => {
  return (
    <AdminLayout>
      <Container>
        <Typography variant="h1">Añadir categoría</Typography>
        <br />
        <br />

        <CategoryForm />
      </Container>
    </AdminLayout>
  );
};

export default Crear;
