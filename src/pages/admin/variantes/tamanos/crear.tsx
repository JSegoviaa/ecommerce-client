import { NextPage } from 'next';
import { Container } from '@mui/material';

import { AdminLayout, VariantSizeForm } from '../../../../components';

const AddVariantSizePage: NextPage = () => {
  return (
    <AdminLayout>
      <Container>
        <VariantSizeForm />
      </Container>
    </AdminLayout>
  );
};

export default AddVariantSizePage;
