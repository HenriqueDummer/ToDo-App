export default function Navbar({changeTodo, setCurrentTodo, currentTodo}){
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
                        <button onClick={() => setCurrentTodo(event.target.id)} id="0" className="task_list selected">
                            <i class='bx bxs-circle'></i>
                            <h3>Personal</h3>
                        </button>
                        <button onClick={() => setCurrentTodo(event.target.id)} id="1" className="task_list">
                            <i className='bx bxs-circle'></i>
                            <h3>Work</h3>
                        </button>
                        <button onClick={() => setCurrentTodo(event.target.id)} id="2" className="task_list">
                            <i className='bx bxs-circle'></i>
                            <h3>College</h3>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}