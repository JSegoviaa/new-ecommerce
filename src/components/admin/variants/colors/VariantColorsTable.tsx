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
import { VariantColorsResp } from '../../../../interfaces';

interface Props {
  variants: VariantColorsResp;
  limit: number;
  size: number;
  page: number;
  setLimit: Dispatch<SetStateAction<number>>;
  setPage: Dispatch<SetStateAction<number>>;
  setOffset: Dispatch<SetStateAction<number>>;
}

const VariantColorsTable: FC<Props> = (props) => {
  const { limit, page, setOffset, setLimit, setPage, size, variants } = props;

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
            <TableCell align="center">Nombre del color</TableCell>
            <TableCell align="center">Color</TableCell>
            <TableCell align="center">Hexadecimal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {variants.variantColors.map((color) => (
            <TableRow
              key={color.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {color.id}
              </TableCell>

              <TableCell align="center" component="th" scope="row">
                {color.name}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {color.color}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {color.color}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Divider />

      {variants.total > 10 ? (
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

export default VariantColorsTable;
