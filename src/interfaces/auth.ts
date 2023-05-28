import { Role } from './roles';

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResp {
  token: string;
  user: User;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | undefined;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  role: { id: number; role: string };
  password: string;
}
