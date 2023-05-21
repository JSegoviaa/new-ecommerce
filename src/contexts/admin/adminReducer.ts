import { AdminState } from './';
import {
  CategoriesResp,
  ProductsResp,
  RolesResp,
  SubcatResp,
  TagsResp,
  UsersResp,
  VariantColorsResp,
  VariantSizesResp,
} from '../../interfaces';

type AdminActionsType =
  | { type: 'Admin - Loading True' }
  | { type: 'Admin - Loading False' }
  | { type: 'Admin - Get Categories'; payload: CategoriesResp }
  | { type: 'Admin - Get Subcategories'; payload: SubcatResp }
  | { type: 'Admin - Get Users'; payload: UsersResp }
  | { type: 'Admin - Get Products'; payload: ProductsResp }
  | { type: 'Admin - Get Tags'; payload: TagsResp }
  | { type: 'Admin - Get Roles'; payload: RolesResp }
  | { type: 'Admin - Get Variant Colors'; payload: VariantColorsResp }
  | { type: 'Admin - Get Variant Sizes'; payload: VariantSizesResp }
  | { type: 'Admin - Logout' };

export const adminReducer = (
  state: AdminState,
  action: AdminActionsType
): AdminState => {
  switch (action.type) {
    case 'Admin - Loading True':
      return { ...state, isLoading: true };

    case 'Admin - Loading False':
      return { ...state, isLoading: false };

    case 'Admin - Get Categories':
      return {
        ...state,
        categories: {
          total: action.payload.total,
          categories: action.payload.categories,
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
      };

    default:
      return state;
  }
};
