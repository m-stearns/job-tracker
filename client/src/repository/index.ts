import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const headers: { [key: string]: string } = {
  'content-type': 'application/json',
};

const authToken = localStorage.getItem('auth_token');

if (authToken) {
  headers['x-auth-token'] = authToken;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers,
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status == 401) {
      localStorage.removeItem('auth_token');
      // TODO:
      // window.location.replace('/');
    }

    return response;
  },
  (err: AxiosError) => {
    localStorage.removeItem('auth_token');
    // TODO:
    // window.location.replace('/');
    return Promise.reject(err);
  },
);

// Users

export const register = async ({ name, email, password }: { name: string; email: string; password: string }) => {
  return await apiClient.post('/users/register', {
    name,
    email,
    password,
  });
};

export const login = async ({ email, password }: { email: string; password: string }) => {
  return await apiClient.post('/users/login', { email, password });
};

export const getCurrentUser = async () => {
  return await apiClient.get('/users/current_user');
};
