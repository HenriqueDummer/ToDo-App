import { useState, useRef, useContext } from "react";
import NavbarTodo from "./NavbarTodo";
import NavbarProfile from "./NavbarProfile";
import { TodosContext } from "../Context/todosContext";

export default function Navbar() {
  const {tags, currentTag} = useContext(TodosContext)
  const [navActive, setNavActive] = useState(true);

  console.log(tags)
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
            {tags.map((todo) => {
              return (
                <NavbarTodo
                  key={todo.id}
                  todo={todo}
                />
              );
            })}
          </ul>
          {tags.length < 10 && (
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
