import React, { useContext } from 'react';
import { ApiClient } from './lib/api-client';

class Store {
  apiClient: ApiClient;

  constructor() {
    this.apiClient = ApiClient.getInstance();
  }
}

export const defaultStore = new Store();

export const StoreContext = React.createContext(defaultStore);

export const useApiClient = () => {
  const { apiClient } = useContext(StoreContext);
  return apiClient;
};
