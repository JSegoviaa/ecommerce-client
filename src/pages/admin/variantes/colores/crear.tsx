import { NextPage } from 'next';
import { Container } from '@mui/material';

import { AdminLayout, VariantColorForm } from '../../../../components';

const AddVariantSizePage: NextPage = () => {
  return (
    <AdminLayout>
      <Container>
        <VariantColorForm />
      </Container>
    </AdminLayout>
  );
};

export default AddVariantSizePage;
