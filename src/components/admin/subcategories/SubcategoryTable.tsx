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
import { SubcategoriesResp } from '../../../interfaces';
import { AuthContext } from '../../../contexts';

interface Props {
  subcategories: SubcategoriesResp | undefined;
  limit: number;
  size: number;
  page: number;
  setLimit: Dispatch<SetStateAction<number>>;
  setPage: Dispatch<SetStateAction<number>>;
  setFrom: Dispatch<SetStateAction<number>>;
}

const SubcategoryTable: FC<Props> = (props) => {
  const { subcategories, limit, size, page, setLimit, setPage, setFrom } =
    props;

  const { user } = useContext(AuthContext);
  const router = useRouter();
  const goToEdit = (id: number) => router.push(`/admin/subcategorias/${id}`);

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
            <TableCell align="center">Categoría</TableCell>
            <TableCell align="center">Fecha de creación</TableCell>
            <TableCell align="center">Fecha de actualización</TableCell>

            {isValidRole(user?.role_id) ? (
              <TableCell align="center">Editar</TableCell>
            ) : null}

            <TableCell align="center">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subcategories?.subcategories.map((subcategory) => (
            <TableRow
              key={subcategory.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {subcategory.id}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                <img
                  style={{ width: 40, borderRadius: 50 }}
                  src={subcategory.url}
                  alt={subcategory.title}
                />
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {subcategory.title}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {subcategory.category_name}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {subcategory.created_at}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {subcategory.updated_at}
              </TableCell>

              {isValidRole(user?.role_id) ? (
                <TableCell align="center" component="th" scope="row">
                  <IconButton onClick={() => goToEdit(subcategory.id)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              ) : null}

              <TableCell align="center" component="th" scope="row">
                <Typography>
                  {subcategory.is_published ? 'Publicado' : 'Sin publicar'}
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

export default SubcategoryTable;
