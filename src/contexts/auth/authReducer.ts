import { ResponseError, LoginResp } from '../../interfaces';
import { AuthState } from './';

type AuthActionsType =
  | { type: 'Auth - Login'; payload: LoginResp }
  | { type: 'Auth - Loading'; payload: boolean }
  | { type: 'Auth - Logout' }
  | { type: 'Auth - Clear Error' }
  | { type: 'Auth - Error'; payload: ResponseError | undefined };

export const authReducer = (
  state: AuthState,
  action: AuthActionsType
): AuthState => {
  switch (action.type) {
    case 'Auth - Login':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        error: undefined,
      };

    case 'Auth - Loading':
      return { ...state, isLoading: action.payload };

    case 'Auth - Logout':
      return { ...state, isLoggedIn: false, user: undefined, error: undefined };

    case 'Auth - Error':
      return { ...state, isLoading: false, error: action.payload };

    case 'Auth - Clear Error':
      return { ...state, error: undefined };

    default:
      return state;
  }
};
