import React, { useContext } from "react";
import { TodosContext } from "../Context/todosContext";

const TodoComponent = ({ todo }) => {
  const { removeTask, completeTask } = useContext(TodosContext);

  return (
    <li key={todo.id} className={`task ${todo.completed ? "completed" : ""}`}>
      <div className="">
        <button onClick={() => completeTask(todo.id)} className="complete_btn">
          <i className="bx bx-check"></i>
        </button>
        <h2>{todo.task}</h2>
      </div>
      <button onClick={() => removeTask(todo.id)} className="delete_btn">
        <i className="bx bxs-trash-alt"></i>
      </button>
    </li>
  );
};

export default TodoComponent;
