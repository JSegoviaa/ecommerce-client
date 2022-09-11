import { UserList, UserType } from '../../interfaces';
import { AdminState } from './';

type AdminActionsType =
  | { type: 'Admin - Create Category - isLoading' }
  | { type: 'Admin - Create Category - isLoading Finish' }
  | { type: 'Admin - Start Chart Loading' }
  | { type: 'Admin - Finish Chart Loading' }
  | { type: 'Admin - Load Type Role User'; payload: UserType[] }
  | { type: 'Admin - Load Users'; payload: UserList };

export const adminReducer = (
  state: AdminState,
  actions: AdminActionsType
): AdminState => {
  switch (actions.type) {
    case 'Admin - Create Category - isLoading':
      return { ...state, isLoading: true };

    case 'Admin - Create Category - isLoading Finish':
      return { ...state, isLoading: false };

    case 'Admin - Start Chart Loading':
      return { ...state, chartLoading: true };

    case 'Admin - Finish Chart Loading':
      return { ...state, chartLoading: false };

    case 'Admin - Load Type Role User':
      return { ...state, usersType: actions.payload };

    case 'Admin - Load Users':
      return {
        ...state,
        users: actions.payload.users,
        totalUsers: actions.payload.total,
      };

    default:
      return state;
  }
};
