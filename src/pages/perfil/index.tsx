import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { MainLayout } from '../../components';

const Perfil: NextPage = () => {
  const router = useRouter();

  return (
    <MainLayout title="Mi perfil" description="Mi perfil" url={router.asPath}>
      Perfil
    </MainLayout>
  );
};

export default Perfil;
