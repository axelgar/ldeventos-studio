import { API_METHODS } from './api-methods';

const { DELETE, GET, POST, PUT } = API_METHODS;

export const apiCalls = {
  findAllUsers: { endpoint: `/api/user`, method: GET },
  getOneUserById: { endpoint: (id: string) => `/api/user/${id}`, method: GET },
  createUser: { endpoint: `/api/user`, method: POST },
  updateUserById: { endpoint: `/api/user`, method: PUT },
  deleteUserById: { endpoint: (id: string) => `/api/user/${id}`, method: DELETE },
  getEventBySubdomain: { endpoint: (subdomain: string) => `/api/event/${subdomain}`, method: GET },
  findEventsByUserId: { endpoint: (userId?: string) => `/api/event/user/${userId}`, method: GET },
  getAvatarUploadUrl: {
    endpoint: (userId: string, origin: string, filename: string) =>
      `/api/user-avatar/upload-url/${userId}?origin=${encodeURI(origin)}&filename=${filename}`,
    method: GET,
  },
} as const;
