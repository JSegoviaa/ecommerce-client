import { FC, useReducer } from 'react';
import axios, { AxiosError } from 'axios';
import { api } from '../../api';
import {
  Category,
  CategoryCreatedResp,
  CategoryUpdatedResp,
  CountUsers,
  CreateCategory,
  CreateSubcategory,
  NewSubcategory,
  UpdateSubcatResp,
  UploadedPictureResp,
  UserList,
  UserQuery,
  UserTable,
  UserType,
} from '../../interfaces';
import { AdminContext, adminReducer } from './';

export interface AdminState {
  isLoading: boolean;
  chartLoading: boolean;
  usersType: UserType[];
  users: UserTable[];
  totalUsers: number;
}

interface Props {
  children: JSX.Element;
}

const Admin_INITIAL_STATE: AdminState = {
  isLoading: false,
  chartLoading: false,
  usersType: [],
  users: [],
  totalUsers: 0,
};

export const AdminProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, Admin_INITIAL_STATE);

  const addProduct = async () => {};
  const deleteProduct = async () => {};
  const updateProduct = async () => {};

  const addCategory = async (
    category: CreateCategory
  ): Promise<CategoryCreatedResp> => {
    try {
      const { data } = await api.post<CategoryCreatedResp>(
        '/categories',
        category,
        { withCredentials: true }
      );

      return data;
    } catch (error) {
      console.log({ error });
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<CategoryCreatedResp>;

        return err.response?.data!;
      } else {
        return {
          msg: 'Error en la petición al momento de crear la categoría.',
          ok: false,
          newCategory: {
            created_at: '',
            created_by: 0,
            id: 0,
            image_id: 0,
            is_active: false,
            is_published: false,
            slug: '',
            title: '',
            updated_at: '',
            updated_by: 0,
          },
        };
      }
    }
  };

  const uploadCategoryPic = async (
    id: number,
    picture: FormData
  ): Promise<UploadedPictureResp> => {
    try {
      const { data } = await api.post(
        `/uploads/categories/${id}?type=categories`,
        picture,
        { withCredentials: true }
      );

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<UploadedPictureResp>;

        return err.response?.data!;
      } else {
        return {
          msg: 'Error en la petición al momento de cargar la imagen.',
          ok: false,
          uploadedPicture: { id: 0, url: '' },
        };
      }
    }
  };

  const updateCategory = async (
    category: Category
  ): Promise<CategoryUpdatedResp> => {
    try {
      const { data } = await api.put<CategoryUpdatedResp>(
        `/categories/${category.id}`,
        category,
        { withCredentials: true }
      );

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<CategoryUpdatedResp>;

        return err.response?.data!;
      } else {
        return {
          msg: 'Error en la petición al momento de cargar la imagen.',
          ok: false,
        };
      }
    }
  };

  const addSubcategory = async (
    category: NewSubcategory
  ): Promise<CreateSubcategory> => {
    try {
      const { data } = await api.post<CreateSubcategory>(
        '/subcategories',
        category,
        { withCredentials: true }
      );
      return data;
    } catch (error) {
      console.log({ error });
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<CreateSubcategory>;

        return err.response?.data!;
      } else {
        return {
          msg: 'Error en la petición al momento de crear la subcategoría.',
          ok: false,
          newSubcategory: {
            category_id: 0,
            created_at: '',
            id: 0,
            is_active: false,
            is_published: false,
            created_by: 0,
            slug: '',
            title: '',
            updated_at: '',
            updated_by: 0,
            category_name: '',
            category_slug: '',
            category_title: '',
            image_id: 1,
            url: '',
          },
        };
      }
    }
  };

  const uploadSubcategoryPic = async (
    id: number,
    picture: FormData
  ): Promise<UploadedPictureResp> => {
    try {
      const { data } = await api.post(
        `/uploads/subcategories/${id}?type=subcategories`,
        picture,
        { withCredentials: true }
      );

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<UploadedPictureResp>;

        return err.response?.data!;
      } else {
        return {
          msg: 'Error en la petición al momento de cargar la imagen.',
          ok: false,
          uploadedPicture: { id: 0, url: '' },
        };
      }
    }
  };

  const updateSubcategory = async (
    subcategory: NewSubcategory
  ): Promise<UpdateSubcatResp> => {
    try {
      const { data } = await api.put<UpdateSubcatResp>(
        `/subcategories/${subcategory.id}`,
        subcategory,
        { withCredentials: true }
      );

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<UpdateSubcatResp>;

        return err.response?.data!;
      } else {
        return {
          msg: 'Error en la petición al momento de cargar la imagen.',
          ok: false,
          updatedSubcategory: {
            category_id: 0,
            created_at: '',
            id: 0,
            is_active: false,
            is_published: false,
            created_by: 0,
            image_id: 1,
            slug: '',
            title: '',
            updated_at: '',
            updated_by: 0,
          },
        };
      }
    }
  };

  const addTags = async () => {};
  const deleteTags = async () => {};
  const updateTags = async () => {};

  const addVariant = async () => {};
  const deleteVaraint = async () => {};
  const updateVaraint = async () => {};

  const getUsers = async (query: UserQuery) => {
    const { order, sort, limit, from, active } = query;

    try {
      dispatch({ type: 'Admin - Create Category - isLoading' });

      const { data } = await api.get<UserList>(
        `/users?sort=${sort}&order_by=${order}&limit=${limit}&from=${from}&is_active=${active}`,
        { withCredentials: true }
      );

      dispatch({ type: 'Admin - Load Users', payload: data });

      dispatch({ type: 'Admin - Create Category - isLoading Finish' });
    } catch (error) {
      dispatch({ type: 'Admin - Create Category - isLoading Finish' });
    }
  };

  const countUsersRole = async () => {
    try {
      dispatch({ type: 'Admin - Start Chart Loading' });

      const { data } = await api.get<CountUsers>('/users/count-users', {
        withCredentials: true,
      });

      dispatch({ type: 'Admin - Load Type Role User', payload: data.userType });

      dispatch({ type: 'Admin - Finish Chart Loading' });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'Admin - Finish Chart Loading' });
    }
  };

  return (
    <AdminContext.Provider
      value={{
        ...state,
        addCategory,
        updateCategory,
        uploadCategoryPic,
        addSubcategory,
        uploadSubcategoryPic,
        updateSubcategory,
        countUsersRole,
        getUsers,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
