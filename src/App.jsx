import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./Pages/Home/Home"
import Register from "./Pages/Register/Register"
import Login from "./Pages/Login/Login"
import { auth } from "./Config/Firebase"

function App() {


  return (
    <BrowserRouter>
         <Routes>
            <Route element={<Register />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<Home />} path="/home" />
         </Routes>
    </BrowserRouter>
  )
}

export default App
