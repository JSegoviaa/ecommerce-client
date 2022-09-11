import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Container, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import {
  ActiveSelect,
  AdminLayout,
  CategoriesSelect,
  Empty,
  Loading,
  SubcategoryTable,
} from '../../../components';
import {
  Active,
  Data,
  OrderBy,
  Sort,
  SubcategoriesResp,
} from '../../../interfaces';
import { useCategories } from '../../../hooks';

const Subcategories: NextPage = () => {
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
    endpoint: 'subcategories/admin',
    is_published: true,
    is_active: isActive,
    from,
    limit,
  };

  const { data, isLoading } = useCategories<SubcategoriesResp>(query);

  useEffect(() => {
    setSize(Number(data?.total));
  }, [data?.total]);

  return (
    <AdminLayout>
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
            {data?.subcategories?.length === 0 ? (
              <Empty title="Aún no has creado ninguna categoría" />
            ) : (
              <>
                <CategoriesSelect
                  sort={sort}
                  order={order}
                  setSort={setSort}
                  setOrder={setOrder}
                />

                <SubcategoryTable
                  subcategories={data}
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
              onClick={() => router.push('/admin/subcategorias/crear')}
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

export default Subcategories;
