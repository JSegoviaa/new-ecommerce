import { FC, useReducer } from 'react';

import { api } from '../../api';
import {
  CategoriesResp,
  ProductsResp,
  QueryData,
  RolesResp,
  SubcatResp,
  TagsResp,
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
};

export const AdminProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, ADMIN_INITIAL_STATE);

  const getCategories = async (query: QueryData): Promise<void> => {
    const { order, sort, limit, offset } = query;

    try {
      dispatch({ type: 'Admin - Loading True' });

      const { data } = await api.get<CategoriesResp>('/categories', {
        params: { order, sort, limit, offset },
      });

      dispatch({ type: 'Admin - Get Categories', payload: data });

      dispatch({ type: 'Admin - Loading False' });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'Admin - Loading False' });
    }
  };

  const getSubcategories = async (query: QueryData): Promise<void> => {
    const { order, sort, limit, offset } = query;
    try {
      dispatch({ type: 'Admin - Loading True' });

      const { data } = await api.get<SubcatResp>('/subcategories', {
        params: { order, sort, limit, offset },
      });

      dispatch({ type: 'Admin - Get Subcategories', payload: data });

      dispatch({ type: 'Admin - Loading False' });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'Admin - Loading False' });
    }
  };

  const getProducts = async (query: QueryData): Promise<void> => {
    const { order, sort, limit, offset } = query;

    try {
      dispatch({ type: 'Admin - Loading True' });

      const { data } = await api.get<ProductsResp>('/products', {
        params: { order, sort, limit, offset },
      });

      dispatch({ type: 'Admin - Get Products', payload: data });

      dispatch({ type: 'Admin - Loading False' });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'Admin - Loading False' });
    }
  };

  const getUsers = async (query: QueryData): Promise<void> => {
    const { order, sort, limit, offset } = query;
    try {
      dispatch({ type: 'Admin - Loading True' });

      const { data } = await api.get<UsersResp>('/users', {
        params: { order, sort, limit, offset },
      });

      dispatch({ type: 'Admin - Get Users', payload: data });

      dispatch({ type: 'Admin - Loading False' });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'Admin - Loading False' });
    }
  };

  const getTags = async (query: QueryData): Promise<void> => {
    const { order, sort, limit, offset } = query;
    try {
      dispatch({ type: 'Admin - Loading True' });

      const { data } = await api.get<TagsResp>('/tags', {
        params: { order, sort, limit, offset },
      });

      dispatch({ type: 'Admin - Get Tags', payload: data });

      dispatch({ type: 'Admin - Loading False' });
    } catch (error) {
      console.log({ error });
      dispatch({ type: 'Admin - Loading False' });
    }
  };

  const getRoles = async (query: QueryData): Promise<void> => {
    const { order, sort, limit, offset } = query;
    try {
      dispatch({ type: 'Admin - Loading True' });

      const { data } = await api.get<RolesResp>('/roles', {
        params: { order, sort, limit, offset },
      });

      dispatch({ type: 'Admin - Get Roles', payload: data });

      dispatch({ type: 'Admin - Loading False' });
    } catch (error) {
      console.log({ error });
      dispatch({ type: 'Admin - Loading False' });
    }
  };

  const getVariantColors = async (query: QueryData): Promise<void> => {
    const { order, sort, limit, offset } = query;
    try {
      dispatch({ type: 'Admin - Loading True' });

      const { data } = await api.get<VariantColorsResp>('/variant-colors', {
        params: { order, sort, limit, offset },
      });

      dispatch({ type: 'Admin - Get Variant Colors', payload: data });

      dispatch({ type: 'Admin - Loading False' });
    } catch (error) {
      console.log({ error });
      dispatch({ type: 'Admin - Loading False' });
    }
  };

  const getVariantSizes = async (query: QueryData): Promise<void> => {
    const { order, sort, limit, offset } = query;
    try {
      dispatch({ type: 'Admin - Loading True' });

      const { data } = await api.get<VariantSizesResp>('/variant-sizes', {
        params: { order, sort, limit, offset },
      });

      dispatch({ type: 'Admin - Get Variant Sizes', payload: data });

      dispatch({ type: 'Admin - Loading False' });
    } catch (error) {
      console.log({ error });
      dispatch({ type: 'Admin - Loading False' });
    }
  };

  const adminLogout = (): void => dispatch({ type: 'Admin - Logout' });

  return (
    <AdminContext.Provider
      value={{
        ...state,
        getCategories,
        adminLogout,
        getSubcategories,
        getUsers,
        getProducts,
        getTags,
        getRoles,
        getVariantColors,
        getVariantSizes,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
