import { createContext } from 'react';
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

interface ContextProps {
  isLoading: boolean;
  categories: CategoriesResp;
  subcategories: SubcatResp;
  users: UsersResp;
  products: ProductsResp;
  variants: { colors: VariantColorsResp; sizes: VariantSizesResp };
  tags: TagsResp;
  roles: RolesResp;
  getCategories: (query: QueryData) => Promise<void>;
  getSubcategories: (query: QueryData) => Promise<void>;
  getUsers: (query: QueryData) => Promise<void>;
  getProducts: (query: QueryData) => Promise<void>;
  getTags: (query: QueryData) => Promise<void>;
  getRoles: (query: QueryData) => Promise<void>;
  getVariantColors: (query: QueryData) => Promise<void>;
  getVariantSizes: (query: QueryData) => Promise<void>;
  adminLogout: () => void;
}

export const AdminContext = createContext({} as ContextProps);
