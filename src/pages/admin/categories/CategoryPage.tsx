import { FC } from 'react';
import { Container } from '@mui/material';
import { CategoriesForm } from '../../../components';

const CategoryPage: FC = () => {
  return (
    <Container>
      <h1>CategoryPage</h1>
      <CategoriesForm />
    </Container>
  );
};

export default CategoryPage;
