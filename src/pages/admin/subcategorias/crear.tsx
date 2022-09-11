import { NextPage } from 'next';
import { Container, Typography } from '@mui/material';
import { AdminLayout, SubcategoryForm } from '../../../components';

const Crear: NextPage = () => {
  return (
    <AdminLayout>
      <Container>
        <Typography variant="h1">Añadir subcategoría</Typography>
        <br />
        <br />
        <SubcategoryForm />
      </Container>
    </AdminLayout>
  );
};

export default Crear;
