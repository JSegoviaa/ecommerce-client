import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { AdminLayout, CategoryForm } from '../../../components';
import { useCategory } from '../../../hooks';
import { CategoryResp } from '../../../interfaces';

const Category: NextPage = () => {
  const router = useRouter();
  const { data } = useCategory<CategoryResp>(Number(router.query.id));

  return (
    <AdminLayout title="Editar">
      Editar categoría
      <CategoryForm category={data?.category} />
    </AdminLayout>
  );
};

export default Category;
