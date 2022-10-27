import {
  GetAllAdressesResp,
  GetTagsResp,
  GetVariantColorsResp,
  GetVariantSizesResp,
  UserList,
  UserType,
} from '../../interfaces';
import { AdminState } from './';

type AdminActionsType =
  | { type: 'Admin - Users - isLoading' }
  | { type: 'Admin - Users - isLoading Finish' }
  | { type: 'Admin - Start Chart Loading' }
  | { type: 'Admin - Finish Chart Loading' }
  | { type: 'Admin - Load Type Role User'; payload: UserType[] }
  | { type: 'Admin - Load Users'; payload: UserList }
  | { type: 'Admin - Get All Tags'; payload: GetTagsResp }
  | { type: 'Admin - Tags - isLoading' }
  | { type: 'Admin - Tags - isLoading Finish' }
  | { type: 'Admin - Get All Addresses'; payload: GetAllAdressesResp }
  | { type: 'Admin - Addresses - isLoading' }
  | { type: 'Admin - Addresses - isLoading Finish' }
  | { type: 'Admin - Log out' }
  | { type: 'Admin - Load Variant Sizes'; payload: GetVariantSizesResp }
  | { type: 'Admin - Variant Sizes isLoading' }
  | { type: 'Admin - Variant isLoading Finish' }
  | { type: 'Admin - Variant Color isLoading' }
  | { type: 'Admin - Variant Color isLoading Finish' }
  | { type: 'Admin - Load Variant Color'; payload: GetVariantColorsResp };

export const adminReducer = (
  state: AdminState,
  actions: AdminActionsType
): AdminState => {
  switch (actions.type) {
    case 'Admin - Users - isLoading':
      return { ...state, users: { ...state.users, isLoading: true } };

    case 'Admin - Users - isLoading Finish':
      return { ...state, users: { ...state.users, isLoading: false } };

    case 'Admin - Start Chart Loading':
      return { ...state, chartLoading: true };

    case 'Admin - Finish Chart Loading':
      return { ...state, chartLoading: false };

    case 'Admin - Load Type Role User':
      return {
        ...state,
        users: { ...state.users, usersType: actions.payload },
      };

    case 'Admin - Load Users':
      return {
        ...state,
        users: {
          ...state.users,
          userList: actions.payload.users,
          totalUsers: actions.payload.total,
        },
      };

    case 'Admin - Get All Tags':
      return {
        ...state,
        tags: {
          ...state.tags,
          tagList: actions.payload.tags,
          total: actions.payload.total,
        },
      };

    case 'Admin - Tags - isLoading':
      return {
        ...state,
        tags: { ...state.tags, isLoading: true },
      };

    case 'Admin - Tags - isLoading Finish':
      return {
        ...state,
        tags: { ...state.tags, isLoading: false },
      };

    case 'Admin - Addresses - isLoading':
      return {
        ...state,
        addresses: { ...state.addresses, isLoading: true },
      };

    case 'Admin - Addresses - isLoading Finish':
      return {
        ...state,
        addresses: { ...state.addresses, isLoading: false },
      };

    case 'Admin - Get All Addresses':
      return {
        ...state,
        addresses: {
          ...state.addresses,
          addressList: actions.payload.addresses || [],
          total: actions.payload.total || 0,
        },
      };

    case 'Admin - Variant Sizes isLoading':
      return {
        ...state,
        variants: {
          ...state.variants,
          sizes: { ...state.variants.sizes, isLoading: true },
        },
      };

    case 'Admin - Variant isLoading Finish':
      return {
        ...state,
        variants: {
          ...state.variants,
          sizes: { ...state.variants.sizes, isLoading: false },
        },
      };

    case 'Admin - Load Variant Sizes':
      return {
        ...state,
        variants: {
          ...state.variants,
          sizes: {
            ...state.variants.sizes,
            sizesList: actions.payload.variants,
            total: actions.payload.total,
          },
        },
      };

    case 'Admin - Variant Color isLoading':
      return {
        ...state,
        variants: {
          ...state.variants,
          colors: { ...state.variants.colors, isLoading: true },
        },
      };

    case 'Admin - Variant Color isLoading Finish':
      return {
        ...state,
        variants: {
          ...state.variants,
          colors: { ...state.variants.colors, isLoading: false },
        },
      };

    case 'Admin - Load Variant Color':
      return {
        ...state,
        variants: {
          ...state.variants,
          colors: {
            ...state.variants.colors,
            colorsList: actions.payload.variantsColors,
            total: actions.payload.total,
          },
        },
      };

    case 'Admin - Log out':
      return {
        ...state,
        addresses: {
          ...state.addresses,
          addressList: [],
          isLoading: true,
          total: 0,
        },
        chartLoading: false,
        tags: { ...state.tags, isLoading: true, tagList: [], total: 0 },
        users: {
          ...state.users,
          isLoading: false,
          totalUsers: 0,
          userList: [],
          usersType: [],
        },
        variants: {
          ...state.variants,
          colors: { ...state.variants.colors, colorsList: [] },
          sizes: { ...state.variants.sizes, sizesList: [], total: 0 },
        },
      };

    default:
      return state;
  }
};
