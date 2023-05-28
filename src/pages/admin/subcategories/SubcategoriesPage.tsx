import { FC, useEffect, useContext, useState } from 'react';
import { Container } from '@mui/material';

import {
  AlertMsg,
  SubcategoriesSelect,
  SubcategoriesTable,
} from '../../../components';
import { title } from '../../../constants';
import { AdminContext } from '../../../contexts';
import { OrderBy, QueryData, Sort } from '../../../interfaces';

const SubcategoriesPage: FC = () => {
  const { getSubcategories, subcategories, error } = useContext(AdminContext);
  const [sort, setSort] = useState<Sort>('ASC');
  const [order, setOrder] = useState<OrderBy>('id');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [size, setSize] = useState(0);
  const [page, setPage] = useState(0);

  const query: QueryData = { order, sort, offset, limit };

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
              </>
            )}
          </>
        )}
      </>
    </Container>
  );
};

export default SubcategoriesPage;
