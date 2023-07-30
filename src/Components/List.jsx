import { useState } from "react";

export default function List() {
    const [todoList, setTodoList] = useState([])
    const [newTask, setNewTask] = useState("")
    

    const addNewTask = () => {
        if(newTask){
            const task = {
                id: todoList.length == 0 ? 1 : todoList[todoList.length - 1].id + 1,
                taskName: newTask,
                isCompleted: false
            }
    
            setTodoList([...todoList, task])
            console.log(todoList)
        } 
    }

    const completeTask = (id) => {
        setTodoList(todoList.map((task) => {
            if(task.id === id){
                return {...task, isCompleted: !task.isCompleted}
            } else {
                return task
            }
        }))
    }

    const removeTask = (id) => {
        setTodoList(todoList.filter((task) => {
            return task.id != id
        }))
    }

    return(
        <>
            <div className="list_container">
                <div className="add_task">
                    <input type="text" placeholder="Add a new task to your list" onChange={() => setNewTask(event.target.value)}/>
                    <button onClick={() => addNewTask()}>Add Task</button>
                </div>
                <div className="tasks_container">
                    <ul>
                        {todoList.map((task) => {
                            return(
                                <li key={task.id} className={`task ${task.isCompleted ? "completed" : ""}`}>
                                    <div className="">
                                        <input type="checkbox" onClick={() => completeTask(task.id)}></input>
                                        <h2>{task.taskName}</h2> 
                                    </div>
                                    <button onClick={() => removeTask(task.id)}>
                                        <i class='bx bxs-trash-alt' ></i>
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