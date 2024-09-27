import { useState, useRef, useContext } from "react";
import NavbarTodo from "./NavbarTodo";
import NavbarProfile from "./NavbarProfile";
import { TodosContext } from "../Context/todosContext";

import TagModal from "./TagModal";

export default function Navbar() {
  const { tags, currentTag } = useContext(TodosContext);
  const [navActive, setNavActive] = useState(true);

  function addNewTag() {}
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
          <h2 className="text-xl">Your tasks</h2>
          <ul className="list_container">
            {tags.map((tag) => {
              return <NavbarTodo key={tag.id} tag={tag} />;
            })}
          </ul>
          <div className="add_todo">
            {tags.length < 10 && (
              <TagModal>
                <button className="add_todo_btn">
                  <i className="bx bx-plus"></i>
                </button>
              </TagModal>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
