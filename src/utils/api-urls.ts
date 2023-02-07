export const apiUrls = {
  findAllUsers: `/api/user`,
  createUser: `/api/user`,
  updateUserById: `/api/user`,
  deleteUserById: (id: string) => `/api/user/${id}`,
  getEventBySubdomain: (subdomain: string) => `/api/event/${subdomain}`,
  findEventsByUserId: (userId?: string) => `/api/event/user/${userId}`,
};
