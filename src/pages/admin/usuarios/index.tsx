import { useState } from 'react';
import { NextPage } from 'next';
import { Container, Box } from '@mui/material';
import {
  ActiveSelect,
  AdminLayout,
  PieChart,
  UserSelect,
  UserTable,
} from '../../../components';
import { Active, OrderByUser, Sort } from '../../../interfaces';

const Users: NextPage = () => {
  const [sort, setSort] = useState<Sort>('ASC');
  const [order, setOrder] = useState<OrderByUser>('id');
  const [active, setActive] = useState<Active>('active');
  const [isActive, setIsActive] = useState(true);

  return (
    <AdminLayout>
      <Container>
        <Box sx={{ maxWidth: 600 }}>
          <PieChart />
        </Box>

        <ActiveSelect
          active={active}
          setActive={setActive}
          setIsActive={setIsActive}
        />

        <UserSelect
          sort={sort}
          order={order}
          setSort={setSort}
          setOrder={setOrder}
        />
        <UserTable sort={sort} order={order} active={isActive} />
      </Container>
    </AdminLayout>
  );
};

export default Users;
