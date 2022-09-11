import { useContext } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Button, Link, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { AuthContext } from '../../contexts';

type FormData = {
  email: string;
  password: string;
};

const Login: NextPage = () => {
  const { login, isLoading } = useContext(AuthContext);
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<FormData>({
    mode: 'onChange',
  });

  const onSubmit = async (data: FormData) => {
    const res = await login(data);

    if (res.ok) router.replace('/');

    if (res.errors?.length! > 0) {
      res.errors?.map((error) => alert(error.msg));
    }

    if (!res.ok && !res.errors) {
      alert(res.msg);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Typography variant="h1">Login</Typography>
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
        {...register('password', { required: 'La contraseña es obligatoria.' })}
        error={!!formState.errors.password}
        helperText={formState.errors.password?.message}
      />
      <br />
      <br />
      <Button disabled={!formState.isValid} type="submit" variant="contained">
        Iniciar sesión
      </Button>
      <br />
      <br />
      <NextLink href="/auth/registro" passHref>
        <Link>¿No tienes cuenta? ¡Regístrate!</Link>
      </NextLink>
    </form>
  );
};

export default Login;
