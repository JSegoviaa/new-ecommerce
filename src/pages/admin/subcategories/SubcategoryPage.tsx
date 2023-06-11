import { FC } from 'react';
import { Container } from '@mui/material';

import { SubcategoriesForm } from '../../../components';

const SubcategoryPage: FC = () => {
  return (
    <Container>
      <h1>SubcategoryPage</h1>
      <SubcategoriesForm />
    </Container>
  );
};

export default SubcategoryPage;
