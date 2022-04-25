import * as React from 'react';
import { getCurrentUser } from '../repository';

type AuthContextType = {
  user: { [key: string]: any } | null;
  fetchUser: () => any;
  setUser: any;
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

  React.useEffect(() => {
    fetchUser();
  }, []);

  const value = { user, fetchUser, setUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
