import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { MainLayout } from '../../components';

const AboutUs: NextPage = () => {
  const router = useRouter();

  return (
    <MainLayout
      title="Acerca de nosotros"
      description="Acerca de nosotros"
      url={router.asPath}
    >
      AboutUs
    </MainLayout>
  );
};

export default AboutUs;
