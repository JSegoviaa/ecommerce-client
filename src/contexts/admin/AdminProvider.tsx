import { FC, useReducer } from 'react';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { api } from '../../api';
import {
  Address,
  AddressQuery,
  AddVariantColorResp,
  AddVariantSizeResp,
  Category,
  CategoryCreatedResp,
  CategoryUpdatedResp,
  CountUsers,
  CreateCategory,
  CreateSubcategory,
  CreateTag,
  CreateTagsResp,
  GetAllAdressesResp,
  GetTagsResp,
  GetUser,
  GetVariantColorsResp,
  GetVariantSizesResp,
  NewSubcategory,
  TagCreated,
  TagQuery,
  UpdateSubcatResp,
  UploadedPictureResp,
  UserList,
  UserQuery,
  UserTable,
  UserType,
  Variant,
  VariantColor,
  VariantColorQuery,
  VariantsColor,
  VariantSize,
  VariantSizeQuery,
} from '../../interfaces';
import { AdminContext, adminReducer } from './';

export interface AdminState {
  chartLoading: boolean;
  users: {
    isLoading: boolean;
    usersType: UserType[];
    userList: UserTable[];
    totalUsers: number;
  };
  tags: { tagList: TagCreated[]; isLoading: boolean; total: number };
  addresses: { addressList: Address[]; isLoading: boolean; total: number };
  variants: {
    sizes: { sizesList: Variant[]; isLoading: boolean; total: number };
    colors: { isLoading: boolean; colorsList: VariantsColor[]; total: number };
  };
}

interface Props {
  children: JSX.Element;
}

const Admin_INITIAL_STATE: AdminState = {
  chartLoading: false,
  users: {
    isLoading: false,
    usersType: [],
    userList: [],
    totalUsers: 0,
  },
  tags: { tagList: [], isLoading: true, total: 0 },
  addresses: { addressList: [], isLoading: true, total: 0 },
  variants: {
    sizes: { isLoading: true, sizesList: [], total: 0 },
    colors: { isLoading: true, colorsList: [], total: 0 },
  },
};

const token = Cookies.get('token') || '';

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

  const addTags = async (tag: CreateTag): Promise<CreateTagsResp> => {
    try {
      const { data } = await api.post<CreateTagsResp>('/tags', tag, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      console.log({ error });
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<CreateTagsResp>;

        return err.response?.data!;
      } else {
        return { msg: '', ok: false };
      }
    }
  };

  const getAllTags = async (query: TagQuery) => {
    const { sort, order, limit, from } = query;

    try {
      dispatch({ type: 'Admin - Tags - isLoading' });

      const { data } = await api.get<GetTagsResp>(
        `/tags?limit=${limit}&sort=${sort}&from=${from}&order_by=${order}`,
        { withCredentials: true }
      );

      dispatch({ type: 'Admin - Get All Tags', payload: data });

      dispatch({ type: 'Admin - Tags - isLoading Finish' });
    } catch (error) {
      console.log({ error });

      dispatch({ type: 'Admin - Tags - isLoading Finish' });
    }
  };

  const addVariantColor = async (
    variant: VariantColor
  ): Promise<AddVariantColorResp> => {
    try {
      const { data } = await api.post<AddVariantColorResp>(
        'variants/colors',
        variant,
        { withCredentials: true }
      );

      return data;
    } catch (error) {
      console.log({ error });
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<AddVariantColorResp>;

        return err.response?.data!;
      } else {
        return {
          msg: '',
          newColor: { id: 0, name: '', color: '' },
          ok: false,
        };
      }
    }
  };

  const getVariantColors = async (query: VariantColorQuery) => {
    const { from, limit, order, sort } = query;
    try {
      dispatch({ type: 'Admin - Variant Color isLoading' });

      const { data } = await api.get<GetVariantColorsResp>(
        `/variants/colors?sort=${sort}&order_by=${order}&limit=${limit}&from=${from}`,
        { withCredentials: true }
      );

      dispatch({ type: 'Admin - Load Variant Color', payload: data });

      dispatch({ type: 'Admin - Variant Color isLoading Finish' });
    } catch (error) {
      console.log({ error });
      dispatch({ type: 'Admin - Variant Color isLoading Finish' });
    }
  };

  const addVariantSize = async (
    variant: VariantSize
  ): Promise<AddVariantSizeResp> => {
    try {
      const { data } = await api.post<AddVariantSizeResp>(
        '/variants',
        variant,
        { withCredentials: true }
      );

      return data;
    } catch (error) {
      console.log({ error });
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<AddVariantSizeResp>;

        return err.response?.data!;
      } else {
        return {
          msg: '',
          newVariant: { id: 0, name: '', short: '' },
          ok: false,
        };
      }
    }
  };

  const getVariantSizes = async (query: VariantSizeQuery) => {
    const { sort, order, limit, from } = query;
    try {
      dispatch({ type: 'Admin - Variant Sizes isLoading' });

      const { data } = await api.get<GetVariantSizesResp>(
        `/variants?sort=${sort}&order_by=${order}&from=${from}&limit=${limit}`,
        { withCredentials: true }
      );

      dispatch({ type: 'Admin - Load Variant Sizes', payload: data });

      dispatch({ type: 'Admin - Variant isLoading Finish' });
    } catch (error) {
      console.log({ error });
      dispatch({ type: 'Admin - Variant isLoading Finish' });
    }
  };

  const getUsers = async (query: UserQuery) => {
    const { order, sort, limit, from, active } = query;

    try {
      dispatch({ type: 'Admin - Users - isLoading' });

      const { data } = await api.get<UserList>(
        `/users?sort=${sort}&order_by=${order}&limit=${limit}&from=${from}&is_active=${active}`,
        { withCredentials: true }
      );

      dispatch({ type: 'Admin - Load Users', payload: data });

      dispatch({ type: 'Admin - Users - isLoading Finish' });
    } catch (error) {
      dispatch({ type: 'Admin - Users - isLoading Finish' });
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

  const updateUser = async (user: GetUser) => {
    const { data } = await api.put(`/users/${user.id}`, user, {
      withCredentials: true,
    });

    return data;
  };

  const getAllAddresses = async (
    query: AddressQuery
  ): Promise<GetAllAdressesResp> => {
    const { sort, order, limit, from } = query;

    try {
      dispatch({ type: 'Admin - Addresses - isLoading' });

      const { data } = await api.get<GetAllAdressesResp>(
        `/addresses?sort=${sort}&order_by=${order}&limit=${limit}&from=${from}`,
        { withCredentials: true }
      );

      dispatch({ type: 'Admin - Get All Addresses', payload: data });

      dispatch({ type: 'Admin - Addresses - isLoading Finish' });

      return data;
    } catch (error) {
      console.log({ error });
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError<GetAllAdressesResp>;

        dispatch({ type: 'Admin - Addresses - isLoading Finish' });
        return err.response?.data!;
      } else {
        dispatch({ type: 'Admin - Addresses - isLoading Finish' });
        return { msg: '' };
      }
    }
  };

  const adminLogout = () => dispatch({ type: 'Admin - Log out' });

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
        updateUser,
        addTags,
        getAllTags,
        getAllAddresses,
        adminLogout,
        addVariantColor,
        addVariantSize,
        getVariantSizes,
        getVariantColors,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
