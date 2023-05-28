import { FC, useEffect, useContext, useState } from 'react';
import { Container } from '@mui/material';

import { title } from '../../../constants';
import { AdminContext } from '../../../contexts';
import { OrderBy, QueryData, Sort } from '../../../interfaces';
import { AlertMsg, RolesSelect, RolesTable } from '../../../components';

const RolesPage: FC = () => {
  const { roles, getRoles, error } = useContext(AdminContext);
  const [sort, setSort] = useState<Sort>('ASC');
  const [order, setOrder] = useState<OrderBy>('id');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [size, setSize] = useState(0);
  const [page, setPage] = useState(0);

  const query: QueryData = { order, sort, offset, limit };

  useEffect(() => {
    getRoles(query);
  }, [order, sort, offset, limit]);

  useEffect(() => {
    setSize(roles.total);
  }, [roles.total]);

  useEffect(() => {
    document.title = `${title} | Roles`;
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
            {roles.roles.length === 0 ? (
              <AlertMsg msg="Aún no hay roles" title="Roles" type="warning" />
            ) : (
              <>
                <RolesSelect
                  order={order}
                  setOrder={setOrder}
                  setSort={setSort}
                  sort={sort}
                />
                <RolesTable
                  roles={roles}
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

export default RolesPage;
