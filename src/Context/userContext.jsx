import React, { createContext, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/firebase'

export const UserContext = createContext(false)

const UserContextProvider = ({children}) => {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false)

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserIsAuthenticated(true);
    } else {
      setUserIsAuthenticated(false);
    }
  }
  )

  const userContextValues = {
    userIsAuthenticated,
    setUserIsAuthenticated
  }

  return (
    <UserContext.Provider value={userContextValues}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider