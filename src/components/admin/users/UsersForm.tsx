import { FC, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { CreateUser } from '../../../interfaces';
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
import { AlertMsg } from '../../ui';

const UsersForm: FC = () => {
  const { createUser, getRoles, roles, error } = useContext(AdminContext);
  const [role, setRole] = useState('4');
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<CreateUser>({
    mode: 'onChange',
  });

  const onChangeRole = (e: SelectChangeEvent) => {
    setRole(e.target.value);
  };

  const onSubmit = async (e: CreateUser): Promise<void> => {
    const resp = await createUser({ ...e, role: Number(role) });
    if (resp) {
      navigate('/usuarios');
      return;
    }
  };

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
          autoComplete="off"
          {...register('lastName', {
            required: 'Los apellidos son obligatorios.',
          })}
        />
        <br />
        <br />

        <TextField
          label="Correo electrónico"
          type="email"
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
            required: 'La contraseña es obligatoria.',
            minLength: 6,
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
          Crear usuario
        </Button>
      </form>
    </>
  );
};

export default UsersForm;
