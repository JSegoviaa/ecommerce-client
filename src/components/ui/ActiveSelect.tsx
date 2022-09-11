import { Dispatch, FC, SetStateAction } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { Active } from '../../interfaces';

interface Props {
  active: string;
  setActive: Dispatch<SetStateAction<Active>>;
  setIsActive: Dispatch<SetStateAction<boolean>>;
}

const ActiveSelect: FC<Props> = ({ setActive, setIsActive, active }) => {
  const onChangeActive = ({ target }: SelectChangeEvent) => {
    if (target.value === 'active') {
      setActive('active');
      setIsActive(true);
    }

    if (target.value === 'inactive') {
      setActive('inactive');
      setIsActive(false);
    }
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel>Ver</InputLabel>
      <Select
        onChange={onChangeActive}
        value={active}
        label="Ordenar de manera"
      >
        <MenuItem value="active">Activos</MenuItem>
        <MenuItem value="inactive">Inactivos</MenuItem>
      </Select>
    </FormControl>
  );
};

export default ActiveSelect;
