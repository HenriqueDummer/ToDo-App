import React, { useContext } from "react";
import { useState, useRef } from "react";

import { TodosContext } from "../Context/todosContext";

const NavbarTodo = ({ todo }) => {
  const { currentTodoId, changeTodo, removeTodo, todoList, setTodoList } = useContext(TodosContext);
  const [drop_active, setDropActive] = useState(false);
  const [isChangingName, setIsChangingName] = useState(false);

  const nameInputRef = useRef(null);

  const handleOpenConfigs = () => {
    setDropActive(!drop_active);
  };

  const startChangingName = () => {
    setIsChangingName(true);
  };

  // const saveNameChange = (id) => {
  //   const updadetTodosList = [...todoList];
  //   updadetTodosList[currentTodoId].todoName = nameInputRef.current.value;
  //   setTodoList(updadetTodosList);
  //   setIsChangingName(false);
  // };

  // const handleChangeTodo = (id) => {
  //   if (id != currentTodoId) {
  //     setDropActive(false);
  //     setIsChangingName(false);
  //     changeTodo(id);
  //   }
  // };

  return (
    <button
      onClick={() => handleChangeTodo(todo.todoId)}
      className={`list_container_todo ${
        todo.todoId === currentTodoId ? "active" : ""
      }`}
    >
      <div className="todo_name">
        <i className="bx bxs-circle"></i>
        {isChangingName && todo.todoId === currentTodoId ? (
          <>
            <input required ref={nameInputRef} id="todoName" type="text" />
            <button onClick={() => saveNameChange(todo.id)}>Save</button>
          </>
        ) : (
          <div className="name_container">
            <h3>{todo.tag}</h3>
          </div>
        )}
      </div>
    </button>
  );
};

export default NavbarTodo;
