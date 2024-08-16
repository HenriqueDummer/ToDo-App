import React, { useContext } from "react";
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Todo from "../Components/Todo";

import { TodosContext } from "../Context/todosContext";

const Main = () => {
  const { todoList, loadUserData, setUserData, currentTodo } =
    useContext(TodosContext);

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    setUserData();
  }, [todoList]);

  return (
    <>
      {todoList && <Navbar />}

      {currentTodo && <Todo />}
    </>
  );
};

export default Main;
