import * as React from 'react';
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from 'react-query';
import type { UseMutateFunction } from 'react-query';
import { createJob, fetchAllJobs } from '../repository';
import { JobData } from '../types';
import { useNavigate } from 'react-router-dom';

export interface CachedJobsContext {
  fetchAllJobsHasError: boolean;
  fetchAllJobsError: Error | null;
  fetchAllJobsLoading: boolean;
  jobsData: JobData[];
  addJobError: boolean;
  addJob: UseMutateFunction<
    any,
    unknown,
    {
      jobTitle: string;
      companyName: string;
      jobDesc: string;
      jobURL: string;
      jobStatus: string;
      isInternship: boolean;
    },
    unknown
  >;
}

const CachedJobsContext = React.createContext<CachedJobsContext | undefined>(undefined);
const queryClient = new QueryClient();

export const JobsQueryProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CachedJobsProvider>{children}</CachedJobsProvider>
    </QueryClientProvider>
  );
};

/* This allows us to interact with our jobs API while caching results */
export const CachedJobsProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Queries
  const {
    isError: fetchAllJobsHasError,
    error: fetchAllJobsError,
    isLoading: fetchAllJobsLoading,
    data,
  } = useQuery<JobData[], Error>('jobsData', fetchAllJobs, {
    cacheTime: Infinity,
  });

  // Mutations
  const { isError: addJobError, mutate: addJob } = useMutation(createJob, {
    onSuccess: async () => {
      // Invalidate jobData and refetch
      await queryClient.invalidateQueries('jobsData');
      navigate('/');
    },
    onError: (err) => {
      console.log('error creating job.', err);
    },
  });

  // Typeguard used to make Typescript shutup about possibly undefined responses
  const jobsData = React.useMemo(() => {
    if (Array.isArray(data)) {
      return data;
    } else {
      return [];
    }
  }, [data]);

  const value = {
    fetchAllJobsHasError,
    fetchAllJobsError,
    fetchAllJobsLoading,
    jobsData,
    addJobError,
    addJob,
  };
  return <CachedJobsContext.Provider value={value}>{children}</CachedJobsContext.Provider>;
};

export const useJobsApi = () => {
  const context = React.useContext(CachedJobsContext);
  if (context === undefined) {
    throw new Error('useJobsApi must be used within a JobsQueryProvider');
  }
  return context;
};
