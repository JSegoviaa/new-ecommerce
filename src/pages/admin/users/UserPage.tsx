import { FC } from 'react';
import { Container } from '@mui/material';

import { UsersForm } from '../../../components';

const UserPage: FC = () => {
  return (
    <Container>
      <h1>UserPage</h1>
      <UsersForm />
    </Container>
  );
};

export default UserPage;
