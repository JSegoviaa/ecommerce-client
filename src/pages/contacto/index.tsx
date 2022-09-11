import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { MainLayout } from '../../components';

const ContactPage: NextPage = () => {
  const router = useRouter();

  return (
    <MainLayout
      title="Contáctanos"
      description="Ponte en contacto con nosotros"
      url={router.asPath}
    >
      ContactPage
    </MainLayout>
  );
};

export default ContactPage;
