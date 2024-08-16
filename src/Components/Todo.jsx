import { useRef, useContext } from "react";

import TodoTask from "./TodoTask";

import { TodosContext } from "../Context/todosContext";

export default function Todo() {
  const { currentTodo, setTodoList, todoList } = useContext(TodosContext);
  const taskRef = useRef();

  const newTodoList = [...todoList];

  const addNewTask = (e, taskName) => {
    e.preventDefault();
    if (taskName.trim() !== "") {
      const newTask = {
        id:
          currentTodo.todoTasks.length == 0
            ? 1
            : currentTodo.todoTasks[currentTodo.todoTasks.length - 1].id + 1,
        taskName,
        isCompleted: false,
      };

      currentTodo.todoTasks.push(newTask);

      setTodoList(newTodoList);
      taskRef.current.value = "";
    }
  };

  return (
    <>
      <div className="todos_container">
        <h1>{currentTodo.todoName}</h1>
        <form
          onSubmit={(e) => addNewTask(e, taskRef.current.value)}
          className="add_task"
        >
          <input type="text" placeholder="Add a new task" ref={taskRef} />
          <button>
            <span>Add Task</span>
          </button>
        </form>
        <div className="tasks_container">
          <ul>
            {currentTodo.todoTasks.map((task) => {
              return <TodoTask task={task} key={task.id} />;
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
