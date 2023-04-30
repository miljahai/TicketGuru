import React, { createContext, useContext } from 'react';
import { useLocalState } from './util/useLocalStorage';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [authorities, setAuthorities] = useLocalState([], "authorities");
  const [userInfo, setUserInfo] = useLocalState({}, "userInfo");
  const value = { jwt, setJwt, authorities, setAuthorities, userInfo, setUserInfo };
  const roles = { authorities, setAuthorities };
  console.log(userInfo);
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