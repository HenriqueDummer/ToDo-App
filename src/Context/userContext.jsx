import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase";

export const UserContext = createContext(false);

const UserContextProvider = ({ children }) => {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserIsAuthenticated(true);
        setUserData({
          username: auth.currentUser.displayName,
          photoURL: auth.currentUser.photoURL
        })
      } else {
        setUserIsAuthenticated(false);
      }
    });
  }, [auth])

  const editProfile = async (data) => {
    const user = auth.currentUser
    setIsLoading(true)
    if (user) {
      try {
        await updateProfile(user, {
          displayName: data.username,
          photoURL: data.photoURL,
        });
        
        const updatedUser = auth.currentUser;
        setUserData({
          username: updatedUser.displayName || "",
          photoURL: updatedUser.photoURL || "",
        });
  
        return { success: true };
      } catch (error) {
        console.error(error);
        return { error: "Could not update profile" };
      } finally{
        setIsLoading(false)
      }
    } else {
      console.error("No user is signed in.");
      return { error: "No user is signed in." };
    }
  };
  
 
  const userContextValues = {
    userIsAuthenticated,
    setUserIsAuthenticated,
    userData,
    editProfile,
    isLoading
  };

  return (
    <UserContext.Provider value={userContextValues}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
