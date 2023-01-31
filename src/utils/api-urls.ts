export const apiUrls = {
  findAllUsers: `/user`,
  findEventsByUserId: (userId?: string) => `/event/user/${userId}`,
};
