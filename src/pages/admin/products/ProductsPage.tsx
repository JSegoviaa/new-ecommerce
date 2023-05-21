import { Container } from '@mui/material';
import { FC, useEffect, useContext, useState } from 'react';
import {
  AlertMsg,
  Loading,
  ProductsSelect,
  ProductsTable,
} from '../../../components';

import { title } from '../../../constants';
import { AdminContext } from '../../../contexts';
import { OrderBy, QueryData, Sort } from '../../../interfaces';

const ProductsPage: FC = () => {
  const { getProducts, products, isLoading, error } = useContext(AdminContext);
  const [sort, setSort] = useState<Sort>('ASC');
  const [order, setOrder] = useState<OrderBy>('id');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [size, setSize] = useState(0);
  const [page, setPage] = useState(0);

  const query: QueryData = { order, sort, offset, limit };

  useEffect(() => {
    getProducts(query);
  }, [order, sort, offset, limit]);

  useEffect(() => {
    setSize(products.total);
  }, [products.total]);

  useEffect(() => {
    document.title = `${title} | Productos`;
  }, []);

  return (
    <Container>
      {isLoading ? (
        <Loading msg="Cargando productos" />
      ) : (
        <>
          {error ? (
            error.message.map((err) => (
              <AlertMsg msg={err} title={error.error} type="warning" />
            ))
          ) : (
            <>
              {products.products.length === 0 ? (
                <AlertMsg
                  msg="Aún no hay ningún producto"
                  title="Sin productos"
                  type="warning"
                />
              ) : (
                <>
                  <ProductsSelect
                    order={order}
                    setOrder={setOrder}
                    setSort={setSort}
                    sort={sort}
                  />
                  <ProductsTable
                    products={products}
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
      )}
    </Container>
  );
};

export default ProductsPage;
