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

import { CategoriesResp, Category } from '../../../interfaces';
import { formatedDate, isValidRole } from '../../../helpers';
import { AdminContext, AuthContext } from '../../../contexts';
import { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Props {
  categories: CategoriesResp;
  limit: number;
  size: number;
  page: number;
  setLimit: Dispatch<SetStateAction<number>>;
  setPage: Dispatch<SetStateAction<number>>;
  setOffset: Dispatch<SetStateAction<number>>;
}

const CategoriesTable: FC<Props> = (props) => {
  const { categories, limit, page, setOffset, setLimit, setPage, size } = props;
  const { user } = useContext(AuthContext);
  const { updateCategory, deleteCategory } = useContext(AdminContext);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<Category>();
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

  const onEditCategory = (): void => {
    onClosePopup();
    navigate(`/categorias/${selectedCategoryId}`);
  };

  const onSelectCategoryId = (categoryId: number): void => {
    setSelectedCategoryId(categoryId);
  };

  const onSelectCategory = (category: Category): void => {
    setSelectedCategory(category);
  };

  const onOpenDialog = (): void => {
    setOpenDialog(true);
  };

  const onCloseDialog = (): void => {
    setOpenDialog(false);
    onClosePopup();
  };

  const onIsActiveCategory = async (): Promise<void> => {
    onClosePopup();
    if (selectedCategory) {
      // await updateUser({
      //   ...selectedUser,
      //   isActive: !selectedUser.isActive,
      //   role: { ...selectedUser.role, id: selectedUser.role.id },
      // });
    }
  };

  const onIsPublishedCategory = async (): Promise<void> => {
    onClosePopup();
    if (selectedCategory) {
      // await updateUser({
      //   ...selectedUser,
      //   isActive: !selectedUser.isActive,
      //   role: { ...selectedUser.role, id: selectedUser.role.id },
      // });
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>

            <TableCell align="center">Título</TableCell>
            <TableCell align="center">Miniatura</TableCell>
            <TableCell align="center">Fecha de creación</TableCell>
            <TableCell align="center">Fecha de actualización</TableCell>
            <TableCell align="center">Publicado</TableCell>
            <TableCell align="center">Activo</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories?.categories.map((category) => (
            <TableRow
              key={category.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {category.id}
              </TableCell>

              <TableCell align="center" component="th" scope="row">
                {category.title}
              </TableCell>

              <TableCell align="center" component="th" scope="row">
                <img
                  width={50}
                  height={50}
                  style={{ borderRadius: 50 }}
                  src={category.image.url}
                  alt={category.title}
                />
              </TableCell>

              <TableCell align="center" component="th" scope="row">
                {formatedDate(category.createdAt)}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {formatedDate(category.updatedAt)}
              </TableCell>

              <TableCell align="center" component="th" scope="row">
                <Typography>{category.isPublished ? 'Sí' : 'No'}</Typography>
              </TableCell>

              <TableCell align="center" component="th" scope="row">
                <Typography>{category.isActive ? 'Sí' : 'No'}</Typography>
              </TableCell>

              <TableCell align="center" component="th" scope="row">
                <IconButton
                  onClick={(e) => {
                    onOpenPopup(e);
                    onSelectCategoryId(category.id);
                    onSelectCategory(category);
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
          <Button variant="text" onClick={onEditCategory} sx={{ p: 2 }}>
            Editar categoría
          </Button>
          <Divider />

          <Button variant="text" onClick={onIsPublishedCategory} sx={{ p: 2 }}>
            {selectedCategory?.isPublished
              ? 'Cancelar publicación'
              : 'Publicar categoría'}
          </Button>

          <Divider />
          <Button variant="text" onClick={onIsActiveCategory} sx={{ p: 2 }}>
            {selectedCategory?.isActive
              ? 'Desactivar categoría'
              : 'Activar categoría'}
          </Button>

          <Divider />
          <Button variant="text" onClick={onOpenDialog} sx={{ p: 2 }}>
            Eliminar categoría
          </Button>
        </Popover>
      </Table>

      <Divider />

      {categories.total > 10 ? (
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

export default CategoriesTable;
