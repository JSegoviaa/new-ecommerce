import { ChangeEvent, Dispatch, FC, MouseEvent, SetStateAction } from 'react';
import {
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { UsersResp } from '../../../interfaces';
import { formatedDate } from '../../../helpers';

interface Props {
  users: UsersResp;
  limit: number;
  size: number;
  page: number;
  setLimit: Dispatch<SetStateAction<number>>;
  setPage: Dispatch<SetStateAction<number>>;
  setOffset: Dispatch<SetStateAction<number>>;
}

const UsersTable: FC<Props> = (props) => {
  const { users, limit, page, setOffset, setLimit, setPage, size } = props;

  const handleChangePage = (
    _event: MouseEvent<HTMLButtonElement> | null,
    value: number
  ): void => {
    setPage(value);

    setOffset(value * limit);
  };

  const handleChangeRowsPerPage = (e: ChangeEvent<HTMLInputElement>): void => {
    setLimit(Number(e.target.value));
    setOffset(0);
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Correo</TableCell>
            <TableCell align="center">Rol</TableCell>
            <TableCell align="center">Fecha de registro</TableCell>
            <TableCell align="center">Número</TableCell>
            <TableCell align="center">Activo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.users.map((user) => (
            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {user.id}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {user.firstName} {user.lastName}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {user.email}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {user.role.role}
              </TableCell>

              <TableCell align="center" component="th" scope="row">
                {formatedDate(user.createdAt)}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {user.phoneNumber}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {user.isActive ? 'Sí' : 'No'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Divider />

      {users.total > 10 ? (
        <TablePagination
          labelRowsPerPage="Mostrar"
          labelDisplayedRows={(page) =>
            `${page.from}-${page.to === -1 ? page.count : page.to} de ${
              page.count
            }`
          }
          component="div"
          count={size}
          page={page}
          rowsPerPage={limit}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : null}
    </TableContainer>
  );
};

export default UsersTable;
