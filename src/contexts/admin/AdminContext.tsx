import { createContext } from 'react';
import { CancelTokenSource } from 'axios';
import {
  Category,
  CategoryCreatedResp,
  CategoryUpdatedResp,
  CreateCategory,
  CreateSubcategory,
  GetUser,
  NewSubcategory,
  UpdateSubcatResp,
  UploadedPictureResp,
  UserQuery,
  UserTable,
  UserType,
} from '../../interfaces';

interface ContextProps {
  isLoading: boolean;
  chartLoading: boolean;
  usersType: UserType[];
  users: UserTable[];
  totalUsers: number;
  addCategory: (category: CreateCategory) => Promise<CategoryCreatedResp>;
  updateCategory: (category: Category) => Promise<CategoryUpdatedResp>;
  uploadCategoryPic: (
    id: number,
    picture: FormData
  ) => Promise<UploadedPictureResp>;
  addSubcategory: (category: NewSubcategory) => Promise<CreateSubcategory>;
  uploadSubcategoryPic: (
    id: number,
    picture: FormData
  ) => Promise<UploadedPictureResp>;
  updateSubcategory: (subcategory: NewSubcategory) => Promise<UpdateSubcatResp>;
  countUsersRole: () => Promise<void>;
  getUsers: (query: UserQuery) => Promise<void>;
  updateUser: (user: GetUser) => Promise<void>;
}

export const AdminContext = createContext({} as ContextProps);
