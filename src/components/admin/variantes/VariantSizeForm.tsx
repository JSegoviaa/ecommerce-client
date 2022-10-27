import { FC, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

import { AdminContext, AuthContext } from '../../../contexts';
import { VariantSize } from '../../../interfaces';
import { Loading } from '../../ui';
import { isSuperAdminRole } from '../../../helpers';

const VariantSizeForm: FC = () => {
  const { user } = useContext(AuthContext);
  const { addVariantSize } = useContext(AdminContext);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<VariantSize>({
    mode: 'onChange',
  });

  const onSubmit = async (data: VariantSize) => {
    setIsLoading(true);
    const res = await addVariantSize(data);

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
      router.push('/admin/variantes/tamanos');
      setIsLoading(false);
      return;
    }
  };

  return (
    <>
      {isLoading ? <Loading title="Creando etiqueta" /> : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        <br />
        <TextField
          InputLabelProps={{ shrink: true }}
          autoComplete="off"
          placeholder="Grande"
          type="text"
          label="Nombre del tamaño"
          {...register('name', {
            required: 'El nombre es obligatorio.',
          })}
          error={!!formState.errors.name}
          helperText={formState.errors.name?.message}
        />
        <br />
        <br />
        <TextField
          InputLabelProps={{ shrink: true }}
          placeholder="G"
          autoComplete="off"
          type="text"
          label="Abreviación del tamaño"
          {...register('short', {
            required: 'La abreviación es obligatoria.',
          })}
          error={!!formState.errors.short}
          helperText={formState.errors.short?.message}
        />
        <br />
        <br />

        {isSuperAdminRole(user?.role_id) ? (
          <Button disabled={!formState.isValid} type="submit">
            Agregar variante de tamaño
          </Button>
        ) : null}
      </form>
    </>
  );
};

export default VariantSizeForm;
