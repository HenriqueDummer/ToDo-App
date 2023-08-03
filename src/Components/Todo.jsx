import { useEffect, useState } from "react";

export default function Todo({currentTodo, todoList, setTodoList}) {
    const todo = todoList[currentTodo].todoTasks
    const [newTask, setNewTask] = useState("")

    const addNewTask = () => {
        if(newTask){
            const task = {
                id: todo.length == 0 ? 1 : todo[todo.length - 1].id + 1,
                taskName: newTask,
                isCompleted: false
            }
           setTodoList(todoList.map((temp) => 
                temp.todoId === currentTodo
                ? {...temp, todoTasks: [...temp.todoTasks, task]}
                : temp
           ))
        }
        setNewTask("")
    }

    const completeTask = (id) => {
        const updatedTodoList = [...todoList]
        const taskIndex = updatedTodoList[currentTodo].todoTasks.findIndex(task => task.id === id)
        
        if(taskIndex !== -1){
            updatedTodoList[currentTodo].todoTasks[taskIndex].isCompleted = !updatedTodoList[currentTodo].todoTasks[taskIndex].isCompleted
            console.log(todoList)
            setTodoList(updatedTodoList)
        } 
    }

    const removeTask = (id) => {
        const updatedTodoList = [...todoList]
        const taskIndex = updatedTodoList[currentTodo].todoTasks.findIndex(task => task.id === id)

        const updatedTodo = todoList[currentTodo].todoTasks.filter((task) => {
            return task.id != id
        })

        updatedTodoList[currentTodo].todoTasks = updatedTodo
        setTodoList(updatedTodoList)
    }

    return(
        <>
            <div className="list_container">
                <h1>{todoList[currentTodo].todoName}</h1>
                <div className="add_task">
                    <input type="text" placeholder="Add a new task to your list" value={newTask} onChange={() => setNewTask(event.target.value)}/>
                    <button onClick={() => addNewTask()}> <span>Add Task</span></button>
                </div>
                <div className="tasks_container">
                    <ul>
                        {todo.map((task) => {
                            return(
                                <li key={task.id} className={`task ${task.isCompleted ? "completed" : ""}`}>
                                    <div className="">
                                        <button onClick={() => completeTask(task.id)} className="complete_btn"><i class='bx bx-check'></i></button>
                                        <h2>{task.taskName}</h2> 
                                    </div>
                                    <button onClick={() => removeTask(task.id)} className="delete_btn">
                                        <i className='bx bxs-trash-alt' ></i>
                                    </button> 
                                 </li>
                            )
                        })}
                    </ul>
                    
                </div>
            </div>
        </>
    );    
}