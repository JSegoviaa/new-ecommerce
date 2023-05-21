import { ResponseError, LoginResp } from '../../interfaces';
import { AuthState } from './';

type AuthActionsType =
  | { type: 'Auth - Login'; payload: LoginResp }
  | { type: 'Auth - Logout' }
  | { type: 'Auth - Loading True' }
  | { type: 'Auth - Loading False' }
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

    case 'Auth - Logout':
      return { ...state, isLoggedIn: false, user: undefined, error: undefined };

    case 'Auth - Loading True':
      return { ...state, isLoading: true };

    case 'Auth - Loading False':
      return { ...state, isLoading: false };

    case 'Auth - Error':
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};
