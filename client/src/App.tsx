import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';

import { AuthProvider } from './common/AuthContext';
import { PageRoutes } from './common/Routes';
import { Layout } from './common/Layout';
import { JobsQueryProvider } from './common/JobsQueryProvider';

const theme = createTheme();

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <JobsQueryProvider>
            <Layout>
              <PageRoutes />
            </Layout>
          </JobsQueryProvider>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};
