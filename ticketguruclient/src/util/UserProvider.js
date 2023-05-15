import React, { createContext, useContext } from 'react';
import { useLocalState } from './useLocalStorage';

const UserContext = createContext();

// UserProvider is a wrapper component that provides the user object to any child component that calls the useUser hook.
const UserProvider = ({ children }) => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [authorities, setAuthorities] = useLocalState([], "authorities");
  const [userInfo, setUserInfo] = useLocalState({}, "userInfo");
  const value = { jwt, setJwt, authorities, setAuthorities, userInfo, setUserInfo };
  //console.log(userInfo);
  return (
    <UserContext.Provider value={value}>
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

export { UserProvider, useUser };