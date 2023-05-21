import { FC, useContext, useEffect } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { AuthContext } from '../../contexts';
import { LoginData } from '../../interfaces';
import { AlertMsg } from '../../components';
import { title } from '../../constants';

const LoginPage: FC = () => {
  const { login, error } = useContext(AuthContext);
  const { register, handleSubmit, formState } = useForm<LoginData>({
    mode: 'onChange',
  });

  const onSubmit = async (e: LoginData): Promise<void> => await login(e);

  useEffect(() => {
    document.title = `${title} | Iniciar sesión`;
  }, []);

  return (
    <Container>
      <h1>Iniciar sesión</h1>

      {error ? (
        <>
          {error?.message.map((err) => (
            <AlertMsg msg={err} type="error" title={error.error} />
          ))}
        </>
      ) : null}

      <br />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
        <Button disabled={!formState.isValid} type="submit">
          Iniciar sesión
        </Button>
        <br />
        <br />
        <Typography>Olvidé mi contraseña</Typography>
      </form>
    </Container>
  );
};

export default LoginPage;
