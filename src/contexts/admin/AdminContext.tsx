import { createContext } from 'react';
import {
  CategoriesResp,
  CreateCategory,
  CreateUser,
  ProductsResp,
  QueryData,
  ResponseError,
  RolesResp,
  SubcatResp,
  TagsResp,
  User,
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
  error?: ResponseError;
  alert: { message: string; isOpen: boolean };
  getCategories: (query: QueryData) => Promise<void>;
  createCategory: (category: CreateCategory) => Promise<number>;
  updateCategory: (
    categoryId: number,
    category: CreateCategory
  ) => Promise<boolean>;
  deleteCategory: (categoryId: number) => Promise<void>;
  getSubcategories: (query: QueryData) => Promise<void>;
  getUsers: (query: QueryData) => Promise<void>;
  createUser: (user: CreateUser) => Promise<boolean>;
  updateUser: (user: User | undefined) => Promise<boolean>;
  deleteUser: (userId: number) => Promise<boolean>;
  getProducts: (query: QueryData) => Promise<void>;
  getTags: (query: QueryData) => Promise<void>;
  getRoles: (query: QueryData) => Promise<void>;
  getVariantColors: (query: QueryData) => Promise<void>;
  getVariantSizes: (query: QueryData) => Promise<void>;
  uploadImages: (image: FormData) => Promise<number>;
  getImage: (image: number) => Promise<number>;
  adminLogout: () => void;
  clearSuccessMessage: () => void;
}

export const AdminContext = createContext({} as ContextProps);
