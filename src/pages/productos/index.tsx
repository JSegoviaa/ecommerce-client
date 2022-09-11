import { ChangeEvent, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box, Pagination, PaginationItem, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import {
  CategoriesSelect,
  CategoryList,
  Empty,
  Loading,
  MainLayout,
} from '../../components';
import { useCategories } from '../../hooks';
import { CategoriesResp, Data, OrderBy, Sort } from '../../interfaces';

const Products: NextPage = () => {
  const [sort, setSort] = useState<Sort>('ASC');
  const [order, setOrder] = useState<OrderBy>('id');
  const [size, setSize] = useState(0);
  const [from, setFrom] = useState(0);
  const [limit] = useState(20);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const query: Data = {
    order,
    sort,
    endpoint: 'categories',
    is_published: true,
    is_active: true,
    from,
    limit,
  };

  const { data: categories, isLoading } = useCategories<CategoriesResp>(query);

  useEffect(() => {
    setSize(Number(categories?.total));
  }, [categories?.categories]);

  const onPageChange = (e: ChangeEvent<unknown>, value: number) => {
    setPage(value);

    setFrom((value - 1) * 20);
  };

  return (
    <MainLayout title="Productos" description="Productos" url={router.asPath}>
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
          {categories?.categories.length === 0 ? (
            <Empty title="Aún no hay categorías" />
          ) : (
            <>
              <CategoryList categories={categories} />
              <br />
              {Math.ceil(size / limit) === 1 ? null : (
                <Box display="flex" justifyContent="center">
                  <Stack spacing={2}>
                    <Pagination
                      count={Math.ceil(size / limit)}
                      page={page}
                      onChange={onPageChange}
                      renderItem={(item) => (
                        <PaginationItem
                          components={{
                            previous: ArrowBackIcon,
                            next: ArrowForwardIcon,
                          }}
                          {...item}
                        />
                      )}
                    />
                  </Stack>
                </Box>
              )}
            </>
          )}
        </>
      )}
    </MainLayout>
  );
};

export default Products;
