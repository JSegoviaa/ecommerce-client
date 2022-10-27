import { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Container, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import {
  AdminLayout,
  Empty,
  Loading,
  VariantSizeSelct,
  VariantSizeTable,
} from '../../../../components';
import { isSuperAdminRole } from '../../../../helpers';
import { AdminContext, AuthContext } from '../../../../contexts';
import {
  Sort,
  VariantSizeOrder,
  VariantSizeQuery,
} from '../../../../interfaces';

const Tamaños: NextPage = () => {
  const { user } = useContext(AuthContext);
  const { getVariantSizes, variants } = useContext(AdminContext);

  const [sort, setSort] = useState<Sort>('ASC');
  const [order, setOrder] = useState<VariantSizeOrder>('id');
  const [page, setPage] = useState(0);
  const [from, setFrom] = useState(0);
  const [limit, setLimit] = useState(10);

  const router = useRouter();

  const query: VariantSizeQuery = {
    sort,
    order,
    limit,
    from,
  };

  useEffect(() => {
    getVariantSizes(query);
  }, [sort, order, limit, from]);

  return (
    <AdminLayout>
      <Container>
        {variants.sizes.isLoading ? (
          <Loading title="Cargando variantes de tamaños" />
        ) : (
          <>
            {variants.sizes.sizesList.length === 0 ? (
              <Empty title="Aún no hay variante de tamaños" />
            ) : (
              <>
                {isSuperAdminRole(user?.role_id) ? (
                  <>
                    <VariantSizeSelct
                      order={order}
                      setOrder={setOrder}
                      setSort={setSort}
                      sort={sort}
                    />

                    <VariantSizeTable
                      limit={limit}
                      page={page}
                      setFrom={setFrom}
                      setLimit={setLimit}
                      setPage={setPage}
                    />
                    <Fab
                      onClick={() =>
                        router.push('/admin/variantes/tamanos/crear')
                      }
                      color="primary"
                    >
                      <AddIcon />
                    </Fab>
                  </>
                ) : null}
              </>
            )}
          </>
        )}
      </Container>
    </AdminLayout>
  );
};

export default Tamaños;
