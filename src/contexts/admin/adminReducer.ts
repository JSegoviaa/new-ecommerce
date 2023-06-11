import { AdminState } from './';
import {
  CategoriesResp,
  CreateCategory,
  ProductsResp,
  ResponseError,
  RolesResp,
  SubcatResp,
  TagsResp,
  User,
  UsersResp,
  VariantColorsResp,
  VariantSizesResp,
} from '../../interfaces';

export type AdminActionsType =
  | { type: 'Admin - Loading'; payload: boolean }
  | { type: 'Admin - Logout' }
  | { type: 'Admin - Error'; payload: ResponseError | undefined }
  | { type: 'Admin - Open Message'; payload: string }
  | { type: 'Admin - Close Message' }
  | { type: 'Admin - Clear Error' }
  | { type: 'Admin - Get Categories'; payload: CategoriesResp }
  | {
      type: 'Admin - Update Category';
      payload: { categoryId: number; category: CreateCategory };
    }
  | { type: 'Admin - Get Subcategories'; payload: SubcatResp }
  | { type: 'Admin - Get Users'; payload: UsersResp }
  | { type: 'Admin - Update User'; payload: User }
  | { type: 'Admin - Delete User'; payload: number }
  | { type: 'Admin - Get Products'; payload: ProductsResp }
  | { type: 'Admin - Get Tags'; payload: TagsResp }
  | { type: 'Admin - Get Roles'; payload: RolesResp }
  | { type: 'Admin - Get Variant Colors'; payload: VariantColorsResp }
  | { type: 'Admin - Get Variant Sizes'; payload: VariantSizesResp };

export const adminReducer = (
  state: AdminState,
  action: AdminActionsType
): AdminState => {
  switch (action.type) {
    case 'Admin - Loading':
      return { ...state, isLoading: action.payload };

    case 'Admin - Open Message':
      return {
        ...state,
        alert: { isOpen: true, message: action.payload },
      };

    case 'Admin - Close Message':
      return {
        ...state,
        alert: { ...state.alert, isOpen: false },
      };

    case 'Admin - Get Categories':
      return {
        ...state,
        categories: {
          total: action.payload.total,
          categories: action.payload.categories,
        },
      };

    case 'Admin - Update Category':
      return {
        ...state,
        categories: {
          ...state.categories,
          categories: state.categories.categories.map((category) => {
            if (category.id === action.payload.categoryId) {
              return {
                ...category,
                isActive: action.payload.category.isActive,
                isPublished: action.payload.category.isPublished,
                title: action.payload.category.title,
              };
            }
            return category;
          }),
        },
      };

    case 'Admin - Get Subcategories':
      return {
        ...state,
        subcategories: {
          subcategories: action.payload.subcategories,
          total: action.payload.total,
        },
      };

    case 'Admin - Get Users':
      return {
        ...state,
        users: { users: action.payload.users, total: action.payload.total },
      };

    case 'Admin - Update User':
      return {
        ...state,
        users: {
          ...state.users,
          users: state.users.users.map((user) => {
            if (user.id === action.payload.id) {
              return {
                ...user,
                isActive: action.payload.isActive,
                email: action.payload.email,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                phoneNumber: action.payload.phoneNumber,
                role: action.payload.role,
              };
            }
            return user;
          }),
        },
      };

    case 'Admin - Delete User':
      return {
        ...state,
        users: {
          total: state.users.total - 1,
          users: state.users.users.filter((user) => user.id !== action.payload),
        },
      };

    case 'Admin - Get Products':
      return {
        ...state,
        products: {
          products: action.payload.products,
          total: action.payload.total,
        },
      };

    case 'Admin - Get Tags':
      return {
        ...state,
        tags: { tags: action.payload.tags, total: action.payload.total },
      };

    case 'Admin - Get Roles':
      return {
        ...state,
        roles: { roles: action.payload.roles, total: action.payload.total },
      };

    case 'Admin - Get Variant Colors':
      return {
        ...state,
        variants: {
          sizes: { ...state.variants.sizes },
          colors: {
            variantColors: action.payload.variantColors,
            total: action.payload.total,
          },
        },
      };

    case 'Admin - Get Variant Sizes':
      return {
        ...state,
        variants: {
          sizes: {
            total: action.payload.total,
            variantSizes: action.payload.variantSizes,
          },
          colors: { ...state.variants.colors },
        },
      };

    case 'Admin - Logout':
      return {
        ...state,
        categories: { total: 0, categories: [] },
        subcategories: { subcategories: [], total: 0 },
        users: { users: [], total: 0 },
        products: { products: [], total: 0 },
        tags: { tags: [], total: 0 },
        roles: { roles: [], total: 0 },
        variants: {
          colors: { total: 0, variantColors: [] },
          sizes: { total: 0, variantSizes: [] },
        },
        error: undefined,
      };

    case 'Admin - Error':
      return { ...state, error: action.payload };

    case 'Admin - Clear Error':
      return { ...state, error: undefined };

    default:
      return state;
  }
};
