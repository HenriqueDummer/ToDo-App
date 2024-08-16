import { useState, useRef, useContext } from "react";
import NavbarTodo from "./NavbarTodo";
import NavbarProfile from "./NavbarProfile";
import { TodosContext } from "../Context/todosContext";

export default function Navbar() {
  const { todoList } = useContext(TodosContext);
  const [navActive, setNavActive] = useState(true);

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
              return <NavbarTodo key={todo.id} todo={todo} />;
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
