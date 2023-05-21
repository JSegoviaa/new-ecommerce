import {
  ChangeEvent,
  Dispatch,
  FC,
  MouseEvent,
  SetStateAction,
  useContext,
} from 'react';
import {
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { SubcatResp } from '../../../interfaces';
import { AuthContext } from '../../../contexts';
import { formatedDate, isValidRole } from '../../../helpers';

interface Props {
  subcategories: SubcatResp;
  limit: number;
  size: number;
  page: number;
  setLimit: Dispatch<SetStateAction<number>>;
  setPage: Dispatch<SetStateAction<number>>;
  setOffset: Dispatch<SetStateAction<number>>;
}

const SubcategoriesTable: FC<Props> = (props) => {
  const { subcategories, limit, page, setOffset, setLimit, setPage, size } =
    props;

  const { user } = useContext(AuthContext);

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

            <TableCell align="center">Título</TableCell>
            <TableCell align="center">Miniatura</TableCell>
            <TableCell align="center">Categoría</TableCell>
            <TableCell align="center">Fecha de creación</TableCell>
            <TableCell align="center">Fecha de actualización</TableCell>

            {isValidRole(user?.role.id) ? (
              <TableCell align="center">Editar</TableCell>
            ) : null}

            <TableCell align="center">Publicado</TableCell>
            <TableCell align="center">Activo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subcategories?.subcategories.map((sub) => (
            <TableRow
              key={sub.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {sub.id}
              </TableCell>

              <TableCell align="center" component="th" scope="row">
                {sub.title}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                <img
                  width={50}
                  height={50}
                  style={{ borderRadius: 50 }}
                  src={sub.image.url}
                  alt={sub.title}
                />
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {sub.category.title}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {formatedDate(sub.createdAt)}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {formatedDate(sub.updatedAt)}
              </TableCell>

              {isValidRole(user?.role.id) ? (
                <TableCell align="center" component="th" scope="row">
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              ) : null}

              <TableCell align="center" component="th" scope="row">
                <Typography>{sub.isPublished ? 'Sí' : 'No'}</Typography>
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                <Typography>{sub.isActive ? 'Sí' : 'No'}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Divider />

      {subcategories.total > 10 ? (
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

export default SubcategoriesTable;
