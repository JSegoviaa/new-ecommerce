import { User } from './auth';
import { Image } from './images';

export interface CategoriesResp {
  total: number;
  categories: Category[];
}

export interface Category {
  id: number;
  title: string;
  slug: string;
  isActive: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: UserCat;
  image: Image;
  updatedBy: UserCat;
}

export interface UserCat {
  id: number;
  firstName: string;
  lastName: string;
}

export interface QueryData {
  sort: Sort;
  order: OrderBy;
  limit?: number;
  offset?: number;
}

export type Sort = 'ASC' | 'DESC';

export type OrderBy =
  | 'id'
  | 'title'
  | 'isPublished'
  | 'createdAt'
  | 'updatedAt'
  | 'isActive'
  | 'category.title';

export interface CreateCategory {
  title: string;
  isActive: boolean;
  isPublished: boolean;
  image?: number;
}

export interface CreateCatResp {
  title: string;
  slug: string;
  isActive: boolean;
  isPublished: boolean;
  createdBy: User;
  updatedBy: User;
  id: number;
  createdAt: string;
  updatedAt: string;
}
