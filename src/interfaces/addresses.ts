import { Errors } from './errors';
import { Sort } from './fetch';

export interface GetAllAdressesResp {
  ok?: boolean;
  msg: string;
  total?: number;
  addresses?: Address[];
  errors?: Errors[];
}

export interface Address {
  id: number;
  country: string;
  state: string;
  municipality: string;
  city: string;
  colony: string;
  postal_code: string;
  address: string | null;
  info: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface AddressQuery {
  sort: Sort;
  order: AddressOrder;
  limit: number;
  from: number;
}

export type AddressOrder =
  | 'id'
  | 'country'
  | 'state'
  | 'municipality'
  | 'city'
  | 'colony'
  | 'postal_code'
  | 'address'
  | 'info'
  | 'user_id';
