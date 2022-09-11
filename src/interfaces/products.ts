import { Errors } from './errors';

export interface ProductsResp {
  ok: boolean;
  msg: string;
  total: string;
  products: Product[];
  errors: Errors[];
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  url: string;
  is_active: boolean;
  is_published: boolean;
  description: string;
  created_at: string;
  updated_at: string;
  subcategory_title: string;
}
