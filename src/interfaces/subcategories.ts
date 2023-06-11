import { Image } from './images';

export interface SubcatResp {
  total: number;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: number;
  title: string;
  slug: string;
  isActive: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  category: SCategory;
  image: Image;
  createdBy: UserSCategory;
  updatedBy: UserSCategory;
}

export interface SCategory {
  title: string;
  slug: string;
}

export interface UserSCategory {
  id: number;
  firstName: string;
  lastName: string;
}
