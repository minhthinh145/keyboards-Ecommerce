import React, { createContext } from 'react';
import useAuthProvider from '../hooks/Authcontext/useAuthProvider';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useAuthProvider();

  return (
    <AuthContext.Provider value={auth}>
      {auth.isInitialized ? children : null}
    </AuthContext.Provider>
  );
};
