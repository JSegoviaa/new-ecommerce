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
import { VariantSizesResp } from '../../../../interfaces';

interface Props {
  variants: VariantSizesResp;
  limit: number;
  size: number;
  page: number;
  setLimit: Dispatch<SetStateAction<number>>;
  setPage: Dispatch<SetStateAction<number>>;
  setOffset: Dispatch<SetStateAction<number>>;
}

const VariantSizesTable: FC<Props> = (props) => {
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
            <TableCell align="center">Tamaño</TableCell>
            <TableCell align="center">Abreviatura</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {variants.variantSizes.map((size) => (
            <TableRow
              key={size.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {size.id}
              </TableCell>

              <TableCell align="center" component="th" scope="row">
                {size.name}
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {size.short}
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

export default VariantSizesTable;
