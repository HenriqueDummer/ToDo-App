import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

export const UserContext = createContext(false);

const UserContextProvider = ({ children }) => {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserIsAuthenticated(true);
      } else {
        setUserIsAuthenticated(false);
      }
    });
  }, [auth])
 
  const userContextValues = {
    userIsAuthenticated,
    setUserIsAuthenticated,
  };

  return (
    <UserContext.Provider value={userContextValues}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
