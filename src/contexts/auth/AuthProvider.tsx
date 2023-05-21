import { FC, useCallback, useEffect, useReducer } from 'react';
import axios, { AxiosError } from 'axios';

import { api, authApi } from '../../api';
import { LoginData, ResponseError, LoginResp, User } from '../../interfaces';
import { AuthContext, authReducer } from './';

export interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  user?: User;
  error?: ResponseError;
}

interface Props {
  children: JSX.Element;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  isLoading: false,
  user: undefined,
  error: undefined,
};

const token = localStorage.getItem('token');

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  useEffect(() => {
    renewToken();
  }, []);

  const login = async (data: LoginData): Promise<void> => {
    try {
      dispatch({ type: 'Auth - Loading True' });

      const res = await api.post<LoginResp>('/auth/admin-login', data);

      dispatch({ type: 'Auth - Login', payload: res.data });

      localStorage.setItem('token', res.data.token);

      dispatch({ type: 'Auth - Loading False' });
    } catch (error) {
      console.log(error);

      dispatch({ type: 'Auth - Loading False' });

      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<ResponseError>;
        dispatch({ type: 'Auth - Error', payload: err.response?.data });
      }
    }
  };

  const logout = async (): Promise<void> => {
    try {
      dispatch({ type: 'Auth - Loading True' });

      localStorage.removeItem('token');

      dispatch({ type: 'Auth - Logout' });

      dispatch({ type: 'Auth - Loading False' });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'Auth - Loading False' });
    }
  };

  const renewToken = useCallback(async (): Promise<void> => {
    if (!token) return;

    try {
      dispatch({ type: 'Auth - Loading True' });

      const res = await authApi.get<LoginResp>('/auth/renew-jwt');

      dispatch({ type: 'Auth - Login', payload: res.data });

      dispatch({ type: 'Auth - Loading False' });
    } catch (error) {
      console.log(error);

      dispatch({ type: 'Auth - Loading False' });

      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<ResponseError>;
        dispatch({ type: 'Auth - Error', payload: err.response?.data });
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, renewToken }}>
      {children}
    </AuthContext.Provider>
  );
};
