import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { MainLayout } from '../../components';

const TermsOfUse: NextPage = () => {
  const router = useRouter();

  return (
    <MainLayout
      title="Términos y condiciones"
      description="Términos y condiciones"
      url={router.asPath}
    >
      TermsOfUse
    </MainLayout>
  );
};

export default TermsOfUse;
