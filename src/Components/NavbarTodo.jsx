import React, { useContext } from "react";
import { useState, useRef } from "react";

import { TodosContext } from "../Context/todosContext";

const NavbarTodo = ({ todo }) => {
  const { currentTodoId, setCurrentTodoId, changeTodo } =
    useContext(TodosContext);
  const [drop_active, setDropActive] = useState(false);
  const [isChangingName, setIsChangingName] = useState(false);

  const nameInputRef = useRef(null);

  const handleOpenConfigs = () => {
    setDropActive(!drop_active);
  };

  const startChangingName = () => {
    setIsChangingName(true);
  };

  const saveNameChange = (id) => {
    const updadetTodosList = [...todoList];
    updadetTodosList[currentTodoId].todoName = nameInputRef.current.value;
    setTodoList(updadetTodosList);
    setIsChangingName(false);
  };

  const handleChangeTodo = (id) => {
    if (id != currentTodoId) {
      setDropActive(false);
      setIsChangingName(false);
      changeTodo(id);
    }
  };

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
            <button onClick={() => saveNameChange(todo.todoId)}>Save</button>
          </>
        ) : (
          <div className="name_container">
            <h3>{todo.todoName}</h3>
          </div>
        )}
      </div>
      <button
        id={todo.todoId}
        className="dropdown_btn"
        onClick={handleOpenConfigs}
      >
        <i className="bx bx-dots-vertical-rounded bx-rotate-90"></i>
        <div className="dropdown_menu_container">
          <div className={`dropdown_menu ${drop_active ? `drop_active` : ``}`}>
            <button className="" onClick={() => removeTodo(todo.todoId)}>
              <p>Delete</p>
              <i className="bx bxs-trash-alt"></i>
            </button>
            <button onClick={startChangingName} className="">
              <p>Change Name</p>
              <i className="bx bxs-edit"></i>
            </button>
          </div>
        </div>
      </button>
    </button>
  );
};

export default NavbarTodo;
