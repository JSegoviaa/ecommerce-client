import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { AdminLayout } from '../../components';

const Admin: NextPage = () => {
  const router = useRouter();

  return (
    <AdminLayout
      title="Panel de administración"
      description="Descripción"
      url={router.asPath}
    >
      Index
    </AdminLayout>
  );
};

export default Admin;
