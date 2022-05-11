import { Routes, Route, Navigate } from 'react-router-dom';
import type React from 'react';

import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Signup } from '../pages/Signup';
import { CreateJob } from '../pages/CreateJob';
import { CreateContact } from '../pages/CreateContact';
import { ContactsHome } from '../pages/ContactsHome';
import { ContactsView } from '../pages/ContactsView';
import { ContactsEdit } from '../pages/ContactsEdit';
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
        path="/jobs/create"
        element={
          <PublicRoute>
            <CreateJob />
          </PublicRoute>
        }
      />
      <Route
        path="/contacts"
        element={
          <PrivateRoute>
            <ContactsHome />
          </PrivateRoute>
        }
      />
      <Route
        path="/contacts/create"
        element={
          <PrivateRoute>
            <CreateContact />
          </PrivateRoute>
        }
      />
      <Route
        path="/contacts/view/:id"
        element={
          <PrivateRoute>
            <ContactsView />
          </PrivateRoute>
        }
      />
      <Route
        path="/contacts/edit/:id"
        element={
          <PrivateRoute>
            <ContactsEdit />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    console.log('signed in');
  } else {
    console.log('not signed in');
  }
  return <>{children}</>;
};

export const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <>{children}</>;
  }

  return <Navigate to="/login" />;
};
