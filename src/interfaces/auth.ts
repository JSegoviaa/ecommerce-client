import { Errors } from './errors';

export interface RegisterResponse {
  ok?: boolean;
  msg?: string;
  newUser?: User;
  errors?: Errors[];
  token?: string;
}

export interface LoginResponse {
  ok?: boolean;
  msg?: string;
  user?: User;
  errors?: Errors[];
  token?: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  role_id: RoleId;
  phone: null;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  confirmPassword: string;
}

export type RoleId = 1 | 2 | 3 | 4 | 5;
