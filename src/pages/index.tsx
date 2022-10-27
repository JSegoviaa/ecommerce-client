import { useContext } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { MainLayout } from '../components';
import { AuthContext } from '../contexts';

const Home: NextPage = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  return (
    <MainLayout
      title="Página de inicio"
      description="Descripción de la página de inicio"
      url={router.asPath}
    >
      <h1>Hola, {user?.email}</h1>
    </MainLayout>
  );
};

export default Home;
