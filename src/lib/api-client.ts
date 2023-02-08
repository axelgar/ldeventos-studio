type Request = {
  endpoint: string;
} & RequestInit;

export class ApiClient {
  private static instance: ApiClient;

  private constructor() {}

  public static getInstance() {
    if (ApiClient.instance) {
      return ApiClient.instance;
    }

    ApiClient.instance = new ApiClient();
    return this.instance;
  }

  async request<Data>({ method, body, headers, endpoint = '', signal }: Request): Promise<Data> {
    const response = await fetch(endpoint, {
      method: method,
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        ...headers,
      },
      signal,
      body,
    });

    if (response.ok) {
      return response.json();
    }

    throw new Error(response.statusText);
  }
}
