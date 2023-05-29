import { FC, useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { title } from '../../../constants';
import { AdminContext, AuthContext } from '../../../contexts';
import { AlertMsg, UsersSelect, UsersTable } from '../../../components';
import { OrderBy, QueryData, Sort } from '../../../interfaces';
import { isSuperAdminRole } from '../../../helpers';

const UsersPage: FC = () => {
  const { user } = useContext(AuthContext);
  const { getUsers, users, error } = useContext(AdminContext);
  const [sort, setSort] = useState<Sort>('ASC');
  const [order, setOrder] = useState<OrderBy>('id');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [size, setSize] = useState(0);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const handleRedirect = () => navigate('/usuarios/crear');

  const isValidAdmin = isSuperAdminRole(user?.role.id);

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
      <>
        {error
          ? error.message.map((err) => (
              <AlertMsg msg={err} title={error.error} type="warning" />
            ))
          : null}
        <>
          {users.users.length === 0 ? (
            <AlertMsg
              msg="Aún no hay usuarios"
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
              {isValidAdmin ? (
                <Fab onClick={handleRedirect}>
                  <AddIcon />
                </Fab>
              ) : null}
            </>
          )}
        </>
      </>
    </Container>
  );
};

export default UsersPage;
