import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import { AdminLayout, Loading, UserForm } from '../../../components';
import { useUser } from '../../../hooks';

const EditUser = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, user } = useUser(Number(id));

  return (
    <AdminLayout>
      <Container>
        {loading ? (
          <Loading title="Cargando información de usuario" />
        ) : (
          <UserForm user={user} />
        )}
      </Container>
    </AdminLayout>
  );
};

export default EditUser;
