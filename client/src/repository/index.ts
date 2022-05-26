import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import type { JobPageData, UserData, SkillStats, Contact, JobNewData } from '../types';

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
  return await apiClient.get<{ user: UserData }>('/users/current_user');
};

// Jobs
export const createJob = async (jobData: Partial<JobNewData>) => {
  const response = await apiClient.post('/jobs', jobData);
  return response;
};

export const fetchAllJobs = async () => {
  const response = await apiClient.get<JobPageData[]>('/jobs');
  return response.data;
};

export const updateJob = async ({ jobId, newJobData }: { jobId: string; newJobData: Partial<JobNewData> }) => {
  const response = await apiClient.put(`/jobs/edit/${jobId}`, newJobData);
  return response;
};

export const fetchJob = async (jobId: string) => {
  return apiClient.get(`/jobs/${jobId}`);
};

export const deleteJob = async (jobId: string) => {
  return apiClient.delete(`/jobs/${jobId}`);
};

export const fetchSkillsByUser = async () => {
  return apiClient.get('/skills');
};

export const fetchSkillsStats = async () => {
  return apiClient.get<SkillStats>('/users/skills/stats');
};
// Contacts
export const createContact = async ({
  contactName,
  email,
  phoneNo,
  company,
  jobId,
}: {
  contactName: string;
  email: string;
  phoneNo: string;
  company: string;
  jobId: string | null;
}) => {
  return await apiClient.post('/contacts/create', {
    contactName,
    email,
    phoneNo,
    company,
    jobId,
  });
};

export const fetchContacts = async () => {
  return apiClient.get<Contact[]>('/contacts');
};

export const getContact = async (id: string) => {
  try {
    //const result = parseInt(id);
    return await apiClient.get<Contact>(`/contacts/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const editContact = async ({
  contactName,
  email,
  phoneNo,
  company,
  id,
}: {
  contactName: string;
  email: string;
  phoneNo: string;
  company: string;
  id: string;
}) => {
  return await apiClient.put(`/contacts/edit/${id}`, {
    contactName,
    email,
    phoneNo,
    company,
  });
};

export const deleteContact = async (id: string) => {
  try {
    return await apiClient.delete(`/contacts/${id}`);
  } catch (error) {
    console.log(error);
  }
};
