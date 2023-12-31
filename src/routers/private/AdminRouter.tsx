import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Navbar } from '../../components';
import {
  CategoriesPage,
  CategoryPage,
  ColorsPage,
  CommentsPage,
  HomePage,
  ProductsPage,
  RatingsPage,
  RolesPage,
  SizesPage,
  SubcategoriesPage,
  SubcategoryPage,
  TagsPage,
  UserPage,
  UsersPage,
  VariantsPage,
} from '../../pages';

const AdminRouter: FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categorias" element={<CategoriesPage />} />
        <Route path="/categorias/crear" element={<CategoryPage />} />
        <Route path="/categorias/:id" element={<CategoryPage />} />
        <Route path="/comentarios" element={<CommentsPage />} />
        <Route path="/productos" element={<ProductsPage />} />
        <Route path="/ratings" element={<RatingsPage />} />
        <Route path="/roles" element={<RolesPage />} />
        <Route path="/subcategorias" element={<SubcategoriesPage />} />
        <Route path="/subcategorias/crear" element={<SubcategoryPage />} />
        <Route path="/subcategorias/:id" element={<SubcategoryPage />} />
        <Route path="/etiquetas" element={<TagsPage />} />
        <Route path="/usuarios" element={<UsersPage />} />
        <Route path="/usuarios/crear" element={<UserPage />} />
        <Route path="/usuarios/:id" element={<UserPage />} />
        <Route path="/variantes/*" element={<VariantsPage />}>
          <Route path="colores" element={<ColorsPage />} />
          <Route path="tamanos" element={<SizesPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AdminRouter;
