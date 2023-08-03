export default function Navbar({todoList, setCurrentTodo, currentTodo}){
    return(
        <>
            <div className="navbar">
                <div className="profile">
                    <div className="profile_img">
                        <img src="https://img.freepik.com/free-icon/user_318-159711.jpg" alt="" />
                    </div>
                    <div className="profile_infos">
                        <p>Hello there</p>
                        <h3>Henrique Dummer</h3>
                    </div>
                </div>
                <div className="controls">
                    <h2>Your tasks</h2>
                    <div className="tasks_list_container">
                        {
                            todoList.map((todo) => {
                                return(
                                <button 
                                onClick={() => setCurrentTodo(Number(event.target.id))} 
                                id={todo.todoId} className={`task_list ${todo.todoId === currentTodo ? "selected" : ""}`}>
                                    <i className='bx bxs-circle'></i>
                                    <h3 >{todo.todoName}</h3>
                                </button>)
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

