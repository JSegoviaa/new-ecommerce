import { FC, useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { title } from '../../../constants';
import { AdminContext, AuthContext } from '../../../contexts';
import {
  AlertMsg,
  CategoriesSelect,
  CategoriesTable,
} from '../../../components';
import { QueryData, OrderBy, Sort } from '../../../interfaces';
import { isSuperAdminRole } from '../../../helpers';

const CategoriesPage: FC = () => {
  const { user } = useContext(AuthContext);
  const { getCategories, categories, error } = useContext(AdminContext);
  const [sort, setSort] = useState<Sort>('ASC');
  const [order, setOrder] = useState<OrderBy>('id');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [size, setSize] = useState(0);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const handleRedirect = () => navigate('/categorias/crear');

  const isValidAdmin = isSuperAdminRole(user?.role.id);

  const query: QueryData = { order, sort, offset, limit };

  useEffect(() => {
    getCategories(query);
  }, [order, sort, offset, limit]);

  useEffect(() => {
    setSize(categories.total);
  }, [categories.total]);

  useEffect(() => {
    document.title = `${title} | Categorías`;
  }, []);

  return (
    <Container>
      <>
        {error ? (
          error.message.map((err) => (
            <AlertMsg msg={err} title={error.error} type="warning" />
          ))
        ) : (
          <>
            {categories.categories.length === 0 ? (
              <AlertMsg
                msg="No existen categorías"
                title="No hay nada por aquí"
                type="warning"
              />
            ) : (
              <>
                <CategoriesSelect
                  order={order}
                  setOrder={setOrder}
                  setSort={setSort}
                  sort={sort}
                />
                <CategoriesTable
                  categories={categories}
                  limit={limit}
                  page={page}
                  setOffset={setOffset}
                  setLimit={setLimit}
                  setPage={setPage}
                  size={size}
                />

                <Fab onClick={handleRedirect}>
                  <AddIcon />
                </Fab>
              </>
            )}
          </>
        )}
      </>
    </Container>
  );
};

export default CategoriesPage;
