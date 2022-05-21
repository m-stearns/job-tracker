import * as React from 'react';
import { getCurrentUser, register, login } from '../repository';
import type { UserData, UserInputData } from '../types';

type AuthContextType = {
  user: UserData | null;
  fetchUser: () => void;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  registerUser: (userData: UserInputData) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<UserData | null>(null);

  const fetchUser = async () => {
    const {
      data: { user },
    } = await getCurrentUser();
    setUser(user);
  };

  const registerUser = async ({ firstName, lastName, email, password }: UserInputData) => {
    const {
      data: { user, auth_token },
    } = await register({ name: `${firstName} ${lastName}`, email, password });
    localStorage.setItem('auth_token', auth_token);
    setUser(user);
  };

  const loginUser = async (email: string, password: string) => {
    const {
      data: { user, auth_token },
    } = await login({ email: email, password });
    // save token to localStorage
    localStorage.setItem('auth_token', auth_token);
    setUser(user);
  };

  const logoutUser = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  React.useEffect(() => {
    fetchUser().catch(() => console.log('error fetching user'));
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
