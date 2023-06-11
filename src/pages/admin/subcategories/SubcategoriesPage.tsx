import { FC, useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import {
  AlertMsg,
  SubcategoriesSelect,
  SubcategoriesTable,
} from '../../../components';
import { title } from '../../../constants';
import { AdminContext, AuthContext } from '../../../contexts';
import { OrderBy, QueryData, Sort } from '../../../interfaces';
import { isAdminRole } from '../../../helpers';

const SubcategoriesPage: FC = () => {
  const { user } = useContext(AuthContext);
  const { getSubcategories, subcategories, error } = useContext(AdminContext);
  const [sort, setSort] = useState<Sort>('ASC');
  const [order, setOrder] = useState<OrderBy>('id');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [size, setSize] = useState(0);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const query: QueryData = { order, sort, offset, limit };

  const handleRedirect = () => navigate('/subcategorias/crear');

  const isValidAdminRole = isAdminRole(user?.role.id);

  useEffect(() => {
    getSubcategories(query);
  }, [order, sort, offset, limit]);

  useEffect(() => {
    setSize(subcategories.total);
  }, [subcategories.total]);

  useEffect(() => {
    document.title = `${title} | Subcategorías`;
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
            {subcategories.subcategories.length === 0 ? (
              <AlertMsg
                msg="No existen categorías"
                title="No hay nada por aquí"
                type="warning"
              />
            ) : (
              <>
                <SubcategoriesSelect
                  order={order}
                  setOrder={setOrder}
                  setSort={setSort}
                  sort={sort}
                />
                <SubcategoriesTable
                  subcategories={subcategories}
                  limit={limit}
                  page={page}
                  setOffset={setOffset}
                  setLimit={setLimit}
                  setPage={setPage}
                  size={size}
                />
                {isValidAdminRole ? (
                  <Fab onClick={handleRedirect}>
                    <AddIcon />
                  </Fab>
                ) : null}
              </>
            )}
          </>
        )}
      </>
    </Container>
  );
};

export default SubcategoriesPage;
