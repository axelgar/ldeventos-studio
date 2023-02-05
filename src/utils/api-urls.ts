export const apiUrls = {
  findAllUsers: `/user`,
  getEventBySubdomain: (subdomain: string) => `/event/${subdomain}`,
  findEventsByUserId: (userId?: string) => `/event/user/${userId}`,
};
