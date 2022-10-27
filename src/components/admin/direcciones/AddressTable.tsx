import {
  FC,
  Dispatch,
  SetStateAction,
  MouseEvent,
  ChangeEvent,
  useContext,
} from 'react';
import {
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import WorkspacesIcon from '@mui/icons-material/Workspaces';

import { AdminContext } from '../../../contexts';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/router';
interface Props {
  limit: number;
  page: number;
  setLimit: Dispatch<SetStateAction<number>>;
  setPage: Dispatch<SetStateAction<number>>;
  setFrom: Dispatch<SetStateAction<number>>;
}
const AddressTable: FC<Props> = (props) => {
  const { limit, page, setLimit, setPage, setFrom } = props;
  const { addresses } = useContext(AdminContext);

  const router = useRouter();

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

  const goToAddress = (id: number) => {
    router.push(`/admin/direcciones/${id}`);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Ciudad</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Municipio</TableCell>
              <TableCell align="center">Código postal</TableCell>
              <TableCell align="center">Dirección</TableCell>
              <TableCell align="center">Usuario</TableCell>
              <TableCell align="center">Ver más</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {addresses.addressList.map((address) => (
              <TableRow
                key={address.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {address.id}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {address.city}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {address.state}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {address.municipality}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {address.postal_code}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {address.address}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  {address.user_id}
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  <IconButton onClick={() => goToAddress(address.id)}>
                    <WorkspacesIcon />
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
          count={addresses.total}
          page={page}
          rowsPerPage={limit}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
};

export default AddressTable;
