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
  Typography,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { SubcatResp, Subcategory } from '../../../interfaces';
import { AuthContext } from '../../../contexts';
import { formatedDate } from '../../../helpers';

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
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(0);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory>();

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

  const onEditSubcategory = (): void => {
    onClosePopup();
    navigate(`/subcategorias/${selectedSubcategoryId}`);
  };

  const onSelectSubcategoryId = (subcategoryId: number): void => {
    setSelectedSubcategoryId(subcategoryId);
  };

  const onSelectSubcategory = (subcategory: Subcategory): void => {
    setSelectedSubcategory(subcategory);
  };

  const onIsActiveCategory = async (): Promise<void> => {
    onClosePopup();
  };

  const onIsPublishedCategory = async (): Promise<void> => {
    onClosePopup();
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
            <TableCell align="center">Publicado</TableCell>
            <TableCell align="center">Activo</TableCell>
            <TableCell align="center"></TableCell>
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

              <TableCell align="center" component="th" scope="row">
                <Typography>{sub.isPublished ? 'Sí' : 'No'}</Typography>
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                <Typography>{sub.isActive ? 'Sí' : 'No'}</Typography>
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                <IconButton
                  onClick={(e) => {
                    onOpenPopup(e);
                    onSelectSubcategoryId(sub.id);
                    onSelectSubcategory(sub);
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
          <Button variant="text" onClick={onEditSubcategory} sx={{ p: 2 }}>
            Editar categoría
          </Button>
          <Divider />

          <Button variant="text" onClick={onIsPublishedCategory} sx={{ p: 2 }}>
            {selectedSubcategory?.isPublished
              ? 'Ocultar subcategoría'
              : 'Publicar subcategoría'}
          </Button>

          <Divider />
          <Button variant="text" onClick={onIsActiveCategory} sx={{ p: 2 }}>
            {selectedSubcategory?.isActive
              ? 'Desactivar subcategoría'
              : 'Activar subcategoría'}
          </Button>
        </Popover>
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
