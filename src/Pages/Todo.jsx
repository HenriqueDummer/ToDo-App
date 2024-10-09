import { useRef, useContext } from "react";

import TodoComponent from "../Components/TodoComponent";

import { TodosContext } from "../Context/todosContext";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";

export default function Todo() {
  const todoRef = useRef();
  const { name: currentTag } = useParams();

  const { todos, addNewTodo } = useContext(TodosContext);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    const task = todoRef.current.value;
    todoRef.current.value = "";

    if (task.trim() === "") {
      toast.error("Field cannot be empty!")
      return;
    };

    const { error } = await addNewTodo(task);

    if (error) toast.warn(error);
  };

  return (
    <>
      <div className="todos_container">
        <h1>{currentTag}</h1>
        <form onSubmit={handleAddTodo} className="add_task">
          <input type="text" placeholder="Add a new task" ref={todoRef} />
          <button>
            <span>Add Task</span>
          </button>
        </form>
        <div className="tasks_container">
          <ul>
            {todos.map((todo) => {
              return <TodoComponent todo={todo} key={todo.id} />;
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
