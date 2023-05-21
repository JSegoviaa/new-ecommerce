import { Dispatch, FC, SetStateAction } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

import { OrderBy, Sort } from '../../../interfaces';

interface Props {
  sort: Sort;
  order: OrderBy;
  setSort: Dispatch<SetStateAction<Sort>>;
  setOrder: Dispatch<SetStateAction<OrderBy>>;
}

const UsersSelect: FC<Props> = (props) => {
  const { sort, order, setOrder, setSort } = props;

  const onChangeSort = (e: SelectChangeEvent): void => {
    setSort(e.target.value as Sort);
  };

  const onChangeOrder = (e: SelectChangeEvent): void => {
    setOrder(e.target.value as OrderBy);
  };

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Ordenar de manera</InputLabel>
        <Select value={sort} label="Ordenar de manera" onChange={onChangeSort}>
          <MenuItem value="ASC">Ascendente</MenuItem>
          <MenuItem value="DESC">Descendente</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Ordenar por</InputLabel>
        <Select value={order} label="Ordenar por" onChange={onChangeOrder}>
          <MenuItem value="id">Predeterminado</MenuItem>
          <MenuItem value="firstName">Nombre</MenuItem>
          <MenuItem value="email">Correo</MenuItem>
          <MenuItem value="role.role">Rol</MenuItem>
          <MenuItem value="createdAt">Fecha de registro</MenuItem>
          <MenuItem value="phoneNumber">Número</MenuItem>
          <MenuItem value="isActive">Activo</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default UsersSelect;
