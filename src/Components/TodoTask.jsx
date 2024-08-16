import React, { useContext } from "react";
import { TodosContext } from "../Context/todosContext";

const TodoTask = ({ task }) => {
  const { removeTask, completeTask } = useContext(TodosContext);
  return (
    <li key={task.id} className={`task ${task.isCompleted ? "completed" : ""}`}>
      <div className="">
        <button onClick={() => completeTask(task.id)} className="complete_btn">
          <i className="bx bx-check"></i>
        </button>
        <h2>{task.taskName}</h2>
      </div>
      <button onClick={() => removeTask(task.id)} className="delete_btn">
        <i className="bx bxs-trash-alt"></i>
      </button>
    </li>
  );
};

export default TodoTask;
