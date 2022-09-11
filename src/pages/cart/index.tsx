import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { MainLayout } from '../../components';

const Carrito: NextPage = () => {
  const router = useRouter();

  return (
    <MainLayout title="Mi carrito" description="Mi carrito" url={router.asPath}>
      Carrito
    </MainLayout>
  );
};

export default Carrito;
