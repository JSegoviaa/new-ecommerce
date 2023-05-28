import {
  ChangeEvent,
  Dispatch,
  FC,
  MouseEvent,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

import { User, UsersResp } from '../../../interfaces';
import { formatedDate } from '../../../helpers';
import { AdminContext } from '../../../contexts';
import { SnackbarAlert } from '../../ui';

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
  const { updateUser, deleteUser, alert, clearSuccessMessage } =
    useContext(AdminContext);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  const handleChangePage = (
    _event: MouseEvent<HTMLButtonElement> | null,
    value: number
  ): void => {
    setPage(value);

    setOffset(value * limit);
  };

  const onOpenPopup = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const onClosePopup = (): void => {
    setAnchorEl(null);
  };

  const handleChangeRowsPerPage = (e: ChangeEvent<HTMLInputElement>): void => {
    setLimit(Number(e.target.value));
    setOffset(0);
    setPage(0);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const onEditUser = (): void => {
    onClosePopup();
    navigate(`/usuarios/${selectedUserId}`);
  };

  const onSelectUserId = (userId: number): void => {
    setSelectedUserId(userId);
  };

  const onSelectUser = (user: User): void => {
    setSelectedUser(user);
  };

  const onOpenDialog = (): void => {
    setOpenDialog(true);
  };

  const onCloseDialog = (): void => {
    setOpenDialog(false);
    onClosePopup();
  };

  const onCloseSnackbar = (): void => {
    clearSuccessMessage();
  };

  const onIsActiveUser = async (): Promise<void> => {
    onClosePopup();
    if (selectedUser) {
      await updateUser({ ...selectedUser, isActive: !selectedUser.isActive });
    }
  };

  const onDeleteUser = async (): Promise<void> => {
    onClosePopup();
    await deleteUser(selectedUserId);
    onCloseDialog();
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
            <TableCell align="center"></TableCell>
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
              <TableCell align="center">
                <IconButton
                  onClick={(e) => {
                    onOpenPopup(e);
                    onSelectUserId(user.id);
                    onSelectUser(user);
                  }}
                  aria-describedby={id}
                >
                  <SettingsIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <Popover
          open={open}
          id={id}
          anchorEl={anchorEl}
          onClose={onClosePopup}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Button variant="text" onClick={onEditUser} sx={{ p: 2 }}>
            Editar usuario
          </Button>
          <Divider />
          <Button variant="text" onClick={onIsActiveUser} sx={{ p: 2 }}>
            {selectedUser?.isActive ? 'Desactivar usuario' : 'Activar usuario'}
          </Button>
          <Divider />
          <Button variant="text" onClick={onOpenDialog} sx={{ p: 2 }}>
            Eliminar usuario
          </Button>
          <Divider />
        </Popover>
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
      <Dialog open={openDialog} onClose={onCloseDialog}>
        <DialogTitle> Eliminar usuario </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de eliminar el usuario de {selectedUser?.firstName}{' '}
            {selectedUser?.lastName}?
          </DialogContentText>
          <br />
          <DialogContentText>
            Al eliminar al usuario también se eliminará toda referencia a él.
            Eso incluye sus comentarios, sus pedidos, sus calificaciones, etc.
          </DialogContentText>
          <br />
          <DialogContentText>
            Si lo que quieres es que el usuario no vuelva a crear pedidos,
            comentar o calificar, te recomendamos que desactives su cuenta.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDialog}>Cancelar</Button>
          <Button onClick={onDeleteUser} autoFocus>
            Eliminar usuario
          </Button>
        </DialogActions>
      </Dialog>

      <SnackbarAlert
        autoHideDuration={6000}
        message={alert.message}
        open={alert.isOpen}
        type="success"
        onClose={onCloseSnackbar}
        position={{ horizontal: 'right', vertical: 'top' }}
      />
    </TableContainer>
  );
};

export default UsersTable;
