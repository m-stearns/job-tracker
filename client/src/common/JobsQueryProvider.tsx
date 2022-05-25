import * as React from 'react';
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from 'react-query';
import type { UseMutateFunction } from 'react-query';
import { createJob, fetchAllJobs, updateJob } from '../repository';
import type { JobPageData, JobNewData } from '../types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export interface CachedJobsContext {
  fetchAllJobsHasError: boolean;
  fetchAllJobsError: Error | null;
  fetchAllJobsLoading: boolean;
  jobsData: JobPageData[];
  addJobError: boolean;
  addJob: UseMutateFunction<
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    any,
    unknown,
    Partial<JobNewData>,
    unknown
  >;
  editJobError: boolean;
  editJob: UseMutateFunction<
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    any,
    unknown,
    {
      jobId: string;
      newJobData: Partial<JobNewData>;
    },
    unknown
  >;
  invalidateJobCache: () => Promise<void>;
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
  const { user } = useAuth();

  // Queries
  const {
    isError: fetchAllJobsHasError,
    error: fetchAllJobsError,
    isLoading: fetchAllJobsLoading,
    data,
  } = useQuery<JobPageData[], Error>('jobsData', fetchAllJobs, {
    cacheTime: Infinity,
    enabled: !!user,
    retry: 5,
    // This applies exponential backoff on retry attempts
    retryDelay: (attempt) => Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
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

  const { isError: editJobError, mutate: editJob } = useMutation(updateJob, {
    onSuccess: async () => {
      // Invalidate jobData and refetch
      await queryClient.invalidateQueries('jobsData');
      navigate('/');
    },
    onError: (err) => {
      console.log('error editing job job.', err);
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

  // Exposing this just in case we need to manually invalidate after any of our future API calls
  const invalidateJobCache = async () => {
    await queryClient.invalidateQueries('jobsData');
  };

  const value = {
    fetchAllJobsHasError,
    fetchAllJobsError,
    fetchAllJobsLoading,
    jobsData,
    addJobError,
    addJob,
    editJobError,
    editJob,
    invalidateJobCache,
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
