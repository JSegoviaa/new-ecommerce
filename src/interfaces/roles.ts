export interface Role {
  id: RoleId;
  role: RoleName;
}

export type RoleId = 1 | 2 | 3 | 4 | 5;

export type RoleName =
  | 'Super Administrador'
  | 'Administrador'
  | 'Moderador'
  | 'Usuario'
  | 'Invitado';

export interface RolesResp {
  total: number;
  roles: Role[];
}
