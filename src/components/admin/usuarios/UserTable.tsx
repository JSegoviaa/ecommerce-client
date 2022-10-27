import {
  FC,
  useContext,
  useEffect,
  ChangeEvent,
  MouseEvent,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import {
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { AdminContext } from '../../../contexts';
import { UserQuery, OrderByUser, Sort } from '../../../interfaces';
import { Empty, Loading } from '../../ui';

interface Props {
  order: OrderByUser;
  sort: Sort;
  active: boolean;
}

const UserTable: FC<Props> = ({ order, sort, active }) => {
  const { users, getUsers } = useContext(AdminContext);
  const [page, setPage] = useState(0);
  const [from, setFrom] = useState(0);
  const [limit, setLimit] = useState(10);

  const router = useRouter();

  const query: UserQuery = {
    order,
    sort,
    limit,
    from,
    active,
  };

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    value: number
  ) => {
    setPage(value);

    setFrom(value * limit);
  };

  const handleChangeRowsPerPage = (e: ChangeEvent<HTMLInputElement>) => {
    setLimit(Number(e.target.value));
    setFrom(0);
    setPage(0);
  };

  useEffect(() => {
    getUsers(query);
  }, [order, sort, limit, from, active]);

  const goToEdit = (id: number) => {
    router.push(`/admin/usuarios/${id}`);
  };

  return (
    <>
      {users.isLoading ? (
        <Loading title="Cargando lista de usuarios" />
      ) : (
        <>
          {users.userList.length === 0 ? (
            <Empty title="Aún no hay usuarios por aquí" />
          ) : (
            <>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">ID</TableCell>
                      <TableCell align="center">Nombres</TableCell>
                      <TableCell align="center">Apellidos</TableCell>
                      <TableCell align="center">Correo electrónico</TableCell>
                      <TableCell align="center">Teléfono</TableCell>
                      <TableCell align="center">Rol</TableCell>
                      <TableCell align="center">Fecha de registro</TableCell>
                      <TableCell align="center">Editar</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.userList.map((user) => (
                      <TableRow
                        key={user.id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell align="center" component="th" scope="row">
                          {user.id}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {user.first_name}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {user.last_name}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {user.email}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {user.phone ? user.phone : 'Sin número telefónico'}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {user.role}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {user.created_at}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          <IconButton onClick={() => goToEdit(user.id)}>
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Divider />

                <TablePagination
                  labelRowsPerPage="Mostrar"
                  labelDisplayedRows={(page) =>
                    `${page.from}-${page.to === -1 ? page.count : page.to} de ${
                      page.count
                    }`
                  }
                  component="div"
                  count={users.totalUsers}
                  page={page}
                  rowsPerPage={limit}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>
            </>
          )}
        </>
      )}
    </>
  );
};

export default UserTable;
