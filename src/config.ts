export const REACT_QUERY_OPTIONS = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 3,
      cacheTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: false,
    },
    mutations: {
      cacheTime: 1000 * 60 * 5,
      retry: false,
    },
  },
};

export const INTERNAL_PREFIX = '/home';
