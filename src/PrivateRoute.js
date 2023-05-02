import React from 'react';
import { Navigate } from 'react-router-dom';
import { useState } from "react";
import ajax from './service/fetchService';
import { useUser } from './util/UserProvider';

const PrivateRoute = (props) => {
  const user = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(null);
  const { children } = props;

  if (user) {
    ajax(`http://localhost:8080/auth/validate?token=${user.jwt}`, "get", user.jwt).then((isValid) => {
      setIsValid(isValid);
      setIsLoading(false);
    });
  } else {
    return <Navigate to="/login" />;
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : isValid === true ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;