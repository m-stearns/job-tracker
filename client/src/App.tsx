import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';

import { AuthProvider } from './common/AuthContext';
import { PageRoutes } from './common/Routes';
import { Layout } from './common/Layout';

import { getCurrentUser } from './repository';

const theme = createTheme();

export const App = () => {
  useEffect(() => {
    const getUser = async () => {
      return await getCurrentUser();
    };

    getUser();

    fetch('http://127.0.0.1:8084/api/jobs', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <PageRoutes />
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};
