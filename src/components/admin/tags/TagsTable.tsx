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
import { formatedDate, isValidRole } from '../../../helpers';
import { AuthContext } from '../../../contexts';
import { TagsResp } from '../../../interfaces';

interface Props {
  tags: TagsResp;
  limit: number;
  size: number;
  page: number;
  setLimit: Dispatch<SetStateAction<number>>;
  setPage: Dispatch<SetStateAction<number>>;
  setOffset: Dispatch<SetStateAction<number>>;
}
const TagsTable: FC<Props> = (props) => {
  const { tags, limit, page, setOffset, setLimit, setPage, size } = props;

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

            <TableCell align="center">Nombre</TableCell>
            <TableCell align="center">Fecha de creación</TableCell>

            {isValidRole(user?.role.id) ? (
              <TableCell align="center">Editar</TableCell>
            ) : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {tags?.tags.map((tag) => (
            <TableRow
              key={tag.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {tag.id}
              </TableCell>

              <TableCell align="center" component="th" scope="row">
                {tag.name}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {formatedDate(tag.createdAt)}
              </TableCell>

              {isValidRole(user?.role.id) ? (
                <TableCell align="center" component="th" scope="row">
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              ) : null}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Divider />

      {tags.total > 10 ? (
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

export default TagsTable;
