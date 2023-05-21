import { RoleId } from '../interfaces';

export const isValidRole = (role: RoleId | undefined): boolean => {
  return role === 1 || role === 2 || role === 3 ? true : false;
};

export const isAdminRole = (role: RoleId | undefined): boolean => {
  return role === 1 || role === 2 ? true : false;
};

export const isSuperAdminRole = (role: RoleId | undefined): boolean => {
  return role === 1 ? true : false;
};
