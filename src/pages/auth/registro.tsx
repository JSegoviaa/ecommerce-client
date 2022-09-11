import { useContext } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { Button, Link, TextField, Typography } from '@mui/material';

import { AuthContext } from '../../contexts';

type FormData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register: NextPage = () => {
  const { register: registerUser } = useContext(AuthContext);
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<FormData>({
    mode: 'onChange',
  });

  const onSubmit = async (data: FormData) => {
    const res = await registerUser(data);

    if (res.ok) router.replace('/');

    if (!res.ok) {
      res.errors?.forEach((error) => {
        alert(error.msg);
      });
    }

    if (!res.ok && !res.errors) {
      alert(res.msg);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Typography variant="h1">Registro</Typography>
      <br />
      <TextField
        autoComplete="off"
        label="Nombres"
        {...register('first_name', {
          required: 'El nombre es obligatorio.',
        })}
        error={!!formState.errors.first_name}
        helperText={formState.errors.first_name?.message}
      />
      <br />
      <br />
      <TextField
        autoComplete="off"
        label="Apellidos"
        {...register('last_name', {
          required: 'Los apellidos son obligatorios.',
        })}
        error={!!formState.errors.last_name}
        helperText={formState.errors.last_name?.message}
      />
      <br />
      <br />
      <TextField
        autoComplete="off"
        type="email"
        label="Correo electrónico"
        {...register('email', {
          required: 'El correo electrónico es obligatorio.',
        })}
        error={!!formState.errors.email}
        helperText={formState.errors.email?.message}
      />
      <br />
      <br />
      <TextField
        autoComplete="off"
        label="Contraseña"
        type="password"
        {...register('password', {
          required: 'La contraseña es obligatoria.',
        })}
        error={!!formState.errors.password}
        helperText={formState.errors.password?.message}
      />
      <br />
      <br />
      <TextField
        autoComplete="off"
        label="Confirmar contraseña"
        type="password"
        {...register('confirmPassword', {
          required: 'Confirma la contraseña por favor.',
        })}
        error={!!formState.errors.confirmPassword}
        helperText={formState.errors.confirmPassword?.message}
      />
      <br />
      <br />

      <Button disabled={!formState.isValid} type="submit" variant="contained">
        Registrarme
      </Button>

      <br />
      <br />
      <NextLink href="/auth/inicia-sesion" passHref>
        <Link>¿Ya tienes cuenta? Inicia sesión</Link>
      </NextLink>
    </form>
  );
};

export default Register;
