import useSWR from 'swr';
import { API } from '../env';
import { Sort } from '../interfaces';
import { ProductsResp } from '../interfaces/products';

interface Config {
  sort: Sort;
  order: string;
  slug: string | string[] | undefined;
}

export const useProducts = (config: Config) => {
  const { sort, slug, order } = config;
  const { data, error } = useSWR<ProductsResp>(
    `${API}/products/${slug}/subcategory?sort=${sort}&order_by=${order}`
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
