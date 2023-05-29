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
import { AdminContext, AuthContext } from '../../../contexts';
import { AlertMsg, SnackbarAlert } from '../../ui';
import {
  isEmail,
  isPhone,
  isSuperAdminRole,
  isValidPassword,
} from '../../../helpers';

const UsersForm: FC = () => {
  const { user: authUser } = useContext(AuthContext);
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
  const { errors, isValid } = formState;

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

  const isValidAdmin = isSuperAdminRole(authUser?.role.id);

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
          fullWidth
          focused={user?.firstName ? true : false}
          autoComplete="off"
          {...register('firstName', {
            required: 'El nombre del usuario es obligatorio.',
          })}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
        <br />
        <br />
        <TextField
          label="Apellidos"
          type="text"
          fullWidth
          focused={user?.lastName ? true : false}
          autoComplete="off"
          {...register('lastName', {
            required: 'Los apellidos son obligatorios.',
          })}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
        <br />
        <br />
        <TextField
          label="Número telefónico"
          type="text"
          fullWidth
          focused={user?.phoneNumber ? true : false}
          autoComplete="off"
          {...register('phoneNumber', {
            validate: isPhone,
          })}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
        />
        <br />
        <br />

        <TextField
          label="Correo electrónico"
          type="email"
          focused={user?.email ? true : false}
          autoComplete="off"
          fullWidth
          {...register('email', {
            required: 'El correo electrónico es obligatorio.',
            validate: isEmail,
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <br />
        <br />
        <TextField
          label="Contraseña"
          type="password"
          autoComplete="off"
          fullWidth
          {...register('password', {
            required: {
              message: isEditUser ? '' : 'La contraseña es obligatoria',
              value: !isEditUser,
            },
            validate: isEditUser ? undefined : isValidPassword,
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <br />
        <br />
        {isValidAdmin ? (
          <FormControl fullWidth>
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
        ) : null}

        <br />
        <br />

        <Button disabled={!isValid} type="submit">
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
