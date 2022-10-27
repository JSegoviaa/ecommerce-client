import { createContext } from 'react';
import {
  Address,
  AddressQuery,
  AddVariantColorResp,
  AddVariantSizeResp,
  Category,
  CategoryCreatedResp,
  CategoryUpdatedResp,
  CreateCategory,
  CreateSubcategory,
  CreateTag,
  CreateTagsResp,
  GetAllAdressesResp,
  GetUser,
  NewSubcategory,
  TagCreated,
  TagQuery,
  UpdateSubcatResp,
  UploadedPictureResp,
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

interface ContextProps {
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
    sizes: { isLoading: boolean; sizesList: Variant[]; total: number };
    colors: { isLoading: boolean; colorsList: VariantsColor[]; total: number };
  };
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
  addTags: (tag: CreateTag) => Promise<CreateTagsResp>;
  getAllTags: (query: TagQuery) => Promise<void>;
  getAllAddresses: (query: AddressQuery) => Promise<GetAllAdressesResp>;
  adminLogout: () => void;
  addVariantColor: (variant: VariantColor) => Promise<AddVariantColorResp>;
  addVariantSize: (data: VariantSize) => Promise<AddVariantSizeResp>;
  getVariantSizes: (query: VariantSizeQuery) => Promise<void>;
  getVariantColors: (query: VariantColorQuery) => Promise<void>;
}

export const AdminContext = createContext({} as ContextProps);
