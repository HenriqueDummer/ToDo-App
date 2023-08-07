import { useState, useRef } from "react";


export default function Navbar({todoList, setCurrentTodo, currentTodo, setTodoList}){
    
    const [drop_active, setDropActive] = useState(false)
    const [isChangingName, setIsChangingName] = useState(false)
    const [nameChange, setNameChange] = useState()
    const [navActive, setNavActive] = useState(true)
    
    const nameInputRef = useRef(null)

    const removeTodo = (id) => {
        const updatedTodoList = todoList.filter((todo) => {
            return todo.todoId !== id
        })
        
        setTodoList(updatedTodoList)

        setCurrentTodo(updatedTodoList[0].todoId)      
    }

    const changeTodo = (id) => {
        if(id != currentTodo){
            setDropActive(false)
            setIsChangingName(false)
            setCurrentTodo(id)
        } 
    }
    
    const handleOpen = () => {
        setDropActive(!drop_active)
    }

    const startChangingName = () => {
        setNameChange("")
        setIsChangingName(true)
    }

    const saveNameChange = (id) =>{
        const updatedTodoList = todoList.map((todo) => {
            if(todo.todoId === id){
                return {...todo, todoName: nameChange}
            } else{
                return todo
            }
        })

        setTodoList(updatedTodoList)
        setIsChangingName(false)
    }
    
    const addNewTodo = () => {
        const newTodo = {
            todoId: todoList[todoList.length - 1].todoId + 1,
            todoName: "New todo",
            todoTasks: []
        }

        setTodoList([...todoList, newTodo])
    }
    console.log(navActive)

    return(
        <>
            
            <div className={`navbar ${navActive ? "" : "hidden"}`}>
                {   navActive ?
                    <button onClick={() => setNavActive(false)}  className="nav_btn"><i class='bx bxs-x-square'></i></button>
                    :
                    <button onClick={() => setNavActive(true)} className="nav_btn"><i class='bx bx-menu'></i></button>
                }
                <div className="profile">
                    <div className="profile-img">
                        <img src="https://img.freepik.com/free-icon/user_318-159711.jpg" alt="" />
                    </div>
                    <div className="profile-infos">
                        <p>Hello there</p>
                        <h3>Henrique Dummer</h3>
                    </div>
                </div>
                <div className="controls">
                    <h2>Your tasks</h2>
                    <div className="list_container">
                        {
                            todoList.map((todo) => {
                                return(
                                <button 
                                onClick={() => changeTodo(todo.todoId)} 
                                id={todo.todoId} className={`list_container_todo ${todo.todoId === currentTodo ? "active" : ""}`} onSubmit={() => saveNameChange(todo.todoId)}>
                                    <div className="todo_name">
                                        <i className='bx bxs-circle'></i>
                                        {isChangingName && todo.todoId === currentTodo ? (
                                            <>
                                                <input required ref={nameInputRef}  id="todoName" type="text" value={nameChange} onChange={() => setNameChange(event.target.value)} />
                                                <button onClick={() => saveNameChange(todo.todoId)}>Save</button>
                                            </>
                                            ) : (
                                            <div className="name_container">
                                                <h3>{todo.todoName}</h3>
                                            </div>
                                            )
                                        }
                                        
                                    </div>
                                    <button id={todo.todoId} className="dropdown_btn" onClick={handleOpen}>            
                                        <i class='bx bx-dots-vertical-rounded bx-rotate-90' ></i>
                                        <div className="dropdown_menu_container">
                                            <div className={`dropdown_menu ${drop_active ? `drop_active` : ``}`}>
                                                <button className="" onClick={() => removeTodo(todo.todoId)}>
                                                    <p>Delete</p>
                                                    <i className='bx bxs-trash-alt' ></i>
                                                </button>
                                                <button onClick={startChangingName} className="">
                                                    <p>Change Name</p>
                                                    <i class='bx bxs-edit'></i>
                                                </button> 
                                            </div> 
                                        </div>
                                    </button>
                                </button>)
                            })
                        }
                    </div>
                    {
                        todoList.length < 10 &&
                        <div className="add_todo">
                            <button onClick={() => addNewTodo()} className="add_todo_btn"><i class='bx bx-plus'></i></button>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

