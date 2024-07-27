import { useState, useRef } from "react";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import NavbarTodo from "./NavbarTodo";

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

  const handleSignOut = () => {
    try {
      signOut(auth);
    } catch (err) {
      console.log(err);
    }
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
        <div className="profile">
          <div className="profile-img">
            <img
              src={
                auth.currentUser.photoURL ??
                "https://img.freepik.com/free-icon/user_318-159711.jpg"
              }
              alt=""
            />
          </div>
          <div className="profile-infos">
            <p>Hello there</p>
            <h3>Henrique Dummer</h3>
          </div>
        </div>
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
        <div className="logout_container">
          <button onClick={handleSignOut}>
            <i className="bx bx-log-out"></i>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
