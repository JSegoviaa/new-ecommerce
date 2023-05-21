import { FC, useContext, useEffect, useState } from 'react';
import { Container } from '@mui/material';
import { AdminContext } from '../../../../contexts';
import { OrderBy, QueryData, Sort } from '../../../../interfaces';
import {
  AlertMsg,
  Loading,
  VariantSizesSelect,
  VariantSizesTable,
} from '../../../../components';

const SizesPage: FC = () => {
  const { variants, getVariantSizes, isLoading } = useContext(AdminContext);
  const [sort, setSort] = useState<Sort>('ASC');
  const [order, setOrder] = useState<OrderBy>('id');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [size, setSize] = useState(0);
  const [page, setPage] = useState(0);

  const query: QueryData = { order, sort, offset, limit };

  useEffect(() => {
    getVariantSizes(query);
  }, [order, sort, offset, limit]);

  useEffect(() => {
    setSize(variants.sizes.total);
  }, [variants.sizes.total]);

  return (
    <Container>
      {isLoading ? (
        <Loading msg="Cargando tamaños" />
      ) : (
        <>
          {variants.sizes.variantSizes.length === 0 ? (
            <AlertMsg msg="Aún no hay tamaños" title="Tamaños" type="warning" />
          ) : (
            <>
              <VariantSizesSelect
                order={order}
                setOrder={setOrder}
                setSort={setSort}
                sort={sort}
              />
              <VariantSizesTable
                limit={limit}
                page={page}
                setLimit={setLimit}
                setOffset={setOffset}
                setPage={setPage}
                size={size}
                variants={variants.sizes}
              />
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default SizesPage;
