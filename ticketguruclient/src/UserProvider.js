import React, { createContext, useContext } from 'react';
import { useLocalState } from './util/useLocalStorage';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [authorities, setAuthorities] = useLocalState([], "authorities");
  const value = { jwt, setJwt, authorities, setAuthorities };
  const roles = { authorities, setAuthorities };
  return (
    <UserContext.Provider value={value} roles={roles}>
      {children}
    </UserContext.Provider>
  );
};

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export {  UserProvider, useUser };