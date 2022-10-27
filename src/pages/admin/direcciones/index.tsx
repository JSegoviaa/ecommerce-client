import { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { Container } from '@mui/material';
import {
  AddressSelect,
  AddressTable,
  AdminLayout,
  Empty,
  Loading,
} from '../../../components';
import { AdminContext } from '../../../contexts';
import { AddressOrder, Sort } from '../../../interfaces';

const Addresses: NextPage = () => {
  const { addresses, getAllAddresses } = useContext(AdminContext);
  const [sort, setSort] = useState<Sort>('ASC');
  const [order, setOrder] = useState<AddressOrder>('id');
  const [page, setPage] = useState(0);
  const [from, setFrom] = useState(0);
  const [limit, setLimit] = useState(10);
  const [msgError, setMsgError] = useState('');

  const query = {
    sort,
    order,
    limit,
    from,
  };

  useEffect(() => {
    getAllAddresses(query).then((res) => {
      if (!res.ok) {
        setMsgError(res.msg);
      }
    });
  }, [sort, order, limit, from]);

  return (
    <AdminLayout>
      <Container>
        <AddressSelect
          order={order}
          setOrder={setOrder}
          setSort={setSort}
          sort={sort}
        />
        {addresses.isLoading ? (
          <Loading title="Cargando direcciones de usuarios" />
        ) : (
          <>
            {addresses.addressList.length === 0 ? (
              <Empty
                title={
                  msgError
                    ? msgError
                    : 'Aún no han dado de alta ninguna dirección'
                }
              />
            ) : (
              <AddressTable
                limit={limit}
                page={page}
                setFrom={setFrom}
                setLimit={setLimit}
                setPage={setPage}
              />
            )}
          </>
        )}
      </Container>
    </AdminLayout>
  );
};

export default Addresses;
