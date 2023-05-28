import { FC, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { CreateUser, User } from '../../../interfaces';
import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  InputLabel,
  FormControl,
} from '@mui/material';
import { AdminContext } from '../../../contexts';
import { AlertMsg, SnackbarAlert } from '../../ui';

const UsersForm: FC = () => {
  const {
    createUser,
    getRoles,
    roles,
    error,
    clearSuccessMessage,
    alert,
    users,
    updateUser,
  } = useContext(AdminContext);
  const [role, setRole] = useState('4');
  const [user, setUser] = useState<User>();
  const [isEditUser, setIsEditUser] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const { register, handleSubmit, formState } = useForm<CreateUser>({
    mode: 'onChange',
    values: {
      email: user?.email ? user.email : '',
      firstName: user?.firstName ? user.firstName : '',
      lastName: user?.lastName ? user.lastName : '',
      phoneNumber: user?.phoneNumber ? user.phoneNumber : '',
      password: '',
      role: user?.role.id ? user.role.id : 4,
    },
  });

  const onChangeRole = (e: SelectChangeEvent) => {
    setRole(e.target.value);
  };

  const onSubmit = async (e: CreateUser): Promise<void> => {
    if (isEditUser) {
      const resp = await updateUser({
        email: e.email,
        firstName: e.firstName,
        lastName: e.lastName,
        phoneNumber: e.phoneNumber,
        updatedAt: user?.updatedAt ? user?.updatedAt : '',
        createdAt: user?.createdAt ? user?.createdAt : '',
        id: user?.id ? user.id : 1,
        role: { id: Number(role), role: user?.role.role ? user.role.role : '' },
        isActive: user?.isActive ? user.isActive : false,
        password: e.password,
      });
      if (resp) {
        navigate('/usuarios');
        return;
      }
    }

    const resp = await createUser({ ...e, role: Number(role) });
    if (resp) {
      navigate('/usuarios');
      return;
    }
  };

  const onCloseSnackbar = (): void => {
    clearSuccessMessage();
  };

  useEffect(() => {
    if (params.id) {
      setIsEditUser(true);
      setUser(users.users.find((user) => user.id === Number(params.id)));
      const role = String(
        users.users.find((user) => user.id === Number(params.id))?.role.id
      );
      setRole(role);
    }
  }, []);

  useEffect(() => {
    getRoles({ order: 'id', sort: 'ASC', limit: 4 });
  }, []);

  return (
    <>
      {error
        ? error.message.map((err) => (
            <AlertMsg type="error" title={error.error} msg={err} />
          ))
        : null}
      <br />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Nombre"
          type="text"
          focused={user?.firstName ? true : false}
          autoComplete="off"
          {...register('firstName', {
            required: 'El nombre del usuario es obligatorio.',
          })}
        />
        <br />
        <br />
        <TextField
          label="Apellidos"
          type="text"
          focused={user?.lastName ? true : false}
          autoComplete="off"
          {...register('lastName', {
            required: 'Los apellidos son obligatorios.',
          })}
        />
        <br />
        <br />
        <TextField
          label="Número telefónico"
          type="text"
          focused={user?.phoneNumber ? true : false}
          autoComplete="off"
          {...register('phoneNumber')}
        />
        <br />
        <br />

        <TextField
          label="Correo electrónico"
          type="email"
          focused={user?.email ? true : false}
          autoComplete="off"
          {...register('email', {
            required: 'El correo electrónico es obligatorio.',
          })}
        />
        <br />
        <br />
        <TextField
          label="Contraseña"
          type="password"
          autoComplete="off"
          {...register('password', {
            required: {
              message: isEditUser ? '' : 'La contraseña es obligatoria',
              value: !isEditUser,
            },
            minLength: isEditUser ? 0 : 6,
          })}
        />
        <br />
        <br />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Rol</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={role}
            onChange={onChangeRole}
            label="Selecciona rol de usuario"
            placeholder="Selecciona rol de usuario"
          >
            {roles.roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <br />
        <br />

        <Button disabled={!formState.isValid} type="submit">
          {isEditUser ? 'Editar usuario' : 'Crear usuario'}
        </Button>
      </form>
      <SnackbarAlert
        autoHideDuration={6000}
        message={alert.message}
        open={alert.isOpen}
        position={{ horizontal: 'right', vertical: 'top' }}
        type="success"
        onClose={onCloseSnackbar}
      />
    </>
  );
};

export default UsersForm;
