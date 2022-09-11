import { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  Empty,
  Error,
  Loading,
  MainLayout,
  ProductList,
  ProductsSelect,
} from '../../../../components';
import { useProducts } from '../../../../hooks';
import { OrderByProducts, Sort } from '../../../../interfaces';

const Products: NextPage = () => {
  const [sort, setSort] = useState<Sort>('ASC');
  const [order, setOrder] = useState<OrderByProducts>('id');
  const { query, asPath } = useRouter();

  const config = {
    order,
    sort,
    slug: query.products,
  };

  const { data, isLoading } = useProducts(config);

  return (
    <MainLayout
      title={
        data?.errors?.length! > 0
          ? data?.errors[0]?.msg
          : data?.products.length === 0
          ? 'Aún no hay productos'
          : data?.products[0].subcategory_title
      }
      description="Lista de productos"
      url={asPath}
    >
      <ProductsSelect
        sort={sort}
        order={order}
        setSort={setSort}
        setOrder={setOrder}
      />

      <>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {data?.errors?.length! > 0 ? (
              data?.errors.map((error) => (
                <Error key={error.msg} error={error.msg} />
              ))
            ) : (
              <>
                {data?.products.length === 0 ? (
                  <Empty title="Aún no hay productos" />
                ) : (
                  <>
                    <ProductList products={data} />
                  </>
                )}
              </>
            )}
          </>
        )}
      </>
    </MainLayout>
  );
};

export default Products;
