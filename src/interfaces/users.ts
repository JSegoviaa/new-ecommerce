import { User } from './auth';

export interface UsersResp {
  total: number;
  users: User[];
}
