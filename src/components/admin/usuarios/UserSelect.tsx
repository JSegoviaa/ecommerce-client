import { FC, Dispatch, SetStateAction, useContext } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { OrderByUser, Sort } from '../../../interfaces';
import { AdminContext } from '../../../contexts';
import { Loading } from '../../ui';

interface Props {
  sort: Sort;
  order: OrderByUser;
  setSort: Dispatch<SetStateAction<Sort>>;
  setOrder: Dispatch<SetStateAction<OrderByUser>>;
}

const UserSelect: FC<Props> = (props) => {
  const { sort, order, setOrder, setSort } = props;

  const { isLoading } = useContext(AdminContext);

  const onChangeSort = (e: SelectChangeEvent) => {
    setSort(e.target.value as Sort);
  };
  const onChangeOrder = (e: SelectChangeEvent) => {
    setOrder(e.target.value as OrderByUser);
  };

  return (
    <>
      {isLoading ? null : (
        <>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Ordenar de manera</InputLabel>
            <Select
              value={sort}
              label="Ordenar de manera"
              onChange={onChangeSort}
            >
              <MenuItem value="ASC">Ascendente</MenuItem>
              <MenuItem value="DESC">Descendente</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Ordenar por</InputLabel>
            <Select value={order} label="Ordenar por" onChange={onChangeOrder}>
              <MenuItem value="id">Predeterminado</MenuItem>
              <MenuItem value="first_name">Nombre</MenuItem>
              <MenuItem value="last_name">Apellidos</MenuItem>
              <MenuItem value="email">Correo electrónico</MenuItem>
              <MenuItem value="phone">Teléfono</MenuItem>
              <MenuItem value="role">Rol</MenuItem>
              <MenuItem value="created_at">Fecha de registro</MenuItem>
            </Select>
          </FormControl>
        </>
      )}
    </>
  );
};

export default UserSelect;
