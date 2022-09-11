export interface Data {
  sort: Sort;
  order: OrderBy;
  endpoint: string;
  is_published: boolean;
  is_active?: boolean;
  limit?: number;
  from?: number;
}

export type Sort = 'ASC' | 'DESC';

export type OrderBy =
  | 'id'
  | 'title'
  | 'is_published'
  | 'created_at'
  | 'updated_at';

export type Endpoint = 'categories' | 'subcategories' | '';

export type OrderByProducts =
  | 'id'
  | 'title'
  | 'discount'
  | 'is_published'
  | 'is_active'
  | 'created_by'
  | 'updated_by'
  | 'created_at'
  | 'updated_at';
