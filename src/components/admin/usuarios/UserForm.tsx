import { FC, useContext, useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { GetUser, Roles, RolesResp } from '../../../interfaces';
import { AdminContext } from '../../../contexts';
import { api } from '../../../api';

interface Props {
  user: GetUser | undefined;
}

const UserForm: FC<Props> = ({ user }) => {
  const { updateUser } = useContext(AdminContext);
  const [roleId, setRoleId] = useState('0');
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [roles, setRoles] = useState<Roles[]>([]);

  const { register, handleSubmit, formState } = useForm<GetUser>({
    mode: 'onChange',
    defaultValues: {
      id: user?.id,
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      is_active: user?.is_active,
      phone: user?.phone,
      role_id: user?.role_id,
    },
  });

  const getAllRoles = async () => {
    setLoadingRoles(true);
    const { data } = await api.get<RolesResp>('/roles', {
      withCredentials: true,
    });

    setRoles(data.roles);
    setLoadingRoles(false);
  };

  useEffect(() => {
    getAllRoles();
  }, []);

  const onChangeRole = ({ target }: SelectChangeEvent) => {
    setRoleId(target.value);
  };

  const onSubmit = async (data: GetUser) => {
    const resp = await updateUser(data);
    console.log(resp, 'resp');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <br />
      <TextField
        InputLabelProps={{ shrink: true }}
        autoComplete="off"
        type="text"
        label="Nombre"
        {...register('first_name', {
          required: 'El nombre de usuario es obligatorio.',
        })}
        error={!!formState.errors.first_name}
        helperText={formState.errors.first_name?.message}
      />
      <br />
      <br />
      <TextField
        InputLabelProps={{ shrink: true }}
        autoComplete="off"
        type="text"
        label="Apellidos"
        {...register('last_name', {
          required: 'Los apellidos del usuario son obligatorios.',
        })}
        error={!!formState.errors.last_name}
        helperText={formState.errors.last_name?.message}
      />
      <br />
      <br />
      <TextField
        InputLabelProps={{ shrink: true }}
        autoComplete="off"
        type="text"
        label="Número telefónico"
        inputProps={{ maxLength: 10 }}
        {...register('phone', {
          required: 'El número del usuario es obligatorio.',
          minLength: {
            value: 10,
            message: 'El número telefónico debe tener al menos 10 caracteres.',
          },
          maxLength: {
            value: 10,
            message:
              'El número telefónico debe tener a lo mucho 10 caracteres.',
          },
        })}
        error={!!formState.errors.phone}
        helperText={formState.errors.phone?.message}
      />
      <br />
      <br />
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Rol</InputLabel>
        <Select onChange={onChangeRole} value={roleId} label="Roles">
          <MenuItem disabled value="0">
            Seleccione un rol
          </MenuItem>
          {roles.map((role) => (
            <MenuItem key={role.id} value={`${role.id}`}>
              {role.role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button disabled={!formState.isValid} type="submit" variant="contained">
        Actualizar usuario
      </Button>
    </form>
  );
};

export default UserForm;
