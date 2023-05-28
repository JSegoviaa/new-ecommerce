import { FC, useCallback, useReducer } from 'react';
import axios, { AxiosError } from 'axios';

import { api } from '../../api';
import {
  CategoriesResp,
  CreateUser,
  ProductsResp,
  QueryData,
  ResponseError,
  RolesResp,
  SubcatResp,
  TagsResp,
  User,
  UserCreated,
  UsersResp,
  VariantColorsResp,
  VariantSizesResp,
} from '../../interfaces';
import { AdminContext, adminReducer } from './';

export interface AdminState {
  isLoading: boolean;
  categories: CategoriesResp;
  subcategories: SubcatResp;
  users: UsersResp;
  products: ProductsResp;
  tags: TagsResp;
  roles: RolesResp;
  variants: { colors: VariantColorsResp; sizes: VariantSizesResp };
  error?: ResponseError;
  alert: { message: string; isOpen: boolean };
}

interface Props {
  children: JSX.Element;
}

const ADMIN_INITIAL_STATE: AdminState = {
  isLoading: false,
  categories: { categories: [], total: 0 },
  subcategories: { subcategories: [], total: 0 },
  users: { total: 0, users: [] },
  products: { total: 0, products: [] },
  tags: { total: 0, tags: [] },
  roles: { total: 0, roles: [] },
  variants: {
    colors: { total: 0, variantColors: [] },
    sizes: { total: 0, variantSizes: [] },
  },
  error: undefined,
  alert: { isOpen: false, message: '' },
};

export const AdminProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, ADMIN_INITIAL_STATE);

  const getCategories = async (query: QueryData): Promise<void> => {
    const { order, sort, limit, offset } = query;

    try {
      dispatch({ type: 'Admin - Loading', payload: true });

      const { data } = await api.get<CategoriesResp>('/categories', {
        params: { order, sort, limit, offset },
      });

      dispatch({ type: 'Admin - Get Categories', payload: data });

      dispatch({ type: 'Admin - Loading', payload: false });
      dispatch({ type: 'Admin - Clear Error' });
    } catch (error) {
      dispatch({ type: 'Admin - Loading', payload: false });

      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<ResponseError>;
        dispatch({ type: 'Admin - Logout' });
        dispatch({ type: 'Admin - Error', payload: err.response?.data });
      }
    }
  };

  const getSubcategories = async (query: QueryData): Promise<void> => {
    const { order, sort, limit, offset } = query;
    try {
      dispatch({ type: 'Admin - Loading', payload: true });

      const { data } = await api.get<SubcatResp>('/subcategories', {
        params: { order, sort, limit, offset },
      });

      dispatch({ type: 'Admin - Get Subcategories', payload: data });

      dispatch({ type: 'Admin - Loading', payload: false });
      dispatch({ type: 'Admin - Clear Error' });
    } catch (error) {
      dispatch({ type: 'Admin - Loading', payload: false });

      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<ResponseError>;
        dispatch({ type: 'Admin - Logout' });
        dispatch({ type: 'Admin - Error', payload: err.response?.data });
      }
    }
  };

  const getProducts = async (query: QueryData): Promise<void> => {
    const { order, sort, limit, offset } = query;

    try {
      dispatch({ type: 'Admin - Loading', payload: true });

      const { data } = await api.get<ProductsResp>('/products', {
        params: { order, sort, limit, offset },
      });

      dispatch({ type: 'Admin - Get Products', payload: data });

      dispatch({ type: 'Admin - Loading', payload: false });
      dispatch({ type: 'Admin - Clear Error' });
    } catch (error) {
      dispatch({ type: 'Admin - Loading', payload: false });

      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<ResponseError>;
        dispatch({ type: 'Admin - Logout' });
        dispatch({ type: 'Admin - Error', payload: err.response?.data });
      }
    }
  };

  const getUsers = useCallback(async (query: QueryData): Promise<void> => {
    const { order, sort, limit, offset } = query;
    try {
      dispatch({ type: 'Admin - Loading', payload: true });

      const { data } = await api.get<UsersResp>('/users', {
        params: { order, sort, limit, offset },
      });

      dispatch({ type: 'Admin - Get Users', payload: data });

      dispatch({ type: 'Admin - Loading', payload: false });
      dispatch({ type: 'Admin - Clear Error' });
    } catch (error) {
      dispatch({ type: 'Admin - Loading', payload: false });

      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<ResponseError>;
        dispatch({ type: 'Admin - Logout' });
        dispatch({ type: 'Admin - Error', payload: err.response?.data });
      }
    }
  }, []);

  const createUser = async (user: CreateUser): Promise<boolean> => {
    try {
      dispatch({ type: 'Admin - Loading', payload: true });

      await api.post<UserCreated>('/users', user);
      dispatch({ type: 'Admin - Loading', payload: false });

      dispatch({
        type: 'Admin - Open Message',
        payload: 'Usuario creado correctamente',
      });

      dispatch({ type: 'Admin - Clear Error' });
      return true;
    } catch (error) {
      dispatch({ type: 'Admin - Loading', payload: false });
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<ResponseError>;
        dispatch({ type: 'Admin - Error', payload: err.response?.data });
      }
      return false;
    }
  };

  const updateUser = async (user: User | undefined): Promise<boolean> => {
    try {
      if (user) {
        const { id, createdAt, updatedAt, password, ...rest } = user;

        dispatch({ type: 'Admin - Loading', payload: true });

        await api.put(`/users/${user?.id}`, {
          ...rest,
          role: rest.role.id,
          ...(password && { password }),
        });

        dispatch({ type: 'Admin - Update User', payload: user });

        dispatch({ type: 'Admin - Loading', payload: false });

        dispatch({
          type: 'Admin - Open Message',
          payload: 'El usuario se ha actualizado correctamente',
        });

        dispatch({ type: 'Admin - Clear Error' });
      }
      return true;
    } catch (error) {
      dispatch({ type: 'Admin - Loading', payload: false });
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<ResponseError>;

        dispatch({ type: 'Admin - Error', payload: err.response?.data });
      }
      return false;
    }
  };

  const deleteUser = async (userId: number): Promise<boolean> => {
    try {
      dispatch({ type: 'Admin - Loading', payload: true });

      await api.delete(`/users/${userId}`);

      dispatch({ type: 'Admin - Delete User', payload: userId });

      dispatch({ type: 'Admin - Loading', payload: false });

      dispatch({
        type: 'Admin - Open Message',
        payload: 'El usuario se ha eliminado correctamente',
      });

      dispatch({ type: 'Admin - Clear Error' });
      return true;
    } catch (error) {
      dispatch({ type: 'Admin - Loading', payload: false });
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<ResponseError>;

        dispatch({ type: 'Admin - Error', payload: err.response?.data });
      }
      return false;
    }
  };

  const getTags = async (query: QueryData): Promise<void> => {
    const { order, sort, limit, offset } = query;
    try {
      dispatch({ type: 'Admin - Loading', payload: true });

      const { data } = await api.get<TagsResp>('/tags', {
        params: { order, sort, limit, offset },
      });

      dispatch({ type: 'Admin - Get Tags', payload: data });

      dispatch({ type: 'Admin - Loading', payload: false });
      dispatch({ type: 'Admin - Clear Error' });
    } catch (error) {
      dispatch({ type: 'Admin - Loading', payload: false });

      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<ResponseError>;
        dispatch({ type: 'Admin - Logout' });
        dispatch({ type: 'Admin - Error', payload: err.response?.data });
      }
    }
  };

  const getRoles = async (query: QueryData): Promise<void> => {
    const { order, sort, limit, offset } = query;
    try {
      dispatch({ type: 'Admin - Loading', payload: true });

      const { data } = await api.get<RolesResp>('/roles', {
        params: { order, sort, limit, offset },
      });

      dispatch({ type: 'Admin - Get Roles', payload: data });

      dispatch({ type: 'Admin - Loading', payload: false });
      dispatch({ type: 'Admin - Clear Error' });
    } catch (error) {
      dispatch({ type: 'Admin - Loading', payload: false });

      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<ResponseError>;
        dispatch({ type: 'Admin - Logout' });
        dispatch({ type: 'Admin - Error', payload: err.response?.data });
      }
    }
  };

  const getVariantColors = async (query: QueryData): Promise<void> => {
    const { order, sort, limit, offset } = query;
    try {
      dispatch({ type: 'Admin - Loading', payload: true });

      const { data } = await api.get<VariantColorsResp>('/variant-colors', {
        params: { order, sort, limit, offset },
      });

      dispatch({ type: 'Admin - Get Variant Colors', payload: data });

      dispatch({ type: 'Admin - Loading', payload: false });
      dispatch({ type: 'Admin - Clear Error' });
    } catch (error) {
      dispatch({ type: 'Admin - Loading', payload: false });

      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<ResponseError>;
        dispatch({ type: 'Admin - Logout' });
        dispatch({ type: 'Admin - Error', payload: err.response?.data });
      }
    }
  };

  const getVariantSizes = async (query: QueryData): Promise<void> => {
    const { order, sort, limit, offset } = query;
    try {
      dispatch({ type: 'Admin - Loading', payload: true });

      const { data } = await api.get<VariantSizesResp>('/variant-sizes', {
        params: { order, sort, limit, offset },
      });

      dispatch({ type: 'Admin - Get Variant Sizes', payload: data });

      dispatch({ type: 'Admin - Loading', payload: false });
      dispatch({ type: 'Admin - Clear Error' });
    } catch (error) {
      dispatch({ type: 'Admin - Loading', payload: false });

      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<ResponseError>;
        dispatch({ type: 'Admin - Logout' });
        dispatch({ type: 'Admin - Error', payload: err.response?.data });
      }
    }
  };

  const adminLogout = (): void => dispatch({ type: 'Admin - Logout' });

  const clearSuccessMessage = (): void => {
    dispatch({ type: 'Admin - Close Message' });
  };

  return (
    <AdminContext.Provider
      value={{
        ...state,
        getCategories,
        adminLogout,
        getSubcategories,
        getUsers,
        createUser,
        updateUser,
        deleteUser,
        getProducts,
        getTags,
        getRoles,
        getVariantColors,
        getVariantSizes,
        clearSuccessMessage,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
