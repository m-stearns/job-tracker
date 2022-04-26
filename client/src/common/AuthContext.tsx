import * as React from 'react';
import { getCurrentUser, register, login } from '../repository';

type AuthContextType = {
  user: { [key: string]: any } | null;
  fetchUser: () => any;
  setUser: any;
  registerUser: any;
  loginUser: any;
  logoutUser: any;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState(null);

  const fetchUser = async () => {
    const {
      data: { user },
    } = await getCurrentUser();

    console.log(user);
    setUser(user);
  };

  const registerUser = async ({ firstName, lastName, username, password }: { [key: string]: string }) => {
    const {
      data: { user, auth_token },
    } = await register({ name: `${firstName} ${lastName}`, email: username, password });
    localStorage.setItem('auth_token', auth_token);
    setUser(user);
  };

  const loginUser = async ({ username, password }: { [key: string]: string }) => {
    const {
      data: { user, auth_token },
    } = await login({ email: username, password });
    // save token to localStorage
    localStorage.setItem('auth_token', auth_token);
    setUser(user);
  };

  const logoutUser = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

  const value = { user, fetchUser, setUser, registerUser, loginUser, logoutUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
