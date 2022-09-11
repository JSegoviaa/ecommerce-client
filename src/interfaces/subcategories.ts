import { Errors } from './errors';

export interface SubcategoriesResp {
  ok: boolean;
  msg: string;
  total: string;
  subcategories: Subcategory[];
  errors: Errors[];
}

export interface Subcategory {
  id: number;
  title: string;
  slug: string;
  url: string;
  is_active: boolean;
  is_published: boolean;
  created_by: number;
  updated_by: number;
  category_id: number;
  created_at: string;
  updated_at: string;
  category_title: string;
  category_slug: string;
  category_name: string;
  image_id: number;
}

export interface CreateSubcategory {
  ok: boolean;
  msg: string;
  newSubcategory: Subcategory;
  errors?: Errors[];
}

export interface NewSubcategory {
  id: number;
  title: string;
  category_id: number;
  created_by: number | undefined;
  updated_by: number | undefined;
  image_id: number;
  is_active: boolean;
  is_published: boolean;
}

export interface CategoryIDResp {
  ok: boolean;
  msg: string;
  category: Subcategory;
}

export interface UpdateSubcatResp {
  ok: boolean;
  msg: string;
  updatedSubcategory: UpdatedSubcategory;
  errors?: Errors[];
}

export interface UpdatedSubcategory {
  id: number;
  title: string;
  image_id: number;
  slug: string;
  is_active: boolean;
  is_published: boolean;
  created_by: number;
  updated_by: number;
  category_id: number;
  created_at: string;
  updated_at: string;
}

// export interface NewSubcategory {
//   id:           number;
//   title:        string;
//   image_id:     string;
//   slug:         string;
//   is_active:    boolean;
//   is_published: boolean;
//   created_by:   number;
//   updated_by:   number;
//   category_id:  number;
//   created_at:   string;
//   updated_at:   string;
// }
