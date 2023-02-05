export const apiUrls = {
  findAllUsers: `/api/user`,
  createUser: `/api/user`,
  getEventBySubdomain: (subdomain: string) => `/api/event/${subdomain}`,
  findEventsByUserId: (userId?: string) => `/api/event/user/${userId}`,
};
