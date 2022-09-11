import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Container, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import {
  ActiveSelect,
  AdminLayout,
  CategoriesSelect,
  CategoryTable,
  Empty,
  Loading,
} from '../../../components';
import { useCategories } from '../../../hooks';
import {
  Active,
  CategoriesResp,
  Data,
  OrderBy,
  Sort,
} from '../../../interfaces';

const Categories: NextPage = () => {
  const [sort, setSort] = useState<Sort>('ASC');
  const [order, setOrder] = useState<OrderBy>('id');
  const [active, setActive] = useState<Active>('active');
  const [isActive, setIsActive] = useState(true);
  const [from, setFrom] = useState(0);
  const [limit, setLimit] = useState(10);
  const [size, setSize] = useState(0);
  const [page, setPage] = useState(0);

  const router = useRouter();

  const query: Data = {
    order,
    sort,
    endpoint: 'categories/admin',
    is_published: true,
    is_active: isActive,
    from,
    limit,
  };

  const { data: categories, isLoading } = useCategories<CategoriesResp>(query);

  useEffect(() => {
    setSize(Number(categories?.total));
  }, [categories?.total]);

  return (
    <AdminLayout
      title="Categorías"
      description="Aquí se crean las categorías"
      url={router.asPath}
    >
      <Container>
        {isLoading ? (
          <Loading title="Cargando" />
        ) : (
          <>
            <ActiveSelect
              active={active}
              setActive={setActive}
              setIsActive={setIsActive}
            />
            {categories?.categories.length === 0 ? (
              <Empty title="Aún no has creado ninguna categoría" />
            ) : (
              <>
                <CategoriesSelect
                  sort={sort}
                  order={order}
                  setSort={setSort}
                  setOrder={setOrder}
                />

                <CategoryTable
                  categories={categories}
                  limit={limit}
                  page={page}
                  setFrom={setFrom}
                  setLimit={setLimit}
                  setPage={setPage}
                  size={size}
                />
              </>
            )}

            <Fab
              onClick={() => router.push('/admin/categorias/crear')}
              color="primary"
              aria-label="add"
            >
              <AddIcon />
            </Fab>
          </>
        )}
      </Container>
    </AdminLayout>
  );
};

export default Categories;
