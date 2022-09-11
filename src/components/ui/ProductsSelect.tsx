import { Dispatch, FC, SetStateAction } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { OrderByProducts, Sort } from '../../interfaces';

interface Props {
  sort: Sort;
  order: OrderByProducts;
  setSort: Dispatch<SetStateAction<Sort>>;
  setOrder: Dispatch<SetStateAction<OrderByProducts>>;
}
const ProductsSelect: FC<Props> = (props) => {
  const { sort, order, setOrder, setSort } = props;

  const onChangeSort = (e: SelectChangeEvent) => {
    setSort(e.target.value as Sort);
  };
  const onChangeOrder = (e: SelectChangeEvent) => {
    setOrder(e.target.value as OrderByProducts);
  };

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
          <MenuItem value="updated_at">Fecha de actualización</MenuItem>
          <MenuItem value="discount">Descuento</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default ProductsSelect;
