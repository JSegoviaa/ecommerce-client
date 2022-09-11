import {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { OrderBy, Sort } from '../../interfaces';
import { AuthContext } from '../../contexts';
import { isValidRole } from '../../helpers';

interface Props {
  sort: Sort;
  order: OrderBy;
  setSort: Dispatch<SetStateAction<Sort>>;
  setOrder: Dispatch<SetStateAction<OrderBy>>;
}

const CategoriesSelect: FC<Props> = (props) => {
  const { sort, order, setOrder, setSort } = props;
  const { user } = useContext(AuthContext);
  const [showCategory, setShowCategory] = useState(false);

  const router = useRouter();

  const onChangeSort = (e: SelectChangeEvent) => {
    setSort(e.target.value as Sort);
  };

  const onChangeOrder = (e: SelectChangeEvent) => {
    setOrder(e.target.value as OrderBy);
  };

  useEffect(() => {
    if (router.asPath.includes('subcategorias')) {
      setShowCategory(true);
    }
  }, []);

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Ordenar de manera</InputLabel>
        <Select value={sort} label="Ordenar de manera" onChange={onChangeSort}>
          <MenuItem value="ASC">Ascendente</MenuItem>
          <MenuItem value="DESC">Descendente</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Ordenar por</InputLabel>
        <Select value={order} label="Ordenar por" onChange={onChangeOrder}>
          <MenuItem value="id">Predeterminado</MenuItem>
          <MenuItem value="title">Título</MenuItem>
          <MenuItem value="created_at">Fecha de creación</MenuItem>

          {isValidRole(user?.role_id) ? (
            <MenuItem value="updated_at">Fecha de actualización</MenuItem>
          ) : null}

          {isValidRole(user?.role_id) ? (
            <MenuItem value="is_published">Publicados</MenuItem>
          ) : null}

          {isValidRole(user?.role_id) && showCategory ? (
            <MenuItem value="category_id">Categoría</MenuItem>
          ) : null}
        </Select>
      </FormControl>
    </>
  );
};

export default CategoriesSelect;
