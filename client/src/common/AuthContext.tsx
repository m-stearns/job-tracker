import * as React from 'react';

type AuthContextType = {
  isSignedIn: boolean;
  signIn: () => void;
  signOut: () => void;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // The below will change when we start using the auth token.
  // For now out auth state is lost on every page refresh
  const [isSignedIn, setIsSignedIn] = React.useState<boolean>(true);
  const signIn = () => setIsSignedIn(true);
  const signOut = () => setIsSignedIn(false);

  const value = { isSignedIn, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
