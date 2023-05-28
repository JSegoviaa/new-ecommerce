import { FC, useEffect, useContext, useState } from 'react';
import { Container } from '@mui/material';

import { title } from '../../../constants';
import { AdminContext } from '../../../contexts';
import { OrderBy, QueryData, Sort } from '../../../interfaces';
import { AlertMsg, TagsSelect, TagsTable } from '../../../components';

const TagsPage: FC = () => {
  const { tags, getTags, error } = useContext(AdminContext);
  const [sort, setSort] = useState<Sort>('ASC');
  const [order, setOrder] = useState<OrderBy>('id');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [size, setSize] = useState(0);
  const [page, setPage] = useState(0);

  const query: QueryData = { order, sort, offset, limit };

  useEffect(() => {
    getTags(query);
  }, [order, sort, offset, limit]);

  useEffect(() => {
    setSize(tags.total);
  }, [tags.total]);

  useEffect(() => {
    document.title = `${title} | Etiquetas`;
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
            {tags.tags.length === 0 ? (
              <AlertMsg
                msg="Aún no hay etiquetas"
                title="Sin etiquetas"
                type="warning"
              />
            ) : (
              <>
                <TagsSelect
                  order={order}
                  setOrder={setOrder}
                  setSort={setSort}
                  sort={sort}
                />
                <TagsTable
                  tags={tags}
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

export default TagsPage;
