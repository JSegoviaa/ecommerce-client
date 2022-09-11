import { AuthState } from './';
import { User } from '../../interfaces';

type AuthActionsType =
  | { type: 'Auth - Login'; payload?: User }
  | { type: 'Auth - Loading' }
  | { type: 'Auth - Stop Loading' }
  | { type: 'Auth - Logout' };

export const authReducer = (
  state: AuthState,
  action: AuthActionsType
): AuthState => {
  switch (action.type) {
    case 'Auth - Login':
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        user: action.payload,
      };

    case 'Auth - Loading':
      return { ...state, isLoading: true };

    case 'Auth - Stop Loading':
      return { ...state, isLoading: false };

    case 'Auth - Logout':
      return { ...state, isLoggedIn: false, isLoading: false, user: undefined };

    default:
      return state;
  }
};
