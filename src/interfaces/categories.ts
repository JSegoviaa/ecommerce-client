import { Errors } from './errors';

export interface CategoriesResp {
  ok: boolean;
  msg: string;
  total: string;
  categories: Category[];
  errors?: Errors[];
}

export interface Category {
  id: number;
  title: string;
  image_id: number;
  slug: string;
  is_active: boolean;
  is_published: boolean;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
  url?: string;
}

export interface CategoryCreatedResp {
  ok: boolean;
  msg: string;
  newCategory: Category;
  errors?: Errors[];
}

export interface CategoryUpdatedResp {
  ok: boolean;
  msg: string;
  updatedCategory?: Category;
  errors?: Errors[];
}

export interface CreateCategory {
  title: string;
  updated_by: number;
  created_by: number;
}

export interface CategoryResp {
  ok: boolean;
  msg: string;
  category: Category;
  errors?: Errors[];
}

export type Active = 'active' | 'inactive';
