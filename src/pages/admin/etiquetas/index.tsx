import { useState, useContext, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Container, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import {
  AdminLayout,
  Empty,
  Loading,
  TagsSelect,
  TagsTable,
} from '../../../components';
import { Sort, TagQuery, TagsOrder } from '../../../interfaces';
import { AdminContext, AuthContext } from '../../../contexts';
import { isValidRole } from '../../../helpers';

const Tags: NextPage = () => {
  const { user } = useContext(AuthContext);
  const { getAllTags, tags } = useContext(AdminContext);
  const [sort, setSort] = useState<Sort>('ASC');
  const [order, setOrder] = useState<TagsOrder>('id');
  const [page, setPage] = useState(0);
  const [from, setFrom] = useState(0);
  const [limit, setLimit] = useState(10);

  const router = useRouter();

  const query: TagQuery = {
    sort,
    order,
    limit,
    from,
  };

  useEffect(() => {
    getAllTags(query);
  }, [sort, order, limit, from]);

  return (
    <AdminLayout
      title="Etiquetas"
      description="Aquí se crean las etiquetas"
      url={router.asPath}
    >
      <Container>
        <TagsSelect
          order={order}
          setOrder={setOrder}
          setSort={setSort}
          sort={sort}
        />
        {tags.isLoading ? (
          <Loading title="Cargando etiquetas" />
        ) : (
          <>
            {tags.tagList.length === 0 ? (
              <Empty title="Aún no has creado ninguna etiqueta" />
            ) : (
              <>
                <TagsTable
                  limit={limit}
                  page={page}
                  setFrom={setFrom}
                  setLimit={setLimit}
                  setPage={setPage}
                />

                {isValidRole(user?.role_id) ? (
                  <Fab
                    onClick={() => router.push('/admin/etiquetas/crear')}
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

export default Tags;
