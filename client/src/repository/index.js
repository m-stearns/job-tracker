import * as axios from 'axios';

const headers = {
  'content-type': 'application/json',
};

const authToken = localStorage.getItem('auth_token');

if (authToken) {
  headers['x-auth-token'] = authToken;
}

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8084/api/',
  timeout: 10000,
  headers,
});

apiClient.interceptors.response.use(
  (response) => {
    if (response.status == 401) {
      localStorage.removeItem('auth_token');
      // window.location.replace('/');
    }

    return response;
  },
  (err) => {
    localStorage.removeItem('auth_token');
    // window.location.replace('/');
    return Promise.reject(err);
  },
);

// Users

export const register = ({ name, email, password }) => {
  return apiClient.post('/users/register').then((response) => response.data);
};

export const login = ({ email, password }) => {
  return apiClient.post('/users/login', { email, password }).then((response) => response.data);
};

export const getCurrentUser = () => {
  return apiClient.get('/users/current_user').then((response) => response.data);
};
