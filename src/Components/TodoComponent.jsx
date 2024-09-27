import React, { useContext } from "react";
import { TodosContext } from "../Context/todosContext";

const TodoComponent = ({ todo }) => {
  const { removeTask, toggleTodoComplete, deleteTodo } = useContext(TodosContext);

  const handleToggleTodoComplete = async() => {
    const {error} = await toggleTodoComplete(todo.id, todo.completed)

    if(error){
      toast.error(error)
    }
  }

  const handleDeleteTodo = async() => {
    const {error} = await deleteTodo(todo.id)

    if(error){
      toast.error(error)
    }
  }
  return (
    <li key={todo.id} className={`task ${todo.completed ? "completed" : ""}`}>
      <div className="">
        <button onClick={handleToggleTodoComplete} className="complete_btn">
          <i className="bx bx-check"></i>
        </button>
        <h2>{todo.task}</h2>
      </div>
      <button onClick={handleDeleteTodo} className="delete_btn">
        <i className="bx bxs-trash-alt"></i>
      </button>
    </li>
  );
};

export default TodoComponent;
