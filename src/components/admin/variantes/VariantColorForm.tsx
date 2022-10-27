import { FC, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, TextField, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { HexColorPicker } from 'react-colorful';

import { AdminContext, AuthContext } from '../../../contexts';
import { VariantColor } from '../../../interfaces';
import { Loading } from '../../ui';
import { isSuperAdminRole } from '../../../helpers';

interface FormData {
  name: string;
}

const VariantColorForm: FC = () => {
  const { user } = useContext(AuthContext);
  const { addVariantColor } = useContext(AdminContext);
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState('#000');
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<FormData>({
    mode: 'onChange',
  });

  const onSubmit = async ({ name }: FormData) => {
    const variantColor: VariantColor = { color, name };

    setIsLoading(true);
    const res = await addVariantColor(variantColor);

    if (!res.ok && res.msg) {
      alert(res.msg);
      setIsLoading(false);
      return;
    }

    if (!res.ok) {
      res.errors?.forEach((error) => alert(error.msg));
      setIsLoading(false);

      return;
    }

    if (!res.ok && !res.errors) {
      alert(res.msg);
      setIsLoading(false);
      return;
    }

    if (res.ok) {
      alert(res.msg);
      router.push('/admin/variantes/colores');
      setIsLoading(false);
      return;
    }
  };

  const onChangeColor = (color: string) => setColor(color);

  return (
    <div>
      {isLoading ? <Loading title="Creando etiqueta" /> : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <br />
        <Box display="flex">
          <HexColorPicker color={color} onChange={onChangeColor} />

          <div style={{ backgroundColor: color, width: 200, height: 200 }} />
        </Box>
        <br />
        <TextField
          InputLabelProps={{ shrink: true }}
          autoComplete="off"
          placeholder="Color"
          type="text"
          label="Nombre del color"
          {...register('name', {
            required: 'El nombre es obligatorio.',
          })}
          error={!!formState.errors.name}
          helperText={formState.errors.name?.message}
        />
        <br />
        <br />

        {isSuperAdminRole(user?.role_id) ? (
          <Button disabled={!formState.isValid} type="submit">
            Agregar variante de color
          </Button>
        ) : null}
      </form>
    </div>
  );
};

export default VariantColorForm;
