import React from "react";
import { useState, useRef } from "react";

const NavbarTodo = ({ todoList, setTodoList, setCurrentTodoId, todo, currentTodoId }) => {
  const [drop_active, setDropActive] = useState(false);
  const [isChangingName, setIsChangingName] = useState(false);
  console.log()

  const nameInputRef = useRef(null);

  const handleOpenConfigs = () => {
    setDropActive(!drop_active);
  };

  const startChangingName = () => {
    setIsChangingName(true);
  };
  
  const changeTodo = (id) => {
    if (id != currentTodoId) {
      setDropActive(false);
      setIsChangingName(false);
      setCurrentTodoId(id);
    }
  };

  const removeTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => {
      return todo.todoId !== id;
    });

    setTodoList(updatedTodoList);
    setCurrentTodoId(updatedTodoList[0].todoId);
  };

  const saveNameChange = (id) => {
    const updadetTodosList = [...todoList]
    updadetTodosList[currentTodoId].todoName = nameInputRef.current.value
    setTodoList(updadetTodosList);
    setIsChangingName(false);
  };

  return (
    <button
      onClick={() => changeTodo(todo.todoId)}
      className={`list_container_todo ${
        todo.todoId === currentTodoId ? "active" : ""
      }`}
    >
      <div className="todo_name">
        <i className="bx bxs-circle"></i>
        {isChangingName && todo.todoId === currentTodoId ? (
          <>
            <input
              required
              ref={nameInputRef}
              id="todoName"
              type="text"
            />
            <button onClick={() => saveNameChange(todo.todoId)}>Save</button>
          </>
        ) : (
          <div className="name_container">
            <h3>{todo.todoName}</h3>
          </div>
        )}
      </div>
      <button id={todo.todoId} className="dropdown_btn" onClick={handleOpenConfigs}>
        <i class="bx bx-dots-vertical-rounded bx-rotate-90"></i>
        <div className="dropdown_menu_container">
          <div className={`dropdown_menu ${drop_active ? `drop_active` : ``}`}>
            <button className="" onClick={() => removeTodo(todo.todoId)}>
              <p>Delete</p>
              <i className="bx bxs-trash-alt"></i>
            </button>
            <button onClick={startChangingName} className="">
              <p>Change Name</p>
              <i class="bx bxs-edit"></i>
            </button>
          </div>
        </div>
      </button>
    </button>
  );
};

export default NavbarTodo;
