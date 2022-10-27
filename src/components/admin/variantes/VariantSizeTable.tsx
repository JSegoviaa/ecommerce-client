import {
  FC,
  useContext,
  MouseEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
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
import { AdminContext } from '../../../contexts';

interface Props {
  limit: number;
  page: number;
  setLimit: Dispatch<SetStateAction<number>>;
  setPage: Dispatch<SetStateAction<number>>;
  setFrom: Dispatch<SetStateAction<number>>;
}

const VariantSizeTable: FC<Props> = (props) => {
  const { limit, page, setLimit, setPage, setFrom } = props;
  const { variants } = useContext(AdminContext);

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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Abreviación</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {variants.sizes.sizesList.map((size) => (
            <TableRow
              key={size.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {size.id}
              </TableCell>

              <TableCell align="center" component="th" scope="row">
                {size.name}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {size.short}
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
        count={variants.sizes.total}
        page={page}
        rowsPerPage={limit}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default VariantSizeTable;
