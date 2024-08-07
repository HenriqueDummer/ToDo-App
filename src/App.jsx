import { useEffect, useState } from 'react'

import Main from './Pages/Main'
import Login from './Pages/Login'

import { auth } from './config/firebase'
import { onAuthStateChanged } from 'firebase/auth'

function App() {
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false)
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user)
      setUserIsAuthenticated(true);
    } else {
      setUserIsAuthenticated(false);
    }
  }
  )

  

  return(
    <>
      {userIsAuthenticated ? 
        <Main setUserIsAuthenticated={setUserIsAuthenticated} userIsAuthenticated={userIsAuthenticated} />
        :
        <Login setUserIsAuthenticated={setUserIsAuthenticated} />
      }
    </>
  )
}

export default App
