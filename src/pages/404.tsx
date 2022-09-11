import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { MainLayout } from '../components';

const Error: NextPage = () => {
  const router = useRouter();

  return (
    <MainLayout
      title="No existe esta página"
      description="No existe esta página"
      url={router.asPath}
    >
      No existe esta página
    </MainLayout>
  );
};

export default Error;
