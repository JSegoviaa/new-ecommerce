export interface ProductsResp {
  total: number;
  products: Product[];
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  discount: number;
  isPublished: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: AtedBy;
  updatedBy: AtedBy;
  subcategory: SubcategoryP[];
}

export interface AtedBy {
  id: number;
  firstName: string;
  lastName: string;
}

export interface SubcategoryP {
  id: number;
  title: string;
  slug: string;
  image: string;
}
