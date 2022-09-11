import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { MainLayout } from '../components';

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <MainLayout
      title="Página de inicio"
      description="Descripción de la página de inicio"
      url={router.asPath}
    >
      <h1>Hola</h1>
    </MainLayout>
  );
};

export default Home;
