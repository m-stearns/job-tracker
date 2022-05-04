import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';

const headers: { [key: string]: string } = {
  'content-type': 'application/json',
};

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers,
});

apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Update Request with auth header
    const authToken = localStorage.getItem('auth_token');
    if (authToken && config.headers) {
      config.headers['x-auth-token'] = authToken;
    }
    return config;
  },
  (error: AxiosError) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

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

// Jobs
export const createJob = async ({
  jobTitle,
  companyName,
  jobDesc,
  jobURL,
  jobStatus,
  isInternship,
}: {
  jobTitle: string;
  companyName: string;
  jobDesc: string;
  jobURL: string;
  jobStatus: string;
  isInternship: boolean;
}) => {
  return await apiClient.post('/jobs/create', {
    jobTitle,
    companyName,
    jobDesc,
    jobURL,
    jobStatus,
    isInternship,
  });
};

export const fetchJobs = async () => {
  return apiClient.get('/jobs/fetch');
};
