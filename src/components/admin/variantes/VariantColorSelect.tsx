import { FC, Dispatch, SetStateAction } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Sort, VariantColorOrder } from '../../../interfaces';

interface Props {
  sort: Sort;
  order: VariantColorOrder;
  setSort: Dispatch<SetStateAction<Sort>>;
  setOrder: Dispatch<SetStateAction<VariantColorOrder>>;
}

const VariantColorSelect: FC<Props> = (props) => {
  const { sort, order, setOrder, setSort } = props;

  const onChangeSort = (e: SelectChangeEvent) => {
    setSort(e.target.value as Sort);
  };

  const onChangeOrder = (e: SelectChangeEvent) => {
    setOrder(e.target.value as VariantColorOrder);
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
          <MenuItem value="name">Nombre</MenuItem>
          <MenuItem value="color">Color</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default VariantColorSelect;
