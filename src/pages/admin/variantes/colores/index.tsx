import { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Container, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import AdminLayout from '../../../../components/layouts/AdminLayout';
import { AdminContext, AuthContext } from '../../../../contexts';
import {
  Empty,
  Loading,
  VariantColorSelect,
  VariantColorTable,
} from '../../../../components';
import { isSuperAdminRole } from '../../../../helpers';
import {
  Sort,
  VariantColorOrder,
  VariantColorQuery,
} from '../../../../interfaces';

const Colores: NextPage = () => {
  const { user } = useContext(AuthContext);
  const { variants, getVariantColors } = useContext(AdminContext);

  const router = useRouter();

  const [sort, setSort] = useState<Sort>('ASC');
  const [order, setOrder] = useState<VariantColorOrder>('id');
  const [page, setPage] = useState(0);
  const [from, setFrom] = useState(0);
  const [limit, setLimit] = useState(10);

  const query: VariantColorQuery = {
    sort,
    order,
    limit,
    from,
  };

  useEffect(() => {
    getVariantColors(query);
  }, [sort, order, limit, from]);

  return (
    <AdminLayout>
      <Container>
        {variants.colors.isLoading ? (
          <Loading title="Cargando variantes de tamaños" />
        ) : (
          <>
            {variants.colors.colorsList.length === 0 ? (
              <Empty title="Aún no hay variante de tamaños" />
            ) : (
              <>
                <VariantColorSelect
                  order={order}
                  setOrder={setOrder}
                  setSort={setSort}
                  sort={sort}
                />

                <VariantColorTable
                  limit={limit}
                  page={page}
                  setFrom={setFrom}
                  setLimit={setLimit}
                  setPage={setPage}
                />

                {isSuperAdminRole(user?.role_id) ? (
                  <Fab
                    onClick={() =>
                      router.push('/admin/variantes/colores/crear')
                    }
                    color="primary"
                    aria-label="add"
                  >
                    <AddIcon />
                  </Fab>
                ) : null}
              </>
            )}
          </>
        )}
      </Container>
    </AdminLayout>
  );
};

export default Colores;
