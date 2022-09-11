import { createContext } from 'react';
import {
  LoginData,
  LoginResponse,
  RegisterData,
  RegisterResponse,
  User,
} from '../../interfaces';

interface ContextProps {
  isLoggedIn: boolean;
  isLoading: boolean;
  user?: User;
  login: (data: LoginData) => Promise<LoginResponse>;
  register: (data: RegisterData) => Promise<RegisterResponse>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext({} as ContextProps);
