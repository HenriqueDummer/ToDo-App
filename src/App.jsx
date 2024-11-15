import { useContext, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import TodosContextProvider from "./Context/todosContext";
import UserContextProvider, { UserContext } from "./Context/userContext";

import Login from "./Pages/Login";
import Main from "./Pages/Main";
import SignUp from "./Pages/SignUp";
import Navbar from "./Components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import Todo from "./Pages/Todo";

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

  useEffect(() => {
    console.log(userIsAuthenticated)
  }, [userIsAuthenticated])

  return (
    <TodosContextProvider>
      <BrowserRouter>
        <ToastContainer />
        {userIsAuthenticated && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={userIsAuthenticated ? <Main /> : <Navigate to="/login" />}
          />
          <Route
            path="/collection/:name"
            element={userIsAuthenticated ? <Todo /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={userIsAuthenticated ?  <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={userIsAuthenticated ? <Navigate to="/" /> : <SignUp />} />
        </Routes>
      </BrowserRouter>
    </TodosContextProvider>
  );
}

export default App;
