import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { AdminLayout, SubcategoryForm } from '../../../components';
import { useSubcategory } from '../../../hooks';
import { CategoryIDResp } from '../../../interfaces';

const Subcategory: NextPage = () => {
  const router = useRouter();
  const { data } = useSubcategory<CategoryIDResp>(Number(router.query.id));

  return (
    <AdminLayout title="Editar">
      Editar subcategoría
      <SubcategoryForm subcategory={data?.category} />
    </AdminLayout>
  );
};

export default Subcategory;
