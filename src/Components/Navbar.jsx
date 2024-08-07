import { useState, useRef } from "react";
import NavbarTodo from "./NavbarTodo";
import NavbarProfile from "./NavbarProfile";

export default function Navbar({
  todoList,
  setCurrentTodoId,
  currentTodoId,
  setTodoList,
  setUserIsAuthenticated,
}) {
  const [navActive, setNavActive] = useState(true);

  const addNewTodo = () => {
    const newTodo = {
      todoId: todoList[todoList.length - 1].todoId + 1,
      todoName: "New todo",
      todoTasks: [],
    };

    setTodoList((prev) => [...prev, newTodo]);
  };

  

  return (
    <>
      <div className={`navbar ${navActive ? "" : "hidden"}`}>
        <button
          onClick={() => setNavActive((prev) => !prev)}
          className="nav_btn"
        >
          <i className={`bx ${navActive ? "bxs-x-square" : "bx bx-menu"}`}></i>
        </button>
        <NavbarProfile />
        
        <div className="controls">
          <h2>Your tasks</h2>
          <ul className="list_container">
            {todoList.map((todo) => {
              return (
                <NavbarTodo
                  key={todo.id}
                  todo={todo}
                  currentTodoId={currentTodoId}
                  setCurrentTodoId={setCurrentTodoId}
                  todoList={todoList}
                  setTodoList={setTodoList}
                />
              );
            })}
          </ul>
          {todoList.length < 10 && (
            <div className="add_todo">
              <button onClick={() => addNewTodo()} className="add_todo_btn">
                <i className="bx bx-plus"></i>
              </button>
            </div>
          )}
        </div>
        
      </div>
    </>
  );
}
