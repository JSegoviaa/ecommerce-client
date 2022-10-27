import { FC, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

import { AdminLayout, Loading } from '../../../components';
import { AdminContext, AuthContext } from '../../../contexts';
import { isValidRole } from '../../../helpers';

interface FormData {
  name: string;
}

const AddTag: FC = () => {
  const { user } = useContext(AuthContext);
  const { addTags } = useContext(AdminContext);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<FormData>({
    mode: 'onChange',
  });

  const onSubmit = async ({ name }: FormData) => {
    setIsLoading(true);

    const res = await addTags({ name, created_by: user!.id });

    if (res.ok) {
      alert(res.msg);

      setIsLoading(false);

      router.push('/admin/etiquetas');

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

    setIsLoading(false);
  };

  return (
    <AdminLayout
      title="Agregar etiqueta"
      description="Aquí se agregan etiquetas"
      url={router.asPath}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {isLoading ? <Loading title="Creando etiqueta" /> : null}
        <TextField
          autoComplete="off"
          type="text"
          label="Etiqueta"
          {...register('name', {
            required: 'El nombre de la etiqueta es obligatoria.',
          })}
          error={!!formState.errors.name}
          helperText={formState.errors.name?.message}
        />
        <br />

        <Button
          disabled={!isValidRole(user?.role_id) || !formState.isValid}
          type="submit"
        >
          Agregar etiqueta
        </Button>
      </form>
    </AdminLayout>
  );
};

export default AddTag;
