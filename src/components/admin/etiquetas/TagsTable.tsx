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

const TagsTable: FC<Props> = (props) => {
  const { limit, page, setLimit, setPage, setFrom } = props;
  const { tags } = useContext(AdminContext);

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
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Fecha de creación</TableCell>
              <TableCell align="center">Creado por</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tags.tagList.map((tag) => (
              <TableRow
                key={tag.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {tag.id}
                </TableCell>

                <TableCell align="center" component="th" scope="row">
                  {tag.name}
                </TableCell>

                <TableCell align="center" component="th" scope="row">
                  {tag.created_at}
                </TableCell>

                <TableCell align="center" component="th" scope="row">
                  {tag.first_name} {tag.last_name}
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
          count={tags.total}
          page={page}
          rowsPerPage={limit}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
};

export default TagsTable;
