import { FC, useState, useContext, useEffect } from 'react';
import { Container } from '@mui/material';
import {
  AlertMsg,
  VariantColorsSelect,
  VariantColorsTable,
} from '../../../../components';
import { OrderBy, QueryData, Sort } from '../../../../interfaces';
import { AdminContext } from '../../../../contexts';

const ColorsPage: FC = () => {
  const { getVariantColors, variants } = useContext(AdminContext);
  const [sort, setSort] = useState<Sort>('ASC');
  const [order, setOrder] = useState<OrderBy>('id');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [size, setSize] = useState(0);
  const [page, setPage] = useState(0);

  const query: QueryData = { order, sort, offset, limit };

  useEffect(() => {
    getVariantColors(query);
  }, [order, sort, offset, limit]);

  useEffect(() => {
    setSize(variants.colors.total);
  }, [variants.colors.total]);

  return (
    <Container>
      <>
        {variants.colors.variantColors.length === 0 ? (
          <AlertMsg
            msg="Aún no hay variantes de colroes"
            title="Sin variantes de colores"
            type="warning"
          />
        ) : (
          <>
            <VariantColorsSelect
              order={order}
              setOrder={setOrder}
              setSort={setSort}
              sort={sort}
            />
            <VariantColorsTable
              limit={limit}
              page={page}
              setLimit={setLimit}
              setOffset={setOffset}
              setPage={setPage}
              size={size}
              variants={variants.colors}
            />
          </>
        )}
      </>
    </Container>
  );
};

export default ColorsPage;
