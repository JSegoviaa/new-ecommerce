import { User } from './auth';
import { RoleId } from './roles';

export interface UsersResp {
  total: number;
  users: User[];
}

export interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: number;
  phoneNumber?: string;
}

export interface UserCreated {
  firstName: string;
  lastName: string;
  email: string;
  role: RoleId;
  phoneNumber: null;
  id: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}
