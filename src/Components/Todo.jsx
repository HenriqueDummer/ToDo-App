import { useEffect, useState, useRef } from "react";

export default function Todo({ currentTodoId, todoList, setTodoList }) {
  const taskRef = useRef();

  const currentTodoTasks = todoList.find(
    (todo) => todo.todoId === currentTodoId
  ).todoTasks;
  const todoIndex = todoList.findIndex((todo) => todo.todoId === currentTodoId);

  const newTodoList = [...todoList];
  const currentTodo = todoList[todoIndex];

  const addNewTask = (e) => {
    e.preventDefault()
    const taskName = taskRef.current.value;
    if (taskName.trim() !== "") {
      const newTask = {
        id: currentTodoTasks.length == 0 ? 1 : currentTodoTasks[currentTodoTasks.length - 1].id + 1,
        taskName,
        isCompleted: false,
      };

      currentTodo.todoTasks.push(newTask);

      setTodoList(newTodoList);
      taskRef.current.value = "";
    }
  };

  const completeTask = (id) => {
    const taskIndex = currentTodo.todoTasks.findIndex((task) => task.id === id);

    if (taskIndex !== -1) {
      currentTodo.todoTasks[taskIndex].isCompleted ^= true;
      setTodoList(newTodoList);
    }
  };

  const removeTask = (id) => {
    const updatedTodo = todoList[todoIndex].todoTasks.filter((task) => {
      return task.id != id;
    });

    currentTodo.todoTasks = updatedTodo;
    setTodoList(newTodoList);
  };

  return (
    <>
      <div className="todos_container">
        <h1>{todoList[todoIndex].todoName}</h1>
        <form onSubmit={(e) => addNewTask(e)} className="add_task">
          <input type="text" placeholder="Add a new task" ref={taskRef} />
          <button>
            <span>Add Task</span>
          </button>
        </form>
        <div className="tasks_container">
          <ul>
            {currentTodoTasks.map((task) => {
              return (
                <li
                  key={task.id}
                  className={`task ${task.isCompleted ? "completed" : ""}`}
                >
                  <div className="">
                    <button
                      onClick={() => completeTask(task.id)}
                      className="complete_btn"
                    >
                      <i class="bx bx-check"></i>
                    </button>
                    <h2>{task.taskName}</h2>
                  </div>
                  <button
                    onClick={() => removeTask(task.id)}
                    className="delete_btn"
                  >
                    <i className="bx bxs-trash-alt"></i>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
