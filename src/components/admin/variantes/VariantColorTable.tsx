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
import { AdminContext } from '../../../contexts';

interface Props {
  limit: number;
  page: number;
  setLimit: Dispatch<SetStateAction<number>>;
  setPage: Dispatch<SetStateAction<number>>;
  setFrom: Dispatch<SetStateAction<number>>;
}

const VariantColorTable: FC<Props> = (props) => {
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
            <TableCell align="center">Color</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {variants.colors.colorsList.map((color) => (
            <TableRow
              key={color.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {color.id}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {color.name}
              </TableCell>

              <TableCell
                sx={{ backgroundColor: color.color }}
                align="center"
                component="th"
                scope="row"
              >
                {color.color.toUpperCase()}
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
        count={variants.colors.total}
        page={page}
        rowsPerPage={limit}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default VariantColorTable;
