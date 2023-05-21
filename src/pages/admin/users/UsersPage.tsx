import { FC, useEffect, useContext, useState } from 'react';
import { Container } from '@mui/material';

import { title } from '../../../constants';
import { AdminContext } from '../../../contexts';
import {
  AlertMsg,
  Loading,
  UsersSelect,
  UsersTable,
} from '../../../components';
import { OrderBy, QueryData, Sort } from '../../../interfaces';

const UsersPage: FC = () => {
  const { getUsers, users, isLoading, error } = useContext(AdminContext);
  const [sort, setSort] = useState<Sort>('ASC');
  const [order, setOrder] = useState<OrderBy>('id');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [size, setSize] = useState(0);
  const [page, setPage] = useState(0);

  const query: QueryData = { order, sort, offset, limit };

  useEffect(() => {
    getUsers(query);
  }, [order, sort, offset, limit]);

  useEffect(() => {
    setSize(users.total);
  }, [users.total]);

  useEffect(() => {
    document.title = `${title} | Usuarios`;
  }, []);

  return (
    <Container>
      {isLoading ? (
        <Loading msg="Cargando usuarios" />
      ) : (
        <>
          {error ? (
            error.message.map((err) => (
              <AlertMsg msg={err} title={error.error} type="warning" />
            ))
          ) : (
            <>
              {users.users.length === 0 ? (
                <AlertMsg
                  msg="Aún no hay usuairos"
                  title="Usuarios"
                  type="warning"
                />
              ) : (
                <>
                  <UsersSelect
                    order={order}
                    setOrder={setOrder}
                    setSort={setSort}
                    sort={sort}
                  />
                  <UsersTable
                    users={users}
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

export default UsersPage;
