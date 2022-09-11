import useSWR, { SWRConfiguration, BareFetcher } from 'swr';
import { credentials } from '../credentials';
import { Data } from '../interfaces';

export const useCategories = <T>(config: Data) => {
  const { sort, order, endpoint, is_published, from, is_active, limit } =
    config;

  const { data, error } = useSWR<T>(
    `${credentials.api}/${endpoint}?sort=${sort}&order_by=${order}&is_published=${is_published}&from=${from}&is_active=${is_active}&limit=${limit}`
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useCategory = <T>(id: number) => {
  const { data, error } = useSWR<T>(`${credentials.api}/categories/${id}`);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useSubcategory = <T>(id: number) => {
  const { data, error } = useSWR<T>(`${credentials.api}/subcategories/${id}`);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
