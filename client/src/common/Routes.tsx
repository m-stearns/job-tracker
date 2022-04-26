import { Routes, Route, Navigate } from 'react-router-dom';
import type React from 'react';

import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Signup } from '../pages/Signup';
import { CreateJob } from '../pages/CreateJob';
import { useAuth } from './AuthContext';

export const PageRoutes = () => {
  console.log('we got here');
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route
        path="/createjob"
        element={
          <PublicRoute>
            <CreateJob />
          </PublicRoute>
        }
      />
    </Routes>
  );
};

export const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    console.log('signed in');
  } else {
    console.log('not signed in');
  }
  return <>{children}</>;
};

export const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <>{children}</>;
  }

  return <Navigate to="/login" />;
};
