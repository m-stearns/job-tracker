import { Routes, Route, Navigate } from 'react-router-dom';
import type React from 'react';

import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Signup } from '../pages/Signup';
import { CreateJob } from '../pages/CreateJob';
import { useAuth } from './AuthContext';

export const PageRoutes = () => (
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
      path="/jobs/create"
      element={
        <PrivateRoute>
          <CreateJob />
        </PrivateRoute>
      }
    />
  </Routes>
);

export const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <>{children}</>;
  }

  return <Navigate to="/login" />;
};
