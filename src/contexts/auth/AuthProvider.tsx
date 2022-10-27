import { FC, useEffect, useReducer } from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { api } from '../../api';
import {
  LoginData,
  LoginResponse,
  RegisterData,
  RegisterResponse,
  User,
} from '../../interfaces';
import { AuthContext, authReducer } from './';

export interface AuthState {
  isLoggedIn: boolean;
  user?: User;
  isLoading: boolean;
}

interface Props {
  children: JSX.Element;
}

const Auth_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  isLoading: false,
  user: undefined,
};

const token = Cookies.get('token') || '';

export const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);
  const router = useRouter();

  useEffect(() => {
    renewToken();
  }, []);

  const renewToken = async () => {
    if (!Cookies.get('token')) return;

    try {
      const res = await api.get<LoginResponse>('/auth/renew-token', {
        withCredentials: true,
        headers: { 'x-token': token },
      });

      dispatch({ type: 'Auth - Login', payload: res.data.user });

      console.log(res.data);

      Cookies.set('token', res.data.token!);
    } catch (error) {
      Cookies.remove('token');
    }
  };

  const login = async (data: LoginData): Promise<LoginResponse> => {
    try {
      dispatch({ type: 'Auth - Loading' });

      const res = await api.post<LoginResponse>('/auth/login', data, {
        withCredentials: true,
      });

      dispatch({ type: 'Auth - Login', payload: res.data.user });

      Cookies.set('token', res.data.token!);

      return res.data;
    } catch (error) {
      dispatch({ type: 'Auth - Stop Loading' });

      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<LoginResponse>;
        return err.response?.data!;
      } else {
        return {
          msg: 'Error en la petición al momento de iniciar sesión.',
          ok: false,
        };
      }
    }
  };

  const register = async (data: RegisterData): Promise<RegisterResponse> => {
    try {
      dispatch({ type: 'Auth - Loading' });

      const res = await api.post<RegisterResponse>('/users', data, {
        withCredentials: true,
      });

      Cookies.set('token', res.data.token!);

      dispatch({ type: 'Auth - Login', payload: res.data.newUser });

      return res.data;
    } catch (error) {
      dispatch({ type: 'Auth - Stop Loading' });

      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<any>;

        return err.response?.data!;
      } else {
        return {
          ok: false,
          msg: 'Error en la petición al momento de registrarse.',
        };
      }
    }
  };

  const logout = async () => {
    dispatch({ type: 'Auth - Logout' });
    router.push('/');
    Cookies.remove('token');
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
