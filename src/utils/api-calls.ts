import { API_METHODS } from './api-methods';

const { DELETE, GET, POST, PUT } = API_METHODS;

export const apiCalls = {
  // User
  findAllUsers: { endpoint: `/api/user`, method: GET },
  getUserById: { endpoint: (userId: string) => `/api/user/${userId}`, method: GET },
  createUser: { endpoint: `/api/user`, method: POST },
  updateUserById: { endpoint: `/api/user`, method: PUT },
  deleteUserById: { endpoint: (userId: string) => `/api/user/${userId}`, method: DELETE },

  // Project
  getProjectBySubdomain: { endpoint: (subdomain: string) => `/api/project/${subdomain}`, method: GET },
  findProjectsByUserId: { endpoint: (userId?: string) => `/api/project/user/${userId}`, method: GET },

  // Avatar
  getAvatarUploadUrl: {
    endpoint: (userId: string, origin: string, filename: string) =>
      `/api/user-avatar/upload-url/${userId}?origin=${encodeURI(origin)}&filename=${filename}`,
    method: GET,
  },

  // Provider
  findAllProviders: { endpoint: '/api/provider', method: GET },
  getProviderById: { endpoint: (providerId: string) => `/api/provider/${providerId}`, method: GET },
  createProvider: { endpoint: '/api/provider', method: POST },
  updateProviderById: { endpoint: '/api/provider', method: PUT },
  deleteProviderById: { endpoint: (providerId: string) => `/api/provider/${providerId}`, method: DELETE },
  searchProviderByName: { endpoint: (searchTerm: string) => `/api/provider/search-by-name/${searchTerm}`, method: GET },

  // Promoter
  findAllPromoters: { endpoint: '/api/promoter', method: GET },
  getPromoterById: { endpoint: (promoterId: string) => `/api/promoter/${promoterId}`, method: GET },
  createPromoter: { endpoint: '/api/promoter', method: POST },
  updatePromoterById: { endpoint: '/api/promoter', method: PUT },
  deletePromoterById: { endpoint: (promoterId: string) => `/api/promoter/${promoterId}`, method: DELETE },
  getPromoterLogoUploadUrl: {
    endpoint: (promoterId: string, origin: string, filename: string) =>
      `/api/promoter/logo-upload-url/${promoterId}?origin=${encodeURI(origin)}&filename=${filename}`,
    method: GET,
  },
} as const;
