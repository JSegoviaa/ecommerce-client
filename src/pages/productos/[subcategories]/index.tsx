import { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Data, OrderBy, Sort, SubcategoriesResp } from '../../../interfaces';
import { useCategories } from '../../../hooks';
import {
  CategoriesSelect,
  Empty,
  Error,
  Loading,
  MainLayout,
  SubcategoryList,
} from '../../../components';

const SubCategories: NextPage = () => {
  const [sort, setSort] = useState<Sort>('ASC');
  const [order, setOrder] = useState<OrderBy>('id');
  const { asPath, query } = useRouter();
  const data: Data = {
    order,
    sort,
    endpoint: `subcategories/${query.subcategories}/category`,
    is_active: true,
    is_published: true,
    from: 0,
    limit: 20,
  };

  const { data: subcategories, isLoading } =
    useCategories<SubcategoriesResp>(data);

  return (
    <MainLayout
      title={
        subcategories?.errors?.length! > 0
          ? subcategories?.errors[0].msg
          : subcategories?.subcategories.length === 0
          ? 'Aún no hay subcategorías'
          : subcategories?.subcategories[0].category_title
      }
      description="Productos"
      url={asPath}
    >
      <CategoriesSelect
        sort={sort}
        order={order}
        setSort={setSort}
        setOrder={setOrder}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {subcategories?.errors?.length! > 0 ? (
            subcategories?.errors.map((error) => (
              <Error key={error.msg} error={error.msg} />
            ))
          ) : (
            <>
              {subcategories?.subcategories.length === 0 ? (
                <Empty title="Aún no hay subcategorías" />
              ) : (
                <>
                  <SubcategoryList subcategories={subcategories} />
                </>
              )}
            </>
          )}
        </>
      )}
    </MainLayout>
  );
};

export default SubCategories;
