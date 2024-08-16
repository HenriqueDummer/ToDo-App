import { useContext } from "react";

import Main from "./Pages/Main";
import Login from "./Pages/Login";

import TodosContextProvider from "./Context/todosContext";
import UserContextProvider, { UserContext } from "./Context/UserContext";

function App() {
  return (
    <>
      <UserContextProvider>
        <AuthWrapper />
      </UserContextProvider>
    </>
  );
}

function AuthWrapper() {
  const { userIsAuthenticated } = useContext(UserContext);

  return (
    <TodosContextProvider>
      {userIsAuthenticated ? <Main /> : <Login />}
    </TodosContextProvider>
  );
}

export default App;