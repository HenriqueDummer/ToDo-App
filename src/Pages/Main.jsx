import React, { useContext } from "react";
import Navbar from "../Components/Navbar";

import { TodosContext } from "../Context/todosContext";
import Todo from "./Todo";

const Main = () => {
  const { todos, tags } = useContext(TodosContext);

  console.log(tags)
 
  return (
    <>
  
    </>
  );
};

export default Main;
