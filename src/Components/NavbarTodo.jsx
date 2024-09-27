import React, { useContext } from "react";
import { useState, useRef } from "react";

import { TodosContext } from "../Context/todosContext";

const NavbarTodo = ({ tag }) => {
  const { setCurrentTag, currentTag } = useContext(TodosContext);
  const [drop_active, setDropActive] = useState(false);

  const handleOpenConfigs = () => {
    setDropActive(!drop_active);
  };

  const handleChangeTodo = () => {
    setCurrentTag(tag.name)
  };
  console.log(currentTag)
  return (
    <button
      onClick={() => handleChangeTodo()}
      className={`list_container_todo ${
        tag.name === currentTag ? "active" : ""
      }`}
    >
      <div className="todo_name">
        <i className="bx bxs-circle"></i>
        <div className="name_container">
          <h3>{tag.name}</h3>
        </div>
      </div>
    </button>
  );
};

export default NavbarTodo;
