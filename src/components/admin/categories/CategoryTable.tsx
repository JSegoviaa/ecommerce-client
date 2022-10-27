import {
  ChangeEvent,
  Dispatch,
  FC,
  MouseEvent,
  SetStateAction,
  useContext,
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
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { isValidRole } from '../../../helpers';
import { CategoriesResp } from '../../../interfaces';
import { AuthContext } from '../../../contexts';

interface Props {
  categories: CategoriesResp | undefined;
  limit: number;
  size: number;
  page: number;
  setLimit: Dispatch<SetStateAction<number>>;
  setPage: Dispatch<SetStateAction<number>>;
  setFrom: Dispatch<SetStateAction<number>>;
}

const CategoryTable: FC<Props> = (props) => {
  const { categories, limit, size, page, setLimit, setPage, setFrom } = props;
  const { user } = useContext(AuthContext);

  const router = useRouter();
  const goToEdit = (id: number) => router.push(`/admin/categorias/${id}`);

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
            <TableCell align="center">Miniatura</TableCell>
            <TableCell align="center">Título</TableCell>
            <TableCell align="center">Fecha de creación</TableCell>
            <TableCell align="center">Fecha de actualización</TableCell>

            {isValidRole(user?.role_id) ? (
              <TableCell align="center">Editar</TableCell>
            ) : null}

            <TableCell align="center">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories?.categories.map((category) => (
            <TableRow
              key={category.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {category.id}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                <img
                  style={{ width: 40, borderRadius: 50 }}
                  src={category.url}
                  alt={category.title}
                />
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {category.title}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {category.created_at}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {category.updated_at}
              </TableCell>

              {isValidRole(user?.role_id) ? (
                <TableCell align="center" component="th" scope="row">
                  <IconButton onClick={() => goToEdit(category.id)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              ) : null}

              <TableCell align="center" component="th" scope="row">
                <Typography>
                  {category.is_published ? 'Publicado' : 'Sin publicar'}
                </Typography>
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
        count={size}
        page={page}
        rowsPerPage={limit}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default CategoryTable;
