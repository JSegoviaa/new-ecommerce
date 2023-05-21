import { createContext } from 'react';
import { LoginData, ResponseError, User } from '../../interfaces';

interface ContextProps {
  isLoggedIn: boolean;
  isLoading: boolean;
  user?: User;
  error?: ResponseError;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  renewToken: () => Promise<void>;
}

export const AuthContext = createContext({} as ContextProps);
